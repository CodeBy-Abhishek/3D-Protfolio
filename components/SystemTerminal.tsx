'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LOG_MESSAGES = [
    "INITIALIZING_CORE_SYSTEMS...",
    "ESTABLISHING_GRPC_CHANNELS...",
    "CONNECTING_PROMETHEUS_ADAPTERS...",
    "LOADING_VECTOR_EMBEDDINGS (FAISS)...",
    "DECODING_KAFKA_STREAMS...",
    "SYSTEM_HEALTH: OPTIMAL [0.999%]",
    "AUTHENTICATING_USER_0x4F2A...",
    "SYNCING_EDGE_REPLICAS...",
    "DETECTION: P99_LATENCY_SPIKE [RESOLVED]",
    "EXECUTING_CKPT_RESUME...",
    "HEARTBEAT_ACK from SHARD_04...",
    "ROTATING_JWT_SECRETS...",
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
        <div className="bg-black/80 backdrop-blur-xl border border-white/5 rounded-lg overflow-hidden font-mono text-[10px] shadow-2xl">
            <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-zinc-500 text-[9px] tracking-widest uppercase">System_Status_v2.0</div>
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
                        <span className="text-cyan-500 opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                        <span className={log.includes("OPTIMAL") ? "text-green-400" : "text-zinc-400"}>
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
