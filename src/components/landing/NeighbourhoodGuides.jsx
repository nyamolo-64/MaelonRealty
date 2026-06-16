import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Train, Bus, Clock, Coffee, Music, ShoppingBag,
  Utensils, Wifi, TreePine, Star, GraduationCap, ArrowRight, Bike
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const neighborhoods = [
  {
    id: 'westlands',
    name: 'Westlands',
    tagline: 'The Cosmopolitan Hub',
    description: 'Nairobi\'s most vibrant commercial and social district. Perfect for students who love being at the centre of everything — cafés, coworking spaces, and nightlife all within walking distance.',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80',
    avgRent: { min: 18, max: 35 },
    safetyScore: 82,
    vibeScore: 95,
    campuses: [
      { name: 'Strathmore University', distance: '4.2 km', time: '12 min' },
      { name: 'University of Nairobi', distance: '6.1 km', time: '20 min' },
      { name: 'USIU-Africa', distance: '8.3 km', time: '25 min' },
    ],
    transit: [
      { icon: Bus, label: 'Matatus', detail: 'Routes 106, 107, 110 — frequent service' },
      { icon: Bike, label: 'Boda Boda', detail: 'Widely available, 5–15 min rides' },
      { icon: Train, label: 'SGR Shuttle', detail: 'Nearby pickup points for long-distance' },
    ],
    perks: [
      { icon: Coffee, label: 'Café Culture', detail: '20+ cafés & coworking spots' },
      { icon: Wifi, label: 'Fibre Internet', detail: 'High-speed options from KES 2,000/mo' },
      { icon: ShoppingBag, label: 'Shopping', detail: 'Westgate, Sarit Centre nearby' },
      { icon: Utensils, label: 'Food Scene', detail: 'Diverse cuisines, budget friendly options' },
      { icon: Music, label: 'Nightlife', detail: 'Active social scene on weekends' },
    ],
    color: 'from-blue-500 to-indigo-600',
    accent: '#3b82f6',
  },
  {
    id: 'kilimani',
    name: 'Kilimani',
    tagline: 'Quiet Comfort, Urban Access',
    description: 'Upscale, leafy, and peaceful — Kilimani offers the ideal balance of calm residential living with easy access to CBD. A favourite for postgraduate and medical students.',
    image: 'https://images.unsplash.com/photo-1568708167310-6f8e70d1e6ce?w=800&q=80',
    avgRent: { min: 20, max: 45 },
    safetyScore: 90,
    vibeScore: 78,
    campuses: [
      { name: 'University of Nairobi', distance: '3.5 km', time: '10 min' },
      { name: 'Strathmore University', distance: '5.0 km', time: '15 min' },
      { name: 'KCA University', distance: '4.8 km', time: '14 min' },
    ],
    transit: [
      { icon: Bus, label: 'Matatus', detail: 'Routes 46, 48, 111 — regular service' },
      { icon: Bike, label: 'Boda Boda', detail: 'Very available, short neighbourhood rides' },
      { icon: Clock, label: 'Uber/Bolt', detail: 'Reliable ride-hailing, 3–5 min wait' },
    ],
    perks: [
      { icon: TreePine, label: 'Green Spaces', detail: 'Parks & jogging paths throughout' },
      { icon: Coffee, label: 'Brunch Spots', detail: 'Artisan cafés & bakeries' },
      { icon: Utensils, label: 'Restaurants', detail: 'Yaya Centre dining precinct' },
      { icon: Wifi, label: 'Connectivity', detail: 'Fibre widely available' },
      { icon: ShoppingBag, label: 'Convenience', detail: 'Yaya Centre & local markets' },
    ],
    color: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
  },
  {
    id: 'karen',
    name: 'Karen',
    tagline: 'Suburban Serenity',
    description: 'Expansive, green, and quiet. Karen is perfect for students who value space, nature, and a calm study environment. Slightly farther from campus but worth the commute for the lifestyle.',
    image: 'https://images.unsplash.com/photo-1575897441636-51d25e87c921?w=800&q=80',
    avgRent: { min: 25, max: 60 },
    safetyScore: 94,
    vibeScore: 70,
    campuses: [
      { name: 'Strathmore University', distance: '9.4 km', time: '25 min' },
      { name: 'USIU-Africa', distance: '14 km', time: '35 min' },
      { name: 'Kenyatta University', distance: '22 km', time: '55 min' },
    ],
    transit: [
      { icon: Bus, label: 'Matatus', detail: 'Route 111, 125 — less frequent' },
      { icon: Clock, label: 'Uber/Bolt', detail: 'Reliable but 5–10 min wait' },
      { icon: Bike, label: 'Cycling', detail: 'Quiet roads suitable for cycling' },
    ],
    perks: [
      { icon: TreePine, label: 'Nature', detail: 'Karen Blixen park, Oloolua Forest' },
      { icon: Coffee, label: 'Quiet Cafés', detail: 'Low-key study-friendly spots' },
      { icon: Star, label: 'Safety', detail: 'One of Nairobi\'s safest suburbs' },
      { icon: ShoppingBag, label: 'Retail', detail: 'Karen Shopping Centre' },
      { icon: Utensils, label: 'Dining', detail: 'Farm-to-table & local cuisine' },
    ],
    color: 'from-amber-500 to-orange-500',
    accent: '#f59e0b',
  },
  {
    id: 'parklands',
    name: 'Parklands',
    tagline: 'Student Favourite',
    description: 'One of Nairobi\'s most popular student areas. Affordable, well-connected, and full of energy. A thriving community with affordable dining, study groups, and peer networks.',
    image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986bdb?w=800&q=80',
    avgRent: { min: 10, max: 22 },
    safetyScore: 75,
    vibeScore: 88,
    campuses: [
      { name: 'University of Nairobi', distance: '2.1 km', time: '7 min' },
      { name: 'Aga Khan University', distance: '1.5 km', time: '5 min' },
      { name: 'Strathmore University', distance: '6.8 km', time: '20 min' },
    ],
    transit: [
      { icon: Bus, label: 'Matatus', detail: 'Routes 23, 34, 46 — very frequent' },
      { icon: Bike, label: 'Walking / Cycling', detail: 'Many campuses walkable' },
      { icon: Clock, label: 'Uber/Bolt', detail: 'Quick & affordable' },
    ],
    perks: [
      { icon: Utensils, label: 'Budget Eats', detail: 'Chapati, nyama choma from KES 150' },
      { icon: Coffee, label: 'Study Cafés', detail: 'Student-friendly spots everywhere' },
      { icon: Music, label: 'Social Scene', detail: 'Active student community' },
      { icon: ShoppingBag, label: 'Markets', detail: 'Affordable fresh produce nearby' },
      { icon: Wifi, label: 'Internet', detail: 'Competitive fibre packages' },
    ],
    color: 'from-purple-500 to-violet-600',
    accent: '#8b5cf6',
  },
];

function ScoreBar({ label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground w-8 text-right">{value}</span>
    </div>
  );
}

export default function NeighborhoodGuides() {
  const [active, setActive] = useState('westlands');
  const hood = neighborhoods.find(n => n.id === active);

  return (
    <section id="neighborhood-guides" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brass/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brass text-sm font-semibold tracking-widest uppercase"
          >
            Neighbourhood Guides
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mt-3"
          >
            Find Your <span className="italic text-brass">Perfect</span> Area
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg leading-relaxed"
          >
            Campus proximity, transit routes, and lifestyle perks — everything you need to choose where to live.
          </motion.p>
        </div>

        {/* Neighbourhood Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {neighborhoods.map(n => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                active === n.id
                  ? 'text-white border-transparent shadow-lg'
                  : 'border-border text-muted-foreground hover:border-brass/40 hover:text-foreground bg-card'
              }`}
              style={active === n.id ? { background: `linear-gradient(135deg, ${n.accent}, ${n.accent}cc)` } : {}}
            >
              <MapPin className="w-3.5 h-3.5 inline-block mr-1.5 opacity-70" />
              {n.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left — image + scores */}
            <div className="space-y-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src={hood.image}
                  alt={hood.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-brass text-xs font-semibold tracking-widest uppercase">{hood.tagline}</span>
                  <h3 className="font-heading text-3xl font-light text-white mt-1">{hood.name}</h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{hood.description}</p>
                </div>
                {/* Rent badge */}
                <div className="absolute top-4 right-4 glass-panel-dark rounded-xl px-3 py-2 text-center">
                  <p className="text-white/60 text-xs">Avg. Rent</p>
                  <p className="text-brass font-semibold text-sm">KES {hood.avgRent.min}K–{hood.avgRent.max}K</p>
                </div>
              </div>

              {/* Scores */}
              <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
                <h4 className="text-sm font-semibold text-foreground mb-4">Area Scores</h4>
                <ScoreBar label="Safety" value={hood.safetyScore} color={hood.accent} />
                <ScoreBar label="Vibe" value={hood.vibeScore} color={hood.accent} />
                <ScoreBar label="Affordability" value={Math.max(20, 100 - hood.avgRent.max + 10)} color={hood.accent} />
                <ScoreBar label="Transit" value={hood.transit.length >= 3 ? 85 : 65} color={hood.accent} />
              </div>
            </div>

            {/* Right — campus, transit, perks */}
            <div className="space-y-5">
              {/* Campus Proximity */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${hood.accent}20` }}>
                    <GraduationCap className="w-4 h-4" style={{ color: hood.accent }} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">Campus Proximity</h4>
                </div>
                <div className="space-y-3">
                  {hood.campuses.map((c, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: hood.accent }} />
                        <span className="text-sm text-foreground truncate">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {c.distance}
                        </span>
                        <span className="flex items-center gap-1 font-semibold" style={{ color: hood.accent }}>
                          <Clock className="w-3 h-3" /> {c.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transit Options */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${hood.accent}20` }}>
                    <Bus className="w-4 h-4" style={{ color: hood.accent }} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">Getting Around</h4>
                </div>
                <div className="space-y-3">
                  {hood.transit.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                        <t.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.label}</p>
                        <p className="text-xs text-muted-foreground">{t.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Perks */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${hood.accent}20` }}>
                    <Star className="w-4 h-4" style={{ color: hood.accent }} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">Lifestyle Perks</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hood.perks.map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50">
                      <p.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: hood.accent }} />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{p.label}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link to="/roommate-questionnaire">
                <Button className="w-full bg-brass hover:bg-brass-light text-navy font-semibold rounded-full h-12 flex items-center justify-center gap-2 group">
                  Find Rooms in {hood.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}