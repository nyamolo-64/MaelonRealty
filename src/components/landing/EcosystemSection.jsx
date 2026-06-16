import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RotateCcw, PiggyBank, Shield, ArrowRight, Play, Star, TrendingDown } from 'lucide-react';

const FEATURES = [
  {
    icon: RotateCcw,
    tag: 'New',
    title: 'Virtual Property Tours',
    subtitle: '360° immersive viewing',
    description: 'Explore every room with interactive 360° tours, floor plans, room measurements, and side-by-side property comparison — before you ever visit.',
    href: '/virtual-tours',
    color: 'from-blue-600 to-blue-800',
    accent: '#3b82f6',
    stat: '200+ properties',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    highlights: ['360° Room Tours', 'Interactive Floor Plans', 'Side-by-Side Compare', 'Room Measurements'],
  },
  {
    icon: PiggyBank,
    tag: 'Smart',
    title: 'Student Budget Planner',
    subtitle: 'AI-powered financial clarity',
    description: 'Calculate your real monthly living costs, get transport estimates by university, and receive personalised AI savings tips built for Nairobi students.',
    href: '/budget-planner',
    color: 'from-brass to-brass-dark',
    accent: '#C5A059',
    stat: 'Save up to KES 8K/mo',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    highlights: ['Cost Calculator', 'Transport Estimates', 'Affordability Score', 'AI Savings Tips'],
  },
  {
    icon: Shield,
    tag: 'Trusted',
    title: 'Property Reputation Network',
    subtitle: 'Real tenant reviews',
    description: 'Read verified tenant reviews on landlords, buildings, safety, WiFi quality, and maintenance — then make your decision with total confidence.',
    href: '/reputation',
    color: 'from-emerald-600 to-emerald-800',
    accent: '#10b981',
    stat: '1,200+ verified reviews',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
    highlights: ['Verified Tenant Reviews', 'Safety Reports', 'WiFi Ratings', 'Landlord Ratings'],
  },
];

export default function EcosystemSection() {
  return (
    <section className="py-24 bg-navy" id="ecosystem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brass/15 border border-brass/30 text-brass text-xs font-semibold rounded-full tracking-widest uppercase mb-4">
            Student Living Ecosystem
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-white leading-tight">
            Everything you need to<br />
            <span className="italic text-brass">choose confidently</span>
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">
            Africa's most complete student housing platform. Find, evaluate, budget, and move in — all in one place.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className={`lg:w-2/5 h-56 lg:h-auto relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 1 ? 'r' : 'l'} ${feature.color} opacity-60`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <feature.icon className="w-16 h-16 text-white/80" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 bg-white/10 backdrop-blur-sm">
                      {feature.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-navy-light p-7 lg:p-10 flex flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: feature.accent }}>
                    {feature.subtitle}
                  </p>
                  <h3 className="font-heading text-3xl text-white font-light mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-5">{feature.description}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {feature.highlights.map(h => (
                      <div key={h} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: feature.accent }} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Link to={feature.href}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all"
                        style={{ background: feature.accent, color: i === 1 ? '#0A1128' : '#fff' }}
                      >
                        Explore Feature <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                    <span className="text-white/40 text-sm">{feature.stat}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}