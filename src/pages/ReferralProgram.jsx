import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Gift, Users, DollarSign, Share2, Copy, CheckCircle2,
  Star, TrendingUp, Award, Home, ArrowRight, Sparkles, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';

const TIERS = [
  { name: 'Bronze', min: 0, max: 4, reward: 500, color: 'from-amber-600 to-amber-800', textColor: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  { name: 'Silver', min: 5, max: 9, reward: 750, color: 'from-gray-400 to-gray-600', textColor: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
  { name: 'Gold', min: 10, max: 24, reward: 1000, color: 'from-yellow-400 to-yellow-600', textColor: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { name: 'Platinum', min: 25, max: Infinity, reward: 1500, color: 'from-blue-400 to-blue-600', textColor: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
];

const HOW_IT_WORKS = [
  { step: '1', title: 'Get Your Code', desc: 'Copy your unique referral link or code from this page.', icon: Copy },
  { step: '2', title: 'Share It', desc: 'Share with friends, classmates, or landlords in your network.', icon: Share2 },
  { step: '3', title: 'They Sign Up', desc: 'Your referral creates an account using your code.', icon: Users },
  { step: '4', title: 'Earn Rewards', desc: 'When they complete a rental or sign up as a landlord, you earn KES.', icon: DollarSign },
];

const MOCK_REFERRALS = [
  { name: 'Amina K.', type: 'Student', status: 'converted', reward: 500, date: '2025-05-10' },
  { name: 'Brian O.', type: 'Landlord', status: 'signed_up', reward: 0, date: '2025-05-28' },
  { name: 'Grace N.', type: 'Student', status: 'pending', reward: 0, date: '2025-06-01' },
  { name: 'John M.', type: 'Tenant', status: 'converted', reward: 500, date: '2025-05-15' },
];

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const myCode = 'MAELON-USER42';
  const myReferrals = MOCK_REFERRALS.length;
  const myEarnings = MOCK_REFERRALS.filter(r => r.status === 'converted').reduce((a, r) => a + r.reward, 0);
  const currentTier = TIERS.find(t => myReferrals >= t.min && myReferrals <= t.max) || TIERS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://maelon.co.ke/register?ref=${myCode}`);
    setCopied(true);
    toast({ title: 'Link copied!', description: 'Your referral link is ready to share.' });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="glass-panel-dark border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-semibold">M</span>
          </div>
          <span className="font-heading text-xl text-white">Maelon<span className="text-brass">.</span></span>
        </Link>
        <Link to="/"><Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-xs gap-1.5"><Home className="w-3.5 h-3.5" /> Home</Button></Link>
      </nav>

      {/* Hero */}
      <div className="bg-navy py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brass/10 rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass/15 border border-brass/30 text-brass text-sm font-medium mb-6">
            <Gift className="w-4 h-4" /> Maelon Referral Programme
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl font-light text-white">
            Earn While You <span className="italic text-brass">Share</span>
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-xl mx-auto">
            Refer friends, classmates, and landlords to Maelon and earn up to KES 1,500 per successful referral.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
            {[{ v: 'KES 500', l: 'Student referral' }, { v: 'KES 1,000', l: 'Landlord referral' }, { v: 'KES 1,500', l: 'Platinum tier bonus' }].map(s => (
              <div key={s.l}>
                <p className="font-heading text-3xl text-brass">{s.v}</p>
                <p className="text-white/40 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* My Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'My Referrals', value: myReferrals, icon: Users, color: 'text-blue-500' },
            { label: 'Converted', value: MOCK_REFERRALS.filter(r => r.status === 'converted').length, icon: CheckCircle2, color: 'text-emerald-500' },
            { label: 'Total Earned', value: `KES ${myEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-brass' },
            { label: 'Current Tier', value: currentTier.name, icon: Award, color: 'text-purple-500' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-5">
              <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
              <p className="font-heading text-xl font-semibold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Code Card */}
        <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-7 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-brass/8 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-white/60 text-sm mb-2">Your Referral Link</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 font-mono text-white text-sm border border-white/20 min-w-0 truncate">
                maelon.co.ke/register?ref={myCode}
              </div>
              <Button onClick={handleCopy} className="bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl flex-shrink-0 gap-2">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {['WhatsApp', 'Instagram', 'Twitter / X', 'Email'].map(platform => (
                <button key={platform} className="text-xs px-4 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 border border-white/10 transition-all">
                  Share on {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">How It Works</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-brass/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-5 h-5 text-brass" />
                </div>
                <div className="w-6 h-6 rounded-full bg-brass text-navy text-xs font-bold flex items-center justify-center mx-auto mb-2">{step.step}</div>
                <p className="font-semibold text-foreground text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">Reward Tiers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TIERS.map((tier, i) => (
              <div key={tier.name} className={`rounded-2xl border p-5 text-center ${tier.bg} ${tier.border} ${currentTier.name === tier.name ? 'ring-2 ring-brass/40' : ''}`}>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} mx-auto mb-3 flex items-center justify-center`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <p className={`font-bold text-lg ${tier.textColor}`}>{tier.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{tier.min}{tier.max === Infinity ? '+' : `–${tier.max}`} referrals</p>
                <p className={`font-bold text-sm mt-2 ${tier.textColor}`}>KES {tier.reward.toLocaleString()} / referral</p>
                {currentTier.name === tier.name && (
                  <span className="text-xs mt-2 inline-block px-2 py-0.5 bg-brass/20 text-brass rounded-full font-medium">Your Tier</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Referral History */}
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">My Referrals</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Name', 'Type', 'Status', 'Reward', 'Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_REFERRALS.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{r.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.type}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        r.status === 'converted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        r.status === 'signed_up' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-muted text-muted-foreground border border-border'
                      }`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-foreground">
                      {r.reward > 0 ? `KES ${r.reward.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}