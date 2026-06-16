import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
{
  name: "Kemal Omolo",
  role: 'Student, Strathmore University',
  quote: "Maelon helped me find a safe, affordable room within walking distance of campus. The roommate matching was spot-on — my flatmate and I have become best friends!",
  rating: 5,
  avatar: 'MA',
  color: 'bg-brass'
},
{
  name: 'Peter Kamau',
  role: 'Property Investor',
  quote: "As an investor, I appreciate the transparency and data-driven approach. Maelon's market insights helped me make informed decisions on my Kilimani portfolio.",
  rating: 5,
  avatar: 'PK',
  color: 'bg-blue-500'
},
{
  name: 'Grace Njeri',
  role: 'Young Professional, Westlands',
  quote: "Moving to Nairobi was daunting until I found Maelon. From virtual tours to digital lease signing, everything was seamless. I was moved in within 2 days!",
  rating: 5,
  avatar: 'GN',
  color: 'bg-emerald-500'
}];


export default function Testimonials() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] sm:text-[300px] font-heading font-bold text-white/[0.02] select-none pointer-events-none">
        MAELON
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brass text-sm font-semibold tracking-widest uppercase">
            
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-light text-white mt-3">
            
            Trusted by <span className="italic text-brass">Thousands</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) =>
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-panel rounded-2xl p-8 relative group hover:border-brass/30 transition-all duration-400">
            
              <Quote className="w-8 h-8 text-brass/30 mb-4" />
              <p className="text-white/70 text-base leading-relaxed">{t.quote}</p>

              <div className="flex gap-1 mt-6">
                {Array(t.rating).fill(0).map((_, j) =>
              <Star key={j} className="w-4 h-4 text-brass fill-brass" />
              )}
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center`}>
                  <span className="text-white text-sm font-semibold">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}