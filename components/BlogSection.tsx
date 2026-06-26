'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: 'How I Think About RAG Systems',
    date: '2026-01-12',
    readTime: '6 min',
    summary: 'Notes on chunking, retrieval quality, and practical evaluation loops for document intelligence systems.',
    tags: ['RAG', 'Vector DB', 'LLM'],
    href: 'https://github.com/CodeBy-Abhishek',
  },
  {
    title: 'MCP for Multi-Agent Workflows',
    date: '2026-02-04',
    readTime: '8 min',
    summary: 'A breakdown of how tool servers, orchestration graphs, and guardrails fit together in agentic products.',
    tags: ['MCP', 'Agents', 'LangGraph'],
    href: 'https://github.com/CodeBy-Abhishek',
  },
  {
    title: 'Shipping AI Demos That Recruiters Can Test',
    date: '2026-03-18',
    readTime: '5 min',
    summary: 'A pragmatic checklist for turning prototype notebooks into portfolio-ready hosted experiences.',
    tags: ['Deployment', 'Portfolio', 'AI'],
    href: 'https://github.com/CodeBy-Abhishek',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-6 md:px-24 relative section-scanline">
      <div className="relative z-10">
        <div className="mb-12">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">07 - Writing</div>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-white">Field Notes.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group rounded-2xl border p-6 transition hover:-translate-y-1"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
              </div>
              <h3 className="mt-5 text-xl font-black tracking-tight text-white group-hover:text-cyan-300">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{post.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-1 text-[10px] font-mono text-cyan-300">{tag}</span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
                Read <ArrowUpRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}