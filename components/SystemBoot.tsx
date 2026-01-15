'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const bootLogs = [
        "INITIALIZING_KERNEL_0x8F2...",
        "MOUNTING_DISTRIBUTED_SHARDS...",
        "ESTABLISHING_GRPC_HANDSHAKE...",
        "LOADING_NEURAL_WEIGHTS...",
        "DECRYPTING_RESUME_METRICS...",
        "SYSTEM_STABILITY: 99.999% [CONFIRMED]",
        "INTERFACE_READY // WELCOME_USER",
    ];

    useEffect(() => {
        let currentLog = 0;
        const interval = setInterval(() => {
            if (currentLog < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[currentLog]]);
                currentLog++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 1000);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-zinc-950 flex flex-col items-center justify-center p-6"
        >
            <div className="w-full max-w-sm space-y-2 font-mono text-[10px]">
                <div className="flex justify-between text-zinc-600 mb-8">
                    <span>BOOT_SEQUENCE_v4.0.1</span>
                    <span>0x{Math.random().toString(16).substr(2, 6).toUpperCase()}</span>
                </div>

                <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex gap-3 ${i === bootLogs.length - 1 ? 'text-cyan-400 font-bold' : 'text-zinc-500'}`}
                        >
                            <span className="opacity-30">[{i.toString().padStart(2, '0')}]</span>
                            <span>{log}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <div className="pt-8 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-zinc-900 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: bootLogs.length * 0.3 }}
                            className="h-full bg-cyan-500"
                        ></motion.div>
                    </div>
                    <span className="text-cyan-500 text-[8px] animate-pulse">SYNCHRONIZING...</span>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <div className="text-[9px] font-mono text-zinc-800 tracking-[0.4em] uppercase">
                    Abhishek Yadav // Product Engineering
                </div>
            </div>
        </motion.div>
    );
}
