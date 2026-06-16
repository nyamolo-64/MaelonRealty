import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Wifi, Droplets, Lock, Bus, GraduationCap, Building2, Star, ChevronDown, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const SCORE_FACTORS = [
  { key: 'internet', label: 'Internet Reliability', icon: Wifi, weight: 15, color: '#8b5cf6' },
  { key: 'water', label: 'Water Availability', icon: Droplets, weight: 15, color: '#3b82f6' },
  { key: 'security', label: 'Security', icon: Lock, weight: 20, color: '#10b981' },
  { key: 'transport', label: 'Transport Access', icon: Bus, weight: 15, color: '#f59e0b' },
  { key: 'campus', label: 'Campus Proximity', icon: GraduationCap, weight: 15, color: '#ec4899' },
  { key: 'building', label: 'Building Condition', icon: Building2, weight: 10, color: '#C5A059' },
  { key: 'reviews', label: 'Tenant Reviews', icon: Star, weight: 10, color: '#f97316' },
];

const MOCK_PROPERTIES = [
  {
    id: 1, title: 'Kilimani Heights — Block A', area: 'Kilimani', rent: 28000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    scores: { internet: 90, water: 85, security: 95, transport: 80, campus: 70, building: 90, reviews: 88 },
    notes: {
      internet: 'Fibre available, 40Mbps avg speed',
      water: 'Borehole backup — rare outages',
      security: '24hr guard + CCTV on all floors',
      transport: '3 matatu routes within 200m',
      campus: '20 min to Strathmore, 35 to UoN',
      building: 'Built 2019, well maintained',
      reviews: '4.8/5 from 34 tenants'
    }
  },
  {
    id: 2, title: 'Westlands Studio Complex', area: 'Westlands', rent: 18000,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=80',
    scores: { internet: 95, water: 70, security: 88, transport: 92, campus: 65, building: 82, reviews: 80 },
    notes: {
      internet: 'Best fibre in Westlands — 80Mbps',
      water: 'Council water — occasional 6hr outages',
      security: 'Electric fence + day guard only',
      transport: 'Major hub — 10+ matatu routes',
      campus: '30 min to UoN, 45 to Strathmore',
      building: 'Built 2017 — minor wear on exterior',
      reviews: '4.1/5 from 22 tenants'
    }
  },
  {
    id: 3, title: 'South B Family Flats', area: 'South B', rent: 13000,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    scores: { internet: 60, water: 88, security: 72, transport: 85, campus: 78, building: 68, reviews: 62 },
    notes: {
      internet: 'Safaricom Home Fibre — occasional drops',
      water: '24hr borehole + rooftop storage',
      security: 'Night guard, no CCTV',
      transport: 'Good matatu access to CBD',
      campus: '20 min to Strathmore',
      building: 'Built 2010 — needs repainting',
      reviews: '3.8/5 from 24 tenants'
    }
  },
];

function getScoreColor(score) {
  if (score >= 85) return '#10b981';
  if (score >= 70) return '#C5A059';
  if (score >= 55) return '#f59e0b';
  return '#ef4444';
}

function getScoreLabel(score) {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Fair';
  return 'Poor';
}

function ScoreRing({ score, size = 100 }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const color = getScoreColor(score);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={`${(score/100)*circ} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${(score/100)*circ} ${circ}` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <text x={size/2} y={size/2+1} textAnchor="middle" fontSize={size*0.18} fontWeight="700" fill={color} fontFamily="Inter">{score}</text>
        <text x={size/2} y={size/2+size*0.15} textAnchor="middle" fontSize={size*0.09} fill="rgba(255,255,255,0.4)" fontFamily="Inter">/ 100</text>
      </svg>
    </div>
  );
}

function computeTotal(scores) {
  return Math.round(
    SCORE_FACTORS.reduce((sum, f) => sum + (scores[f.key] / 100) * f.weight, 0)
  );
}

export default function MoveInScore() {
  const [selected, setSelected] = useState(MOCK_PROPERTIES[0]);
  const [expanded, setExpanded] = useState(null);
  const total = computeTotal(selected.scores);

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-emerald-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Move-In Readiness Score™</p>
          <p className="text-white/40 text-xs">Property quality index</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Property selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {MOCK_PROPERTIES.map(p => (
            <motion.button key={p.id} whileHover={{ scale: 1.02 }} onClick={() => setSelected(p)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all text-left ${selected.id === p.id ? 'border-brass' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="h-28 relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-2 right-2">
                  <ScoreRing score={computeTotal(p.scores)} size={52} />
                </div>
                <div className="absolute bottom-2 left-2">
                  <p className="text-white text-xs font-semibold">{p.title}</p>
                  <p className="text-white/60 text-xs">KES {(p.rent/1000).toFixed(0)}K/mo</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main Score Display */}
        <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="text-center">
              <ScoreRing score={total} size={140} />
              <p className="text-white font-bold mt-2" style={{ color: getScoreColor(total) }}>{getScoreLabel(total)}</p>
              <p className="text-white/40 text-xs">Move-In Score™</p>
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-2xl text-white font-light">{selected.title}</h2>
              <p className="text-white/50 text-sm mt-1 mb-5">{selected.area} · KES {selected.rent.toLocaleString()}/month</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SCORE_FACTORS.map(factor => {
                  const score = selected.scores[factor.key];
                  return (
                    <div key={factor.key} className="bg-white/4 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <factor.icon className="w-3.5 h-3.5" style={{ color: factor.color }} />
                        <span className="text-white/60 text-xs">{factor.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden mr-2">
                          <motion.div className="h-full rounded-full" style={{ background: factor.color }}
                            initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8 }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: factor.color }}>{score}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Factor Detail Cards */}
        <div className="space-y-3">
          <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Detailed Breakdown</h3>
          {SCORE_FACTORS.map((factor, i) => {
            const score = selected.scores[factor.key];
            const isExpanded = expanded === factor.key;
            const statusIcon = score >= 80 ? CheckCircle2 : score >= 60 ? AlertTriangle : XCircle;
            const statusColor = score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400';
            return (
              <motion.div key={factor.key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-panel rounded-2xl overflow-hidden cursor-pointer" onClick={() => setExpanded(isExpanded ? null : factor.key)}>
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${factor.color}20` }}>
                    <factor.icon className="w-5 h-5" style={{ color: factor.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-white text-sm font-medium">{factor.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: getScoreColor(score) }}>{score}/100</span>
                        <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: factor.color }}
                        initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} />
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 border-t border-white/8 pt-3 flex items-start gap-3">
                        {React.createElement(statusIcon, { className: `w-4 h-4 flex-shrink-0 mt-0.5 ${statusColor}` })}
                        <p className="text-white/60 text-sm">{selected.notes[factor.key]}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}