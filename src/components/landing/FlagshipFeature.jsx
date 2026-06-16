import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, MapPin, DollarSign, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Users, label: 'Roommate Matching', desc: 'AI compatibility scores' },
  { icon: DollarSign, label: 'Budget Analysis', desc: 'Rent split calculator' },
  { icon: MapPin, label: 'Campus Proximity', desc: 'Real commute times' },
  { icon: Brain, label: 'Lifestyle Score', desc: 'Deep compatibility' },
];

const whys = [
  'Similar sleep schedules',
  'Same university',
  'Budget overlap',
  'Shared interests',
  'Compatible cleanliness',
  'Location preferences',
];

export default function FlagshipFeature() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brass/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass/15 border border-brass/30 text-brass text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" /> Flagship AI Feature
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl font-light text-white leading-tight"
            >
              Find Your Perfect
              <br />
              <span className="italic text-brass">Living Match</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 mt-5 text-lg leading-relaxed max-w-lg"
            >
              One intelligent search combines roommate compatibility, property listings, budget analysis,
              and campus proximity to give you your perfect living situation — uniquely tailored to you.
            </motion.p>

            {/* Features grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 gap-3 mt-8"
            >
              {features.map((f, i) => (
                <div key={f.label} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brass/30 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-brass/20 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-brass" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{f.label}</p>
                    <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8"
            >
              <Link to="/living-match">
                <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-10 py-4 rounded-full text-base flex items-center gap-3 group">
                  <Sparkles className="w-5 h-5" />
                  Find My Perfect Match
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-white/30 text-xs mt-3">Takes 2 minutes · No sign-up required to explore</p>
            </motion.div>
          </div>

          {/* Right — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            {/* Mock dashboard card */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest">AI Match Report</p>
                  <p className="text-white font-heading text-xl mt-0.5">Strathmore · KES 15–22K</p>
                </div>
                <div className="relative w-16 h-16">
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="rgba(197,160,89,0.1)" stroke="rgba(197,160,89,0.2)" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="26" fill="none"
                      stroke="#C5A059" strokeWidth="4"
                      strokeDasharray="130 163"
                      strokeLinecap="round"
                      transform="rotate(-90 32 32)"
                    />
                    <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="700" fill="#C5A059" fontFamily="Inter">87%</text>
                  </svg>
                </div>
              </div>

              {/* Score bars */}
              <div className="space-y-2.5">
                {[
                  { label: 'Roommate Compat.', score: 92, color: 'bg-emerald-400' },
                  { label: 'Budget Match', score: 88, color: 'bg-blue-400' },
                  { label: 'Lifestyle Score', score: 85, color: 'bg-purple-400' },
                  { label: 'Campus Access', score: 94, color: 'bg-brass' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs text-white/50 w-28 flex-shrink-0">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                      />
                    </div>
                    <span className="text-xs text-white/70 font-semibold w-8 text-right">{item.score}%</span>
                  </div>
                ))}
              </div>

              {/* Why This Match */}
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-brass font-semibold mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Why This Match?
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {whys.map((w) => (
                    <div key={w} className="flex items-center gap-1.5 text-xs text-white/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" /> {w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Property */}
              <div className="flex items-center gap-3 bg-brass/10 border border-brass/20 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-brass/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brass" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">2BR in Madaraka</p>
                  <p className="text-white/50 text-xs">KES 7,500/person · 8 min to campus</p>
                </div>
                <span className="ml-auto text-xs text-emerald-400 font-medium">Best Value</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-brass text-navy px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              AI-Powered ✦
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}