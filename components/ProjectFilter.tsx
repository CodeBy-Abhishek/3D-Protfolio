'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';

const categories = ['All', 'AI', 'Web', 'Automation', 'Full Stack'] as const;

const projects = [
  { title: 'AI Document Intelligence', category: 'AI', summary: 'RAG, computer vision, and Claude-powered document Q&A pipeline.', tech: ['RAG', 'ChromaDB', 'Claude'], href: 'https://huggingface.co/spaces/abhishekyadav16/abhishekyadav16' },
  { title: 'MCP Lead Generation', category: 'Automation', summary: 'Multi-agent lead discovery and enrichment workflow using MCP ideas.', tech: ['MCP', 'LangGraph', 'Agents'], href: 'https://github.com/CodeBy-Abhishek' },
  { title: '3D Portfolio', category: 'Web', summary: 'Interactive Next.js portfolio with 3D hero, motion, chatbot, and APIs.', tech: ['Next.js', 'Framer Motion', 'Groq'], href: 'https://github.com/CodeBy-Abhishek/3D-Protfolio' },
  { title: 'Team Task Manager', category: 'Full Stack', summary: 'Operational task management app with frontend, backend, and persistence.', tech: ['React', 'API', 'Database'], href: 'https://github.com/CodeBy-Abhishek' },
];

export default function ProjectFilter() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const visibleProjects = useMemo(
    () => projects.filter((project) => active === 'All' || project.category === active),
    [active]
  );

  return (
    <section id="project-gallery" className="py-20 sm:py-28 px-4 sm:px-6 md:px-24 relative section-scanline">
      <div className="relative z-10">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-violet-400">08 - Project Gallery</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-white">Filter The Build Log.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest transition"
                style={{
                  backgroundColor: active === category ? 'var(--accent-cyan)' : 'var(--input-bg)',
                  borderColor: active === category ? 'var(--accent-cyan)' : 'var(--card-border)',
                  color: active === category ? '#050507' : 'var(--text-secondary)',
                }}
              >
                <Filter size={12} /> {category}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.a
                layout
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="group rounded-2xl border p-5 transition hover:-translate-y-1"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
              >
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">{project.category}</div>
                <h3 className="mt-4 text-lg font-black text-white group-hover:text-cyan-300">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded border border-white/10 px-2 py-1 text-[10px] font-mono text-zinc-400">{tech}</span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-300">
                  Open <ArrowUpRight size={14} />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}