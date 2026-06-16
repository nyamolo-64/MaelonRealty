import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import {
  Sparkles, Shield, MapPin, GraduationCap, DollarSign, Moon,
  Users, MessageCircle, Heart, LayoutDashboard, Settings, Home,
  Bell, ArrowRight, Filter, CheckCircle2, AlertTriangle, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heuristicScore, aiMatchProfiles } from '@/lib/matchingEngine';
import ChatWindow from '@/components/messaging/ChatWindow';

function getMatchLabel(score) {
  if (score >= 85) return { label: 'Exceptional Match', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 70) return { label: 'Great Match', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' };
  if (score >= 55) return { label: 'Good Match', color: 'text-brass', bg: 'bg-brass/10 border-brass/20' };
  return { label: 'Possible Match', color: 'text-muted-foreground', bg: 'bg-muted border-border' };
}

const AVATAR_COLORS = [
  'from-brass to-brass-dark',
  'from-blue-400 to-blue-600',
  'from-emerald-400 to-emerald-600',
  'from-purple-400 to-purple-600',
  'from-rose-400 to-rose-600',
  'from-cyan-400 to-cyan-600',
];

function avatarColor(id) {
  const idx = (id || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// --- Compatibility Ring ---
function CompatibilityRing({ score, size = 80, isAI = false }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#3b82f6' : score >= 55 ? '#C5A059' : '#94a3b8';
  const bgColor = score >= 85 ? 'rgba(16,185,129,0.08)' : score >= 70 ? 'rgba(59,130,246,0.08)' : score >= 55 ? 'rgba(197,160,89,0.10)' : 'rgba(148,163,184,0.08)';
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill={bgColor} stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${progress} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" fontSize="14" fontWeight="700" fill={color} fontFamily="Inter, sans-serif">
          {score}%
        </text>
        <text x={size / 2} y={size / 2 + 13} textAnchor="middle" fontSize="7" fill={color} opacity="0.7" fontFamily="Inter, sans-serif">
          MATCH
        </text>
      </svg>
      {isAI && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brass flex items-center justify-center shadow">
          <Sparkles className="w-2.5 h-2.5 text-navy" />
        </div>
      )}
    </div>
  );
}

// --- Score Breakdown Bar ---
function ScoreBreakdown({ myProfile, profile }) {
  const dims = [
    {
      label: 'Budget',
      score: (() => {
        if (!myProfile.budget_min || !profile.budget_min) return 50;
        const overlapMin = Math.max(myProfile.budget_min, profile.budget_min);
        const overlapMax = Math.min(myProfile.budget_max, profile.budget_max);
        return overlapMax >= overlapMin ? 100 : Math.max(0, 100 - Math.round(((overlapMin - overlapMax) / myProfile.budget_max) * 200));
      })(),
      color: 'bg-blue-500',
    },
    {
      label: 'Lifestyle',
      score: (() => {
        let pts = 0;
        if (myProfile.sleep_schedule === profile.sleep_schedule) pts += 25;
        if (myProfile.cleanliness === profile.cleanliness) pts += 25;
        if (myProfile.social_level === profile.social_level) pts += 25;
        if (myProfile.smoking === profile.smoking) pts += 25;
        return pts;
      })(),
      color: 'bg-emerald-500',
    },
    {
      label: 'Interests',
      score: (() => {
        const a = myProfile.interests || [], b = profile.interests || [];
        if (!a.length || !b.length) return 40;
        return Math.round((a.filter(x => b.includes(x)).length / Math.max(a.length, b.length)) * 100);
      })(),
      color: 'bg-brass',
    },
    {
      label: 'Location',
      score: (() => {
        const a = myProfile.preferred_location || [], b = profile.preferred_location || [];
        if (!a.length || !b.length) return 40;
        return Math.round((a.filter(x => b.includes(x)).length / Math.max(a.length, b.length)) * 100);
      })(),
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-2 pt-1">
      {dims.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-14 flex-shrink-0">{d.label}</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${d.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, d.score))}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </div>
          <span className="text-xs font-medium text-foreground w-8 text-right">{d.score}%</span>
        </div>
      ))}
    </div>
  );
}

// --- Match Card ---
function MatchCard({ profile, myProfile, aiData, index, onConnect }) {
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const score = aiData?.score ?? heuristicScore(myProfile, profile);
  const { label, color, bg } = getMatchLabel(score);
  const initials = (profile.full_name || '?').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const gradClass = avatarColor(profile.id);
  const isAI = !!aiData?.score;

  const sharedInterests = (myProfile.interests || []).filter((i) => (profile.interests || []).includes(i));
  const sharedLocations = (myProfile.preferred_location || []).filter((l) => (profile.preferred_location || []).includes(l));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="group bg-card rounded-2xl border border-border hover:border-brass/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Header band */}
      <div className="relative bg-gradient-to-r from-navy to-navy-light p-5">
        <div className="flex items-center justify-between gap-3">
          {/* Left: avatar + name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradClass} flex items-center justify-center shadow-md flex-shrink-0`}>
              <span className="text-white text-base font-semibold">{initials}</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-base leading-tight truncate">{profile.full_name}</h3>
              <p className="text-white/50 text-xs truncate flex items-center gap-1 mt-0.5">
                <GraduationCap className="w-3 h-3 flex-shrink-0" /> {profile.university}
              </p>
            </div>
          </div>

          {/* Right: ring + save */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <CompatibilityRing score={score} size={76} isAI={isAI} />
            <button
              onClick={() => setSaved((s) => !s)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${saved ? 'bg-rose-500 text-white' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
            >
              <Heart className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Match label badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${bg} ${color}`}>
            <Sparkles className="w-3 h-3" /> {label}
            {isAI && <span className="opacity-60">· AI</span>}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4 flex-1 flex flex-col">
        {/* Key details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="w-3.5 h-3.5 text-brass flex-shrink-0" />
            <span className="truncate">{profile.year_of_study || '—'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-3.5 h-3.5 text-brass flex-shrink-0" />
            <span className="truncate">
              {profile.budget_min && profile.budget_max
                ? `${(profile.budget_min / 1000).toFixed(0)}K–${(profile.budget_max / 1000).toFixed(0)}K KES`
                : '—'}
            </span>
          </div>
          {profile.sleep_schedule && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Moon className="w-3.5 h-3.5 text-brass flex-shrink-0" />
              <span className="truncate">
                {profile.sleep_schedule === 'Early bird (before 10pm)' ? 'Early Bird'
                  : profile.sleep_schedule === 'Night owl (after midnight)' ? 'Night Owl' : 'Flexible'}
              </span>
            </div>
          )}
          {sharedLocations.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-brass flex-shrink-0" />
              <span className="truncate">{sharedLocations[0]}{sharedLocations.length > 1 ? ` +${sharedLocations.length - 1}` : ''}</span>
            </div>
          )}
        </div>

        {/* Score Breakdown (always visible, compact) */}
        <div className="bg-muted/50 rounded-xl p-3">
          <button
            className="flex items-center justify-between w-full text-left"
            onClick={() => setExpanded(e => !e)}
          >
            <span className="text-xs font-semibold text-foreground">Compatibility Breakdown</span>
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground rotate-90" />
            </motion.span>
          </button>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <ScoreBreakdown myProfile={myProfile} profile={profile} />
            </motion.div>
          )}
        </div>

        {/* AI Reasons */}
        {aiData?.reasons?.length > 0 && (
          <div className="space-y-1.5">
            {aiData.reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        )}

        {/* AI Dealbreakers */}
        {aiData?.dealbreakers?.length > 0 && (
          <div className="space-y-1.5">
            {aiData.dealbreakers.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-amber-700">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        )}

        {/* Shared interests (fallback / always shown if no AI reasons) */}
        {sharedInterests.length > 0 && !aiData?.reasons?.length && (
          <div className="flex flex-wrap gap-1.5">
            {sharedInterests.slice(0, 4).map((i) => (
              <span key={i} className="px-2.5 py-1 bg-brass/10 text-brass text-xs rounded-full font-medium">{i}</span>
            ))}
            {sharedInterests.length > 4 && (
              <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">+{sharedInterests.length - 4}</span>
            )}
          </div>
        )}

        {/* About snippet */}
        {profile.about_me && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{profile.about_me}</p>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" /> Verified
          </div>
          <Button
            size="sm"
            onClick={() => onConnect(profile, score)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Connect
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Sidebar Nav ---
function DashboardNav({ myProfile }) {
  const initials = (myProfile?.full_name || '?').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-navy text-white flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-semibold">M</span>
          </div>
          <span className="font-heading text-xl">Maelon<span className="text-brass">.</span></span>
        </Link>
      </div>

      {/* Profile summary */}
      {myProfile && (
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
              <span className="text-navy text-sm font-semibold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-medium text-sm truncate">{myProfile.full_name}</p>
              <p className="text-white/40 text-xs truncate">{myProfile.university}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <Shield className="w-3 h-3" /> Profile Active
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="p-4 space-y-1 flex-1">
        {[
          { icon: LayoutDashboard, label: 'My Matches', active: true },
          { icon: Users, label: 'Browse Profiles' },
          { icon: Heart, label: 'Saved' },
          { icon: Bell, label: 'Notifications' },
          { icon: Settings, label: 'Profile Settings', href: '/roommate-questionnaire' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.href || '#'}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              item.active ? 'bg-brass/20 text-brass' : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-white/40 hover:text-white text-sm gap-2">
            <Home className="w-4 h-4" /> Back to Homepage
          </Button>
        </Link>
      </div>
    </aside>
  );
}

// --- Filter Bar ---
function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <Filter className="w-4 h-4" /> Sort by:
      </div>
      {['Best Match', 'Budget Fit', 'Shared Interests', 'Location'].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            filter === f
              ? 'border-brass bg-brass/10 text-brass'
              : 'border-border text-muted-foreground hover:border-brass/30 hover:text-foreground'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

// --- Main Dashboard ---
export default function StudentDashboard() {
  const [myProfile, setMyProfile] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);
  const [aiScores, setAiScores] = useState({}); // id -> { score, reasons, dealbreakers }
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [filter, setFilter] = useState('Best Match');
  const [activeChat, setActiveChat] = useState(null); // { profile, score }

  useEffect(() => {
    async function load() {
      const profiles = await base44.entities.RoommateProfile.list('-created_date', 50);
      if (profiles.length > 0) {
        const me = profiles[0];
        const others = profiles.slice(1);
        setMyProfile(me);
        setAllProfiles(others);
        setLoading(false);

        // Fire AI matching in background
        if (others.length > 0) {
          setAiLoading(true);
          const matches = await aiMatchProfiles(me, others);
          const map = {};
          matches.forEach((m) => { map[m.id] = m; });
          setAiScores(map);
          setAiLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getScore = (profile) => aiScores[profile.id]?.score ?? heuristicScore(myProfile, profile);

  // Sort matches
  const sortedProfiles = [...allProfiles].sort((a, b) => {
    if (!myProfile) return 0;
    if (filter === 'Best Match') return getScore(b) - getScore(a);
    if (filter === 'Budget Fit') {
      const budgetMatchA = myProfile.budget_min <= a.budget_max && myProfile.budget_max >= a.budget_min ? 1 : 0;
      const budgetMatchB = myProfile.budget_min <= b.budget_max && myProfile.budget_max >= b.budget_min ? 1 : 0;
      return budgetMatchB - budgetMatchA;
    }
    if (filter === 'Shared Interests') {
      const sharedA = (myProfile.interests || []).filter((i) => (a.interests || []).includes(i)).length;
      const sharedB = (myProfile.interests || []).filter((i) => (b.interests || []).includes(i)).length;
      return sharedB - sharedA;
    }
    if (filter === 'Location') {
      const locA = (myProfile.preferred_location || []).filter((l) => (a.preferred_location || []).includes(l)).length;
      const locB = (myProfile.preferred_location || []).filter((l) => (b.preferred_location || []).includes(l)).length;
      return locB - locA;
    }
    return 0;
  });

  const topScore = myProfile && sortedProfiles.length > 0 ? getScore(sortedProfiles[0]) : null;

  return (
    <>
    <div className="flex min-h-screen bg-mist">
      {/* Sidebar */}
      <DashboardNav myProfile={myProfile} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <div className="lg:hidden glass-panel-dark px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading font-semibold text-sm">M</span>
            </div>
            <span className="font-heading text-lg text-white">Maelon<span className="text-brass">.</span></span>
          </Link>
          <Link to="/roommate-questionnaire">
            <Button size="sm" variant="ghost" className="text-white/70 text-xs">Edit Profile</Button>
          </Link>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
          {loading ? (
            <LoadingSkeleton />
          ) : !myProfile ? (
            <EmptyState />
          ) : (
            <>
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="font-heading text-3xl sm:text-4xl font-light text-foreground">
                  Your <span className="italic text-brass">Matches</span>
                </h1>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <p className="text-muted-foreground text-sm">
                    {sortedProfiles.length} compatible profiles found based on your preferences
                  </p>
                  {aiLoading && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-brass font-medium bg-brass/10 px-3 py-1 rounded-full border border-brass/20">
                      <Loader2 className="w-3 h-3 animate-spin" /> AI analysing matches…
                    </span>
                  )}
                  {!aiLoading && Object.keys(aiScores).length > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <Sparkles className="w-3 h-3" /> AI-powered scores ready
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Stats Strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              >
                {[
                  { label: 'Total Matches', value: sortedProfiles.length, icon: Users, color: 'text-brass' },
                  { label: 'Top Score', value: topScore ? `${topScore}%` : '—', icon: Sparkles, color: 'text-emerald-600' },
                  {
                    label: 'Budget Aligned',
                    value: sortedProfiles.filter((p) =>
                      myProfile.budget_min <= p.budget_max && myProfile.budget_max >= p.budget_min
                    ).length,
                    icon: DollarSign, color: 'text-blue-600',
                  },
                  {
                    label: 'Same University',
                    value: sortedProfiles.filter((p) => p.university === myProfile.university).length,
                    icon: GraduationCap, color: 'text-purple-600',
                  },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-semibold text-foreground">{stat.value}</p>
                      <p className="text-muted-foreground text-xs">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* My Profile Banner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="bg-navy rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
                    <span className="text-navy font-semibold">
                      {(myProfile.full_name || '?').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold">{myProfile.full_name}</p>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Active
                      </span>
                    </div>
                    <p className="text-white/50 text-sm truncate">{myProfile.university} · {myProfile.year_of_study} · KES {(myProfile.budget_min / 1000).toFixed(0)}K–{(myProfile.budget_max / 1000).toFixed(0)}K /mo</p>
                  </div>
                </div>
                <Link to="/roommate-questionnaire" className="flex-shrink-0">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 rounded-full text-xs">
                    <Settings className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
                  </Button>
                </Link>
              </motion.div>

              {/* Filter Bar */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
                <FilterBar filter={filter} setFilter={setFilter} />
              </motion.div>

              {/* Match Grid */}
              {sortedProfiles.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading text-2xl text-foreground">No other profiles yet</h3>
                  <p className="text-muted-foreground mt-2">Share Maelon with fellow students to grow the matching pool!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {sortedProfiles.map((profile, i) => (
                    <MatchCard
                      key={profile.id}
                      profile={profile}
                      myProfile={myProfile}
                      aiData={aiScores[profile.id]}
                      index={i}
                      onConnect={(p, s) => setActiveChat({ profile: p, score: s })}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

    {/* Floating Chat Window */}
    <AnimatePresence>
      {activeChat && myProfile && (
        <ChatWindow
          myProfile={myProfile}
          otherProfile={activeChat.profile}
          matchScore={activeChat.score}
          onClose={() => setActiveChat(null)}
        />
      )}
    </AnimatePresence>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-muted rounded-xl w-64" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-muted rounded-2xl" />)}
      </div>
      <div className="h-16 bg-muted rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => <div key={i} className="h-72 bg-muted rounded-2xl" />)}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-full bg-brass/10 flex items-center justify-center mb-6">
        <Users className="w-10 h-10 text-brass" />
      </div>
      <h2 className="font-heading text-3xl font-light text-foreground">No Profile Found</h2>
      <p className="text-muted-foreground mt-3 max-w-sm leading-relaxed">
        Complete the roommate questionnaire first to create your profile and see your compatibility matches.
      </p>
      <Link to="/roommate-questionnaire" className="mt-8">
        <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Create My Profile
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}