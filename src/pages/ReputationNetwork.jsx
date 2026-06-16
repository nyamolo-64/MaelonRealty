import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Shield, Wifi, Wrench, AlertTriangle, ThumbsUp, MessageSquare, Building2, User, Plus, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import ReviewCard from '@/components/reputation/ReviewCard';
import RatingOverview from '@/components/reputation/RatingOverview';
import SubmitReviewModal from '@/components/reputation/SubmitReviewModal';

const MOCK_PROPERTIES = [
  {
    id: 'prop1',
    name: 'Kilimani Heights — Block A',
    area: 'Kilimani',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    overallRating: 4.6,
    totalReviews: 48,
    ratings: { landlord: 4.7, building: 4.5, safety: 4.8, internet: 4.2, maintenance: 4.3 },
    tags: ['Fast WiFi', 'Secure', 'Clean', 'Responsive Landlord'],
  },
  {
    id: 'prop2',
    name: 'Westlands Studio Complex',
    area: 'Westlands',
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&q=80',
    overallRating: 4.1,
    totalReviews: 31,
    ratings: { landlord: 3.9, building: 4.3, safety: 4.5, internet: 4.8, maintenance: 3.7 },
    tags: ['Great Internet', 'Modern', 'Pricey'],
  },
  {
    id: 'prop3',
    name: 'South B Family Flats',
    area: 'South B',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
    overallRating: 3.8,
    totalReviews: 24,
    ratings: { landlord: 3.5, building: 4.0, safety: 3.6, internet: 3.2, maintenance: 3.4 },
    tags: ['Affordable', 'Quiet Area', 'Slow Maintenance'],
  },
];

const MOCK_REVIEWS = [
  {
    id: 1, propertyId: 'prop1', author: 'Amina K.', university: 'Strathmore University', rating: 5,
    date: '2 weeks ago', verified: true, type: 'tenant',
    content: "Lived here for 8 months. The landlord is incredibly responsive — any issue gets fixed within 2-3 days. Security is top notch, always feel safe coming home late after studying. WiFi is reliable for remote studying and Zoom calls.",
    helpful: 24, categories: { landlord: 5, safety: 5, internet: 4, maintenance: 5 },
    tags: ['Great Landlord', 'Safe', 'Good WiFi']
  },
  {
    id: 2, propertyId: 'prop1', author: 'Brian O.', university: 'University of Nairobi', rating: 4,
    date: '1 month ago', verified: true, type: 'tenant',
    content: "Solid place overall. The building is well-maintained and the caretaker is helpful. Only downside is occasional water shortages during dry season, but the borehole usually kicks in within hours.",
    helpful: 17, categories: { landlord: 4, safety: 5, internet: 4, maintenance: 4 },
    tags: ['Clean', 'Water Issues (Occasional)']
  },
  {
    id: 3, propertyId: 'prop2', author: 'Cynthia M.', university: 'USIU-Africa', rating: 4,
    date: '3 weeks ago', verified: true, type: 'tenant',
    content: "The internet here is absolutely blazing — I stream, work and attend online classes without any issues. Landlord responds via WhatsApp quickly. Bit expensive but worth it for the location and amenities.",
    helpful: 31, categories: { landlord: 4, safety: 5, internet: 5, maintenance: 4 },
    tags: ['Best Internet', 'Expensive but Worth It']
  },
  {
    id: 4, propertyId: 'prop3', author: 'David N.', university: 'Kenyatta University', rating: 3,
    date: '2 months ago', verified: false, type: 'tenant',
    content: "Maintenance takes forever. Reported a leaking pipe in October, was only fixed in December. The area itself is quiet and safe, and rent is the best in Nairobi for the size. Just don't expect quick repairs.",
    helpful: 12, categories: { landlord: 3, safety: 4, internet: 3, maintenance: 2 },
    tags: ['Slow Maintenance', 'Affordable', 'Quiet']
  },
];

const TABS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'reviews', label: 'All Reviews', icon: MessageSquare },
  { id: 'safety', label: 'Safety Reports', icon: Shield },
  { id: 'internet', label: 'Internet Quality', icon: Wifi },
];

export default function ReputationNetwork() {
  const [selectedProperty, setSelectedProperty] = useState(MOCK_PROPERTIES[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filterRating, setFilterRating] = useState(0);

  const propertyReviews = MOCK_REVIEWS.filter(r => r.propertyId === selectedProperty.id);
  const filtered = propertyReviews.filter(r => r.rating >= filterRating);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-navy border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="sm" className="text-white/60 hover:text-white gap-1.5 px-2"><ArrowLeft className="w-4 h-4" />Back</Button></Link>
          <div className="h-5 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brass flex items-center justify-center">
              <Shield className="w-4 h-4 text-navy" />
            </div>
            <span className="font-heading text-lg text-white">Reputation Network</span>
          </div>
        </div>
        <Button onClick={() => setShowSubmitModal(true)} className="bg-brass hover:bg-brass-light text-navy text-xs font-semibold rounded-full px-4 h-8 gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Write Review
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">
        {/* Sidebar: Property List */}
        <aside className="lg:w-80 bg-card border-r border-border flex-shrink-0">
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Properties</p>
            <div className="space-y-3">
              {MOCK_PROPERTIES.map(prop => (
                <motion.button
                  key={prop.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedProperty(prop)}
                  className={`w-full text-left rounded-xl overflow-hidden border transition-all ${
                    selectedProperty.id === prop.id ? 'border-brass shadow-lg' : 'border-border hover:border-brass/30'
                  }`}
                >
                  <div className="flex items-center gap-3 p-3">
                    <img src={prop.image} alt={prop.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground leading-tight truncate">{prop.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{prop.area}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-3 h-3 ${s <= Math.round(prop.overallRating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{prop.overallRating} ({prop.totalReviews})</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Property Header */}
          <motion.div
            key={selectedProperty.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden mb-6 h-48"
          >
            <img src={selectedProperty.image} alt={selectedProperty.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-heading text-2xl text-white font-light">{selectedProperty.name}</h2>
                  <p className="text-white/60 text-sm">{selectedProperty.area} · {selectedProperty.totalReviews} verified reviews</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-white text-2xl font-bold">{selectedProperty.overallRating}</span>
                  </div>
                  <p className="text-white/50 text-xs">Overall Rating</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-brass/10 text-brass border border-brass/20' : 'text-muted-foreground hover:text-foreground bg-muted/50'
                }`}>
                <tab.icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab + selectedProperty.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {activeTab === 'overview' && <RatingOverview property={selectedProperty} reviews={propertyReviews} />}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Min rating:</span>
                    {[0, 3, 4, 5].map(r => (
                      <button key={r} onClick={() => setFilterRating(r)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filterRating === r ? 'bg-brass text-navy' : 'bg-muted text-muted-foreground hover:bg-muted/70'}`}>
                        {r === 0 ? 'All' : `${r}★+`}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {filtered.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">No reviews match this filter.</div>
                    ) : (
                      filtered.map((review, i) => <ReviewCard key={review.id} review={review} index={i} />)
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'safety' && <SafetyReport property={selectedProperty} />}
              {activeTab === 'internet' && <InternetReport property={selectedProperty} reviews={propertyReviews} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showSubmitModal && <SubmitReviewModal onClose={() => setShowSubmitModal(false)} properties={MOCK_PROPERTIES} />}
      </AnimatePresence>
    </div>
  );
}

function SafetyReport({ property }) {
  const safetyItems = [
    { label: 'Perimeter Security', score: 4.8, detail: 'Guarded gate 24/7' },
    { label: 'CCTV Coverage', score: 4.5, detail: 'All common areas covered' },
    { label: 'Lighting (Night)', score: 4.2, detail: 'Good but some dark corners' },
    { label: 'Fire Safety', score: 4.0, detail: 'Extinguishers present' },
    { label: 'Neighborhood Safety', score: property.ratings.safety, detail: 'Community rating' },
  ];
  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-emerald-900">Safety Score: {property.ratings.safety}/5</p>
            <p className="text-emerald-700 text-sm">Based on tenant reports</p>
          </div>
        </div>
        <div className="space-y-3">
          {safetyItems.map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-900">{item.label}</p>
                <p className="text-xs text-emerald-600">{item.detail}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full bg-emerald-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(item.score / 5) * 100}%` }} />
                </div>
                <span className="text-sm font-semibold text-emerald-800 w-8">{item.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternetReport({ property, reviews }) {
  const score = property.ratings.internet;
  const label = score >= 4.5 ? 'Excellent' : score >= 4 ? 'Good' : score >= 3 ? 'Average' : 'Poor';
  const speedEst = score >= 4.5 ? '30–50 Mbps' : score >= 4 ? '15–30 Mbps' : '5–15 Mbps';
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Internet Quality: {label} ({score}/5)</p>
            <p className="text-blue-700 text-sm">Estimated speed: {speedEst}</p>
          </div>
        </div>
        {[
          { label: 'Reliability (uptime)', score: score * 0.95 },
          { label: 'Speed for streaming', score: score * 1.05 },
          { label: 'Speed for video calls', score: score },
          { label: 'Router placement / coverage', score: score * 0.9 },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between mb-2">
            <p className="text-sm text-blue-900">{item.label}</p>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-blue-200 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (item.score / 5) * 100)}%` }} />
              </div>
              <span className="text-xs font-semibold text-blue-800 w-8">{Math.min(5, item.score).toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}