import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Abhishek Yadav | Senior Product Engineer',
  description: 'Senior Product Engineer specializing in Distributed Systems, High-Throughput Infrastructure, and AI Platforms. Building the next generation of scalable cloud systems.',
  keywords: ['Senior Product Engineer', 'Distributed Systems', 'Infrastructure Engineering', 'Big Tech Portfolio', 'System Design', 'Scalability'],
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
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-x-hidden transition-colors duration-300">
<<<<<<< HEAD
        <Cursor />
        {children}
=======
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
>>>>>>> 7785240 (Update Portfolio)
      </body>
    </html>
  );
}
