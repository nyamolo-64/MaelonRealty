import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, MapPin, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const RENT_TRENDS = {
  Kilimani: [
    { month: 'Jul 24', rent: 26000 }, { month: 'Aug', rent: 26500 }, { month: 'Sep', rent: 27000 },
    { month: 'Oct', rent: 27200 }, { month: 'Nov', rent: 27500 }, { month: 'Dec', rent: 28000 },
    { month: 'Jan 25', rent: 28200 }, { month: 'Feb', rent: 28500 }, { month: 'Mar', rent: 29000 },
    { month: 'Apr', rent: 29500, forecast: true }, { month: 'May', rent: 30200, forecast: true }, { month: 'Jun', rent: 31000, forecast: true },
  ],
  Westlands: [
    { month: 'Jul 24', rent: 20000 }, { month: 'Aug', rent: 20500 }, { month: 'Sep', rent: 21000 },
    { month: 'Oct', rent: 21200 }, { month: 'Nov', rent: 21500 }, { month: 'Dec', rent: 22000 },
    { month: 'Jan 25', rent: 21800 }, { month: 'Feb', rent: 22000 }, { month: 'Mar', rent: 22500 },
    { month: 'Apr', rent: 23000, forecast: true }, { month: 'May', rent: 23400, forecast: true }, { month: 'Jun', rent: 24000, forecast: true },
  ],
  'South B': [
    { month: 'Jul 24', rent: 12000 }, { month: 'Aug', rent: 12200 }, { month: 'Sep', rent: 12500 },
    { month: 'Oct', rent: 12500 }, { month: 'Nov', rent: 12800 }, { month: 'Dec', rent: 13000 },
    { month: 'Jan 25', rent: 13200 }, { month: 'Feb', rent: 13200 }, { month: 'Mar', rent: 13500 },
    { month: 'Apr', rent: 13800, forecast: true }, { month: 'May', rent: 14000, forecast: true }, { month: 'Jun', rent: 14400, forecast: true },
  ],
};

const DEMAND_DATA = [
  { uni: 'Strathmore', demand: 88, supply: 62 },
  { uni: 'UoN', demand: 95, supply: 78 },
  { uni: 'USIU', demand: 72, supply: 65 },
  { uni: 'KU', demand: 80, supply: 70 },
  { uni: 'JKUAT', demand: 68, supply: 58 },
];

const BEST_TIME = [
  { month: 'Jan', score: 55, label: 'Moderate' },
  { month: 'Feb', score: 48, label: 'Good' },
  { month: 'Mar', score: 42, label: 'Best' },
  { month: 'Apr', score: 38, label: 'Best' },
  { month: 'May', score: 52, label: 'Moderate' },
  { month: 'Jun', score: 68, label: 'High' },
  { month: 'Jul', score: 85, label: 'Peak' },
  { month: 'Aug', score: 90, label: 'Peak' },
  { month: 'Sep', score: 75, label: 'High' },
  { month: 'Oct', score: 60, label: 'Moderate' },
  { month: 'Nov', score: 50, label: 'Good' },
  { month: 'Dec', score: 45, label: 'Good' },
];

const AREAS = Object.keys(RENT_TRENDS);

export default function HousingPrediction() {
  const [selectedArea, setSelectedArea] = useState('Kilimani');
  const data = RENT_TRENDS[selectedArea];
  const currentRent = data.find(d => !d.forecast)?.rent || 0;
  const forecastRent = data[data.length - 1].rent;
  const growth = (((forecastRent - currentRent) / currentRent) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-purple-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Housing Prediction Engine</p>
          <p className="text-white/40 text-xs">AI rent forecasts & market signals</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Area selector */}
        <div className="flex gap-3">
          {AREAS.map(a => (
            <button key={a} onClick={() => setSelectedArea(a)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedArea === a ? 'bg-brass text-navy' : 'glass-panel text-white/60 hover:text-white'}`}>
              {a}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Current Avg Rent', value: `KES ${currentRent.toLocaleString()}`, color: 'text-white' },
            { label: '3-Month Forecast', value: `KES ${forecastRent.toLocaleString()}`, color: 'text-brass' },
            { label: 'Predicted Growth', value: `+${growth}%`, color: 'text-amber-400' },
            { label: 'Investment Signal', value: growth > 8 ? 'Strong Buy' : 'Hold', color: growth > 8 ? 'text-emerald-400' : 'text-blue-400' },
          ].map(s => (
            <div key={s.label} className="glass-panel rounded-2xl p-4">
              <p className={`font-bold text-xl font-heading ${s.color}`}>{s.value}</p>
              <p className="text-white/40 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Rent Chart */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Rent Trend & Forecast — {selectedArea}</h3>
            <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> AI Forecast
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 12, color: '#fff' }}
                formatter={v => [`KES ${v.toLocaleString()}`, 'Rent']} />
              <Line type="monotone" dataKey="rent" stroke="#C5A059" strokeWidth={2.5} dot={(props) => {
                const { cx, cy, payload } = props;
                return payload.forecast
                  ? <circle key={`dot-${cx}`} cx={cx} cy={cy} r={4} fill="#8b5cf6" stroke="#8b5cf6" strokeDasharray="4,2" />
                  : <circle key={`dot-${cx}`} cx={cx} cy={cy} r={3} fill="#C5A059" />;
              }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brass inline-block" /> Historical</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-500 inline-block" /> AI Forecast</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demand Chart */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-5">Demand vs Supply by University</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DEMAND_DATA} barGap={4}>
                <XAxis dataKey="uni" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 12, color: '#fff' }} />
                <Bar dataKey="demand" name="Demand" fill="#C5A059" radius={[4,4,0,0]} />
                <Bar dataKey="supply" name="Supply" fill="#3b82f6" radius={[4,4,0,0]} />
                <Legend formatter={v => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{v}</span>} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Best Time */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-2">Best Time to Rent</h3>
            <p className="text-white/40 text-xs mb-5">Competitiveness index (lower = better for renters)</p>
            <div className="grid grid-cols-4 gap-2">
              {BEST_TIME.map(m => (
                <div key={m.month} className={`rounded-xl p-2 text-center ${m.score <= 45 ? 'bg-emerald-500/20 border border-emerald-500/30' : m.score >= 75 ? 'bg-rose-500/10 border border-rose-500/20' : 'bg-white/5 border border-white/8'}`}>
                  <p className="text-white text-xs font-semibold">{m.month}</p>
                  <p className={`text-xs font-bold ${m.score <= 45 ? 'text-emerald-400' : m.score >= 75 ? 'text-rose-400' : 'text-white/50'}`}>{m.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-emerald-300 text-xs">Best months to rent in Nairobi: <strong>March & April</strong> — post-semester lull reduces landlord leverage significantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}