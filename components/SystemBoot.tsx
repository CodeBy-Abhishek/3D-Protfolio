'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const bootLogs = [
        "INITIALIZING_RUNTIME_ENVIRONMENT...",
        "LOADING_APPLICATION_MODULES...",
        "HYDRATING_STATE_MANAGER...",
        "PREPARING_ASSETS...",
        "VERIFYING_INTEGRITY...",
        "SYSTEM_READY [OK]",
        "WELCOME_USER",
    ];

    const [randomId, setRandomId] = useState("");

    useEffect(() => {
        setRandomId(Math.random().toString(16).substr(2, 6).toUpperCase());
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
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6"
            style={{ backgroundColor: 'var(--page-bg)' }}
        >
            <div className="w-full max-w-sm space-y-2 font-mono text-[10px]">
                <div className="flex justify-between mb-8" style={{ color: 'var(--text-muted)' }}>
                    <span>BOOT_SEQUENCE_v4.0.1</span>
                    <span>0x{randomId || '000000'}</span>
                </div>

                <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex gap-3 ${i === bootLogs.length - 1 ? 'font-bold' : ''}`}
                            style={{ color: i === bootLogs.length - 1 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}
                        >
                            <span className="opacity-30">[{i.toString().padStart(2, '0')}]</span>
                            <span>{log}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <div className="pt-8 flex items-center gap-4">
                    <div className="h-[1px] flex-1 overflow-hidden" style={{ backgroundColor: 'var(--card-border)' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: bootLogs.length * 0.3 }}
                            className="h-full"
                            style={{ backgroundColor: 'var(--accent-cyan)' }}
                        ></motion.div>
                    </div>
                    <span className="text-[8px] animate-pulse" style={{ color: 'var(--accent-cyan)' }}>SYNCHRONIZING...</span>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <div className="text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                    Abhishek Yadav // Product Engineering
                </div>
            </div>
        </motion.div>
    );
}
