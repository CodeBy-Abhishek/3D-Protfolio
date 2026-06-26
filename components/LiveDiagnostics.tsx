'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Database, Cpu, RefreshCw } from 'lucide-react';
import { getSystemHealth } from '@/app/actions/system';

export default function LiveDiagnostics() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchHealth = async () => {
        setLoading(true);
        const health = await getSystemHealth();
        setData(health);
        setLoading(false);
    };

    useEffect(() => {
        fetchHealth();
        const interval = setInterval(fetchHealth, 10000); // Auto-refresh every 10s
        return () => clearInterval(interval);
    }, []);

    if (!data && loading) return <div className="animate-pulse text-zinc-500 font-mono text-[10px]">DIAGNOSTICS_PENDING...</div>;

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data?.status === 'HEALTHY' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Live_Backend_Telemetry</span>
                </div>
                <button
                    onClick={fetchHealth}
                    className={`text-zinc-500 hover:text-cyan-400 transition-colors ${loading ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 space-y-2" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Cpu size={12} />
                        <span className="text-[8px] font-mono uppercase">CPU_LOAD</span>
                    </div>
                    <div className="text-xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                        {data?.metrics?.cpu_load ? (data.metrics.cpu_load * 100).toFixed(1) : '--'}%
                    </div>
                </div>

                <div className="bg-white/5 p-3 rounded-lg border border-white/5 space-y-2" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Database size={12} />
                        <span className="text-[8px] font-mono uppercase">MEM_USAGE</span>
                    </div>
                    <div className="text-xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                        {data?.metrics?.memory_usage_mb || '--'}MB
                    </div>
                </div>
            </div>

            <div className="pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-zinc-600 uppercase tracking-tighter">System_Nodes</span>
                    <span className="text-cyan-500/80">{data?.system?.os} {data?.system?.release}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono mt-1">
                    <span className="text-zinc-600 uppercase tracking-tighter">Runtime_Env</span>
                    <span className="text-purple-500/80">Python {data?.system?.python_version}</span>
                </div>
            </div>

            <AnimatePresence>
                {data?.status === 'HEALTHY' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 flex items-center gap-2 justify-center"
                    >
                        <ShieldCheck className="text-green-500" size={12} />
                        <span className="text-[8px] font-mono text-green-400 uppercase font-bold">Protocols_Active // No_Issues_Detected</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
