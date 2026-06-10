'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'CTO',
    company: 'TechStartup India',
    text: 'Abhishek built a sophisticated RAG system that transformed our document processing pipeline. His understanding of AI architectures is exceptional.',
    rating: 5,
    image: '🚀',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Tech Lead',
    company: 'AI Solutions Inc',
    text: 'Working with Abhishek on the MCP-powered system was a game-changer. His code is production-ready and well-architected.',
    rating: 5,
    image: '⭐',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Engineering Manager',
    company: 'Cloud Systems Ltd',
    text: 'Abhishek demonstrates rare maturity for a fresh graduate. His internships clearly equipped him with real-world problem-solving skills.',
    rating: 5,
    image: '💡',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function stagger(delay = 0.08) {
  return { show: { transition: { staggerChildren: delay } } };
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[110px] bg-violet-500/[0.04] pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-cyan-500/20 rounded-md bg-cyan-500/[0.06]">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-[10px] font-black tracking-[0.35em] uppercase">
              // Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter text-white">
            What People Say
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger(0.12)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              className="rounded-2xl border p-6 sm:p-8 hover:border-cyan-500/50 transition-all duration-300 group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>

              <p
                className="text-base mb-6 leading-relaxed italic"
                style={{ color: 'var(--text-secondary)' }}
              >
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-white/[0.05]">
                <div className="text-3xl">{testimonial.image}</div>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {testimonial.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {testimonial.role} at <span className="text-cyan-400/70">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 mb-4">
            Want to work together? Let's connect!
          </p>
          <a
            href="mailto:abhishek977266@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--accent-cyan)',
              color: '#050507',
              boxShadow: '0 0 40px rgba(34,211,238,0.3)',
            }}
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
