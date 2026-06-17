import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star, Users, DollarSign, TrendingUp, Award, Share2,
  CheckCircle2, Copy, BarChart3, Building2, Home, Sparkles,
  GraduationCap, Clock, Gift, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MOCK_AMBASSADOR = {
  full_name: 'Amina Korir',
  university: 'Strathmore University',
  tier: 'gold',
  referral_code: 'AMB-AMINA22',
  total_referrals: 18,
  successful_referrals: 14,
  total_earnings: 16500,
  pending_earnings: 3000,
  paid_earnings: 13500,
  status: 'active',
};

const MOCK_ACTIVITY = [
  { name: 'James M.', type: 'Student', date: '2025-06-01', status: 'converted', reward: 1000 },
  { name: 'Grace N.', type: 'Landlord', date: '2025-05-28', status: 'signed_up', reward: 0 },
  { name: 'Brian O.', type: 'Student', date: '2025-05-20', status: 'converted', reward: 1000 },
  { name: 'Kelvin M.', type: 'Tenant', date: '2025-05-15', status: 'converted', reward: 1000 },
  { name: 'Sarah W.', type: 'Student', date: '2025-05-10', status: 'pending', reward: 0 },
];

const TIER_COLORS = {
  bronze: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', grad: 'from-amber-600 to-amber-800' },
  silver: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', grad: 'from-gray-400 to-gray-600' },
  gold: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', grad: 'from-yellow-400 to-yellow-600' },
  platinum: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', grad: 'from-blue-400 to-blue-600' },
};

export default function AmbassadorPortal() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const amb = MOCK_AMBASSADOR;
  const tier = TIER_COLORS[amb.tier] || TIER_COLORS.gold;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://maelon.co.ke/register?ref=${amb.referral_code}`);
    setCopied(true);
    toast({ title: 'Referral link copied!', description: 'Your referral URL is ready to share.' });
    setTimeout(() => setCopied(false), 2500);
  };

  const conversionRate = Math.round((amb.successful_referrals / amb.total_referrals) * 100);

  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-panel-dark border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-semibold">M</span>
          </div>
          <span className="font-heading text-xl text-white">Maelon<span className="text-brass">.</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1.5 rounded-full border font-semibold capitalize ${tier.bg} ${tier.text} ${tier.border}`}>
            <Award className="w-3 h-3 inline mr-1" />{amb.tier} Ambassador
          </span>
          <Link to="/"><Button variant="ghost" size="sm" className="text-white/50 hover:text-white"><Home className="w-4 h-4" /></Button></Link>
        </div>
      </nav>

      {/* Hero banner */}
      <div className="bg-navy py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brass/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.grad} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-xl">{amb.full_name[0]}</span>
                </div>
                <div>
                  <h1 className="font-heading text-2xl text-white">{amb.full_name}</h1>
                  <p className="text-white/50 text-sm flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />{amb.university}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active Ambassador
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-1">Total Earnings</p>
              <p className="font-heading text-4xl text-brass">KES {amb.total_earnings.toLocaleString()}</p>
              <p className="text-white/40 text-xs mt-1">KES {amb.pending_earnings.toLocaleString()} pending payment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Referrals', value: amb.total_referrals, icon: Users, color: 'text-blue-500' },
            { label: 'Converted', value: amb.successful_referrals, icon: CheckCircle2, color: 'text-emerald-500' },
            { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: 'text-purple-500' },
            { label: 'Paid Out', value: `KES ${amb.paid_earnings.toLocaleString()}`, icon: DollarSign, color: 'text-brass' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-5">
              <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
              <p className="font-heading text-xl font-semibold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-brass/8 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-white font-semibold mb-1">Your Unique Referral Link</p>
            <p className="text-white/50 text-xs mb-4">Share this link to earn commissions on every successful referral</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 font-mono text-white text-sm border border-white/20 min-w-0 truncate">
                maelon.co.ke/register?ref={amb.referral_code}
              </div>
              <Button onClick={handleCopy} className="bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl gap-2 flex-shrink-0">
                {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['WhatsApp', 'Instagram', 'Twitter/X', 'Email'].map(p => (
                <button key={p} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 border border-white/10 transition-all">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Earnings Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Total Earned', value: amb.total_earnings, color: 'bg-brass' },
              { label: 'Paid Out', value: amb.paid_earnings, color: 'bg-emerald-500' },
              { label: 'Pending Payment', value: amb.pending_earnings, color: 'bg-amber-500' },
            ].map(e => (
              <div key={e.label} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-32 flex-shrink-0">{e.label}</span>
                <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full ${e.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(e.value / amb.total_earnings) * 100}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground w-28 text-right">KES {e.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Table */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Referral Activity</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Name', 'Type', 'Date', 'Status', 'Commission'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_ACTIVITY.map((a, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{a.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{a.type}</td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">{a.date}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                        a.status === 'converted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        a.status === 'signed_up' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-muted text-muted-foreground border-border'
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-foreground">{a.reward > 0 ? `KES ${a.reward.toLocaleString()}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout CTA */}
        <div className="bg-gradient-to-r from-brass/10 to-yellow-50 rounded-2xl border border-brass/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground">Ready to withdraw your earnings?</p>
            <p className="text-sm text-muted-foreground mt-1">You have KES {amb.pending_earnings.toLocaleString()} pending. Minimum payout: KES 1,000.</p>
          </div>
          <Button className="bg-brass hover:bg-brass-light text-navy font-semibold rounded-full px-6 flex-shrink-0">
            <DollarSign className="w-4 h-4 mr-1.5" /> Request Payout
          </Button>
        </div>
      </div>
    </div>
  );
}