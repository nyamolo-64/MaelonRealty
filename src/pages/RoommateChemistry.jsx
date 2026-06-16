import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Sparkles, Heart, AlertTriangle, MessageCircle, Loader2, CheckCircle2, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const PROFILES = [
  {
    id: 'a', name: 'Amina K.', university: 'Strathmore University', year: '2nd Year',
    sleep: 'Early bird', study: 'Quiet at all times', social: 'Balanced',
    interests: ['Reading', 'Cooking', 'Yoga', 'Netflix'], smoking: false, pets: false,
    budget: 'KES 15,000–22,000', gender: 'Female', about: 'Focused, clean, love cooking on weekends.'
  },
  {
    id: 'b', name: 'Brian O.', university: 'University of Nairobi', year: '3rd Year',
    sleep: 'Night owl', study: 'Moderate noise okay', social: 'Very social',
    interests: ['Gaming', 'Music', 'Cooking', 'Football'], smoking: false, pets: false,
    budget: 'KES 12,000–18,000', gender: 'Male', about: 'Outgoing, loves music, very tidy.'
  },
  {
    id: 'c', name: 'Cynthia M.', university: 'USIU-Africa', year: '1st Year',
    sleep: 'Flexible', study: 'Quiet at all times', social: 'Prefer my own space',
    interests: ['Reading', 'Art', 'Yoga', 'Cooking'], smoking: false, pets: true,
    budget: 'KES 18,000–28,000', gender: 'Female', about: 'Introverted, bookworm, super clean.'
  },
  {
    id: 'd', name: 'David N.', university: 'Kenyatta University', year: '4th Year',
    sleep: 'Early bird', study: 'Moderate noise okay', social: 'Balanced',
    interests: ['Sports', 'Movies', 'Cooking', 'Fitness'], smoking: false, pets: false,
    budget: 'KES 10,000–16,000', gender: 'Male', about: 'Gym-goer, clean, easygoing.'
  },
];

export default function RoommateChemistry() {
  const [p1, setP1] = useState(PROFILES[0]);
  const [p2, setP2] = useState(PROFILES[1]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setAnalysis(null);
   const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `You are a roommate compatibility psychologist specializing in student housing in Nairobi, Kenya.

Analyze the compatibility between these two students:

**Profile 1: ${p1.name}**
- University: ${p1.university}, ${p1.year}
- Sleep schedule: ${p1.sleep}
- Study environment: ${p1.study}
- Social level: ${p1.social}
- Interests: ${p1.interests.join(', ')}
- Smoking: ${p1.smoking}, Pets: ${p1.pets}
- Budget: ${p1.budget}
- About: ${p1.about}

**Profile 2: ${p2.name}**
- University: ${p2.university}, ${p2.year}
- Sleep schedule: ${p2.sleep}
- Study environment: ${p2.study}
- Social level: ${p2.social}
- Interests: ${p2.interests.join(', ')}
- Smoking: ${p2.smoking}, Pets: ${p2.pets}
- Budget: ${p2.budget}
- About: ${p2.about}

Provide a deep, honest compatibility analysis. Be specific.
Respond only with JSON: { "overall_score": 85, "verdict": "...", "strengths": ["..."], "challenges": ["..."], "tips": ["..."] }`
    }]
  })
});
const data = await res.json();
const result = JSON.parse(data.content[0].text);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center"><Users className="w-4 h-4 text-pink-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">AI Roommate Chemistry</p>
          <p className="text-white/40 text-xs">Deep compatibility analysis</p>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Profile Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[{ profile: p1, setProfile: setP1, label: 'Profile A' }, { profile: p2, setProfile: setP2, label: 'Profile B' }].map(({ profile, setProfile, label }) => (
            <div key={label}>
              <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-3">{label}</label>
              <div className="space-y-2">
                {PROFILES.map(p => (
                  <button key={p.id} onClick={() => setProfile(p)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${profile.id === p.id ? 'border-brass bg-brass/10' : 'border-white/10 hover:border-white/20 glass-panel'}`}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
                      <span className="text-navy font-bold text-sm">{p.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{p.name}</p>
                      <p className="text-white/40 text-xs">{p.university} · {p.year}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* VS Banner */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-4">
          <ProfilePill profile={p1} />
          <div className="flex-1 text-center">
            <p className="text-white/30 text-xs mb-1">vs</p>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={analyze} disabled={p1.id === p2.id || loading}
              className="bg-brass hover:bg-brass-light text-navy font-semibold px-6 py-2.5 rounded-full text-sm flex items-center gap-2 mx-auto disabled:opacity-40"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              {loading ? 'Analysing…' : 'Run Chemistry Analysis'}
            </motion.button>
          </div>
          <ProfilePill profile={p2} />
        </div>

        {/* Analysis Result */}
        <AnimatePresence>
          {analysis && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Score */}
              <div className="glass-panel rounded-3xl p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="42" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                    <motion.circle cx="50" cy="50" r="42" fill="none"
                      stroke={analysis.success_score >= 70 ? '#10b981' : analysis.success_score >= 50 ? '#C5A059' : '#ef4444'}
                      strokeWidth="6" strokeDasharray={`${(analysis.success_score / 100) * 263.9} 263.9`}
                      strokeLinecap="round" transform="rotate(-90 50 50)"
                      initial={{ strokeDasharray: '0 263.9' }}
                      animate={{ strokeDasharray: `${(analysis.success_score / 100) * 263.9} 263.9` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }} />
                    <text x="50" y="46" textAnchor="middle" fontSize="20" fontWeight="700"
                      fill={analysis.success_score >= 70 ? '#10b981' : analysis.success_score >= 50 ? '#C5A059' : '#ef4444'} fontFamily="Inter">{analysis.success_score}</text>
                    <text x="50" y="60" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="Inter">/ 100</text>
                  </svg>
                </div>
                <p className="text-white font-heading text-xl">{analysis.verdict}</p>
                <p className="text-white/50 text-sm mt-2 max-w-lg mx-auto">{analysis.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnalysisSection title="Why They're Compatible" items={analysis.why_compatible} icon={CheckCircle2} color="emerald" />
                <AnalysisSection title="Potential Conflicts" items={analysis.potential_conflicts} icon={AlertTriangle} color="amber" />
                <AnalysisSection title="Shared Interests" items={analysis.shared_interests} icon={Heart} color="pink" />
                <AnalysisSection title="Communication Tips" items={analysis.communication_tips} icon={MessageCircle} color="blue" />
              </div>

              {analysis.lifestyle_risks?.length > 0 && (
                <div className="glass-panel rounded-2xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-rose-400" />Lifestyle Risks</p>
                  <div className="space-y-2">
                    {analysis.lifestyle_risks.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-rose-300">
                        <span className="text-rose-500 mt-0.5">•</span> {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProfilePill({ profile }) {
  return (
    <div className="text-center min-w-0">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center mx-auto mb-2">
        <span className="text-navy font-bold">{profile.name[0]}</span>
      </div>
      <p className="text-white text-xs font-semibold">{profile.name.split(' ')[0]}</p>
      <p className="text-white/30 text-xs">{profile.university.split(' ')[0]}</p>
    </div>
  );
}

function AnalysisSection({ title, items, icon: SectionIcon, color }) {
  const colors = { emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20', pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20', blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <p className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2 opacity-70">
        <SectionIcon className="w-3.5 h-3.5" />{title}
      </p>
      <div className="space-y-1.5">
        {(items || []).map((item, i) => (
          <p key={i} className="text-sm opacity-80 flex items-start gap-2"><span className="mt-1 flex-shrink-0">•</span>{item}</p>
        ))}
      </div>
    </div>
  );
}