import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain, Shield, MapPin, Star, TrendingUp, Users, CreditCard,
  Building2, BarChart3, Zap, ArrowRight, ChevronRight, Sparkles,
  Globe, Lock, Award, Home
} from 'lucide-react';

const OS_MODULES = [
  { id: 'concierge', icon: Brain, label: 'AI Concierge', color: '#C5A059', href: '/ai-concierge', desc: 'Your personal housing AI' },
  { id: 'readiness', icon: Shield, label: 'Move-In Score™', color: '#10b981', href: '/move-in-score', desc: 'Property readiness index' },
  { id: 'commute', icon: MapPin, label: 'Commute Intel', color: '#3b82f6', href: '/commute-intelligence', desc: 'Live travel analysis' },
  { id: 'lifeindex', icon: Star, label: 'Student Life Index™', color: '#f59e0b', href: '/student-life-index', desc: 'Neighborhood rankings' },
  { id: 'prediction', icon: TrendingUp, label: 'Rent Forecast', color: '#8b5cf6', href: '/housing-prediction', desc: 'AI price predictions' },
  { id: 'chemistry', icon: Users, label: 'Roommate Chemistry', color: '#ec4899', href: '/roommate-chemistry', desc: 'Deep compatibility AI' },
  { id: 'passport', icon: CreditCard, label: 'Tenant Passport™', color: '#06b6d4', href: '/tenant-passport', desc: 'Your digital housing ID' },
  { id: 'marketplace', icon: Building2, label: 'Smart Marketplace', color: '#84cc16', href: '/smart-marketplace', desc: 'AI-powered listings' },
  { id: 'campus', icon: BarChart3, label: 'Campus Dashboard', color: '#f97316', href: '/campus-intelligence', desc: 'University analytics' },
  { id: 'network', icon: Zap, label: 'Network Layer', color: '#a855f7', href: '/maelon-network', desc: 'Rewards & community' },
];

export default function MaelonOS() {
  const [hoveredModule, setHoveredModule] = useState(null);

  return (
    <div className="min-h-screen bg-navy overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brass/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-bold">M</span>
          </div>
          <div>
            <span className="font-heading text-xl text-white">Maelon</span>
            <span className="text-brass font-heading text-xl"> OS™</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All Systems Live
          </span>
          <Link to="/">
            <button className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 text-center px-6 pt-16 pb-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brass/10 border border-brass/20 rounded-full text-brass text-xs font-semibold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" /> The Future of Housing in Africa
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl font-light text-white leading-tight">
            Maelon <span className="italic text-brass">OS™</span>
          </h1>
          <p className="text-white/50 text-lg sm:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
            The AI-powered housing operating system for students, tenants, landlords, and investors across Africa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/40">
            {['10 AI Systems', 'Real-time Intelligence', 'Nairobi-first', 'Mobile-native'].map(s => (
              <span key={s} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brass" />{s}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* OS Module Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {OS_MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link to={mod.href}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredModule(mod.id)}
                  onHoverEnd={() => setHoveredModule(null)}
                  className="relative group rounded-2xl border border-white/8 p-5 cursor-pointer transition-all duration-300 overflow-hidden"
                  style={{
                    background: hoveredModule === mod.id
                      ? `linear-gradient(135deg, ${mod.color}15, ${mod.color}08)`
                      : 'rgba(255,255,255,0.03)',
                    borderColor: hoveredModule === mod.id ? `${mod.color}40` : 'rgba(255,255,255,0.08)'
                  }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${mod.color}10, transparent 70%)` }} />

                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl mb-3 flex items-center justify-center"
                      style={{ background: `${mod.color}20` }}>
                      <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                    </div>
                    <p className="text-white font-semibold text-sm leading-tight">{mod.label}</p>
                    <p className="text-white/40 text-xs mt-1 leading-tight">{mod.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: mod.color }}>
                      Open <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: 'AI Models Active', value: '10', icon: Brain },
            { label: 'Properties Indexed', value: '2,400+', icon: Building2 },
            { label: 'Students Served', value: '18,000+', icon: Users },
            { label: 'Avg. Match Score', value: '91%', icon: Sparkles },
          ].map((stat, i) => (
            <div key={stat.label} className="glass-panel rounded-2xl p-5 text-center">
              <stat.icon className="w-5 h-5 text-brass mx-auto mb-2" />
              <p className="font-heading text-2xl text-white font-light">{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}