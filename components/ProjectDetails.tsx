'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronRight, Terminal } from 'lucide-react';

interface ProjectDetailsProps {
    project: {
        title: string;
        category: string;
        problem: string;
        solution: string;
        metrics: string[];
        tech: string[];
        details: {
            title: string;
            content: string;
        }[];
    } | null;
    onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-10 p-6 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center">
                        <div>
                            <div className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-1">{project.category}</div>
                            <h3 className="text-2xl font-bold tracking-tighter">{project.title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors"
                        >
                            <X size={24} className="text-zinc-500 hover:text-red-500 dark:hover:text-white" />
                        </button>
                    </div>

                    <div className="p-8 space-y-12">
                        {/* Summary Grid */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-sm font-mono text-zinc-900 dark:text-white uppercase tracking-widest border-l-2 border-cyan-600 dark:border-cyan-500 pl-4">Problem Context</h4>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.problem}</p>

                                <h4 className="text-sm font-mono text-zinc-900 dark:text-white uppercase tracking-widest border-l-2 border-cyan-600 dark:border-cyan-500 pl-4">Solution Architecture</h4>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.solution}</p>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-zinc-50 dark:bg-white/5 rounded-xl p-6 border border-zinc-200 dark:border-white/5">
                                    <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Core Tech</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-mono text-[10px]">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Key Metrics</h4>
                                    <ul className="space-y-2">
                                        {project.metrics.map((m, i) => (
                                            <li key={i} className="flex gap-3 items-start text-xs text-zinc-600 dark:text-zinc-400 italic">
                                                <ChevronRight size={14} className="text-cyan-600 dark:text-cyan-500 mt-0.5" />
                                                <span>{m}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Implementation Details */}
                        <div className="space-y-8">
                            <h4 className="text-xl font-bold tracking-tighter flex items-center gap-3">
                                <Terminal size={20} className="text-cyan-500" /> SYSTEM ARCHITECTURE
                            </h4>
                            <div className="grid gap-6">
                                {project.details.map((d, i) => (
                                    <div key={i} className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-white/5 hover:border-cyan-500/30 transition-colors">
                                        <div className="text-xs font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wide">{d.title}</div>
                                        <p className="text-zinc-600 dark:text-zinc-500 text-xs leading-relaxed">{d.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex gap-6">
                            <button className="flex items-center gap-2 text-white font-bold text-xs tracking-widest bg-cyan-600 dark:bg-cyan-500 px-6 py-3 hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all uppercase text-black">
                                <Github size={16} /> Source Code
                            </button>
                            <button className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-bold text-xs tracking-widest border border-zinc-300 dark:border-white/10 px-6 py-3 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all uppercase">
                                <ExternalLink size={16} /> View Deployment
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
