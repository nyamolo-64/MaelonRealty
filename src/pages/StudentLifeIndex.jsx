import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Moon, Utensils, BookOpen, Wifi, ShoppingBag, Bus, Trophy, ChevronRight } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const DIMENSIONS = [
  { key: 'safety', label: 'Safety', icon: Shield, color: '#10b981' },
  { key: 'nightlife', label: 'Nightlife', icon: Moon, color: '#8b5cf6' },
  { key: 'food', label: 'Food Access', icon: Utensils, color: '#f97316' },
  { key: 'study', label: 'Study Spaces', icon: BookOpen, color: '#3b82f6' },
  { key: 'internet', label: 'Internet', icon: Wifi, color: '#a855f7' },
  { key: 'laundry', label: 'Laundry', icon: ShoppingBag, color: '#ec4899' },
  { key: 'transport', label: 'Transport', icon: Bus, color: '#f59e0b' },
];

const NEIGHBORHOODS = [
  {
    name: 'Kilimani', rank: 1,
    scores: { safety: 90, nightlife: 88, food: 92, study: 85, internet: 88, laundry: 80, transport: 82 },
    highlights: ['Java House nearby', 'Safe streets', 'Excellent cafes', 'Gym access'],
    vibe: 'Premium student hub',
    rentRange: 'KES 20K–50K',
    image: 'https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?w=400&q=80',
  },
  {
    name: 'Westlands', rank: 2,
    scores: { safety: 82, nightlife: 95, food: 94, study: 80, internet: 95, laundry: 78, transport: 92 },
    highlights: ['Best nightlife', 'Most restaurants', 'Great internet', 'Matatu hub'],
    vibe: 'Social & connected',
    rentRange: 'KES 18K–45K',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80',
  },
  {
    name: 'South B', rank: 3,
    scores: { safety: 75, nightlife: 55, food: 80, study: 78, internet: 65, laundry: 88, transport: 85 },
    highlights: ['Affordable food', 'Good matatus', 'Quiet evenings', 'Near Strathmore'],
    vibe: 'Affordable & practical',
    rentRange: 'KES 10K–22K',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
  },
  {
    name: 'Kasarani', rank: 4,
    scores: { safety: 72, nightlife: 60, food: 72, study: 70, internet: 70, laundry: 75, transport: 80 },
    highlights: ['Near USIU & KU', 'Budget-friendly', 'Growing area'],
    vibe: 'Budget student zone',
    rentRange: 'KES 8K–18K',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
  },
  {
    name: 'Madaraka', rank: 5,
    scores: { safety: 78, nightlife: 50, food: 75, study: 82, internet: 72, laundry: 80, transport: 82 },
    highlights: ['Closest to Strathmore', 'Quiet', 'Good libraries'],
    vibe: 'Academic & focused',
    rentRange: 'KES 12K–25K',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80',
  },
];

function computeIndex(scores) {
  return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);
}

export default function StudentLifeIndex() {
  const [selected, setSelected] = useState(NEIGHBORHOODS[0]);
  const index = computeIndex(selected.scores);

  const radarData = DIMENSIONS.map(d => ({ subject: d.label, value: selected.scores[d.key], fullMark: 100 }));

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center"><Star className="w-4 h-4 text-amber-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Student Life Index™</p>
          <p className="text-white/40 text-xs">Neighborhood livability rankings</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Rankings */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {NEIGHBORHOODS.map((n, i) => (
            <motion.button key={n.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }} onClick={() => setSelected(n)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all text-left ${selected.name === n.name ? 'border-brass' : 'border-white/10 hover:border-white/20'}`}>
              <div className="h-24 relative">
                <img src={n.image} alt={n.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="w-6 h-6 rounded-full bg-brass flex items-center justify-center">
                    <span className="text-navy text-xs font-bold">#{n.rank}</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-semibold">{n.name}</p>
                  <p className="text-brass text-xs font-bold">{computeIndex(n.scores)}/100</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={selected.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar */}
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading text-2xl text-white">{selected.name}</h2>
                <p className="text-white/40 text-sm">{selected.vibe}</p>
              </div>
              <div className="text-right">
                <p className="text-brass font-bold text-4xl font-heading">{index}</p>
                <p className="text-white/40 text-xs">Student Life Score</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <Radar name="Score" dataKey="value" stroke="#C5A059" fill="#C5A059" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 12, color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Dimensions + Info */}
          <div className="space-y-4">
            <div className="glass-panel rounded-3xl p-6">
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-4">Dimension Scores</p>
              <div className="space-y-3">
                {DIMENSIONS.map((d, i) => (
                  <div key={d.key} className="flex items-center gap-3">
                    <d.icon className="w-4 h-4 flex-shrink-0" style={{ color: d.color }} />
                    <span className="text-white/70 text-sm w-24 flex-shrink-0">{d.label}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: d.color }}
                        initial={{ width: 0 }} animate={{ width: `${selected.scores[d.key]}%` }}
                        transition={{ duration: 0.7, delay: i * 0.07 }} />
                    </div>
                    <span className="text-white text-sm font-bold w-8">{selected.scores[d.key]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Highlights</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.highlights.map(h => (
                  <span key={h} className="px-3 py-1 bg-brass/10 text-brass text-xs rounded-full border border-brass/20">{h}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Typical rent range</span>
                <span className="text-brass font-semibold">{selected.rentRange}/mo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}