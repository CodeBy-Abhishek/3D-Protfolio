import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';
import AIChatbot from '@/components/AIChatbot';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Abhishek Yadav | AI Engineer Portfolio',
  description: 'AI Engineer and GenAI developer building RAG systems, agentic workflows, MCP tools, and production-ready full-stack AI applications.',
  keywords: ['AI Engineer', 'LLM Engineer', 'GenAI Developer', 'RAG', 'Agentic AI', 'MCP', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Abhishek Yadav' }],
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-x-hidden transition-colors duration-300">
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <ErrorBoundary>
          <SmoothScroll>
            <Cursor />
            {children}
          </SmoothScroll>
          <AIChatbot />
        </ErrorBoundary>
      </body>
    </html>
  );
}