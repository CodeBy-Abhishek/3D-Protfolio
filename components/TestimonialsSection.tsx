'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Engineering Mentor',
    role: 'Full Stack Reviewer',
    text: 'Abhishek turns ambiguous AI ideas into working demos quickly, with a strong bias toward shipping and learning from real users.',
  },
  {
    name: 'Project Collaborator',
    role: 'AI Prototype Partner',
    text: 'His strongest skill is connecting backend APIs, retrieval logic, and frontend polish into one coherent product experience.',
  },
  {
    name: 'Internship Lead',
    role: 'Web Development Team',
    text: 'He communicates clearly, owns implementation details, and keeps improving the product until it is usable end to end.',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 md:px-24 relative section-scanline">
      <div className="relative z-10">
        <div className="mb-12 max-w-2xl">
          <div className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400">09 - Testimonials</div>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tighter text-white">Social Proof.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >
              <div className="mb-5 flex items-center justify-between">
                <Quote className="text-cyan-400" size={22} />
                <div className="flex gap-1 text-cyan-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-6 text-zinc-400">&quot;{testimonial.text}&quot;</p>
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="mt-1 text-xs font-mono text-zinc-500">{testimonial.role}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}