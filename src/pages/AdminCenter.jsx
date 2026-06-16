import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Home, Shield, BarChart3, Bell, Settings, CheckCircle2,
  Flag, TrendingUp, DollarSign, MessageCircle, Eye, UserCheck,
  Building2, Sparkles, AlertTriangle, Clock, ChevronRight, LogOut
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import AdminVerification from '@/components/admin/AdminVerification';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminRevenue from '@/components/admin/AdminRevenue';
import AdminLeads from '@/components/admin/AdminLeads';
import AdminNotifications from '@/components/admin/AdminNotifications';

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'leads', label: 'CRM / Leads', icon: TrendingUp },
  { id: 'verification', label: 'Verification', icon: Shield },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

function StatCard({ label, value, sub, icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card rounded-2xl border border-border p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <p className="font-heading text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </motion.div>
  );
}

function Overview({ stats }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.users} sub="Active on platform" icon={Users} color="text-blue-500" delay={0} />
        <StatCard label="Listed Properties" value={stats.properties} sub="Across Nairobi" icon={Building2} color="text-brass" delay={0.07} />
        <StatCard label="Pending Verifications" value={stats.pendingVerif} sub="Needs review" icon={Shield} color="text-orange-500" delay={0.14} />
        <StatCard label="Revenue (Month)" value={`KES ${stats.monthRevenue}`} sub="All streams" icon={DollarSign} color="text-emerald-500" delay={0.21} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Leads" value={stats.leads} sub="In pipeline" icon={TrendingUp} color="text-purple-500" delay={0.07} />
        <StatCard label="Viewing Requests" value={stats.viewings} sub="This week" icon={Eye} color="text-blue-400" delay={0.14} />
        <StatCard label="Roommate Matches" value={stats.matches} sub="This month" icon={UserCheck} color="text-emerald-500" delay={0.21} />
        <StatCard label="Open Support" value={stats.support} sub="Unresolved" icon={MessageCircle} color="text-rose-500" delay={0.28} />
      </div>

      {/* Quick Actions */}
      <div className="bg-navy rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Review Properties', icon: Shield, href: '#verification' },
            { label: 'View CRM', icon: TrendingUp, href: '#leads' },
            { label: 'Revenue Report', icon: DollarSign, href: '#revenue' },
            { label: 'Send Notification', icon: Bell, href: '#notifications' },
          ].map(a => (
            <button
              key={a.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-brass/20 border border-white/10 hover:border-brass/30 transition-all group"
            >
              <a.icon className="w-6 h-6 text-brass" />
              <span className="text-white/70 text-xs font-medium text-center">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { icon: UserCheck, text: 'New landlord registration: John M. — Kilimani property', time: '2 min ago', color: 'text-emerald-500' },
            { icon: Shield, text: 'Property verification requested: 2BR Madaraka Estate', time: '14 min ago', color: 'text-orange-500' },
            { icon: Eye, text: 'Viewing scheduled: Amina K. → South B Studio', time: '32 min ago', color: 'text-blue-500' },
            { icon: Flag, text: 'Suspicious listing flagged by AI: Westlands 1BR', time: '1hr ago', color: 'text-rose-500' },
            { icon: TrendingUp, text: 'New lead converted: Brian O. signed lease in Kasarani', time: '2hr ago', color: 'text-brass' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <a.icon className={`w-4 h-4 ${a.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    users: 2410, properties: 340, pendingVerif: 18, monthRevenue: '142,500',
    leads: 87, viewings: 34, matches: 156, support: 6
  });

  const ActiveComponent = {
    overview: () => <Overview stats={stats} />,
    leads: AdminLeads,
    verification: AdminVerification,
    users: AdminUsers,
    revenue: AdminRevenue,
    notifications: AdminNotifications,
  }[activeTab];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Nav */}
      <nav className="bg-navy border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading text-lg font-semibold">M</span>
            </div>
            <span className="font-heading text-xl text-white hidden sm:block">Maelon<span className="text-brass">.</span></span>
          </Link>
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          <span className="text-white/60 text-sm hidden sm:block">Admin Control Center</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">● System Live</span>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-xs gap-1.5">
              <LogOut className="w-3.5 h-3.5" /> Exit Admin
            </Button>
          </Link>
        </div>
      </nav>

      {/* Tab Bar */}
      <div className="bg-card border-b border-border sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto hide-scrollbar py-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-brass/10 text-brass border border-brass/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
}