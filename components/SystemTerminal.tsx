'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LOG_MESSAGES = [
    "CORE_SYSTEMS: ONLINE",
    "GRPC_GATEWAY: LISTENING",
    "METRICS_ADAPTER: CONNECTED",
    "LOADING_MODEL_REGISTRY...",
    "KAFKA_CONSUMERS: ACTIVE",
    "SYSTEM_HEALTH: 100%",
    "USER_SESSION: AUTHENTICATED",
    "DATA_REPLICATION: SYNCED",
    "LATENCY_CHECK: 12ms [OK]",
    "SERVICE_MESH: READY",
    "CLUSTER_STATE: HEALTHY",
    "SECURITY_POLICIES: ENFORCED",
];

export default function SystemTerminal() {
    const [logs, setLogs] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => [...prev.slice(-7), LOG_MESSAGES[index % LOG_MESSAGES.length]]);
            setIndex(i => i + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-lg overflow-hidden font-mono text-[10px] shadow-2xl">
            <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-zinc-500 text-[9px] tracking-widest uppercase">System Status</div>
            </div>
            <div
                ref={scrollRef}
                className="p-4 h-48 overflow-y-auto space-y-1 scrollbar-hide"
            >
                {logs.map((log, i) => (
                    <motion.div
                        key={`${index}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3"
                    >
                        <span className="text-cyan-600 dark:text-cyan-500 opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                        <span className={log.includes("OPTIMAL") ? "text-green-600 dark:text-green-400" : "text-zinc-600 dark:text-zinc-400"}>
                            {log}
                        </span>
                    </motion.div>
                ))}
                <div className="flex gap-2 text-cyan-500 animate-pulse">
                    <span>{'>'}</span>
                    <span className="w-2 h-4 bg-cyan-500/50"></span>
                </div>
            </div>
        </div>
    );
}
