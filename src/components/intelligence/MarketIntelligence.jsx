import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, MapPin, Users, DollarSign,
  BarChart3, ArrowUpRight, Flame, Zap
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const AREAS = [
  { name: 'Madaraka', searches: 2840, avgRent: 12000, growth: 18, demand: 94, university: 'Strathmore', trend: 'up' },
  { name: 'Kilimani', searches: 2610, avgRent: 22000, growth: 8, demand: 82, university: 'Strathmore', trend: 'up' },
  { name: 'South B', searches: 2190, avgRent: 14000, growth: 12, demand: 88, university: 'Strathmore', trend: 'up' },
  { name: 'Kasarani', searches: 1980, avgRent: 10000, growth: 22, demand: 91, university: 'USIU', trend: 'up' },
  { name: 'Kahawa', searches: 1750, avgRent: 8500, growth: 28, demand: 87, university: 'KU/JKUAT', trend: 'up' },
  { name: 'Westlands', searches: 1640, avgRent: 28000, growth: -2, demand: 71, university: 'UoN', trend: 'down' },
  { name: 'Parklands', searches: 1420, avgRent: 20000, growth: 5, demand: 74, university: 'UoN', trend: 'up' },
  { name: 'Ruaka', searches: 1380, avgRent: 11000, growth: 35, demand: 85, university: 'USIU', trend: 'up' },
  { name: 'Ngong Road', searches: 1200, avgRent: 15000, growth: 9, demand: 80, university: 'Strathmore', trend: 'up' },
  { name: 'Lavington', searches: 890, avgRent: 25000, growth: 3, demand: 66, university: 'Strathmore', trend: 'stable' },
];

const RENT_TREND = [
  { month: 'Jan', madaraka: 11500, southB: 13200, kasarani: 9500, kilimani: 21000 },
  { month: 'Feb', madaraka: 11700, southB: 13400, kasarani: 9600, kilimani: 21200 },
  { month: 'Mar', madaraka: 11800, southB: 13500, kasarani: 9700, kilimani: 21500 },
  { month: 'Apr', madaraka: 11900, southB: 13700, kasarani: 9900, kilimani: 21800 },
  { month: 'May', madaraka: 12000, southB: 14000, kasarani: 10000, kilimani: 22000 },
  { month: 'Jun', madaraka: 12200, southB: 14100, kasarani: 10100, kilimani: 22100 },
];

const DEMAND_BY_UNI = [
  { university: 'Strathmore', demand: 94, listings: 340 },
  { university: 'UoN', demand: 88, listings: 280 },
  { university: 'USIU', demand: 91, listings: 210 },
  { university: 'KU', demand: 85, listings: 190 },
  { university: 'JKUAT', demand: 82, listings: 150 },
];

const VACANCY_DATA = [
  { month: 'Jul', rate: 12 },
  { month: 'Aug', rate: 8 },
  { month: 'Sep', rate: 4 },
  { month: 'Oct', rate: 6 },
  { month: 'Nov', rate: 9 },
  { month: 'Dec', rate: 18 },
  { month: 'Jan', rate: 22 },
  { month: 'Feb', rate: 11 },
  { month: 'Mar', rate: 7 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000
            ? `KES ${p.value.toLocaleString()}`
            : `${p.value}${p.name?.includes('rate') || p.name?.includes('demand') ? '%' : ''}`}
        </p>
      ))}
    </div>
  );
};

export default function MarketIntelligence() {
  const [sortBy, setSortBy] = useState('searches');

  const sorted = [...AREAS].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-8">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Nairobi Student Rent', value: 'KES 14,800', sub: '+8% vs last quarter', icon: DollarSign, color: 'text-brass', trend: 'up' },
          { label: 'Total Active Searches', value: '18,200+', sub: 'This month', icon: BarChart3, color: 'text-blue-500', trend: 'up' },
          { label: 'Fastest Growing Area', value: 'Ruaka +35%', sub: 'Quarter-on-quarter', icon: Flame, color: 'text-orange-500', trend: 'up' },
          { label: 'Highest Roommate Demand', value: 'Madaraka', sub: '94% demand index', icon: Users, color: 'text-emerald-500', trend: 'up' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {kpi.trend === 'up' ? 'Up' : 'Down'}
              </span>
            </div>
            <p className="font-heading text-xl font-semibold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Rent Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Rent Trends by Neighbourhood</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly average KES — last 6 months</p>
            </div>
            <span className="text-xs px-3 py-1 bg-brass/10 text-brass rounded-full border border-brass/20 font-medium">Live Data</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RENT_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="madaraka" name="Madaraka" stroke="#C5A059" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="southB" name="South B" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="kasarani" name="Kasarani" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="kilimani" name="Kilimani" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { name: 'Madaraka', color: '#C5A059' },
              { name: 'South B', color: '#3b82f6' },
              { name: 'Kasarani', color: '#10b981' },
              { name: 'Kilimani', color: '#8b5cf6' },
            ].map(l => (
              <div key={l.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                {l.name}
              </div>
            ))}
          </div>
        </div>

        {/* Vacancy Forecast */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Vacancy Rate Forecast</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly vacancy % — predictive model</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={VACANCY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="rate" name="vacancy rate" stroke="#C5A059" fill="rgba(197,160,89,0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-800 font-medium">⚠ High vacancy predicted Jan–Feb</p>
            <p className="text-xs text-amber-700 mt-0.5">Best time for landlords to advertise: August–October</p>
          </div>
        </div>
      </div>

      {/* Neighbourhood Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-semibold text-foreground">Neighbourhood Intelligence Index</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Ranked by student demand and search volume</p>
          </div>
          <div className="flex gap-2">
            {['searches', 'demand', 'growth', 'avgRent'].map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all capitalize ${
                  sortBy === s ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground hover:border-brass/20'
                }`}
              >
                {s === 'avgRent' ? 'Rent' : s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['#', 'Area', 'Searches/mo', 'Avg Rent', 'Growth', 'Demand Index', 'Nearest Uni', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((area, i) => (
                <motion.tr
                  key={area.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 text-muted-foreground text-xs">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                      {area.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{area.searches.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">KES {area.avgRent.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 font-medium ${area.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {area.growth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {area.growth > 0 ? '+' : ''}{area.growth}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden w-16">
                        <motion.div
                          className="h-full bg-brass rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${area.demand}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{area.demand}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{area.university}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      area.growth >= 20 ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                      area.growth >= 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      area.growth < 0 ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-muted text-muted-foreground border border-border'
                    }`}>
                      {area.growth >= 20 ? '🔥 Hot' : area.growth >= 10 ? '↑ Growing' : area.growth < 0 ? '↓ Cooling' : '→ Stable'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demand by University */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Demand by University</h3>
          <p className="text-xs text-muted-foreground mb-5">Roommate demand index per institution</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DEMAND_BY_UNI} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 100]} />
              <YAxis dataKey="university" type="category" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="demand" name="demand" fill="#C5A059" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Most Affordable Areas Near Campus</h3>
          <p className="text-xs text-muted-foreground mb-4">Avg monthly rent for student housing</p>
          <div className="space-y-3">
            {[...AREAS].sort((a, b) => a.avgRent - b.avgRent).slice(0, 6).map((area, i) => (
              <div key={area.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">{area.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(area.avgRent / 30000) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-24 text-right">KES {area.avgRent.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}