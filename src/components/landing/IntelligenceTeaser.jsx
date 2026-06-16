import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, Map, Sparkles, Shield, Building2, Brain,
  ArrowRight, TrendingUp, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const MODULES = [
  { icon: BarChart3, label: 'Market Intelligence', desc: 'Live rent trends & demand data', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Map, label: 'Housing Heatmaps', desc: 'Student density visualization', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Sparkles, label: 'Maelon Scores™', desc: 'Proprietary area ratings', color: 'text-brass', bg: 'bg-brass/10' },
  { icon: Brain, label: 'AI Recommendations', desc: 'Hyper-personalised for you', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Building2, label: 'Landlord Analytics', desc: 'Occupancy & demand forecasts', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Shield, label: 'Trust Verification', desc: '5-layer identity system', color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

export default function IntelligenceTeaser() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brass/4 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass/10 border border-brass/20 text-brass text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" /> New · Maelon Living Intelligence™
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl font-light text-foreground"
          >
            The Student Housing
            <br />
            <span className="italic text-brass">Operating System</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg leading-relaxed"
          >
            Real-time market data, AI recommendations, trust verification, and predictive analytics — all in one platform.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12"
        >
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-card rounded-2xl border border-border p-5 hover:border-brass/30 hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${mod.bg} flex items-center justify-center mb-3`}>
                <mod.icon className={`w-5 h-5 ${mod.color}`} />
              </div>
              <p className="font-semibold text-foreground text-sm">{mod.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{mod.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-navy rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap justify-center sm:justify-start gap-8">
            {[
              { v: '15', l: 'Areas tracked live' },
              { v: '94%', l: 'Match accuracy' },
              { v: '2,500+', l: 'Active profiles' },
              { v: '5-layer', l: 'Trust verification' },
            ].map(s => (
              <div key={s.l} className="text-center sm:text-left">
                <p className="font-heading text-2xl text-brass">{s.v}</p>
                <p className="text-white/40 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
          <Link to="/intelligence" className="flex-shrink-0">
            <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full flex items-center gap-2 group">
              <BarChart3 className="w-4 h-4" />
              Open Intelligence Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}