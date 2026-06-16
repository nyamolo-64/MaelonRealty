import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, GraduationCap, Phone, CreditCard, Home,
  CheckCircle2, Clock, AlertCircle, Star, Users, Sparkles
} from 'lucide-react';

const VERIFICATION_TYPES = [
  {
    id: 'student',
    label: 'Student Verified',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    description: 'Confirmed active student via .ac.ke email or student ID',
    weight: 20,
    time: 'Instant',
  },
  {
    id: 'university',
    label: 'University Verified',
    icon: GraduationCap,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    description: 'Institution confirmed enrollment via official channels',
    weight: 25,
    time: '1-2 days',
  },
  {
    id: 'phone',
    label: 'Phone Verified',
    icon: Phone,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    description: 'Kenyan mobile number verified via OTP',
    weight: 15,
    time: 'Instant',
  },
  {
    id: 'id',
    label: 'Government ID Verified',
    icon: CreditCard,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    description: 'National ID or passport verified by Maelon trust team',
    weight: 25,
    time: '2-3 days',
  },
  {
    id: 'property',
    label: 'Property Verified',
    icon: Home,
    color: 'text-brass',
    bg: 'bg-brass/10',
    border: 'border-brass/20',
    description: 'Property ownership and listing legitimacy confirmed',
    weight: 15,
    time: '3-5 days',
  },
];

const SAMPLE_PROFILES = [
  {
    name: 'Amina K.',
    initials: 'AK',
    university: 'Strathmore University',
    trust_score: 95,
    badges: ['student', 'university', 'phone', 'id'],
    color: 'from-brass to-brass-dark',
    reviews: 12,
    rating: 4.9,
    since: 'Jan 2025',
  },
  {
    name: 'James M.',
    initials: 'JM',
    university: 'University of Nairobi',
    trust_score: 80,
    badges: ['student', 'phone', 'id'],
    color: 'from-blue-400 to-blue-600',
    reviews: 8,
    rating: 4.7,
    since: 'Mar 2025',
  },
  {
    name: 'Wanjiku N.',
    initials: 'WN',
    university: 'USIU-Africa',
    trust_score: 100,
    badges: ['student', 'university', 'phone', 'id', 'property'],
    color: 'from-emerald-400 to-emerald-600',
    reviews: 24,
    rating: 5.0,
    since: 'Nov 2024',
  },
  {
    name: 'Brian O.',
    initials: 'BO',
    university: 'Kenyatta University',
    trust_score: 60,
    badges: ['student', 'phone'],
    color: 'from-purple-400 to-purple-600',
    reviews: 3,
    rating: 4.5,
    since: 'May 2025',
  },
];

function TrustDonut({ score }) {
  const color = score >= 90 ? '#10b981' : score >= 70 ? '#C5A059' : score >= 50 ? '#3b82f6' : '#ef4444';
  const r = 36, circ = 2 * Math.PI * r;
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="7" />
      <motion.circle
        cx="44" cy="44" r={r} fill="none"
        stroke={color} strokeWidth="7"
        strokeDasharray={`${(score / 100) * circ} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 44 44)"
        initial={{ strokeDasharray: `0 ${circ}` }}
        animate={{ strokeDasharray: `${(score / 100) * circ} ${circ}` }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <text x="44" y="49" textAnchor="middle" fontSize="18" fontWeight="800" fill={color} fontFamily="Inter">{score}</text>
    </svg>
  );
}

function ProfileTrustCard({ profile, index }) {
  const verifiedBadges = VERIFICATION_TYPES.filter(v => profile.badges.includes(v.id));
  const missingBadges = VERIFICATION_TYPES.filter(v => !profile.badges.includes(v.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border p-5"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
          <span className="text-white font-semibold text-sm">{profile.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{profile.name}</h3>
              <p className="text-xs text-muted-foreground">{profile.university}</p>
            </div>
            <TrustDonut score={profile.trust_score} />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-3.5 h-3.5 text-brass fill-brass" />
            <span className="text-xs font-medium text-foreground">{profile.rating}</span>
            <span className="text-xs text-muted-foreground">({profile.reviews} reviews)</span>
            <span className="text-xs text-muted-foreground">· Since {profile.since}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold text-foreground mb-2">Verification Status</p>
        {verifiedBadges.map(badge => (
          <div key={badge.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${badge.bg} border ${badge.border}`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <badge.icon className={`w-3.5 h-3.5 ${badge.color} flex-shrink-0`} />
            <span className={`text-xs font-medium ${badge.color}`}>{badge.label}</span>
          </div>
        ))}
        {missingBadges.map(badge => (
          <div key={badge.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border opacity-50">
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <badge.icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{badge.label}</span>
            <span className="ml-auto text-xs text-muted-foreground">{badge.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TrustSystem() {
  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-64 h-full bg-brass/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-brass" />
              <span className="text-brass font-semibold text-sm uppercase tracking-widest">Maelon Trust System™</span>
            </div>
            <h2 className="font-heading text-3xl text-white font-light">
              5-Layer <span className="italic text-brass">Verification</span>
            </h2>
            <p className="text-white/50 text-sm mt-2 max-w-lg">
              Every student and landlord is verified across 5 dimensions. Your Trust Score reflects the depth of verification completed.
            </p>
          </div>
          <div className="flex gap-4">
            {[
              { v: '2,410', l: 'Verified students' },
              { v: '340', l: 'Verified properties' },
              { v: '98%', l: 'Trust accuracy' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className="font-heading text-2xl text-brass">{s.v}</p>
                <p className="text-white/40 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Types */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Verification Layers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERIFICATION_TYPES.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-2xl p-5 border ${v.bg} ${v.border}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-sm`}>
                  <v.icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold ${v.color}`}>+{v.weight} pts</span>
                  <p className="text-xs text-muted-foreground">{v.time}</p>
                </div>
              </div>
              <p className={`font-semibold text-sm ${v.color}`}>{v.label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Score Examples */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Sample Verified Profiles</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            Trust scores are live & dynamic
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SAMPLE_PROFILES.map((profile, i) => (
            <ProfileTrustCard key={profile.name} profile={profile} index={i} />
          ))}
        </div>
      </div>

      {/* How trust score is calculated */}
      <div className="bg-muted/50 rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">How Your Trust Score is Calculated</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {VERIFICATION_TYPES.map((v, i) => (
            <div key={v.id} className="text-center">
              <div className="w-12 h-12 rounded-full bg-card border-2 border-border mx-auto flex items-center justify-center mb-2">
                <v.icon className={`w-5 h-5 ${v.color}`} />
              </div>
              <p className={`font-bold text-lg ${v.color}`}>{v.weight}</p>
              <p className="text-xs text-muted-foreground">{v.label.replace(' Verified', '')}</p>
              {i < VERIFICATION_TYPES.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-muted-foreground">+</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-brass/10 rounded-xl border border-brass/20 text-center">
          <p className="text-sm text-foreground font-medium">
            Maximum Trust Score: <span className="text-brass font-bold">100 / 100</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Complete all 5 verifications to achieve maximum trust status and get priority placement in search results.
          </p>
        </div>
      </div>
    </div>
  );
}