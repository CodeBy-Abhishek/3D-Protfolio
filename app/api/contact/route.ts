import { NextResponse } from 'next/server';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

type ContactPayload = {
  email?: unknown;
  message?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many contact requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  try {
    const body = (await request.json()) as ContactPayload;
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!EMAIL_REGEX.test(email) || message.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a valid email and a message with at least 10 characters.' },
        { status: 400 }
      );
    }

    if (message.length > 4000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
    }

    await sendContactEmail(email, message);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Unable to send message right now. Please email Abhishek directly.' },
      { status: 500 }
    );
  }
}

async function sendContactEmail(email: string, message: string) {
  const to = process.env.CONTACT_EMAIL || 'abhishek977266@gmail.com';
  const html = buildEmailHtml(email, message);

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to,
        reply_to: email,
        subject: `Portfolio contact from ${email}`,
        html,
      }),
    });

    if (!response.ok) throw new Error(`Resend failed with status ${response.status}`);
    return;
  }

  if (process.env.SENDGRID_API_KEY) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.CONTACT_FROM_EMAIL || to },
        reply_to: { email },
        subject: `Portfolio contact from ${email}`,
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (!response.ok) throw new Error(`SendGrid failed with status ${response.status}`);
    return;
  }

  console.info('Contact message received without email provider configured:', { email, message });
}

function buildEmailHtml(email: string, message: string) {
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>New portfolio contact</h2>
      <p><strong>From:</strong> ${safeEmail}</p>
      <div style="margin-top:16px;padding:16px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">
        ${safeMessage}
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}