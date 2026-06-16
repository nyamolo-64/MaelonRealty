import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Trophy, Star, Gift, Users, Award, TrendingUp, Crown, Share2, Copy, CheckCircle2 } from 'lucide-react';

const LEADERBOARD = [
  { rank: 1, name: 'Amina K.', university: 'Strathmore', points: 4820, tier: 'platinum', referrals: 24, badge: '👑' },
  { rank: 2, name: 'Brian O.', university: 'UoN', points: 3650, tier: 'gold', referrals: 18, badge: '🥇' },
  { rank: 3, name: 'Cynthia M.', university: 'USIU', points: 2940, tier: 'gold', referrals: 14, badge: '🥈' },
  { rank: 4, name: 'David N.', university: 'KU', points: 2200, tier: 'silver', referrals: 11, badge: '🥉' },
  { rank: 5, name: 'Eva W.', university: 'JKUAT', points: 1850, tier: 'silver', referrals: 9, badge: '⭐' },
];

const ACHIEVEMENTS = [
  { id: 'first_listing', icon: '🏠', label: 'First Tour', desc: 'Completed your first virtual tour', points: 100, earned: true },
  { id: 'budget_pro', icon: '💰', label: 'Budget Pro', desc: 'Used budget planner 5 times', points: 200, earned: true },
  { id: 'reviewer', icon: '⭐', label: 'Trusted Reviewer', desc: 'Submitted 3 verified reviews', points: 300, earned: true },
  { id: 'connector', icon: '🤝', label: 'Connector', desc: 'Messaged 5 roommate matches', points: 250, earned: false },
  { id: 'ambassador', icon: '🎖️', label: 'Campus Ambassador', desc: 'Referred 10 students', points: 500, earned: false },
  { id: 'verified', icon: '🛡️', label: 'Verified Tenant', desc: 'Completed Tenant Passport', points: 400, earned: false },
];

const TIERS = [
  { name: 'Bronze', min: 0, color: '#cd7f32', icon: '🥉', perks: ['Basic listings access', 'Roommate matching'] },
  { name: 'Silver', min: 1000, color: '#c0c0c0', icon: '🥈', perks: ['Priority listings', 'AI Concierge access', '5% off premium'] },
  { name: 'Gold', min: 2500, color: '#C5A059', icon: '🥇', perks: ['Featured on listings', 'Early access to new properties', '15% off premium'] },
  { name: 'Platinum', min: 5000, color: '#e5e4e2', icon: '👑', perks: ['VIP support', 'Free verification', 'Ambassador status', '25% off all premium'] },
];

const MY_POINTS = 1850;
const MY_TIER = TIERS.find(t => MY_POINTS >= t.min && (TIERS[TIERS.indexOf(t) + 1]?.min || Infinity) > MY_POINTS) || TIERS[0];
const NEXT_TIER = TIERS[TIERS.indexOf(MY_TIER) + 1];

export default function MaelonNetwork() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'MAELON-AMK-2024';

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center"><Zap className="w-4 h-4 text-purple-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Maelon Network Layer</p>
          <p className="text-white/40 text-xs">Points, rewards & community</p>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* My Status Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-6 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${MY_TIER.color}15, rgba(10,17,40,0.9))`, border: `1px solid ${MY_TIER.color}30` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-center">
              <div className="text-5xl mb-2">{MY_TIER.icon}</div>
              <p className="font-bold text-lg" style={{ color: MY_TIER.color }}>{MY_TIER.name}</p>
              <p className="text-white/40 text-xs">Your Tier</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-heading text-3xl font-light">{MY_POINTS.toLocaleString()} <span className="text-white/40 text-lg">pts</span></p>
                {NEXT_TIER && <p className="text-white/40 text-xs">{(NEXT_TIER.min - MY_POINTS).toLocaleString()} pts to {NEXT_TIER.name}</p>}
              </div>
              {NEXT_TIER && (
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div className="h-full rounded-full" style={{ background: MY_TIER.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${((MY_POINTS - MY_TIER.min) / (NEXT_TIER.min - MY_TIER.min)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }} />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {MY_TIER.perks.map(p => <span key={p} className="text-xs px-3 py-1 rounded-full bg-white/8 text-white/60">{p}</span>)}
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-1">Your Referral Code</p>
              <p className="text-white font-mono text-lg">{referralCode}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copyCode} className="flex items-center gap-2 px-4 py-2 bg-white/8 border border-white/15 rounded-xl text-white/60 hover:text-white text-sm transition-colors">
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-brass/20 border border-brass/30 rounded-xl text-brass text-sm hover:bg-brass/30 transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-brass" />Achievements</h3>
            <div className="space-y-3">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${a.earned ? 'bg-brass/10 border border-brass/20' : 'bg-white/4 border border-white/8 opacity-60'}`}>
                  <span className="text-2xl flex-shrink-0">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{a.label}</p>
                    <p className="text-white/40 text-xs">{a.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brass text-sm font-bold">+{a.points}</p>
                    {a.earned ? <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto mt-0.5" /> : <p className="text-white/20 text-xs">locked</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Trophy className="w-4 h-4 text-brass" />Campus Leaderboard</h3>
            <div className="space-y-3">
              {LEADERBOARD.map((user, i) => (
                <motion.div key={user.rank} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors">
                  <span className="text-xl w-8 text-center flex-shrink-0">{user.badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-white/40 text-xs">{user.university} · {user.referrals} referrals</p>
                  </div>
                  <p className="text-brass font-bold text-sm">{user.points.toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier Progression */}
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2"><Crown className="w-4 h-4 text-brass" />Tier Benefits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TIERS.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-4 border-2 ${MY_TIER.name === tier.name ? 'border-current' : 'border-white/10'}`}
                style={{ borderColor: MY_TIER.name === tier.name ? tier.color : undefined, background: `${tier.color}08` }}>
                <div className="text-2xl mb-2">{tier.icon}</div>
                <p className="font-bold text-sm mb-1" style={{ color: tier.color }}>{tier.name}</p>
                <p className="text-white/30 text-xs mb-3">{tier.min.toLocaleString()}+ pts</p>
                {tier.perks.map(p => <p key={p} className="text-white/50 text-xs mb-1 flex items-start gap-1"><span style={{ color: tier.color }}>·</span>{p}</p>)}
                {MY_TIER.name === tier.name && <span className="mt-2 inline-block text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${tier.color}25`, color: tier.color }}>Current</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}