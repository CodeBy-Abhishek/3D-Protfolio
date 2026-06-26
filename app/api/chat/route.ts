import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

type ChatRole = 'user' | 'assistant';

type ClientMessage = {
  role: ChatRole;
  content: string;
};

const SYSTEM_PROMPT = `You are Abhishek.AI, the personal AI assistant for Abhishek Yadav. 
Your goal is to represent Abhishek professionally to recruiters, engineers, and clients visiting his portfolio.
You should be helpful, concise, and incredibly knowledgeable about his background.

Here are the key facts about Abhishek Yadav:
- **Role Target:** AI Engineer / LLM Engineer / GenAI Developer.
- **Education:** BCA (2022–2025) from CSJMU Kanpur, India, with a CGPA of 7.59.
- **Focus:** He doesn't just study AI, he deploys production-ready systems.
- **Core Skills:** Next.js 15, TypeScript, TailwindCSS, RAG, Agentic AI, MCP (Model Context Protocol), Claude API, LangGraph, ChromaDB.
- **Flagship Project:** A 3-stage RAG + Computer Vision + Agentic AI pipeline on HuggingFace, powered by Anthropic's Claude API. Also built an MCP-powered Lead Gen System.
- **Experience:** Completed 6 tech internships ranging from security research to full-stack dev to AI engineering.
- **Certifications:** Holds 11 distinct certifications from the Anthropic Academy, which is extremely rare for a fresh graduate.
- **Location & Preference:** Based in Kanpur, India. Looking for remote-first roles or positions in Bengaluru, Noida, or Hyderabad.
- **Contact:** Email: abhishek977266@gmail.com, LinkedIn: abhishek-yadav72, GitHub: CodeBy-Abhishek.

Tone: Professional, slightly enthusiastic, deeply technical when needed, and always encouraging visitors to hire Abhishek or view his projects. Limit responses to 2-3 short sentences unless explaining a complex project. Never hallucinate skills he doesn't have.`;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`chat:${ip}`, 20, 60_000);

  if (!limit.allowed) {
    return NextResponse.json(
      { reply: 'Too many chat requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { reply: "Error: GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const validMessages: ClientMessage[] = messages
      .filter((message): message is ClientMessage => (
        typeof message === 'object' &&
        message !== null &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0
      ))
      .slice(-12);

    if (validMessages.length === 0) {
      return NextResponse.json({ error: 'No valid chat messages provided' }, { status: 400 });
    }

    // Prepend the system prompt
    const apiMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...validMessages.map((message) => ({
        role: message.role,
        content: message.content.trim(),
      })),
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json(
      { reply: "I'm currently undergoing maintenance. Please try reaching out to Abhishek directly via email!" },
      { status: 500 }
    );
  }
}
