import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Wifi, GraduationCap, DollarSign, Users, Bus,
  Sparkles, Star, Trophy, ChevronDown, ChevronUp
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SCORES = [
  {
    name: 'Madaraka',
    overall: 94,
    safety: 90, internet: 93, campus: 98, affordability: 96, social: 89, transport: 91,
    description: 'The undisputed student capital near Strathmore. Unbeatable campus access and affordability.',
    highlights: ['8 min to Strathmore', 'High student density', 'KES 12K avg rent', 'Great matatu links'],
    badge: '🏆 #1 Student Area',
  },
  {
    name: 'South B',
    overall: 88,
    safety: 75, internet: 80, campus: 85, affordability: 88, social: 87, transport: 84,
    description: 'Popular among Strathmore students. Good value for money with a vibrant social scene.',
    highlights: ['15 min to Strathmore', 'Active social life', 'KES 14K avg rent', 'Bustling market area'],
    badge: '🔥 Most Social',
  },
  {
    name: 'Kasarani',
    overall: 86,
    safety: 72, internet: 75, campus: 92, affordability: 91, social: 82, transport: 80,
    description: 'Premier choice for USIU-Africa students. Very affordable with direct campus access.',
    highlights: ['10 min to USIU', 'Budget-friendly', 'KES 10K avg rent', 'Growing rapidly'],
    badge: '📈 Fastest Growing',
  },
  {
    name: 'Kilimani',
    overall: 85,
    safety: 88, internet: 92, campus: 76, affordability: 62, social: 85, transport: 82,
    description: 'Premium neighbourhood with top-tier internet and safety. Best for well-funded students.',
    highlights: ['5 min to Strathmore', 'Best internet speeds', 'KES 22K avg rent', 'Premium cafes'],
    badge: '💎 Premium Living',
  },
  {
    name: 'Kahawa',
    overall: 83,
    safety: 70, internet: 70, campus: 95, affordability: 97, social: 78, transport: 76,
    description: 'Most affordable option near KU and JKUAT. Best campus access-to-cost ratio in Nairobi.',
    highlights: ['10 min to KU', 'Most affordable', 'KES 8.5K avg rent', 'Great for budget students'],
    badge: '💰 Best Value',
  },
  {
    name: 'Ruaka',
    overall: 81,
    safety: 74, internet: 78, campus: 82, affordability: 88, social: 83, transport: 78,
    description: 'Rapidly developing area popular with USIU students. Modern housing at affordable rates.',
    highlights: ['20 min to USIU', 'Modern apartments', 'KES 11K avg rent', 'New developments'],
    badge: '🚀 Up and Coming',
  },
  {
    name: 'Westlands',
    overall: 78,
    safety: 82, internet: 95, campus: 72, affordability: 45, social: 90, transport: 86,
    description: 'Upscale cosmopolitan area. Best for social life and professional growth, but pricier.',
    highlights: ['Best nightlife', 'Premium internet', 'KES 28K avg rent', 'Coffee shops'],
    badge: '🌟 Most Cosmopolitan',
  },
  {
    name: "Lang'ata",
    overall: 77,
    safety: 76, internet: 76, campus: 80, affordability: 84, social: 74, transport: 75,
    description: 'Quiet, residential area with good access to Strathmore and Nairobi West. Low-key lifestyle.',
    highlights: ['Near Strathmore', 'Quiet & residential', 'KES 13.5K avg rent', 'Low traffic'],
    badge: '🌿 Peaceful Living',
  },
];

const SCORE_FACTORS = [
  { key: 'safety', label: 'Safety', icon: Shield, color: '#10b981' },
  { key: 'internet', label: 'Internet', icon: Wifi, color: '#3b82f6' },
  { key: 'campus', label: 'Campus Access', icon: GraduationCap, color: '#8b5cf6' },
  { key: 'affordability', label: 'Affordability', icon: DollarSign, color: '#C5A059' },
  { key: 'social', label: 'Social Life', icon: Users, color: '#f59e0b' },
  { key: 'transport', label: 'Transport', icon: Bus, color: '#06b6d4' },
];

function ScoreDonut({ score, size = 120 }) {
  const r = size / 2 - 10;
  const circ = 2 * Math.PI * r;
  const color = score >= 90 ? '#10b981' : score >= 80 ? '#C5A059' : score >= 70 ? '#3b82f6' : '#94a3b8';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${(score / 100) * circ} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        initial={{ strokeDasharray: `0 ${circ}` }}
        animate={{ strokeDasharray: `${(score / 100) * circ} ${circ}` }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <text x={size/2} y={size/2 - 4} textAnchor="middle" fontSize="22" fontWeight="800" fill={color} fontFamily="Inter">{score}</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="Inter">/ 100</text>
    </svg>
  );
}

function AreaCard({ area, rank }) {
  const [expanded, setExpanded] = useState(false);
  const radarData = SCORE_FACTORS.map(f => ({ subject: f.label, value: area[f.key] }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.07 }}
      className={`bg-card rounded-2xl border overflow-hidden ${rank === 0 ? 'border-brass/30 shadow-lg' : 'border-border'}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground font-medium">#{rank + 1}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brass/10 text-brass border border-brass/20 font-medium">{area.badge}</span>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground">{area.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{area.description}</p>
          </div>
          <div className="flex-shrink-0">
            <ScoreDonut score={area.overall} size={80} />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {SCORE_FACTORS.map(f => (
            <div key={f.key} className="flex items-center gap-2">
              <f.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: f.color }} />
              <span className="text-xs text-muted-foreground w-24 flex-shrink-0">{f.label}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: f.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${area[f.key]}%` }}
                  transition={{ duration: 0.9, delay: rank * 0.05 + 0.2 }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground w-7 text-right">{area[f.key]}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-4 flex items-center gap-1.5 text-xs text-brass font-medium"
        >
          {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less detail</> : <><ChevronDown className="w-3.5 h-3.5" /> Radar chart & highlights</>}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <ResponsiveContainer width="100%" height={160}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                <Radar dataKey="value" stroke="#C5A059" fill="#C5A059" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground mb-2">Key Highlights</p>
              {area.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-brass flex-shrink-0" /> {h}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function MaelonScore() {
  const [filterMin, setFilterMin] = useState(0);

  const filtered = SCORES.filter(s => s.overall >= filterMin).sort((a, b) => b.overall - a.overall);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-navy rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-64 h-64 bg-brass/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-brass" />
              <span className="text-brass font-semibold text-sm uppercase tracking-widest">Maelon Score™</span>
            </div>
            <h2 className="font-heading text-3xl text-white font-light">
              Proprietary Area <span className="italic text-brass">Intelligence Rating</span>
            </h2>
            <p className="text-white/50 text-sm mt-2 max-w-lg">
              A composite score out of 100 measuring safety, internet quality, campus accessibility, affordability, social life, and transport for students.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10 flex-shrink-0">
            <Trophy className="w-8 h-8 text-brass" />
            <div>
              <p className="text-white font-heading text-2xl">Madaraka</p>
              <p className="text-brass text-sm font-semibold">#1 Score: 94/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">Show areas with score ≥</span>
        {[0, 70, 80, 85, 90].map(v => (
          <button
            key={v}
            onClick={() => setFilterMin(v)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filterMin === v ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground hover:border-brass/20'
            }`}
          >
            {v === 0 ? 'All' : `${v}+`}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} areas shown</span>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((area, i) => (
          <AreaCard key={area.name} area={area} rank={i} />
        ))}
      </div>
    </div>
  );
}