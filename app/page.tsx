'use client';

import Hero3D from '@/components/Hero3D';
import ContactForm from '@/components/ContactForm';
import LiveDiagnostics from '@/components/LiveDiagnostics';
import ProjectDetails from '@/components/ProjectDetails';
import SystemBoot from '@/components/SystemBoot';
import TiltCard from '@/components/TiltCard';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, ArrowUpRight, Terminal, Server,
  Database, Layers, Info, X, ExternalLink, Star, Brain, Workflow,
  Zap, Shield, CheckCircle2, Award, ChevronRight, Cpu, FileText,
  Search, MessageSquare, GitBranch, BarChart3, Network, Code2,
} from 'lucide-react';
import {
  AnimatePresence, motion, useScroll, useSpring, useTransform,
  useMotionValue, useInView,
} from 'framer-motion';

// ═══════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
function stagger(delay = 0.08) {
  return { show: { transition: { staggerChildren: delay } } };
}

// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const PROJECTS = [
  {
    id: 'ai-doc-intelligence',
    title: 'AI Document Intelligence',
    category: 'Agentic AI · RAG Pipeline',
    accent: 'cyan' as const,
    liveUrl: 'https://huggingface.co/spaces/abhishekyadav16/abhishekyadav16',
    githubUrl: 'https://github.com/CodeBy-Abhishek',
    live: true,
    problem: 'Enterprises drown in unstructured documents — PDFs and scanned files sit in silos, completely inaccessible to semantic search or intelligent querying.',
    solution: 'Built a 3-stage pipeline: Computer Vision for document parsing → RAG with ChromaDB + all-MiniLM-L6-v2 → Agentic AI layer via Anthropic Claude API for intelligent Q&A and summarisation.',
    metrics: ['Live deployed on HuggingFace Spaces', '3-stage RAG + CV + Agentic pipeline', 'Semantic search via ChromaDB embeddings', 'Claude API agentic reasoning layer'],
    tech: ['Python', 'Anthropic API', 'ChromaDB', 'all-MiniLM-L6-v2', 'FastAPI', 'HuggingFace', 'RAG', 'CV'],
    details: [
      { title: 'Stage 1 — Computer Vision', content: 'CV models parse and extract structured content from PDFs, scanned images, and complex document layouts before indexing.' },
      { title: 'Stage 2 — RAG Pipeline', content: 'ChromaDB vector store with all-MiniLM-L6-v2 embeddings. Hybrid retrieval with contextual chunking for high-accuracy semantic search.' },
      { title: 'Stage 3 — Agentic AI', content: 'Anthropic Claude API powers the agentic reasoning layer — orchestrating multi-step document Q&A, summarisation, and intelligent extraction workflows.' },
    ],
    Icon: Brain,
    label: 'RAG + CV + AGENTIC_AI',
  },
  {
    id: 'mcp-lead-gen',
    title: 'MCP-Powered Lead Generation',
    category: 'Multi-Agent · MCP Architecture',
    accent: 'violet' as const,
    liveUrl: '',
    githubUrl: 'https://github.com/CodeBy-Abhishek',
    live: false,
    problem: 'Sales teams waste hours manually scraping, qualifying, and enriching leads with no intelligent orchestration layer.',
    solution: 'Multi-agent system using the Model Context Protocol (MCP) with LangGraph orchestration. Agents autonomously scrape, enrich, qualify, and score leads using Anthropic Claude as the reasoning backbone.',
    metrics: ['Multi-agent MCP architecture', 'LangGraph stateful workflow orchestration', 'Anthropic Claude tool-use reasoning', 'Architecturally distinctive among Indian fresher profiles'],
    tech: ['Python', 'MCP', 'LangGraph', 'Anthropic API', 'FastAPI', 'ChromaDB', 'Railway'],
    details: [
      { title: 'MCP Server Design', content: 'Custom MCP servers expose tools for web scraping, CRM enrichment, and lead scoring. Claude orchestrates tool calls via MCP protocol.' },
      { title: 'LangGraph Orchestration', content: 'State machines built with LangGraph manage multi-step agent workflows: discovery → enrichment → qualification → outreach drafting.' },
      { title: 'Agentic Reasoning', content: 'Claude API handles intent classification, lead scoring logic, and personalised outreach generation driven by structured tool-use patterns.' },
    ],
    Icon: Workflow,
    label: 'MULTI_AGENT_ORCHESTRATION',
  },
];

const INTERNSHIPS = [
  { company: 'Google Developer Campus', role: 'Developer Program Participant', period: '2024', highlight: 'AI / ML track — build & deploy workshops', color: 'bg-cyan-400' },
  { company: 'Codevirus Security', role: 'Security & Development Intern', period: '2024', highlight: 'Vulnerability assessment & secure code review', color: 'bg-emerald-400' },
  { company: 'Code-A-Nova', role: 'Full Stack Developer Intern', period: '2023', highlight: 'React + Node.js production feature delivery', color: 'bg-cyan-400' },
  { company: 'Klynt Solutions', role: 'Software Developer Intern', period: '2023', highlight: 'Client-facing web application development', color: 'bg-slate-500' },
  { company: 'HexSoftwares', role: 'Web Developer Intern', period: '2023', highlight: 'Frontend engineering & UI component systems', color: 'bg-slate-500' },
  { company: 'Self-Directed AI Research', role: 'Independent Builder', period: '2022–25', highlight: 'RAG systems, agentic AI, MCP architecture', color: 'bg-violet-400' },
];

const CERTIFICATIONS = [
  { name: 'Anthropic API Fundamentals', tag: 'CORE' },
  { name: 'MCP & Tool Use Mastery', tag: 'ADVANCED' },
  { name: 'Agentic Design Patterns', tag: 'ADVANCED' },
  { name: 'Prompt Engineering', tag: 'CORE' },
  { name: 'Claude Code & Workflows', tag: 'TOOLS' },
  { name: 'RAG Architecture', tag: 'SYSTEMS' },
  { name: 'Files API & Prompt Caching', tag: 'OPTIMISE' },
  { name: 'Extended Thinking', tag: 'ADVANCED' },
  { name: 'Batch Processing', tag: 'SCALE' },
  { name: 'AI Fluency 4D Framework', tag: 'STRATEGY' },
  { name: 'Multi-Agent Orchestration', tag: 'ADVANCED' },
];

const AI_STACK = [
  'Anthropic Claude API', 'RAG Architecture', 'MCP (Model Context Protocol)',
  'LangGraph', 'LangChain', 'ChromaDB', 'all-MiniLM-L6-v2',
  'HuggingFace Spaces', 'Agentic AI Patterns', 'Prompt Engineering',
  'Vector Databases', 'Contextual Retrieval', 'OpenAI API', 'PyTorch',
];

const SKILL_GROUPS = [
  { Icon: Terminal, title: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'] },
  { Icon: Server, title: 'Frontend & Backend', skills: ['React.js', 'Next.js', 'FastAPI', 'Node.js', 'Express.js', 'Tailwind CSS', 'Django', 'WebSockets'] },
  { Icon: Database, title: 'Data & Infrastructure', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Railway', 'Git / GitHub', 'AWS (Basic)'] },
];

const ROLES = ['AI Engineer', 'LLM Builder', 'RAG Architect', 'Agentic Systems Dev'];

// ═══════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════
function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [display, setDisplay] = useState('');
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    if (waiting) { const t = setTimeout(() => setWaiting(false), pause); return () => clearTimeout(t); }
    const word = words[wIdx];
    if (!deleting) {
      if (cIdx < word.length) {
        const t = setTimeout(() => { setDisplay(word.slice(0, cIdx + 1)); setCIdx(c => c + 1); }, speed);
        return () => clearTimeout(t);
      } else { setWaiting(true); setDeleting(true); }
    } else {
      if (cIdx > 0) {
        const t = setTimeout(() => { setDisplay(word.slice(0, cIdx - 1)); setCIdx(c => c - 1); }, speed / 2);
        return () => clearTimeout(t);
      } else { setDeleting(false); setWIdx(w => (w + 1) % words.length); }
    }
  }, [cIdx, deleting, waiting, wIdx, words, speed, pause]);
  return display;
}

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const t0 = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

// ═══════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════
function StatCard({ val, unit, label }: { val: string; unit: string; label: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const num = parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
  const isFloat = val.includes('.');
  const hasPlus = val.includes('+');
  const raw = useCountUp(isFloat ? Math.round(num * 100) : num, 1600, active);
  const display = isFloat ? (raw / 100).toFixed(2) : String(raw) + (hasPlus ? '+' : '');
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} variants={fadeUp} className="group cursor-default">
      <div className="text-4xl md:text-5xl font-black mb-1 group-hover:text-cyan-400 transition-colors tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
        {display}<span className="text-cyan-500 text-sm ml-1 font-bold" style={{ color: 'var(--accent-cyan)' }}>{unit}</span>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] mt-1.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-3 py-1.5 mb-14 border border-cyan-500/20 rounded-md bg-cyan-500/[0.06] text-cyan-400 text-[10px] font-black tracking-[0.35em] uppercase">
      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />{children}
    </motion.div>
  );
}

// Parallax scroll-reveal section wrapper
function ScrollRevealSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.975, 1, 1, 0.975]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  return (
    <div id={id} className="w-full relative">
      <motion.section ref={ref} style={{ y, scale, opacity }} className={className}>{children}</motion.section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// AI ARCHITECTURE DIAGRAM — LlamaIndex / LangChain style
// ═══════════════════════════════════════════════════════
function AIArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nodes = [
    { id: 'doc',    label: 'L1: INGRESS',   title: 'Document Loader', sub: 'PDF · Image · Web',      Icon: FileText,     color: '#22d3ee', delay: 0    },
    { id: 'embed',  label: 'L2: EMBEDDING', title: 'Vector Embedding', sub: 'all-MiniLM-L6-v2',       Icon: Cpu,          color: '#a78bfa', delay: 0.15 },
    { id: 'vector', label: 'L3: RETRIEVAL', title: 'Vector Store',     sub: 'ChromaDB · Search',      Icon: Database,     color: '#34d399', delay: 0.3  },
    { id: 'llm',    label: 'L4: REASONING', title: 'Claude API',       sub: 'Agentic · Tool Use',     Icon: Brain,        color: '#fb923c', delay: 0.45 },
    { id: 'out',    label: 'L5: OUTPUT',    title: 'Response',         sub: 'Q&A · Summary',          Icon: MessageSquare,color: '#22d3ee', delay: 0.6  },
  ];

  return (
    <div ref={ref} className="relative w-full rounded-2xl overflow-hidden border" style={{ minHeight: 440, backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
      {/* Perspective grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(34,211,238,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.055) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        transform: 'perspective(600px) rotateX(18deg)',
        transformOrigin: '50% 0%',
        opacity: 0.8,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, transparent 30%, var(--card-bg) 90%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--card-bg), transparent)' }} />
      {/* Mesh glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 60%, rgba(34,211,238,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(167,139,250,0.07) 0%, transparent 50%)' }} />

      {/* Header */}
      <div className="relative z-20 pt-7 px-7 pb-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[9px] font-mono tracking-[0.4em] uppercase mb-0.5" style={{ color: 'var(--accent-cyan)' }}>// SYSTEM ARCHITECTURE · LlamaIndex-Inspired</div>
          <div className="font-black text-lg tracking-tighter" style={{ color: 'var(--text-primary)' }}>RAG + Agentic AI Pipeline</div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full bg-emerald-500/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />MESSAGE BUS ACTIVE
        </div>
      </div>

      {/* Node row */}
      <div className="relative z-20 px-5 md:px-10 pb-6 pt-2">
        <div className="flex items-center justify-between gap-2 relative overflow-x-auto pb-2">
          {/* Connector lines with animated flow dots */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-1 relative h-px mx-1" style={{ background: `linear-gradient(90deg, ${nodes[i].color}50, ${nodes[i + 1].color}50)` }}>
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: nodes[i].color, boxShadow: `0 0 10px ${nodes[i].color}` }}
                animate={{ left: ['-4px', 'calc(100% + 4px)'] }}
                transition={{ duration: 1.8 + i * 0.3, delay: i * 0.4, repeat: Infinity, ease: 'linear' }} />
            </div>
          ))}

          {/* Nodes */}
          {nodes.map((node) => {
            const Icon = node.Icon;
            return (
              <motion.div key={node.id}
                initial={{ opacity: 0, y: 30, scale: 0.85 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: node.delay + 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-shrink-0 z-10 group">
                <div className="text-center mb-3">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: node.color + '90' }}>{node.label}</span>
                </div>
                <div className="relative w-[80px] sm:w-[100px] md:w-[120px] rounded-xl border p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 group-hover:scale-105 cursor-default"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${node.color}14 0%, rgba(10,12,20,0.95) 70%)`, borderColor: `${node.color}35`, boxShadow: `0 0 30px ${node.color}10, inset 0 0 20px ${node.color}05` }}>
                  <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${node.color}25, transparent 60%)` }} />
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `${node.color}15`, border: `1px solid ${node.color}30` }}>
                    <Icon size={22} style={{ color: node.color }} />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-[11px] font-bold leading-tight">{node.title}</div>
                    <div className="text-[9px] font-mono mt-0.5" style={{ color: node.color + '70' }}>{node.sub}</div>
                  </div>
                  <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${node.color}60, transparent)` }} />
                  <div className="flex items-center gap-1">
                    <motion.span className="w-1 h-1 rounded-full" style={{ background: node.color, boxShadow: `0 0 4px ${node.color}` }}
                      animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: node.delay }} />
                    <span className="text-[9px] font-mono" style={{ color: node.color + '60' }}>ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Status bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center justify-between mt-8 pt-4 border-t border-white/[0.04] flex-wrap gap-4">
          <div className="flex gap-6 flex-wrap">
            {[
              { label: 'System Load', status: 'Stable', color: '#34d399' },
              { label: 'Encryption', status: 'Active', color: '#a78bfa' },
              { label: 'Throughput', status: '4.2k/min', color: '#22d3ee' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
                  animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[10px] font-mono text-zinc-600">{s.label}: <span style={{ color: s.color }}>{s.status}</span></span>
              </div>
            ))}
          </div>
          <div className="text-[9px] font-mono text-zinc-700 tracking-widest">p99 LATENCY: 28ms</div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// AGENT ORCHESTRATION DIAGRAM — LangChain / MCP style
// ═══════════════════════════════════════════════════════
function AgentOrchestrationDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const agents = [
    { label: 'Scraper Agent',  color: '#22d3ee', Icon: Search,      desc: 'Web data extraction' },
    { label: 'Enrich Agent',   color: '#a78bfa', Icon: GitBranch,   desc: 'CRM enrichment'      },
    { label: 'Score Agent',    color: '#34d399', Icon: BarChart3,   desc: 'Lead qualification'  },
    { label: 'Outreach Agent', color: '#fb923c', Icon: MessageSquare, desc: 'Personalised copy' },
  ];

  return (
    <div ref={ref} className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#060810] p-6 md:p-8" style={{ minHeight: 300 }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
          <div>
            <div className="text-[9px] font-mono text-violet-400/50 tracking-[0.4em] uppercase mb-0.5">// MCP ORCHESTRATION · LangChain-Inspired</div>
            <div className="text-white font-black text-lg tracking-tighter">Multi-Agent Lead Pipeline</div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-violet-400 border border-violet-500/20 px-3 py-1 rounded-full bg-violet-500/[0.06]">
            <Network size={10} /> LangGraph · MCP
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-0">
          {/* Claude orchestrator hub */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex-shrink-0">
            <div className="w-[120px] h-[120px] rounded-2xl border border-violet-500/30 flex flex-col items-center justify-center gap-2 relative cursor-default"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.15) 0%, rgba(10,12,20,0.95) 70%)', boxShadow: '0 0 40px rgba(167,139,250,0.1)' }}>
              <Brain size={28} className="text-violet-400" />
              <div className="text-center">
                <div className="text-white text-[11px] font-bold">Claude API</div>
                <div className="text-violet-400/60 text-[9px] font-mono">ORCHESTRATOR</div>
              </div>
              {/* Pulsing ring */}
              <motion.div className="absolute -inset-2 rounded-2xl border border-violet-500/15"
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute -inset-4 rounded-2xl border border-violet-500/08"
                animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
            </div>
          </motion.div>

          {/* Agents grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 md:pl-8">
            {agents.map((agent, i) => {
              const Icon = agent.Icon;
              return (
                <motion.div key={agent.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group">
                  {/* Animated connector line (desktop) */}
                  <div className="hidden md:block absolute -left-8 top-1/2 w-8 h-px" style={{ background: `linear-gradient(90deg, rgba(167,139,250,0.3), ${agent.color}50)` }}>
                    <motion.div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: agent.color, boxShadow: `0 0 6px ${agent.color}` }}
                      animate={{ left: ['0%', '100%'] }}
                      transition={{ duration: 1.2 + i * 0.2, delay: i * 0.3, repeat: Infinity, ease: 'linear' }} />
                  </div>

                  <div className="rounded-xl border p-3 text-center transition-all duration-300 group-hover:scale-105 cursor-default"
                    style={{ borderColor: `${agent.color}30`, background: `radial-gradient(ellipse at 50% 0%, ${agent.color}10 0%, rgba(10,12,20,0.9) 70%)` }}>
                    <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}30` }}>
                      <Icon size={15} style={{ color: agent.color }} />
                    </div>
                    <div className="text-white text-[10px] font-bold">{agent.label}</div>
                    <div className="text-[9px] font-mono mt-0.5" style={{ color: agent.color + '65' }}>{agent.desc}</div>
                    <motion.div className="mt-2 text-[8px] font-mono flex items-center justify-center gap-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                      style={{ color: agent.color }}>
                      <Code2 size={7} /> tool_call
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.04] overflow-x-auto">
          {['Discovery', '→', 'Enrichment', '→', 'Qualification', '→', 'Outreach Draft', '→', 'CRM Update'].map((step, i) => (
            <span key={i} className={`text-[10px] font-mono whitespace-nowrap ${step === '→' ? 'text-zinc-700' : 'text-zinc-500 hover:text-cyan-400 transition-colors cursor-default'}`}>{step}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // All hooks at top level ─────────────────────────────
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const mxSpring = useSpring(0, { stiffness: 45, damping: 18 });
  const mySpring = useSpring(0, { stiffness: 45, damping: 18 });
  const mag1x = useMotionValue(0); const mag1y = useMotionValue(0);
  const mag2x = useMotionValue(0); const mag2y = useMotionValue(0);
  const mag1ref = useRef<HTMLAnchorElement>(null);
  const mag2ref = useRef<HTMLAnchorElement>(null);
  const typeText = useTypewriter(ROLES);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mxSpring.set((e.clientX / window.innerWidth - 0.5) * 36);
      mySpring.set((e.clientY / window.innerHeight - 0.5) * -36);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mxSpring, mySpring]);

  const handleMag = (mx: typeof mag1x, my: typeof mag1y, ref: React.RefObject<HTMLAnchorElement | null>) =>
    (e: React.MouseEvent) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left - r.width / 2) * 0.25);
      my.set((e.clientY - r.top - r.height / 2) * 0.25);
    };
  const resetMag = (mx: typeof mag1x, my: typeof mag1y) => () => { mx.set(0); my.set(0); };

  return (
    <>
      <style>{`
        @keyframes glitch-a{0%{clip-path:inset(40% 0 61% 0);transform:translate(-2px,0)}40%{clip-path:inset(54% 0 7% 0);transform:translate(2px,2px)}80%{clip-path:inset(11% 0 75% 0)}100%{clip-path:inset(61% 0 50% 0)}}
        @keyframes glitch-b{0%{clip-path:inset(25% 0 58% 0);transform:translate(2px,0)}50%{clip-path:inset(54% 0 7% 0);transform:translate(2px,-2px)}90%{clip-path:inset(98% 0 2% 0)}100%{clip-path:inset(25% 0 58% 0);transform:translate(-2px,2px)}}
        @keyframes cursor-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes border-spin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes node-pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.5)}70%{box-shadow:0 0 0 10px rgba(34,211,238,0)}}
        @keyframes scanline{0%{top:-4px}100%{top:100%}}
        .mesh-gradient{background:radial-gradient(at 0% 0%,rgba(34,211,238,.08) 0,transparent 50%),radial-gradient(at 100% 0%,rgba(139,92,246,.08) 0,transparent 50%),radial-gradient(at 50% 100%,rgba(52,211,153,.05) 0,transparent 50%);filter:blur(80px)}
        .glitch-wrap{position:relative;display:inline-block}
        .glitch-wrap::before,.glitch-wrap::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity .2s}
        .glitch-wrap::before{color:#22d3ee;animation:glitch-a 4.5s infinite linear alternate-reverse}
        .glitch-wrap::after{color:#a78bfa;animation:glitch-b 4.5s infinite linear alternate-reverse}
        .glitch-wrap:hover::before,.glitch-wrap:hover::after{opacity:.6}
        .blink{animation:cursor-blink .9s step-end infinite}
        .float{animation:float-y 5s ease-in-out infinite}
        .grad-border{background:linear-gradient(90deg,#22d3ee,#a78bfa,#22d3ee);background-size:200%;animation:border-spin 3s ease infinite}
        .node-pulse{animation:node-pulse 2s infinite}
        .section-scanline{position:relative;overflow:hidden}
        .section-scanline::before{content:'';position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.06),transparent);animation:scanline 12s linear infinite;pointer-events:none;z-index:1}
        .llamaindex-card{background:rgba(8,12,22,0.7);border:1px solid rgba(255,255,255,0.055);backdrop-filter:blur(16px);transition:border-color .25s,transform .25s,box-shadow .25s}
        .llamaindex-card:hover{border-color:rgba(34,211,238,0.18);transform:translateY(-2px);box-shadow:0 20px 60px rgba(0,0,0,0.4),0 0 30px rgba(34,211,238,0.03)}
        .tag-CORE{color:#22d3ee;background:rgba(34,211,238,.07);border-color:rgba(34,211,238,.2)}
        .tag-ADVANCED{color:#a78bfa;background:rgba(167,139,250,.07);border-color:rgba(167,139,250,.2)}
        .tag-TOOLS{color:#34d399;background:rgba(52,211,153,.07);border-color:rgba(52,211,153,.2)}
        .tag-SYSTEMS{color:#fb923c;background:rgba(251,146,60,.07);border-color:rgba(251,146,60,.2)}
        .tag-OPTIMISE{color:#fbbf24;background:rgba(251,191,36,.07);border-color:rgba(251,191,36,.2)}
        .tag-SCALE{color:#f472b6;background:rgba(244,114,182,.07);border-color:rgba(244,114,182,.2)}
        .tag-STRATEGY{color:#94a3b8;background:rgba(148,163,184,.07);border-color:rgba(148,163,184,.2)}
      `}</style>

      <AnimatePresence>{isBooting && <SystemBoot onComplete={() => setIsBooting(false)} />}</AnimatePresence>

      {/* Cursor glow */}
      <div className="fixed pointer-events-none z-[90] w-72 h-72 rounded-full transition-[left,top] duration-75"
        style={{ left: mousePos.x - 144, top: mousePos.y - 144, background: 'radial-gradient(circle,rgba(34,211,238,0.055) 0%,transparent 70%)' }} />

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX, transformOrigin: '0%' }} className="fixed top-0 left-0 right-0 h-[2px] z-[80] grad-border" />

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-zinc-950/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 md:hidden">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white"><X size={22} /></button>
            {['About', 'Projects', 'Architecture', 'Skills', 'Experience', 'Contact'].map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors">{item}</motion.a>
            ))}
            <motion.a href="mailto:abhishek977266@gmail.com"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
              className="mt-4 px-8 py-3 bg-cyan-500 text-black font-black tracking-widest uppercase rounded-xl hover:bg-cyan-400 transition-colors">Hire Me</motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen relative text-zinc-100 overflow-x-hidden selection:bg-cyan-900/50" style={{ background: 'var(--page-bg, #050507)', color: 'var(--page-text, #f4f4f5)', transition: 'background 0.4s ease, color 0.4s ease' }}>
        {/* Mesh gradient background */}
        <div className="fixed inset-0 pointer-events-none mesh-gradient z-0 opacity-60 dark:opacity-60 transition-opacity duration-500" style={{ opacity: 'var(--mesh-opacity, 0.6)' }} />

        {/* ════════════════ NAV ════════════════ */}
        <nav className="fixed w-full top-0 z-[60] px-5 md:px-10 py-4 pointer-events-none">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1400px] mx-auto flex justify-between items-center backdrop-blur-2xl border border-white/[0.06] dark:border-white/[0.06] rounded-2xl px-5 py-3 pointer-events-auto shadow-[0_4px_60px_rgba(0,0,0,0.5)]" style={{ background: 'var(--nav-bg, rgba(9,9,11,0.7))' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-mono text-base font-black tracking-tighter cursor-pointer group">
              <span className="text-white group-hover:text-cyan-400 transition-colors">ABHISHEK</span>
              <span className="text-cyan-500">.AI</span>
            </a>
            <div className="hidden md:flex gap-8 items-center">
              {['About', 'Projects', 'Architecture', 'Skills', 'Experience'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className="text-[10px] font-bold tracking-widest text-zinc-500 hover:text-cyan-400 transition-all uppercase relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-cyan-500 after:transition-all hover:after:w-full">{item}</a>
              ))}
              <div className="h-4 w-px bg-white/8" />
              <ThemeToggle />
              <motion.a href="mailto:abhishek977266@gmail.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="relative px-4 py-2 rounded-lg text-[10px] font-mono font-black tracking-widest uppercase group overflow-hidden">
                <span className="absolute inset-0 rounded-lg grad-border opacity-30 group-hover:opacity-60 transition-opacity" />
                <span className="absolute inset-[1px] rounded-lg bg-zinc-950/90" />
                <span className="relative text-cyan-400">Hire Me ↗</span>
              </motion.a>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-400 hover:text-white transition-colors p-1.5">
                {isMobileMenuOpen ? <X size={20} /> : <Layers size={20} />}
              </button>
            </div>
          </motion.div>
        </nav>

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative min-h-screen grid lg:grid-cols-[52%_48%] items-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden section-scanline pt-24 lg:pt-0">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            mask: 'radial-gradient(ellipse at 50% 100%, black 0%, transparent 70%)',
          }} />
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] bg-cyan-500/[0.06] pointer-events-none" />
          <div className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full blur-[120px] bg-violet-500/[0.05] pointer-events-none" />

          <div className="z-30 flex flex-col justify-center min-h-[60vh] relative">
            {/* Status badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center mb-8">
              <span className="flex items-center gap-2 px-4 py-1.5 border border-emerald-500/25 rounded-full bg-emerald-500/[0.06] text-emerald-400 text-[10px] font-black tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />Open to AI Engineer Roles · Remote / India
              </span>
            </motion.div>

            {/* Name with glitch */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col leading-[0.88] font-black tracking-tighter">
              <span className="text-5xl md:text-6xl text-zinc-600 font-light">Hi, I'm</span>
              <span className="glitch-wrap text-[3.5rem] sm:text-[5rem] md:text-[7rem] text-white leading-[0.85]" data-text="Abhishek">Abhishek</span>
            </motion.div>

            {/* Typewriter role */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 min-w-[200px]">{typeText}</span>
              <span className="blink w-0.5 h-6 bg-cyan-400 rounded-sm flex-shrink-0" />
              <span className="text-zinc-700 text-xl hidden md:block">//</span>
              <span className="text-zinc-500 text-lg hidden md:block font-light">Full-Stack Dev</span>
            </motion.div>

            {/* Animated divider */}
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 80, opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}
              className="h-px bg-gradient-to-r from-cyan-500 via-violet-500 to-transparent mt-6 mb-6" />

            {/* Tagline */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="text-base md:text-[17px] text-zinc-500 max-w-md leading-relaxed">
              Building <span className="text-zinc-200 font-semibold">production AI systems</span> — RAG pipelines, agentic workflows & LLM-powered apps.{' '}
              <span className="text-cyan-400 font-semibold">Live on HuggingFace.</span>
            </motion.p>

            {/* Tech chips stagger */}
            <motion.div initial="hidden" animate="show" variants={stagger(0.055)} className="flex flex-wrap gap-2 mt-6">
              {['RAG', 'Agentic AI', 'MCP', 'Claude API', 'LangGraph', 'ChromaDB'].map((tag) => (
                <motion.span key={tag}
                  variants={{ hidden: { opacity: 0, scale: 0.7, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1 text-[10px] font-mono font-black border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-400 rounded-full uppercase tracking-wider cursor-default">{tag}</motion.span>
              ))}
            </motion.div>

            {/* Magnetic CTAs */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4 mt-10">
              <motion.a ref={mag1ref} href="#projects" style={{ x: mag1x, y: mag1y }}
                onMouseMove={handleMag(mag1x, mag1y, mag1ref)} onMouseLeave={resetMag(mag1x, mag1y)}
                className="btn-primary px-7 py-4 rounded-2xl flex items-center gap-2 text-sm font-black tracking-widest text-[#050507] group shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:shadow-[0_0_50px_rgba(0,229,255,0.4)]">
                View Projects <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              <motion.a ref={mag2ref} href="https://huggingface.co/spaces/abhishekyadav16/abhishekyadav16"
                target="_blank" rel="noopener noreferrer" style={{ x: mag2x, y: mag2y }}
                onMouseMove={handleMag(mag2x, mag2y, mag2ref)} onMouseLeave={resetMag(mag2x, mag2y)}
                className="btn-secondary px-7 py-4 rounded-2xl flex items-center gap-2 text-sm font-black tracking-widest group">
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" /> Live Demo ↗
              </motion.a>
            </motion.div>

            {/* Count-up stats */}
            <motion.div initial="hidden" animate="show" variants={stagger(0.1)} transition={{ delayChildren: 1.0 }}
              className="flex flex-wrap gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/[0.05]">
              {[{ val: '6', unit: '×', label: 'Internships' }, { val: '11', unit: '✓', label: 'Anthropic Certs' }, { val: '2+', unit: '⬆', label: 'Live AI Projects' }].map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </motion.div>
          </div>

          {/* 3D Hero right — mouse-parallax + interactive */}
          <div className="hidden lg:flex h-full items-center justify-center p-10 relative z-20" style={{ perspective: '1200px' }}>
            <motion.div style={{ rotateX: mySpring, rotateY: mxSpring, transformStyle: 'preserve-3d' }} className="w-full h-full flex items-center justify-center float">
              <div className="w-full h-[90vh]" style={{ transform: 'translateZ(50px)' }}><Hero3D /></div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-8 left-6 md:left-24 right-6 md:right-24 flex justify-between items-end z-40">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 2 }}
              className="text-[9px] font-mono text-zinc-700 rotate-90 origin-left translate-y-[-18px]">26.4499°N · 80.3319°E · KANPUR</motion.span>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              className="flex flex-col items-center gap-2 opacity-30 hover:opacity-90 transition-opacity cursor-default">
              <div className="mouse-scroll" />
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.6em]">Scroll_to_Explore</span>
            </motion.div>
            <span className="hidden md:block text-[10px] font-mono text-zinc-800">BCA · CSJMU · 2025</span>
          </div>
        </section>

        {/* ════════════════ ABOUT ════════════════ */}
        <div className="section-divider" />
        <ScrollRevealSection id="about" className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 relative overflow-hidden section-scanline">
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[110px] bg-violet-500/[0.04] pointer-events-none" />
          <div className="relative z-10">
            <SectionTag>// 01 — About Me</SectionTag>
            <div className="grid md:grid-cols-12 gap-16 items-start">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.1)} className="md:col-span-5 space-y-7">
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black leading-tight tracking-tighter text-white">
                  Building AI that <br /><span className="cyber-gradient-text">actually ships.</span>
                </motion.h2>
                <motion.div variants={fadeUp} className="space-y-5 text-zinc-500 text-[15px] leading-relaxed">
                  <p>I'm <strong className="text-white">Abhishek Yadav</strong> — BCA (2022–2025, CGPA 7.59) from CSJMU Kanpur, positioning as an <strong className="text-cyan-400">AI Engineer</strong>. I don't just study AI — I deploy it.</p>
                  <p>My flagship: <strong className="text-zinc-200">3-stage RAG + Computer Vision + Agentic AI pipeline</strong> on HuggingFace, powered by Anthropic Claude API. Plus an MCP-powered Lead Gen System with LangGraph — architecturally rare among Indian fresher profiles.</p>
                  <p><strong className="text-zinc-200">6 internships. 11 Anthropic Academy certs.</strong> Targeting <span className="text-cyan-400 font-semibold">AI Engineer / LLM Engineer / GenAI Developer</span> — remote-first or Bengaluru / Hyderabad / Noida.</p>
                </motion.div>
                <motion.div variants={fadeUp} className="flex gap-5">
                  {[{ Icon: Github, label: 'CodeBy-Abhishek', href: 'https://github.com/CodeBy-Abhishek' }, { Icon: Linkedin, label: 'abhishek-yadav72', href: 'https://www.linkedin.com/in/abhishek-yadav72/' }].map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-600 hover:text-cyan-400 transition-colors text-sm font-mono group">
                      <l.Icon size={14} className="group-hover:scale-110 transition-transform" />{l.label}
                    </a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 36, scale: 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} className="md:col-span-7">
                <TiltCard><LiveDiagnostics /></TiltCard>
              </motion.div>

              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.1)}
                className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-10 pt-14 border-t border-white/[0.05]">
                {[{ val: '6', unit: 'done', label: 'Internships' }, { val: '11', unit: 'cert', label: 'Anthropic Certs' }, { val: '2+', unit: 'live', label: 'AI Projects' }, { val: '7.59', unit: '/10', label: 'CGPA' }].map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollRevealSection>

        {/* ════════════════ PROJECTS ════════════════ */}
        <div className="section-divider" />
        <ScrollRevealSection id="projects" className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 relative section-scanline">
          <span className="absolute -left-4 top-20 text-[8rem] md:text-[12rem] font-black text-white/[0.025] select-none pointer-events-none leading-none uppercase tracking-tighter">PROJECTS</span>
          <div className="relative z-10">
            <SectionTag>// 02 — Production AI Systems</SectionTag>
            <div className="flex flex-col gap-44">
              {PROJECTS.map((project, idx) => {
                const isCyan = project.accent === 'cyan';
                const Icon = project.Icon;
                return (
                  <div key={project.id} className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <motion.div initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
                      className={`${idx % 2 !== 0 ? 'md:order-2' : ''} space-y-7`}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-[10px] font-black tracking-widest uppercase ${isCyan ? 'border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-400' : 'border-violet-500/25 bg-violet-500/[0.06] text-violet-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCyan ? 'bg-cyan-500' : 'bg-violet-500'}`} />
                        {project.category}
                        {project.live && <span className="ml-1 px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-black">LIVE</span>}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight">{project.title}</h3>
                      <div className="space-y-4">
                        {[{ label: 'Problem', text: project.problem }, { label: 'Solution', text: project.solution }].map(({ label, text }) => (
                          <div key={label} className="flex gap-3">
                            <ChevronRight size={14} className={`mt-1 flex-shrink-0 ${label === 'Solution' ? (isCyan ? 'text-cyan-500' : 'text-violet-500') : 'text-zinc-700'}`} />
                            <p className="text-zinc-500 leading-relaxed text-sm"><strong className="text-zinc-300">{label}:</strong> {text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 bg-white/[0.025] border border-white/[0.05] rounded-xl p-5 llamaindex-card">
                        <div>
                          <h4 className="text-zinc-500 text-[9px] font-black mb-3 uppercase tracking-[0.3em]">Key Highlights</h4>
                          <ul className="space-y-2">
                            {project.metrics.slice(0, 3).map((m, i) => (
                              <li key={i} className="flex items-start gap-2 text-zinc-600 text-[11px] font-mono">
                                <CheckCircle2 size={10} className={`mt-0.5 flex-shrink-0 ${isCyan ? 'text-cyan-500' : 'text-violet-500'}`} />{m}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-zinc-500 text-[9px] font-black mb-3 uppercase tracking-[0.3em]">Core Tech</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.slice(0, 5).map((t) => (
                              <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white/[0.04] border border-white/[0.05] text-zinc-600 rounded">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center pt-1">
                        <motion.button whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedProject(project)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs tracking-widest uppercase shadow-lg transition-colors ${isCyan ? 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/20 hover:shadow-cyan-500/40' : 'bg-violet-500 hover:bg-violet-400 shadow-violet-500/20 hover:shadow-violet-500/40'} text-black`}>
                          Architecture <Info size={12} />
                        </motion.button>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-zinc-500 hover:text-cyan-400 transition-colors text-xs font-mono font-black uppercase">
                            <ExternalLink size={12} /> Live Demo ↗
                          </a>
                        )}
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-zinc-600 hover:text-white transition-colors text-xs font-mono font-black uppercase">
                          <Github size={12} /> Source
                        </a>
                      </div>
                    </motion.div>

                    {/* Visual card */}
                    <motion.div initial={{ opacity: 0, scale: 0.93, rotateY: idx % 2 === 0 ? 6 : -6 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }} className={idx % 2 !== 0 ? 'md:order-1' : ''}>
                      <TiltCard className="aspect-square bg-zinc-900/60 border border-white/[0.05] rounded-2xl flex items-center justify-center p-12 group relative overflow-hidden llamaindex-card">
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isCyan ? 'bg-gradient-to-br from-cyan-950/50' : 'bg-gradient-to-br from-violet-950/50'} to-transparent`} />
                        {/* Animated grid on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{
                          backgroundImage: `linear-gradient(${isCyan ? 'rgba(34,211,238,0.08)' : 'rgba(167,139,250,0.08)'} 1px, transparent 1px), linear-gradient(90deg, ${isCyan ? 'rgba(34,211,238,0.08)' : 'rgba(167,139,250,0.08)'} 1px, transparent 1px)`,
                          backgroundSize: '30px 30px',
                        }} />
                        {/* Corner accents */}
                        <div className={`absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 opacity-0 group-hover:opacity-40 transition-opacity ${isCyan ? 'border-cyan-500' : 'border-violet-500'}`} />
                        <div className={`absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 opacity-0 group-hover:opacity-40 transition-opacity ${isCyan ? 'border-cyan-500' : 'border-violet-500'}`} />
                        <div className="flex flex-col items-center gap-8 relative z-10 text-center">
                          <motion.div whileHover={{ scale: 1.1, rotate: 3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                            <Icon className={`transition-all duration-700 ${isCyan ? 'text-zinc-700 group-hover:text-cyan-500/60' : 'text-zinc-700 group-hover:text-violet-500/60'}`} size={96} />
                          </motion.div>
                          <div>
                            <div className={`font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 ${isCyan ? 'text-zinc-700 group-hover:text-cyan-500' : 'text-zinc-700 group-hover:text-violet-500'}`}>{project.label}</div>
                            {project.live && (
                              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-full bg-emerald-500/[0.06] transition-colors">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live on HuggingFace ↗
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollRevealSection>

        {/* ════════════════ AI ARCHITECTURE ════════════════ */}
        <div className="section-divider" />
        <ScrollRevealSection id="architecture" className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 relative section-scanline">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.025) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <SectionTag>// 03 — AI System Architecture</SectionTag>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                  Production-Grade<br /><span className="cyber-gradient-text">AI Pipeline Design.</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                  className="text-zinc-500 text-base leading-relaxed max-w-lg">
                  Inspired by <span className="text-cyan-400 font-semibold">LlamaIndex</span> data pipelines and <span className="text-violet-400 font-semibold">LangChain</span> agent orchestration patterns — these are the actual architectures powering my live projects.
                </motion.p>
              </div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }} className="flex flex-col gap-3 justify-center">
                {[
                  { label: 'LlamaIndex-Inspired', sub: 'RAG data pipeline · contextual retrieval · vector indexing', color: '#a78bfa' },
                  { label: 'LangChain-Inspired', sub: 'Agent orchestration · tool-use · multi-step reasoning chains', color: '#22d3ee' },
                  { label: 'Anthropic MCP', sub: 'Model Context Protocol · structured tool calls · Claude API', color: '#34d399' },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3 px-4 py-3 rounded-xl llamaindex-card" style={{ backgroundColor: 'var(--card-bg)', borderColor: `${badge.color}20` }}>
                    <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ background: `linear-gradient(to bottom, ${badge.color}, ${badge.color}40)` }} />
                    <div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{badge.label}</div>
                      <div className="text-[11px] font-mono" style={{ color: badge.color + 'aa' }}>{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
              <div className="text-[10px] font-mono text-cyan-400/50 tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan-400" /> Project 1 — AI Document Intelligence
              </div>
              <AIArchitectureDiagram />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="text-[10px] font-mono text-violet-400/50 tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-violet-400" /> Project 2 — MCP Lead Generation System
              </div>
              <AgentOrchestrationDiagram />
            </motion.div>
          </div>
        </ScrollRevealSection>

        {/* ════════════════ SKILLS ════════════════ */}
        <div className="section-divider" />
        <ScrollRevealSection id="skills" className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 relative section-scanline">
          <div className="relative z-10">
            <SectionTag>// 04 — Technical Arsenal</SectionTag>

            {/* AI Stack primary card */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} className="mb-8">
              <div className="relative rounded-2xl overflow-hidden border llamaindex-card" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }} />
                <div className="relative z-10 p-8 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center border node-pulse" style={{ backgroundColor: 'var(--accent-cyan)26', borderColor: 'var(--accent-cyan)40' }}>
                        <Brain className="text-cyan-400" size={22} style={{ color: 'var(--accent-cyan)' }} />
                      </div>
                      <div>
                        <h3 className="font-black text-xl uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>AI / LLM Stack</h3>
                        <p className="text-[10px] font-mono" style={{ color: 'var(--accent-cyan)' }}>Core Strength · Actively Deploying in Production</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-black text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/[0.05]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />PRIMARY EXPERTISE
                    </span>
                  </div>
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.04)} className="flex flex-wrap gap-2.5">
                    {AI_STACK.map((s) => (
                      <motion.span key={s}
                        variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35 } } }}
                        whileHover={{ scale: 1.07, y: -2 }}
                        className="px-4 py-2 border font-mono text-xs hover:border-cyan-500/45 hover:text-cyan-300 transition-all cursor-default rounded"
                        style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--accent-cyan)' }}>
                        {s}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Other skill groups */}
            <div className="grid md:grid-cols-3 gap-5">
              {SKILL_GROUPS.map((group, idx) => {
                const Icon = group.Icon;
                return (
                  <motion.div key={group.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
                    <TiltCard className="h-full group rounded-2xl p-7 space-y-6 llamaindex-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
                          <Icon className="text-zinc-500 group-hover:text-cyan-400 transition-colors" size={17} />
                        </div>
                        <h3 className="text-zinc-300 group-hover:text-white font-black text-sm uppercase tracking-tight transition-colors">{group.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((s) => (
                          <span key={s} className="px-3 py-1.5 border font-mono text-xs transition-all cursor-default rounded" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>{s}</span>
                        ))}
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollRevealSection>

        {/* ════════════════ EXPERIENCE + CERTS ════════════════ */}
        <div className="section-divider" />
        <ScrollRevealSection id="experience" className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 relative section-scanline">
          <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="relative z-10">
            <SectionTag>// 05 — Experience & Certifications</SectionTag>
            <div className="grid md:grid-cols-2 gap-20">

              {/* Timeline */}
              <div>
                <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl font-black tracking-tighter mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>
                  6 Internships.<br /><span className="cyber-gradient-text">Real World Impact.</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}
                  className="text-zinc-500 mb-12 leading-relaxed">Security research → full-stack dev → AI engineering. Each role built the stack.</motion.p>
                <div className="relative">
                  {/* Animated timeline line */}
                  <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} viewport={{ once: true }} style={{ originY: 0 }}
                    className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/60 via-cyan-500/20 to-transparent" />
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.09)} className="space-y-4 pl-10">
                    {INTERNSHIPS.map((exp, i) => (
                      <motion.div key={i} variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }} className="relative group">
                        <div className={`absolute -left-7 top-3.5 w-2.5 h-2.5 rounded-full ${exp.color} opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 border-2`} style={{ borderColor: 'var(--page-bg)' }} />
                        <div className="border rounded-xl px-5 py-4 hover:translate-x-1 transition-all duration-300 llamaindex-card" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <h4 className="font-bold text-sm group-hover:text-cyan-400 transition-colors" style={{ color: 'var(--text-primary)' }}>{exp.company}</h4>
                              <p className="text-zinc-600 text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{exp.role}</p>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap ml-2 border" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}>{exp.period}</span>
                          </div>
                          <p className="text-cyan-500/60 text-[11px] font-mono flex items-center gap-1.5 group-hover:text-cyan-400/80 transition-colors">
                            <Zap size={9} />{exp.highlight}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3 leading-tight">
                  11 Anthropic<br /><span className="cyber-gradient-text">Certifications.</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}
                  className="text-zinc-500 mb-10 leading-relaxed">Full Anthropic ecosystem — Claude API, MCP, Agentic AI, RAG & beyond.</motion.p>
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.055)} className="space-y-2">
                  {CERTIFICATIONS.map((cert) => (
                    <motion.div key={cert.name}
                      variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                      className="flex justify-between items-center px-4 py-3 border border-l-2 transition-all group cursor-default rounded-r-lg"
                      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderLeftColor: 'var(--accent-cyan)4d' }}>
                      <div className="flex items-center gap-3">
                        <Award size={11} className="transition-colors flex-shrink-0" style={{ color: 'var(--accent-cyan)' }} />
                        <div>
                          <div className="text-sm font-medium group-hover:text-white transition-colors" style={{ color: 'var(--text-secondary)' }}>{cert.name}</div>
                          <div className="text-[10px] text-zinc-700 font-mono">Anthropic Academy · 2024</div>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border tag-${cert.tag} tracking-widest flex-shrink-0`}>{cert.tag}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Verified badge */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }}
                  className="mt-8 p-5 border border-cyan-500/15 rounded-xl bg-gradient-to-r from-cyan-950/25 to-transparent flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0 node-pulse">
                    <Shield className="text-cyan-500" size={22} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Verified by Anthropic Academy</div>
                    <div className="text-zinc-500 text-xs mt-0.5">11 certs · Extremely rare among Indian fresher profiles</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-cyan-500 fill-cyan-500/60" />)}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollRevealSection>

        {/* ════════════════ CONTACT ════════════════ */}
        <div className="section-divider" />
        <ScrollRevealSection id="contact" className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 bg-zinc-950 relative border-t border-white/[0.04] overflow-hidden section-scanline">
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[130px] bg-cyan-500/[0.04] pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <SectionTag>// 06 — Let's Build Together</SectionTag>
              <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                OPEN TO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">AI ROLES.</span>
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} viewport={{ once: true }}
                className="text-zinc-500 text-lg leading-relaxed max-w-md">
                Looking for <strong className="text-zinc-200">AI Engineer / LLM Engineer / GenAI Developer</strong> roles. Remote-first or Bengaluru / Hyderabad / Noida. Fresh grad with live deployments & 11 Anthropic certs.
              </motion.p>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.1)} className="flex flex-col gap-4">
                {[
                  { Icon: Mail,     label: 'abhishek977266@gmail.com',        href: 'mailto:abhishek977266@gmail.com' },
                  { Icon: Linkedin, label: 'linkedin.com/in/abhishek-yadav72', href: 'https://www.linkedin.com/in/abhishek-yadav72/' },
                  { Icon: Github,   label: 'github.com/CodeBy-Abhishek',       href: 'https://github.com/CodeBy-Abhishek' },
                ].map((link) => (
                  <motion.a key={link.label} variants={fadeUp} href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                    className="flex items-center gap-4 text-zinc-600 font-mono text-sm group hover:text-cyan-400 transition-all">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.06] group-hover:border-cyan-500/40 group-hover:text-cyan-400 group-hover:bg-cyan-500/[0.06] transition-all">
                      <link.Icon size={14} />
                    </div>
                    {link.label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
              <ContactForm />
            </motion.div>
          </div>
        </ScrollRevealSection>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-16 sm:py-24 px-4 sm:px-6 md:px-24 bg-zinc-950 border-t border-white/[0.04] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
              <TiltCard className="inline-block mb-8 cursor-default">
                <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
                  BUILD WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">AI.</span>
                </h2>
              </TiltCard>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
              className="text-zinc-700 font-mono text-xs mb-10 uppercase tracking-[0.25em] max-w-2xl leading-loose">
              AI Engineer · LLM Engineer · GenAI Developer<br />Remote / Bengaluru / Hyderabad / Noida
            </motion.p>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger(0.08)} className="flex justify-center gap-4 mb-14">
              {[{ href: 'https://github.com/CodeBy-Abhishek', Icon: Github }, { href: 'https://www.linkedin.com/in/abhishek-yadav72/', Icon: Linkedin }, { href: 'mailto:abhishek977266@gmail.com', Icon: Mail }].map((link) => (
                <motion.a key={link.href} variants={fadeUp} href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-full hover:bg-cyan-500 hover:text-black hover:border-cyan-500 hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] transition-all duration-200">
                  <link.Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
            <div className="flex flex-col items-center gap-3 opacity-15 hover:opacity-50 transition-opacity">
              <div className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-600">Built with the modern AI stack</div>
              <div className="flex flex-wrap justify-center gap-5">
                {['Next.js 15', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Three.js', 'Anthropic API'].map((t) => (
                  <span key={t} className="text-[10px] font-mono text-zinc-700">{t}</span>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-zinc-800 font-mono tracking-[0.2em] uppercase mt-8">
              Abhishek Yadav · AI Engineer · Kanpur, India · {new Date().getFullYear()}
            </div>
          </div>
        </footer>

        <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
      </main>
    </>
  );
}