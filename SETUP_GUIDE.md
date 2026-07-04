# 🚀 Setup Guide - 3D Portfolio with All Fixes

## Overview

This guide covers all the fixes and new features implemented in the `fix/issues-and-features` branch:

- ✅ **Fixed Contact Form** - Now sends emails via Resend or SendGrid
- ✅ **Rate Limiting** - Prevents API abuse
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Blog Section** - Latest articles and insights
- ✅ **Project Filtering** - Interactive project gallery
- ✅ **Testimonials** - Social proof section
- ✅ **Analytics** - Event tracking

---

## 1️⃣ Installation & Setup

### Clone & Install
```bash
git clone https://github.com/CodeBy-Abhishek/3D-Protfolio.git
cd 3D-Protfolio
npm install
```

### Switch to Fix Branch
```bash
git checkout fix/issues-and-features
```

---

## 2️⃣ Environment Configuration

### Copy Example File
```bash
cp .env.example .env.local
```

### Get Your API Keys

#### Option A: Resend (Recommended)
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Create API key in dashboard
4. Copy key to `.env.local`:
```env
RESEND_API_KEY=re_your_api_key_here
```

#### Option B: SendGrid
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up and verify email
3. Create API key
4. Add to `.env.local`:
```env
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourportfolio.com
```

#### Get Groq API Key (for AI Chatbot)
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up with GitHub/Google
3. Create API key
4. Add to `.env.local`:
```env
GROQ_API_KEY=gsk_your_api_key_here
```

### Final `.env.local` Example
```env
RESEND_API_KEY=re_xxx...
CONTACT_EMAIL=abhishek977266@gmail.com
GROQ_API_KEY=gsk_xxx...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

---

## 3️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4️⃣ Test All Features

### Test Contact Form
1. Scroll to contact section
2. Fill in email and message
3. Submit form
4. Check email inbox (or SendGrid/Resend dashboard)

### Test AI Chatbot
1. Click chat button (bottom-right)
2. Ask about your experience
3. Get instant AI responses (requires GROQ_API_KEY)

### Test Blog Section
1. Look for "Latest Articles" section
2. Click on any article card (placeholders currently)
3. Replace with real articles in `components/BlogSection.tsx`

### Test Project Filtering
1. Scroll to projects section
2. Click category filters (All, AI, Web, DevOps, Full Stack)
3. Projects dynamically filter

### Test Rate Limiting
```bash
# Quickly submit contact form 6+ times
# Should get "Too many requests" error
# Resets after 60 seconds
```

---

## 5️⃣ Update Main Components

### Add New Sections to Layout
`app/layout.tsx` already updated to include `ErrorBoundary` and GA snippet.

### Add New Sections to Page
`app/page.tsx` already imports and renders `ProjectFilter`, `BlogSection`, `TestimonialsSection`.

---

## 6️⃣ Deploy to Vercel

### Connect GitHub
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Select `fix/issues-and-features` branch

### Add Environment Variables
1. Go to project settings → Environment Variables
2. Add all variables from `.env.local`:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

### Deploy
Push to the branch or deploy from Vercel UI.

---

## 7️⃣ Files Changed/Created

### New Files
- `lib/rateLimit.ts` - Rate limiting middleware
- `lib/analytics.ts` - Analytics tracking
- `components/ErrorBoundary.tsx` - Error boundary wrapper
- `components/BlogSection.tsx` - Blog posts display
- `components/ProjectFilter.tsx` - Project gallery with filtering
- `components/TestimonialsSection.tsx` - Testimonials/recommendations
- `.env.example` - Environment variables template
- `SETUP_GUIDE.md` - This file

### Updated Files
- `app/api/contact/route.ts` - Fixed email sending + rate limiting
- `app/api/chat/route.ts` - Improved with rate limiting + error handling
- `app/layout.tsx` - Add ErrorBoundary wrapper
- `app/page.tsx` - Imports already updated to include new sections

---

## 8️⃣ Troubleshooting

### Contact Form Not Sending
**Check**:
1. API key is correct in `.env.local`
2. Environment variable is loaded: `echo $RESEND_API_KEY`
3. Email service account is verified
4. Check Vercel logs: `vercel logs`

**Fix**:
```bash
# Restart dev server
npm run dev

# Check .env.local is correct
cat .env.local

# Test with curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Hello from local"}'
```

### Chat Not Working
**Check**:
1. `GROQ_API_KEY` is set
2. No rate limit exceeded
3. Browser console for errors

**Fix**:
- Verify API key format (starts with `gsk_`).
- Check Groq console for usage.

### Build Errors
**Check**:
1. TypeScript: `npm run type-check`
2. ESLint: `npm run lint`
3. Missing dependencies: `npm install`

**Fix**:
```bash
npm run build
npm run dev
```

---

## 9️⃣ Next Steps

1. Replace placeholder blog posts with real content and add `/app/blog/[slug]` pages.
2. Add real testimonials and avatars.
3. Optionally wire analytics (GA) and Sentry.
4. Create a PR and merge to `main`.

---

## 10️⃣ Checklist Before Going Live

- [ ] All environment variables set in Vercel
- [ ] Contact form tested and sending emails
- [ ] Chat API tested with Groq key
- [ ] Error boundary tested
- [ ] Rate limiting verified
- [ ] Blog content updated
- [ ] Project filter working smoothly
- [ ] Testimonials filled
- [ ] Analytics configured

---

If you want, I can now:
- Create a Pull Request from `fix/issues-and-features` → `main`.
- Deploy the branch to Vercel (you'll need to add env vars in Vercel).

Which would you like me to do next?