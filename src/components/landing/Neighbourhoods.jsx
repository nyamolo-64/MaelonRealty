import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, ArrowRight } from 'lucide-react';

const KILIMANI = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/52d844b99_generated_7840f324.png';
const KAREN = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/d0294d997_generated_f3858d74.png';
const SKYLINE = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/6ee7714f9_generated_9f9514df.png';
const COLIVING = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/da27e562c_generated_a5acfccf.png';

const neighborhoods = [
  {
    name: 'Kilimani',
    image: KILIMANI,
    avgRent: 'KES 45-120K',
    studentDensity: 'Medium',
    safety: '4.5/5',
    highlight: 'Vibrant nightlife & dining',
  },
  {
    name: 'Westlands',
    image: SKYLINE,
    avgRent: 'KES 50-150K',
    studentDensity: 'High',
    safety: '4.3/5',
    highlight: 'CBD proximity & business hub',
  },
  {
    name: 'Karen',
    image: KAREN,
    avgRent: 'KES 80-250K',
    studentDensity: 'Low',
    safety: '4.8/5',
    highlight: 'Serene suburban living',
  },
  {
    name: 'Madaraka',
    image: COLIVING,
    avgRent: 'KES 12-30K',
    studentDensity: 'Very High',
    safety: '4.0/5',
    highlight: 'Student hub near Strathmore',
  },
];

export default function Neighborhoods() {
  return (
    <section id="neighborhoods" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brass text-sm font-semibold tracking-widest uppercase"
          >
            Explore Nairobi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mt-3"
          >
            Discover <span className="italic text-brass">Neighborhoods</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg leading-relaxed"
          >
            Real data on Nairobi's most sought-after neighborhoods.
            Find where your lifestyle fits best.
          </motion.p>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 snap-x snap-mandatory">
          {neighborhoods.map((hood, i) => (
            <motion.div
              key={hood.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl overflow-hidden snap-center cursor-pointer"
            >
              <div className="relative h-[480px]">
                <img
                  src={hood.image}
                  alt={hood.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

                {/* Name Overlay */}
                <div className="absolute top-8 left-6 right-6">
                  <h3 className="font-heading text-5xl font-light text-white/90">{hood.name}</h3>
                  <p className="text-white/50 text-sm mt-2">{hood.highlight}</p>
                </div>

                {/* Data Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="glass-panel rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-brass" /> Avg Rent
                      </span>
                      <span className="text-white font-semibold text-sm">{hood.avgRent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-brass" /> Student Density
                      </span>
                      <span className="text-white font-semibold text-sm">{hood.studentDensity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brass" /> Safety Rating
                      </span>
                      <span className="text-white font-semibold text-sm">{hood.safety}</span>
                    </div>
                  </div>
                  <button className="w-full glass-panel rounded-xl py-3 text-white/80 text-sm font-medium flex items-center justify-center gap-2 group-hover:text-brass transition-colors">
                    Explore {hood.name}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}