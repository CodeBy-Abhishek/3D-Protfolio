'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Send size={120} />
            </div>

            <h3 className="text-3xl font-bold mb-8 tracking-tighter">INITIATE_CONTACT</h3>

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-12 flex flex-col items-center text-center space-y-4"
                    >
                        <CheckCircle2 className="text-cyan-500" size={64} />
                        <h4 className="text-xl font-bold">MESSAGE_DELIVERED</h4>
                        <p className="text-zinc-500 font-mono text-sm max-w-xs">Transmission successful. Expect a response within 24 standard cycles.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest pt-4"
                        >
                            Send Another Message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Target_Email</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                                placeholder="engineer@provider.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Transmission_Payload</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                placeholder="Describe the mission parameters..."
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
                                <AlertCircle size={14} /> CONNECTION_FAILED: Retrying...
                            </div>
                        )}

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className="w-full bg-cyan-500 text-black font-black text-sm tracking-widest py-4 rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} /> ENCRYPTING...
                                </>
                            ) : (
                                <>
                                    DISPATCH_MESSAGE <Send size={18} />
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
