'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Server, Database, Cloud, Zap, Cpu, Network, Shield, Binary } from 'lucide-react';
import { useState } from 'react';

export default function ArchitectureDiagram() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="relative w-full h-[600px] rounded-3xl overflow-hidden cursor-crosshair group/arch"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1500px" }}
        >
            {/* Background Depth */}
            <div className="absolute inset-0 bg-[#050507]">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* 3D Grid Floor */}
                <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] border-cyan-500/10 [transform:rotateX(75deg)_translateZ(-200px)] pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(to_right,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>

                <div className="relative z-10 flex gap-24 items-center scale-90 md:scale-100">

                    {/* Layer 1: Edge */}
                    <motion.div style={{ transform: "translateZ(100px)" }} className="flex flex-col items-center gap-6">
                        <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest opacity-40">L1: Ingress</div>
                        <div className="relative p-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] group-hover/arch:border-cyan-500/30 transition-colors">
                            <Cloud className="text-cyan-400" size={40} />
                            <div className="absolute -right-24 top-1/2 w-24 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent animate-pulse"></div>
                        </div>
                    </motion.div>

                    {/* Layer 2: Core */}
                    <motion.div style={{ transform: "translateZ(200px)" }} className="flex flex-col items-center gap-12">
                        <div className="text-[10px] font-mono text-purple-500 uppercase tracking-widest opacity-40">L2: Processing</div>
                        <div className="relative space-y-8">
                            <div className="p-8 bg-zinc-900/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]">
                                <Cpu className="text-purple-400" size={40} />
                                <div className="absolute -left-24 top-1/2 w-24 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent"></div>
                                <div className="absolute -right-24 top-1/2 w-24 h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent animate-pulse"></div>
                            </div>

                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/5 rounded-lg backdrop-blur-sm"
                            >
                                <Binary className="text-zinc-600" size={14} />
                                <span className="text-[9px] font-mono text-zinc-500 uppercase">Message_Bus_Active</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Layer 3: Persistence */}
                    <motion.div style={{ transform: "translateZ(150px)" }} className="flex flex-col items-center gap-6">
                        <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest opacity-40">L3: Persistence</div>
                        <div className="p-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)]">
                            <Database className="text-green-400" size={40} />
                            <div className="absolute -left-24 top-1/2 w-24 h-[1px] bg-gradient-to-l from-purple-500/50 to-transparent"></div>
                        </div>
                    </motion.div>

                </div>

                {/* Floating Bits */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-500/40 rounded-full"
                        animate={{
                            x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                            z: [Math.random() * 200, Math.random() * 200],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </motion.div>

            {/* Legend / Overlay */}
            <div className="absolute bottom-8 left-8 p-4 bg-black/40 border border-white/5 rounded-xl backdrop-blur-md z-30">
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={12} className="text-yellow-500" />
                    <span className="text-[10px] font-mono text-zinc-400">SYSTEM_HEAT_MAP: STABLE</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield size={12} className="text-cyan-500" />
                    <span className="text-[10px] font-mono text-zinc-400">ENCRYPTION_L5: ACTIVE</span>
                </div>
            </div>
        </div>
    );
}
