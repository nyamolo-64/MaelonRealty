import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Brain, MapPin, DollarSign, Clock, Wifi,
  Shield, Star, Heart, ArrowRight, GraduationCap, Users,
  CheckCircle2, Building2, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PROPERTIES = [
  {
    id: 1,
    name: '2BR Apartment – Madaraka Estate',
    type: '2 Bedroom',
    area: 'Madaraka',
    rent: 24000,
    per_person: 12000,
    commute: 8,
    university: 'Strathmore',
    safety: 90,
    internet: 93,
    maelon_score: 94,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    reasons: [
      'Within your KES 10–15K budget per person',
      '8 minute walk to Strathmore University',
      'Popular among 340+ Strathmore students',
      'Matches your quiet study environment preference',
    ],
    tags: ['Best Value', 'Top Pick'],
    available: 'Now',
    saved: false,
  },
  {
    id: 2,
    name: 'Studio Bedsitter – South B',
    type: 'Studio',
    area: 'South B',
    rent: 13000,
    per_person: 13000,
    commute: 15,
    university: 'Strathmore',
    safety: 75,
    internet: 80,
    maelon_score: 88,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    reasons: [
      'Solo-friendly pricing at KES 13,000/mo',
      '15 minute commute to Strathmore',
      'High student density — easy to find community',
      'Social area matching your outgoing lifestyle',
    ],
    tags: ['Solo-Friendly', 'Social Area'],
    available: 'Now',
    saved: false,
  },
  {
    id: 3,
    name: '3BR House – Kasarani',
    type: '3 Bedroom',
    area: 'Kasarani',
    rent: 30000,
    per_person: 10000,
    commute: 10,
    university: 'USIU-Africa',
    safety: 72,
    internet: 75,
    maelon_score: 86,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
    reasons: [
      'Best per-person price at KES 10,000 with 2 roommates',
      '10 min direct route to USIU-Africa campus',
      'Fastest growing student neighbourhood',
      'Budget-friendly with strong roommate pool',
    ],
    tags: ['Group Living', 'Budget Champion'],
    available: 'In 2 weeks',
    saved: false,
  },
  {
    id: 4,
    name: '1BR Premium – Kilimani',
    type: '1 Bedroom',
    area: 'Kilimani',
    rent: 22000,
    per_person: 11000,
    commute: 5,
    university: 'Strathmore',
    safety: 88,
    internet: 92,
    maelon_score: 85,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    reasons: [
      'Closest to Strathmore — 5 minute walk',
      'Fastest internet in Nairobi student areas',
      'Safest neighbourhood for students',
      'Premium lifestyle at student-friendly split',
    ],
    tags: ['Premium', 'Safest Area'],
    available: 'Now',
    saved: false,
  },
];

const TAG_COLORS = {
  'Best Value': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Top Pick': 'bg-brass/10 text-brass border-brass/20',
  'Solo-Friendly': 'bg-blue-50 text-blue-700 border-blue-200',
  'Social Area': 'bg-purple-50 text-purple-700 border-purple-200',
  'Group Living': 'bg-orange-50 text-orange-700 border-orange-200',
  'Budget Champion': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Premium': 'bg-amber-50 text-amber-700 border-amber-200',
  'Safest Area': 'bg-blue-50 text-blue-700 border-blue-200',
};

function PropertyCard({ property, index }) {
  const [saved, setSaved] = useState(false);
  const [showReasons, setShowReasons] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border overflow-hidden hover:border-brass/30 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.tags.map(tag => (
            <span key={tag} className={`text-xs px-2.5 py-1 rounded-full border font-semibold backdrop-blur-sm ${TAG_COLORS[tag] || 'bg-muted text-muted-foreground border-border'}`}>
              {tag}
            </span>
          ))}
        </div>
        {/* Save button */}
        <button
          onClick={() => setSaved(s => !s)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            saved ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
          }`}
        >
          <Heart className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
        </button>
        {/* Available badge */}
        <div className="absolute bottom-3 right-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            property.available === 'Now'
              ? 'bg-emerald-500 text-white'
              : 'bg-amber-500 text-white'
          }`}>
            {property.available === 'Now' ? '⚡ Available Now' : `📅 ${property.available}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-base leading-tight">{property.name}</h3>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-brass" /> {property.area}
          <span>·</span>
          <GraduationCap className="w-3.5 h-3.5 text-brass" /> {property.university}
        </div>

        {/* Price + Commute */}
        <div className="flex items-center justify-between mt-3 py-3 border-t border-b border-border/50">
          <div>
            <p className="font-bold text-lg text-foreground">KES {property.per_person.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per person/mo</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground flex items-center gap-1 justify-end">
              <Clock className="w-3.5 h-3.5 text-brass" /> {property.commute} min
            </p>
            <p className="text-xs text-muted-foreground">to campus</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-brass">{property.maelon_score}</p>
            <p className="text-xs text-muted-foreground">Maelon Score</p>
          </div>
        </div>

        {/* Mini scores */}
        <div className="flex gap-3 mt-3">
          {[
            { icon: Shield, val: property.safety, label: 'Safety', color: 'text-emerald-500' },
            { icon: Wifi, val: property.internet, label: 'WiFi', color: 'text-blue-500' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className="text-xs font-semibold text-foreground">{s.val}%</span>
            </div>
          ))}
        </div>

        {/* Why recommended */}
        <button
          onClick={() => setShowReasons(r => !r)}
          className="mt-3 flex items-center gap-1.5 text-xs text-brass font-medium hover:opacity-80 transition-opacity"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Why recommended for you?
          <ArrowRight className={`w-3 h-3 transition-transform ${showReasons ? 'rotate-90' : ''}`} />
        </button>

        {showReasons && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.25 }}
            className="mt-3 space-y-2"
          >
            {property.reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                {r}
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            className="w-full bg-navy hover:bg-navy-light text-white rounded-xl text-xs font-semibold"
          >
            View Property
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SmartRecommendations() {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Under KES 10K', 'Near Strathmore', 'Near USIU', 'Group Living'];

  const filtered = PROPERTIES.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Under KES 10K') return p.per_person <= 10000;
    if (filter === 'Near Strathmore') return p.university === 'Strathmore';
    if (filter === 'Near USIU') return p.university === 'USIU-Africa';
    if (filter === 'Group Living') return p.type.includes('BR') && parseInt(p.type) >= 2;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 bottom-0 w-80 h-full bg-brass/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-brass" />
              <span className="text-brass font-semibold text-sm uppercase tracking-widest">AI Recommendations</span>
            </div>
            <h2 className="font-heading text-3xl text-white font-light">
              Recommended <span className="italic text-brass">For You</span>
            </h2>
            <p className="text-white/50 text-sm mt-2">
              AI-curated properties based on your university, budget, lifestyle, and activity patterns.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
            <TrendingUp className="w-5 h-5 text-brass" />
            <div>
              <p className="text-white text-sm font-semibold">94% accuracy</p>
              <p className="text-white/40 text-xs">Match rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation panel */}
      <div className="bg-brass/5 rounded-2xl border border-brass/20 p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brass/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-brass" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">How we personalise recommendations</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                'Search history & browsing patterns',
                'University & campus distance',
                'Budget range & lifestyle preferences',
                'Neighbourhood safety preferences',
                'Sleep & study habits from your profile',
              ].map(r => (
                <span key={r} className="text-xs px-3 py-1 rounded-full bg-brass/10 text-brass border border-brass/20 font-medium">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              filter === f
                ? 'bg-brass/10 border-brass/30 text-brass'
                : 'border-border text-muted-foreground hover:border-brass/20 bg-card'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {filtered.map((property, i) => (
          <PropertyCard key={property.id} property={property} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="bg-card rounded-2xl border border-border p-6 text-center">
        <Brain className="w-10 h-10 text-brass mx-auto mb-3" />
        <h3 className="font-heading text-xl font-semibold text-foreground">Want hyper-personalised recommendations?</h3>
        <p className="text-muted-foreground text-sm mt-2 mb-5">
          Complete the full questionnaire to unlock AI matching based on your exact lifestyle, budget, and preferences.
        </p>
        <Link to="/living-match">
          <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full">
            <Sparkles className="w-4 h-4 mr-2" /> Get My Personalised Match
          </Button>
        </Link>
      </div>
    </div>
  );
}