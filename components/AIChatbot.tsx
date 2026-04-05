'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Abhishek's personal AI assistant. Based on his portfolio, I can answer questions about his skills, projects, and 11 Anthropic certifications. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: errorData?.reply || 'Sorry, there was an error processing your request.'
        }]);
        return;
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to my primary core. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[420px] sm:h-[500px] max-h-[75vh] border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-white/[0.02]" style={{ borderColor: 'var(--card-border)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border" style={{ borderColor: 'var(--accent-cyan)33' }}>
                    <Bot size={16} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>Abhishek.AI</h3>
                    <p className="text-[10px] font-mono flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Groq LPU Engine Active
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-1 border`} 
                      style={{ 
                        backgroundColor: msg.role === 'user' ? 'var(--input-bg)' : 'transparent',
                        borderColor: msg.role === 'user' ? 'var(--card-border)' : 'var(--accent-cyan)33',
                        color: msg.role === 'user' ? 'var(--text-muted)' : 'var(--accent-cyan)'
                      }}>
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`text-sm leading-relaxed ${msg.role === 'user' ? 'px-4 py-2.5 rounded-2xl rounded-tr-sm border' : ''}`}
                      style={{ 
                        backgroundColor: msg.role === 'user' ? 'var(--input-bg)' : 'transparent',
                        borderColor: msg.role === 'user' ? 'var(--card-border)' : 'transparent',
                        color: msg.role === 'user' ? 'var(--text-primary)' : 'var(--text-secondary)'
                      }}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-1 border" style={{ backgroundColor: 'transparent', borderColor: 'var(--accent-cyan)33', color: 'var(--accent-cyan)' }}>
                      <Loader2 size={12} className="animate-spin" />
                    </div>
                    <div className="text-sm italic mt-1 font-mono text-[10px] tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      THINKING...
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-3 border-t bg-white/[0.01]" style={{ borderColor: 'var(--card-border)' }}>
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my experience..."
                    className="w-full border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none transition-all font-mono"
                    style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors"
                    style={{ backgroundColor: 'var(--accent-cyan)1a', color: 'var(--accent-cyan)' }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full shadow-[0_0_40px_rgba(34,211,238,0.3)] border border-cyan-300 flex items-center justify-center transition-colors group relative"
            >
              <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
              <MessageSquare size={24} className="relative z-10" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--card-border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent-cyan)33;
        }
      `}</style>
    </>
  );
}
