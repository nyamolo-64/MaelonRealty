import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Star, CheckCircle2, Clock, Home, Award, Download, Share2, TrendingUp } from 'lucide-react';

const PASSPORT_DATA = {
  name: 'Amina Kariuki',
  university: 'Strathmore University',
  year: '2nd Year',
  joined: 'January 2024',
  trustScore: 94,
  verificationStatus: 'fully_verified',
  paymentReliability: 98,
  avgRating: 4.9,
  totalReviews: 3,
  history: [
    { property: 'South B Studio — Mombasa Rd', period: 'Jan 2023 – Aug 2023', rating: 5, review: 'Excellent tenant, always paid on time.', landlord: 'Grace W.' },
    { property: 'Madaraka Bedsitter', period: 'Sep 2022 – Dec 2022', rating: 5, review: 'Very clean and respectful.', landlord: 'John M.' },
    { property: 'Kasarani Single Room', period: 'Jan 2022 – Aug 2022', rating: 4, review: 'Good tenant, minor communication delay.', landlord: 'Peter K.' },
  ],
  badges: [
    { label: 'Verified Identity', icon: Shield, color: '#10b981' },
    { label: 'On-Time Payer', icon: Clock, color: '#3b82f6' },
    { label: '3 Clean Tenancies', icon: Home, color: '#C5A059' },
    { label: 'Top-Rated Tenant', icon: Star, color: '#f59e0b' },
  ],
  verifications: [
    { label: 'Student ID', verified: true },
    { label: 'National ID / Passport', verified: true },
    { label: 'Phone Number', verified: true },
    { label: 'Email Address', verified: true },
    { label: 'University Enrollment', verified: true },
    { label: 'Emergency Contact', verified: true },
  ]
};

function TrustRing({ score }) {
  const r = 56; const circ = 2 * Math.PI * r;
  const color = score >= 90 ? '#10b981' : score >= 70 ? '#C5A059' : '#ef4444';
  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 130 130" className="w-full h-full">
        <circle cx="65" cy="65" r={r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <motion.circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round" transform="rotate(-90 65 65)"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${(score/100)*circ} ${circ}` }}
          transition={{ duration: 1.4, ease: 'easeOut' }} />
        <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill={color} fontFamily="Inter">{score}</text>
        <text x="65" y="76" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="Inter">Trust Score</text>
      </svg>
    </div>
  );
}

export default function TenantPassport() {
  const p = PASSPORT_DATA;
  const [tab, setTab] = useState('overview');

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center"><CreditCard className="w-4 h-4 text-cyan-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Tenant Passport™</p>
          <p className="text-white/40 text-xs">Your digital housing identity</p>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Passport Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
          style={{ background: 'linear-gradient(135deg, #0A1128 0%, #131D3A 50%, #0A1128 100%)', border: '1px solid rgba(197,160,89,0.3)' }}>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <TrustRing score={p.trustScore} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center">
                  <span className="text-navy font-bold text-lg">{p.name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-heading text-xl font-light">{p.name}</p>
                  <p className="text-white/50 text-sm">{p.university} · {p.year}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.verificationStatus === 'fully_verified' && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 rounded-full font-semibold">
                    <Shield className="w-3 h-3" /> Fully Verified
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/15 border border-blue-500/25 px-3 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" /> {p.paymentReliability}% Payment Reliability
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Trust Score', value: p.trustScore, color: '#10b981' },
                  { label: 'Avg Rating', value: `${p.avgRating} ★`, color: '#f59e0b' },
                  { label: 'Tenancies', value: p.history.length, color: '#C5A059' },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="font-bold text-lg" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-white/30 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-between mt-6 pt-4 border-t border-white/8">
            <p className="text-white/20 text-xs font-mono">MAELON-PASS-2024-{p.name.replace(' ','').toUpperCase()}</p>
            <div className="flex gap-2">
              <button className="glass-panel px-3 py-1.5 rounded-xl text-white/50 hover:text-white text-xs flex items-center gap-1.5 transition-colors"><Share2 className="w-3.5 h-3.5" />Share</button>
              <button className="bg-brass/20 border border-brass/30 px-3 py-1.5 rounded-xl text-brass text-xs flex items-center gap-1.5 hover:bg-brass/30 transition-colors"><Download className="w-3.5 h-3.5" />Export PDF</button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2">
          {['overview', 'history', 'verifications'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-brass text-navy' : 'glass-panel text-white/50 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-4">
            {/* Badges */}
            <div className="glass-panel rounded-2xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-4">Achievements</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {p.badges.map((b, i) => (
                  <motion.div key={b.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center p-3 rounded-xl text-center" style={{ background: `${b.color}10`, border: `1px solid ${b.color}25` }}>
                    <b.icon className="w-6 h-6 mb-2" style={{ color: b.color }} />
                    <p className="text-xs font-medium" style={{ color: b.color }}>{b.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="space-y-4">
            {p.history.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{h.property}</p>
                    <p className="text-white/40 text-xs mt-0.5">{h.period} · Landlord: {h.landlord}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= h.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />)}
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-white/50 text-sm mt-3 italic">"{h.review}"</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'verifications' && (
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            {p.verifications.map((v, i) => (
              <motion.div key={v.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between py-2.5 border-b border-white/8 last:border-0">
                <p className="text-white/70 text-sm">{v.label}</p>
                {v.verified
                  ? <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium"><CheckCircle2 className="w-4 h-4" />Verified</span>
                  : <span className="text-xs text-white/30">Pending</span>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}