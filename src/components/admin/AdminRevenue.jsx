import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, BarChart3, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const MONTHLY_REVENUE = [
  { month: 'Jan', premium: 28000, featured: 12000, verification: 8500, subscriptions: 15000, referrals: 4500 },
  { month: 'Feb', premium: 32000, featured: 14000, verification: 9000, subscriptions: 16000, referrals: 5000 },
  { month: 'Mar', premium: 38000, featured: 16000, verification: 11000, subscriptions: 17500, referrals: 6500 },
  { month: 'Apr', premium: 35000, featured: 15000, verification: 10000, subscriptions: 18000, referrals: 6000 },
  { month: 'May', premium: 42000, featured: 18000, verification: 12500, subscriptions: 20000, referrals: 7500 },
  { month: 'Jun', premium: 48000, featured: 20000, verification: 14000, subscriptions: 22000, referrals: 8500 },
];

const REVENUE_BREAKDOWN = [
  { name: 'Premium Listings', value: 48000, color: '#C5A059' },
  { name: 'Featured Listings', value: 20000, color: '#3b82f6' },
  { name: 'Verification Fees', value: 14000, color: '#10b981' },
  { name: 'Subscriptions', value: 22000, color: '#8b5cf6' },
  { name: 'Referral Commission', value: 8500, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: KES {p.value?.toLocaleString()}</p>)}
    </div>
  );
};

export default function AdminRevenue() {
  const totalThisMonth = REVENUE_BREAKDOWN.reduce((a, r) => a + r.value, 0);
  const totalLastMonth = MONTHLY_REVENUE[4] && Object.values(MONTHLY_REVENUE[4]).slice(1).reduce((a, v) => a + v, 0);
  const growth = Math.round(((totalThisMonth - totalLastMonth) / totalLastMonth) * 100);

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue This Month', value: `KES ${totalThisMonth.toLocaleString()}`, sub: `+${growth}% vs last month`, color: 'text-brass' },
          { label: 'Premium Listings', value: 'KES 48,000', sub: '12 active listings', color: 'text-blue-500' },
          { label: 'Verification Fees', value: 'KES 14,000', sub: '28 verifications', color: 'text-emerald-500' },
          { label: 'Referral Revenue', value: 'KES 8,500', sub: '17 conversions', color: 'text-purple-500' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between mb-2">
              <DollarSign className={`w-5 h-5 ${kpi.color}`} />
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> Growing
              </span>
            </div>
            <p className={`font-heading text-xl font-semibold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            <p className="text-xs text-muted-foreground/60">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Over Time */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-1">Revenue by Stream — 6 Months</h3>
        <p className="text-xs text-muted-foreground mb-5">Stacked monthly revenue across all income sources</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={MONTHLY_REVENUE}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="premium" name="Premium Listings" stackId="a" fill="#C5A059" radius={[0,0,0,0]} />
            <Bar dataKey="featured" name="Featured" stackId="a" fill="#3b82f6" />
            <Bar dataKey="verification" name="Verification" stackId="a" fill="#10b981" />
            <Bar dataKey="subscriptions" name="Subscriptions" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="referrals" name="Referrals" stackId="a" fill="#f59e0b" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Revenue Mix — This Month</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={REVENUE_BREAKDOWN} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${(percent*100).toFixed(0)}%`}>
                {REVENUE_BREAKDOWN.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={v => `KES ${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Stream Breakdown</h3>
          <div className="space-y-4">
            {REVENUE_BREAKDOWN.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                <span className="text-sm text-muted-foreground flex-1">{r.name}</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: r.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.value / totalThisMonth) * 100}%` }}
                    transition={{ duration: 0.9, delay: i * 0.1 }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground w-24 text-right">KES {r.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-brass text-lg">KES {totalThisMonth.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['Date', 'Type', 'Description', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-06-06', type: 'premium_listing', desc: '2BR Madaraka — Premium Upgrade', amount: 5000, status: 'completed' },
                { date: '2025-06-05', type: 'verification_fee', desc: '3BR Kasarani — Verification', amount: 500, status: 'completed' },
                { date: '2025-06-05', type: 'referral_commission', desc: 'Amina K. → James M. conversion', amount: 1000, status: 'completed' },
                { date: '2025-06-04', type: 'featured_listing', desc: 'Studio South B — Featured for 30 days', amount: 2000, status: 'completed' },
                { date: '2025-06-04', type: 'subscription', desc: 'Ambassador Gold subscription', amount: 1500, status: 'completed' },
              ].map((t, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground text-xs">{t.date}</td>
                  <td className="px-5 py-3 text-muted-foreground capitalize text-xs">{t.type.replace(/_/g, ' ')}</td>
                  <td className="px-5 py-3 text-foreground">{t.desc}</td>
                  <td className="px-5 py-3 font-semibold text-foreground">KES {t.amount.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}