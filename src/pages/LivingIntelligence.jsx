import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, Map, TrendingUp, Brain, Shield, Home, Users,
  Sparkles, Building2, ChevronRight
} from 'lucide-react';
import MarketIntelligence from '@/components/intelligence/MarketIntelligence';
import MaelonScore from '@/components/intelligence/MaelonScore';
import TrustSystem from '@/components/intelligence/TrustSystem';
import LandlordDashboard from '@/components/intelligence/LandlordDashboard';
import HeatmapView from '@/components/intelligence/HeatmapView';
import SmartRecommendations from '@/components/intelligence/SmartRecommendations';

const TABS = [
  { id: 'market', label: 'Market Intelligence', icon: BarChart3, desc: 'Live housing trends' },
  { id: 'heatmap', label: 'Housing Heatmap', icon: Map, desc: 'Student density maps' },
  { id: 'scores', label: 'Maelon Scores', icon: Sparkles, desc: 'Area ratings' },
  { id: 'recommendations', label: 'For You', icon: Brain, desc: 'AI recommendations' },
  { id: 'landlord', label: 'Landlord Analytics', icon: Building2, desc: 'Property insights' },
  { id: 'trust', label: 'Trust & Verification', icon: Shield, desc: 'Verified profiles' },
];

export default function LivingIntelligence() {
  const [activeTab, setActiveTab] = useState('market');

  const ActiveComponent = {
    market: MarketIntelligence,
    heatmap: HeatmapView,
    scores: MaelonScore,
    recommendations: SmartRecommendations,
    landlord: LandlordDashboard,
    trust: TrustSystem,
  }[activeTab];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Nav */}
      <nav className="glass-panel-dark border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading text-lg font-semibold">M</span>
            </div>
            <span className="font-heading text-xl text-white hidden sm:block">Maelon<span className="text-brass">.</span></span>
          </Link>
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1.5 text-white/70 text-sm">
            <BarChart3 className="w-4 h-4 text-brass" />
            <span className="text-white font-medium">Living Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/living-match">
            <button className="text-xs px-4 py-2 rounded-full bg-brass/20 border border-brass/30 text-brass hover:bg-brass/30 transition-all font-medium">
              Find My Match
            </button>
          </Link>
          <Link to="/">
            <button className="text-xs px-4 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all">
              <Home className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-navy px-4 sm:px-6 py-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-brass/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(197,160,89,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass/15 border border-brass/30 text-brass text-xs font-semibold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Maelon Living Intelligence™
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-light text-white">
                The Student Housing<br />
                <span className="italic text-brass">Operating System</span>
              </h1>
              <p className="text-white/50 mt-3 text-sm max-w-lg leading-relaxed">
                Real-time market intelligence, predictive analytics, AI-powered recommendations, and trust verification — all in one platform.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { value: '2,500+', label: 'Profiles' },
                { value: '15', label: 'Areas tracked' },
                { value: '94%', label: 'Match accuracy' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-heading text-2xl text-brass">{s.value}</p>
                  <p className="text-white/40 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-card border-b border-border sticky top-[65px] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto hide-scrollbar py-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-brass/10 text-brass border border-brass/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
}