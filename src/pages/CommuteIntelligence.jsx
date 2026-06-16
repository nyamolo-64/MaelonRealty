import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bus, Clock, DollarSign, Navigation, Zap, TrendingDown } from 'lucide-react';

const UNIVERSITIES = ['Strathmore University', 'University of Nairobi', 'USIU-Africa', 'Kenyatta University', 'JKUAT'];
const AREAS = ['Kilimani', 'Westlands', 'South B', 'Kasarani', 'Madaraka', 'Ngong Road', 'Ruaka', 'Rongai', 'Lavington'];

const COMMUTE_DATA = {
  'Kilimani': {
    'Strathmore University': { walk: 25, matatu: 15, uber: 10, cost: 4800, route: 'Ngong Rd → Ralph Bunche Rd' },
    'University of Nairobi': { walk: 55, matatu: 25, uber: 18, cost: 6200, route: 'Valley Rd → Uhuru Hwy' },
    'USIU-Africa': { walk: null, matatu: 55, uber: 35, cost: 9600, route: 'Mombasa Rd → Thika Rd' },
    'Kenyatta University': { walk: null, matatu: 65, uber: 45, cost: 11200, route: 'Thika Rd → Kahawa' },
    'JKUAT': { walk: null, matatu: 90, uber: 60, cost: 14400, route: 'Thika Superhighway' },
  },
  'Westlands': {
    'Strathmore University': { walk: null, matatu: 35, uber: 22, cost: 7200, route: 'Waiyaki Way → Ngong Rd' },
    'University of Nairobi': { walk: null, matatu: 30, uber: 20, cost: 6400, route: 'Waiyaki Way → University Wy' },
    'USIU-Africa': { walk: null, matatu: 45, uber: 30, cost: 8800, route: 'Limuru Rd → Thika Rd' },
    'Kenyatta University': { walk: null, matatu: 60, uber: 42, cost: 11200, route: 'Thika Rd' },
    'JKUAT': { walk: null, matatu: 85, uber: 58, cost: 14000, route: 'Thika Superhighway' },
  },
  'South B': {
    'Strathmore University': { walk: 20, matatu: 12, uber: 9, cost: 4000, route: 'Mombasa Rd → Hurlingham' },
    'University of Nairobi': { walk: null, matatu: 25, uber: 16, cost: 5600, route: 'Mombasa Rd → CBD' },
    'USIU-Africa': { walk: null, matatu: 50, uber: 32, cost: 9200, route: 'Mombasa Rd → Thika Rd' },
    'Kenyatta University': { walk: null, matatu: 60, uber: 40, cost: 10400, route: 'Eastern Bypass' },
    'JKUAT': { walk: null, matatu: 85, uber: 58, cost: 13600, route: 'Thika Superhighway' },
  },
  'Kasarani': {
    'Strathmore University': { walk: null, matatu: 65, uber: 42, cost: 12000, route: 'Thika Rd → Ngong Rd' },
    'University of Nairobi': { walk: null, matatu: 40, uber: 28, cost: 8000, route: 'Thika Rd → CBD' },
    'USIU-Africa': { walk: 18, matatu: 10, uber: 7, cost: 3200, route: 'Kasarani → USIU direct' },
    'Kenyatta University': { walk: null, matatu: 30, uber: 20, cost: 5600, route: 'Thika Rd → Kahawa' },
    'JKUAT': { walk: null, matatu: 55, uber: 36, cost: 9600, route: 'Thika Superhighway' },
  },
};

function CommuteCard({ mode, value, cost, color, icon: CardIcon }) {
  return (
    <div className="glass-panel rounded-2xl p-4 text-center">
      <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${color}20` }}>
        <CardIcon className="w-5 h-5" style={{ color }} />
      </div>
      <p className="text-white font-bold text-lg">{value ? `${value} min` : 'N/A'}</p>
      <p className="text-white/40 text-xs">{mode}</p>
      {cost && <p className="text-brass text-xs font-medium mt-1">~KES {cost}</p>}
    </div>
  );
}

export default function CommuteIntelligence() {
  const [area, setArea] = useState('Kilimani');
  const [university, setUniversity] = useState('Strathmore University');

  const data = COMMUTE_DATA[area]?.[university] ?? { walk: null, matatu: 40, uber: 28, cost: 8000, route: 'Multiple routes available' };
  const efficiency = Math.max(0, 100 - (data.matatu * 1.2));

  const areaRankings = AREAS.map(a => ({
    area: a,
    data: COMMUTE_DATA[a]?.[university] ?? { matatu: 60, cost: 10000 }
  })).sort((a, b) => a.data.matatu - b.data.matatu);

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"><MapPin className="w-4 h-4 text-blue-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Live Commute Intelligence</p>
          <p className="text-white/40 text-xs">Real travel time analysis</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-2">Your Area</label>
            <select value={area} onChange={e => setArea(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brass/40">
              {AREAS.map(a => <option key={a} className="bg-navy">{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-2">Your University</label>
            <select value={university} onChange={e => setUniversity(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brass/40">
              {UNIVERSITIES.map(u => <option key={u} className="bg-navy">{u}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        <motion.div key={area + university} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-heading text-2xl font-light">{area} → {university}</h2>
                <p className="text-white/40 text-sm mt-1 flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5" />{data.route}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-3xl" style={{ color: efficiency > 70 ? '#10b981' : efficiency > 45 ? '#C5A059' : '#ef4444' }}>
                  {Math.round(efficiency)}%
                </p>
                <p className="text-white/40 text-xs">Commute efficiency</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <CommuteCard mode="Walking" value={data.walk} color="#10b981" icon={Navigation} />
              <CommuteCard mode="Matatu" value={data.matatu} cost={Math.round(data.cost / 22)} color="#3b82f6" icon={Bus} />
              <CommuteCard mode="Uber" value={data.uber} cost={Math.round(data.uber * 12)} color="#f59e0b" icon={Zap} />
              <div className="glass-panel rounded-2xl p-4 text-center">
                <div className="w-10 h-10 rounded-xl mx-auto mb-2 bg-brass/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-brass" />
                </div>
                <p className="text-brass font-bold text-lg">KES {data.cost.toLocaleString()}</p>
                <p className="text-white/40 text-xs">Monthly (matatu)</p>
              </div>
            </div>
          </div>

          {/* Area Rankings */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-brass" />
              Best Areas for {university} — by Commute
            </h3>
            <div className="space-y-3">
              {areaRankings.slice(0, 6).map((item, i) => (
                <motion.div key={item.area} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${item.area === area ? 'bg-brass/10 border border-brass/20' : 'hover:bg-white/4'}`}>
                  <span className="text-white/30 font-mono text-sm w-6">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-white text-sm font-medium">{item.area}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-white/50">{item.data.matatu} min</span>
                        <span className="text-brass font-medium">KES {item.data.cost?.toLocaleString()}/mo</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(10, 100 - item.data.matatu * 1.2)}%` }}
                        transition={{ duration: 0.6, delay: i * 0.06 }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}