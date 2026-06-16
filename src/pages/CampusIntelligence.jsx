import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Users, Home, MapPin, GraduationCap } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const UNIVERSITIES = [
  { id: 'strath', name: 'Strathmore', color: '#C5A059', demand: 88, avgRent: 19500, occupancy: 94, roommateDemand: 72, topAreas: ['Madaraka', 'Kilimani', 'South B'] },
  { id: 'uon', name: 'Univ. of Nairobi', color: '#3b82f6', demand: 95, avgRent: 15000, occupancy: 98, roommateDemand: 85, topAreas: ['CBD', 'South B', 'Ngong Road'] },
  { id: 'usiu', name: 'USIU-Africa', color: '#10b981', demand: 72, avgRent: 16500, occupancy: 88, roommateDemand: 65, topAreas: ['Kasarani', 'Ruaka', 'Thika Rd'] },
  { id: 'ku', name: 'Kenyatta Uni', color: '#f59e0b', demand: 80, avgRent: 11000, occupancy: 91, roommateDemand: 78, topAreas: ['Kahawa', 'Kasarani', 'Thika Rd'] },
  { id: 'jkuat', name: 'JKUAT', color: '#ec4899', demand: 68, avgRent: 9000, occupancy: 85, roommateDemand: 70, topAreas: ['Juja', 'Thika', 'Ruiru'] },
];

const MONTHLY_DEMAND = [
  { month: 'Jan', strath: 65, uon: 75, usiu: 55 },
  { month: 'Feb', strath: 70, uon: 80, usiu: 60 },
  { month: 'Mar', strath: 60, uon: 68, usiu: 52 },
  { month: 'Apr', strath: 55, uon: 62, usiu: 48 },
  { month: 'May', strath: 72, uon: 82, usiu: 65 },
  { month: 'Jun', strath: 88, uon: 95, usiu: 78 },
  { month: 'Jul', strath: 95, uon: 100, usiu: 88 },
  { month: 'Aug', strath: 92, uon: 98, usiu: 85 },
  { month: 'Sep', strath: 78, uon: 88, usiu: 72 },
];

export default function CampusIntelligence() {
  const [selected, setSelected] = useState(UNIVERSITIES[0]);

  const pieData = UNIVERSITIES.map(u => ({ name: u.name, value: u.demand, color: u.color }));

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-orange-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Campus Housing Intelligence</p>
          <p className="text-white/40 text-xs">Live analytics by university</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* University Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {UNIVERSITIES.map((u, i) => (
            <motion.button key={u.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(u)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${selected.id === u.id ? 'border-current' : 'border-white/10 hover:border-white/20 glass-panel'}`}
              style={{ borderColor: selected.id === u.id ? u.color : undefined, background: selected.id === u.id ? `${u.color}15` : undefined }}>
              <GraduationCap className="w-5 h-5 mb-2" style={{ color: u.color }} />
              <p className="text-white text-xs font-semibold leading-tight">{u.name}</p>
              <p className="text-xs font-bold mt-1" style={{ color: u.color }}>{u.demand}% demand</p>
            </motion.button>
          ))}
        </div>

        {/* Stats for Selected Uni */}
        <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Demand Index', value: `${selected.demand}%`, icon: TrendingUp, color: selected.color },
              { label: 'Avg Rent', value: `KES ${selected.avgRent.toLocaleString()}`, icon: Home, color: '#10b981' },
              { label: 'Occupancy', value: `${selected.occupancy}%`, icon: BarChart3, color: '#3b82f6' },
              { label: 'Roommate Demand', value: `${selected.roommateDemand}%`, icon: Users, color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} className="glass-panel rounded-2xl p-4">
                <s.icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                <p className="font-heading text-2xl font-light text-white">{s.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Top Areas */}
          <div className="glass-panel rounded-2xl p-5 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />Top Neighborhoods for {selected.name}</p>
            <div className="flex gap-3">
              {selected.topAreas.map((area, i) => (
                <div key={area} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: `${selected.color}15`, border: `1px solid ${selected.color}30` }}>
                  <span className="font-bold text-sm" style={{ color: selected.color }}>#{i+1}</span>
                  <span className="text-white text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-5">Monthly Demand Trends</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_DEMAND}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 12, color: '#fff' }} />
                <Line type="monotone" dataKey="strath" name="Strathmore" stroke="#C5A059" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="uon" name="UoN" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="usiu" name="USIU" stroke="#10b981" strokeWidth={2} dot={false} />
                <Legend formatter={v => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{v}</span>} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-5">Demand Share by University</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0A1128', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 12, color: '#fff' }} />
                <Legend formatter={v => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}