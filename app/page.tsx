'use client';
import Hero3D from '@/components/Hero3D';
import SystemTerminal from '@/components/SystemTerminal';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import ContactForm from '@/components/ContactForm';
import LiveDiagnostics from '@/components/LiveDiagnostics';
import ProjectDetails from '@/components/ProjectDetails';
import SystemBoot from '@/components/SystemBoot';
import TiltCard from '@/components/TiltCard';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, Server, Cpu, Database, Shield, Zap, Activity, Layers, TerminalSquare, MessageSquare, Info } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

const PROJECTS = [
  {
    id: 'task-engine',
    title: 'Hyper-Scale Task Orchestration Engine',
    category: 'Distributed Systems // Infrastructure',
    problem: 'A high-frequency trading platform struggled with inconsistent task priority and worker starvation under burst loads of 50k+ jobs/sec.',
    solution: 'Built a custom Go-based orchestration engine using Kafka as the backbone and Redis for real-time state management. Implemented a hierarchical priority queue system with weighted round-robin scheduling.',
    metrics: [
      '99.999% Service Availability over 12 months',
      'p99 Scheduling Latency < 8ms under peak load',
      'Scaled to 150k TPS (Transactions Per Second)',
      'Atomic task execution with idempotent retries'
    ],
    tech: ['Go', 'Kafka', 'Redis', 'gRPC', 'Protobuf', 'Kubernetes', 'Prometheus'],
    details: [
      { title: 'Dynamic Priority Scaling', content: 'Implemented a PID-controller based scaling logic for worker pools that responds to queue depth and latency spikes in real-time.' },
      { title: 'Zero-Loss Ingress', content: 'Utilized Kafka consumer groups with manual offset management to ensure no transaction is lost during network partitions.' },
      { title: 'Memory Optimization', content: 'Reduced worker memory footprint by 40% using custom memory pools and minimizing allocations on the hot path.' }
    ]
  },
  {
    id: 'llm-pipeline',
    title: 'Adaptive LLM Inference Pipeline',
    category: 'AI Platform // Systems',
    problem: 'High operational costs and p99 latency spikes during multi-tenant inference requests on open-source models.',
    solution: 'Developed an Elastic Inference Pipeline using Python and FastAPI. Implemented semantic request batching and a two-tier caching strategy (Redis-based semantic cache + local LRU).',
    metrics: [
      '55% GPU Resource Optimization',
      '4x Throughput via Dynamic Batching',
      '30ms reduction in TTFT (Time to First Token)',
      '98% cache accuracy for repeated semantic queries'
    ],
    tech: ['Python', 'PyTorch', 'vLLM', 'FastAPI', 'Redis', 'Ray', 'NVIDIA Triton'],
    details: [
      { title: 'Semantic Caching', content: 'Engineered a vector-database backed semantic cache that intercepts 30% of redundant queries before reaching the GPU.' },
      { title: 'Multi-LoRA Orchestration', content: 'Designed a system to dynamically swap LoRA adapters on shared base models to support multi-tenancy without cold starts.' },
      { title: 'Speculative Decoding', content: 'Implemented speculative decoding using smaller draft models to achieve 2x speedups on large model inference.' }
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isBooting && <SystemBoot onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>
      <main className="min-h-screen relative bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-cyan-900 selection:text-cyan-100">

        {/* NAVIGATION - Floating Pill Design */}
        <nav className="fixed w-full top-0 z-[60] px-6 md:px-12 py-6 pointer-events-none">
          <div className="max-w-[1400px] mx-auto flex justify-between items-center backdrop-blur-xl border border-white/5 rounded-2xl bg-zinc-950/50 p-4 pointer-events-auto">
            <div className="font-mono text-xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
              AY<span className="text-cyan-500">.</span>
            </div>

            <div className="hidden md:flex gap-10 items-center">
              {['Strategy', 'Stack', 'Engineering', 'Architecture'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link text-[10px] font-bold tracking-widest text-zinc-500 hover:text-cyan-400 transition-all uppercase"
                >
                  {item}
                </a>
              ))}
              <div className="h-4 w-px bg-white/10 mx-2"></div>
              <a href="#contact" className="px-4 py-2 border border-cyan-500/30 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/20 transition-all text-[10px] font-mono text-cyan-400 font-bold tracking-widest">
                EXECUTE_CONNECT
              </a>
            </div>

            <div className="md:hidden">
              <button className="text-zinc-400"><Layers size={20} /></button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION - Refined Side-by-Side Split */}
        <section className="relative h-screen grid lg:grid-cols-[45%_55%] items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[#050507]">
          {/* Text Content - Focused Left Column */}
          <div className="z-30 flex flex-col justify-center min-h-[60vh] relative pr-0 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-cyan-500/60 text-[10px] font-bold tracking-[0.5em] uppercase mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              Systems_Engineer // L5_INFRA
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-7xl md:text-[8.5rem] font-bold tracking-tighter leading-[0.85] text-white flex flex-col"
              >
                <span>Abhishek</span>
                <motion.span className="cyber-gradient-text font-black -mt-2">
                  Yadav
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-24 h-1 bg-cyan-500/20 mb-8 mt-4"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-2xl text-zinc-500 max-w-lg leading-relaxed font-light"
              >
                Designing <span className="text-zinc-200 font-medium italic">high-throughput distributed services</span> and
                <span className="text-cyan-400"> AI infrastructure</span>.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 items-center mt-12"
            >
              <button className="btn-primary px-12 py-5 rounded-2xl flex items-center gap-3 group text-sm font-bold tracking-widest text-[#050507]">
                EXPLORE_SYSTEMS <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="btn-secondary px-10 py-5 rounded-2xl flex items-center gap-3 group text-sm font-bold tracking-widest">
                <Terminal size={18} /> DOCS.CMD
              </button>
            </motion.div>
          </div>

          {/* 3D Model - Dedicated Right Column Viewport */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex items-center justify-center h-full relative"
          >
            <div className="w-full h-full relative group flex items-center justify-center">
              {/* Subtle Ambient Light behind the model */}
              <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent blur-3xl opacity-50"></div>

              <div className="w-full h-[90vh] grayscale-[0.05] hover:grayscale-0 transition-all duration-700">
                <Hero3D />
              </div>
            </div>
          </motion.div>

          {/* Ultra-Clean Bottom Bar */}
          <div className="absolute bottom-10 left-6 md:left-24 right-6 md:right-24 flex justify-between items-end z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="text-[9px] font-mono text-zinc-500 rotate-90 origin-left translate-y-[-20px]"
            >
              LOC: 40.7128° N, 74.0060° W
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity"
            >
              <div className="mouse-scroll"></div>
              <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.6em]">Initialize_Scroll</span>
            </motion.div>

            <div className="hidden md:flex gap-8 text-zinc-700 text-[10px] font-mono">
              <span>TCP_CONNECTED</span>
              <span>LENS_V2.0.4</span>
            </div>
          </div>
        </section>

        {/* STRATEGY & IMPACT (EXECUTIVE SUMMARY) */}
        <div className="section-divider"></div>
        <section id="about" className="py-32 px-6 md:px-24 relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-16 items-start relative z-10">
            <div className="md:col-span-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-cyan-500/20 rounded-md bg-cyan-500/5 text-cyan-500/80 text-[10px] font-bold tracking-[0.3em] uppercase">
                Strategy & Impact
              </div>
              <p className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white mb-8">
                Solving for <span className="text-zinc-600 font-light italic">complexity, </span> <br />
                building for <span className="cyber-gradient-text">scale.</span>
              </p>
            </div>
            <div className="md:col-span-8 space-y-10">
              <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl font-light">
                I specialize in designing and implementing high-throughput backend services and AI-driven platforms that operate under intense load. My approach combines <strong>rigorous system design principles</strong> with a <strong>bias for action</strong>, ensuring that technical choices directly translate to measurable business outcomes.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/5">
                {/* Stat Cards with 3D Entrance */}
                {[
                  { label: "Throughput", val: "100k+", unit: "RPS" },
                  { label: "Availability", val: "99.999", unit: "%" },
                  { label: "Efficiency", val: "40", unit: "% Cost Red" },
                  { label: "Latency", val: "8ms", unit: "p99" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, rotateY: -20, translateZ: -50 }}
                    whileInView={{ opacity: 1, rotateY: 0, translateZ: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                      {stat.val}<span className="text-cyan-600 text-sm ml-1">{stat.unit}</span>
                    </div>
                    <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <TiltCard>
                  <LiveDiagnostics />
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARSENAL */}
        <div className="section-divider"></div>
        <section id="skills" className="py-32 px-6 md:px-24 bg-white/[0.02]">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-16 border border-white/10 rounded-md bg-white/5 text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase">
            Technical Arsenal
          </div>
          <div className="grid md:grid-cols-3 gap-y-20 gap-x-16">

            <TiltCard className="space-y-8 group">
              <div className="flex items-center gap-4 text-white font-bold tracking-tight text-3xl uppercase">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Terminal className="text-cyan-500" size={20} />
                </div>
                Languages
              </div>
              <div className="flex flex-wrap gap-3">
                {["Go", "Python", "TypeScript", "C++", "Rust", "Java"].map(s => (
                  <span key={s} className="px-4 py-2 bg-zinc-900/50 border border-white/5 text-zinc-500 font-mono text-xs hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-crosshair">{s}</span>
                ))}
              </div>
            </TiltCard>

            <TiltCard className="space-y-8 group">
              <div className="flex items-center gap-4 text-white font-bold tracking-tight text-3xl uppercase">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Server className="text-cyan-500" size={20} />
                </div>
                Cloud & Infra
              </div>
              <div className="flex flex-wrap gap-3">
                {["AWS (EKS, Lambda)", "Terraform", "Kubernetes", "Docker", "GCP", "CI/CD"].map(s => (
                  <span key={s} className="px-4 py-2 bg-zinc-900/50 border border-white/5 text-zinc-500 font-mono text-xs hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-crosshair">{s}</span>
                ))}
              </div>
            </TiltCard>

            <TiltCard className="space-y-8 group">
              <div className="flex items-center gap-4 text-white font-bold tracking-tight text-3xl uppercase">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Database className="text-cyan-500" size={20} />
                </div>
                Data & Messaging
              </div>
              <div className="flex flex-wrap gap-3">
                {["PostgreSQL", "Redis", "Kafka", "Cassandra", "MongoDB", "ElasticSearch"].map(s => (
                  <span key={s} className="px-4 py-2 bg-zinc-900/50 border border-white/5 text-zinc-500 font-mono text-xs hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-crosshair">{s}</span>
                ))}
              </div>
            </TiltCard>

            <div className="space-y-8 group">
              <div className="flex items-center gap-4 text-white font-bold tracking-tight text-3xl uppercase">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Cpu className="text-cyan-500" size={20} />
                </div>
                AI & Intelligence
              </div>
              <div className="flex flex-wrap gap-3">
                {["TensorFlow", "PyTorch", "LangChain", "Vector DBs", "OpenAI API", "HuggingFace"].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-400 font-mono text-sm">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold tracking-tighter text-2xl uppercase">
                <Layers className="text-cyan-500" size={24} /> Systems Thinking
              </div>
              <div className="flex flex-wrap gap-3 text-zinc-500 font-mono text-xs leading-loose">
                Distributed Systems, Event-Driven Arch, Microservices, CAP Theorem, Consistancy Models, SLOs/SLIs.
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white font-bold tracking-tighter text-2xl uppercase">
                <Shield className="text-cyan-500" size={24} /> Security & Tooling
              </div>
              <div className="flex flex-wrap gap-3 text-zinc-500 font-mono text-xs leading-loose">
                OAuth2, JWT, gRPC, Protobuf, Git, Prometheus, Grafana, ELK Stack.
              </div>
            </div>

          </div>
        </section>

        {/* FLAGSHIP PROJECTS */}
        <section id="projects" className="py-32 px-6 md:px-24">
          <h2 className="text-[12rem] font-black text-white/5 absolute -left-10 select-none pointer-events-none">PROJECTS</h2>
          <div className="relative z-10 flex flex-col gap-40">

            {PROJECTS.map((project, idx) => (
              <div key={project.id} className="grid md:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`${idx % 2 !== 0 ? 'md:order-2' : ''} space-y-8`}
                >
                  <div className={`${idx % 2 !== 0 ? 'text-purple-500' : 'text-cyan-500'} font-mono text-xs font-bold tracking-[0.4em] uppercase`}>
                    {project.category}
                  </div>
                  <h3 className="text-5xl font-bold tracking-tighter">{project.title}</h3>

                  <div className="space-y-6">
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      <strong>The Problem:</strong> {project.problem.split(':')[1] || project.problem}
                    </p>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      <strong>The Solution:</strong> {project.solution.split(':')[1] || project.solution}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 bg-white/5 p-6 border border-white/10 rounded-lg">
                    <div>
                      <h4 className="text-white text-xs font-bold mb-2 uppercase">Key Metrics</h4>
                      <ul className="text-zinc-500 text-[11px] font-mono space-y-1">
                        {project.metrics.slice(0, 3).map((m, i) => <li key={i}>- {m}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold mb-2 uppercase">Core Tech</h4>
                      <ul className="text-zinc-500 text-[11px] font-mono space-y-1">
                        {project.tech.slice(0, 3).map((t, i) => <li key={i}>- {t}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-8 items-center pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`flex items-center gap-2 text-white font-bold text-sm tracking-widest border-b-2 ${idx % 2 !== 0 ? 'border-purple-500 hover:text-purple-400 hover:border-purple-400' : 'border-cyan-500 hover:text-cyan-400 hover:border-cyan-400'} pb-1 transition-all uppercase`}
                    >
                      Deep_Dive_Architecture <Info size={16} />
                    </button>
                    <a href="#" className="flex items-center gap-2 text-zinc-500 font-bold text-sm tracking-widest hover:text-white transition-all uppercase">Source_Code</a>
                  </div>
                </motion.div>
                <TiltCard className={`${idx % 2 !== 0 ? 'md:order-1' : ''} aspect-square bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center p-12 group hover:border-cyan-500/30 transition-all overflow-hidden relative shadow-2xl`}>
                  <div className={`absolute inset-0 bg-gradient-to-tr ${idx % 2 !== 0 ? 'from-purple-950/20' : 'from-cyan-950/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="flex flex-col items-center">
                    {idx % 2 === 0 ? <Activity className="text-zinc-800 group-hover:text-cyan-500/50 transition-all mb-4" size={120} /> : <Cpu className="text-zinc-800 group-hover:text-purple-500/50 transition-all mb-4" size={120} />}
                    <span className={`text-zinc-700 font-mono text-[10px] tracking-[0.5em] ${idx % 2 !== 0 ? 'group-hover:text-purple-400' : 'group-hover:text-cyan-400'} transition-all uppercase`}>
                      {idx % 2 === 0 ? 'VISUALIZING_STATE_GRAPHS' : 'LLM_CORE_ORCHESTRATION'}
                    </span>
                  </div>
                </TiltCard>
              </div>
            ))}

          </div>
        </section>

        {/* SYSTEM DESIGN THINKING */}
        <section id="systems" className="py-32 px-6 md:px-24 bg-zinc-950 relative border-t border-white/5">
          <h2 className="text-sm font-mono text-cyan-500 mb-16 uppercase tracking-[0.3em]">Design Principles at Scale</h2>
          <div className="grid md:grid-cols-3 gap-1px bg-white/10 border border-white/10">

            <TiltCard className="bg-zinc-950 p-12 space-y-6 group hover:bg-zinc-900 transition-all">
              <h3 className="text-2xl font-bold tracking-tighter">API First & Performance</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Favoring gRPC/Protobuf for internal service communication to minimize payload size and serialization overhead. Implementing strictly versioned REST APIs for external consumers with comprehensive OpenAPI documentation.
              </p>
              <ul className="text-[10px] font-mono text-cyan-500 space-y-1">
                <li>- Throttling & Rate Limiting</li>
                <li>- Payload Compression</li>
                <li>- Circuit Breaker Pattern</li>
              </ul>
            </TiltCard>

            <TiltCard className="bg-zinc-950 p-12 space-y-6 group hover:bg-zinc-900 transition-all">
              <h3 className="text-2xl font-bold tracking-tighter">Observability & Resilience</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                "If it's not monitored, it doesn't exist." Leveraging OpenTelemetry for distributed tracing to debug p99 latency spikes across microservices. Designing for failure using Bulkheads and Graceful Degradation.
              </p>
              <ul className="text-[10px] font-mono text-cyan-500 space-y-1">
                <li>- RED/USE Metrics Tracking</li>
                <li>- Chaos Engineering Tests</li>
                <li>- Automated Rollback Logic</li>
              </ul>
            </TiltCard>

            <TiltCard className="bg-zinc-950 p-12 space-y-6 group hover:bg-zinc-900 transition-all">
              <h3 className="text-2xl font-bold tracking-tighter">Data Strategy & Cost</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Choosing the right tool for the job: Cassandra for heavy writes, PostgreSQL for structured relational needs, and Redis for volatile low-latency data. Optimizing cloud spend through intelligent caching and workload containerization.
              </p>
              <ul className="text-[10px] font-mono text-cyan-500 space-y-1">
                <li>- Multi-region Replication</li>
                <li>- Semantic Caching Layers</li>
                <li>- FinOps Cost Optimization</li>
              </ul>
            </TiltCard>

          </div>

          <div className="mt-20">
            <ArchitectureDiagram />
          </div>
        </section>

        {/* ENGINEERING VALUES (FAANG FIT) */}
        <section className="py-32 px-6 md:px-24 bg-zinc-950">
          <h2 className="text-sm font-mono text-cyan-500 mb-16 uppercase tracking-[0.3em]">Engineering Values</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xl">Ownership & Bias for Action</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                I don't just write code; I own the lifecycle. From discovery and design to deployment and post-launch observability. I thrive in ambiguity and move fast to validate hypotheses while maintaining high quality bars.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xl">Data-Driven Decisions</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Architectural choices should be rooted in evidence. I utilize load testing (k6), profiling, and metrics to justify technology transitions or performance optimizations.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xl">Security & Privacy First</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                In a cloud-native world, security isn't an afterthought. I implement Zero Trust principles, rigorous IAM policies, and encryption at rest/transit by default.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xl">Customer Obsession</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Engineering exists to solve user problems. I work closely with product and design to ensure technical constraints never overshadow user experience.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE (STAR FORMAT) */}
        <section className="py-32 px-6 md:px-24 bg-zinc-900/10 border-t border-white/5">
          <h2 className="text-sm font-mono text-cyan-500 mb-16 uppercase tracking-[0.3em]">Professional Trajectory</h2>
          <div className="space-y-24">
            <div className="max-w-4xl">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Senior Product Engineer</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase">High-Growth Platform Team // Tech Corp</p>
                </div>
                <div className="text-zinc-600 font-mono text-xs uppercase font-bold tracking-widest">2023 - Present</div>
              </div>
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  <strong>Situation:</strong> Inherited a legacy payment gateway processing $2M+/day that suffered from frequent timeouts during peak sales events.
                </p>
                <p>
                  <strong>Task:</strong> Modernize the stack and implement a highly resilient, scalable transaction manager capable of 5x traffic spikes.
                </p>
                <p>
                  <strong>Action:</strong> Migrated monolithic service to Go microservices, implemented an idiosyncratic idempotent retry mechanism, and introduced distributed locking via Redis. Integrated OpenTelemetry for real-time bottleneck detection.
                </p>
                <p>
                  <strong>Result:</strong> Achieved 99.999% availability over 12 months. Reduced p99 latency from 800ms to 92ms, resulting in a 12% improvement in successful transaction conversion.
                </p>
              </div>
            </div>

            <div className="max-w-4xl">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Software Engineer II</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase">Compute & Storage Team // Cloud Infrastructure Startup</p>
                </div>
                <div className="text-zinc-600 font-mono text-xs uppercase font-bold tracking-widest">2020 - 2023</div>
              </div>
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  <strong>Situation:</strong> The startup's object storage service was experiencing metadata bottlenecks, limiting scale to 10PB and causing p99 spikes.
                </p>
                <p>
                  <strong>Task:</strong> Architect a distributed metadata layer capable of scaling to 100PB+ with constant-time lookups.
                </p>
                <p>
                  <strong>Action:</strong> Led the transition from a monolithic SQL store to a sharded Key-Value architecture (FoundationDB). Developed a tiered caching strategy using NVMe-based local caches and Redis.
                </p>
                <p>
                  <strong>Result:</strong> Sustained 100PB+ scale with zero downtime. Improved metadata retrieval throughput by 4x and reduced operational costs by 30% via resource consolidation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OPEN SOURCE & INNOVATION */}
        <section className="py-32 px-6 md:px-24 bg-zinc-950">
          <h2 className="text-sm font-mono text-cyan-500 mb-16 uppercase tracking-[0.3em]">Open Source & Research</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="glass-panel p-10 rounded-2xl border border-white/5 space-y-6">
              <h3 className="text-2xl font-bold">Kubernetes Upstream Contribution</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Contributed to the **SIG-Scheduling** group, optimizing the kube-scheduler's cache synchronization logic. My PR reduced memory overhead during high-churn pod deployments by **15%**.
              </p>
              <div className="flex gap-4">
                <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-1">GENERIC_SCHED_CACHE</span>
                <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-1">GOLANG</span>
              </div>
              <a href="#" className="inline-block pt-4 text-cyan-400 text-xs font-bold font-mono hover:text-cyan-300 transition-colors tracking-widest">VIEW_PR_ON_GITHUB // 0x4F2A</a>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Research & Certs</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "AWS Certified Solutions Architect", org: "Amazon Web Services", date: "2024" },
                  { title: "Google Professional Cloud Architect", org: "Google Cloud", date: "2023" },
                  { title: "Deep Learning Specialization", org: "DeepLearning.AI", date: "2023" }
                ].map((cert, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 border-l-2 border-cyan-500/50">
                    <div>
                      <div className="text-sm font-bold">{cert.title}</div>
                      <div className="text-[10px] text-zinc-500 uppercase">{cert.org}</div>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 md:px-24 bg-zinc-950 relative border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-mono text-cyan-500 uppercase tracking-[0.3em]">Direct Communication</h2>
              <h3 className="text-6xl font-bold tracking-tighter">LET'S BUILD THE <br /> <span className="text-cyan-500">NEXT DIMENSION.</span></h3>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                Available for technical consultations, system architecture reviews, and high-impact engineering leadership roles.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-zinc-400 font-mono text-sm group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500 transition-colors">
                    <Mail size={18} className="group-hover:text-cyan-400" />
                  </div>
                  engineer@example.com
                </div>
                <div className="flex items-center gap-4 text-zinc-400 font-mono text-sm group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500 transition-colors">
                    <MessageSquare size={18} className="group-hover:text-cyan-400" />
                  </div>
                  Available for worldwide remote ops
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* FOOTER & CTA */}
        <footer className="py-32 px-6 md:px-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
          {/* Subtle 3D Depth in Footer */}
          <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-30 pointer-events-none grayscale brightness-50">
            <iframe src="https://my.spline.design/interactive-rings-0.1-39656475fb128d5d4d3e/" className="w-full h-full border-none" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <TiltCard className="inline-block mb-12">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white">READY TO <span className="text-cyan-500">SCALE?</span></h2>
            </TiltCard>

            <p className="text-zinc-500 font-mono text-sm mb-12 uppercase tracking-widest max-w-2xl">currently reviewing opportunities for L5+ roles at Big Tech / Infrastructure Scale-ups.</p>

            <div className="flex justify-center gap-8 mb-20">
              <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500 hover:text-black transition-all group">
                <Github size={24} />
              </a>
              <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500 hover:text-black transition-all group">
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500 hover:text-black transition-all group">
                <Mail size={24} />
              </a>
            </div>

            <div className="flex flex-col items-center gap-6 pb-12 opacity-30 group hover:opacity-100 transition-opacity">
              <div className="text-[9px] font-mono tracking-[0.4em] uppercase">Built with the modern stack</div>
              <div className="flex gap-8 items-center grayscale hover:grayscale-0 transition-all">
                {["Next.js 15", "TypeScript", "TailwindCSS v4", "Framer Motion", "Spline", "Three.js"].map(tech => (
                  <span key={tech} className="text-[10px] font-mono">{tech}</span>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-zinc-700 font-mono tracking-[0.2em] uppercase">
              Abhishek Yadav // Product Engineering // {new Date().getFullYear()}
            </div>
          </div>
        </footer>

        {/* MODALS */}
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
    </>
  );
}
