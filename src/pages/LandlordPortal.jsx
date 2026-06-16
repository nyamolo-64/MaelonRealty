import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Plus, Eye, Calendar, CheckCircle2, Clock, Bell,
  Upload, Shield, Sparkles, LogOut, Settings, BarChart3,
  Home, MessageCircle, ChevronRight, Star, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import ClaimListingModal from '@/components/landlord/ClaimListingModal';
import ViewingSchedule from '@/components/landlord/ViewingSchedule';
import ListingCard from '@/components/landlord/ListingCard';

const TABS = [
  { id: 'listings', label: 'My Listings', icon: Building2 },
  { id: 'viewings', label: 'Viewings', icon: Calendar },
  { id: 'inquiries', label: 'Inquiries', icon: MessageCircle },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const MOCK_LISTINGS = [
  {
    id: '1', title: '2BR Apartment – Madaraka Estate', area: 'Madaraka', rent: 24000,
    status: 'available', verified: true, views_count: 342, featured: true,
    verification_status: 'verified', trust_score: 94, maelon_score: 94,
    pending_viewings: 3, inquiries: 8,
  },
  {
    id: '2', title: 'Studio Bedsitter – South B', area: 'South B', rent: 13000,
    status: 'occupied', verified: true, views_count: 198, featured: false,
    verification_status: 'verified', trust_score: 88, maelon_score: 88,
    pending_viewings: 0, inquiries: 2,
  },
  {
    id: '3', title: '1BR Apartment – Kilimani', area: 'Kilimani', rent: 22000,
    status: 'available', verified: false, views_count: 421, featured: false,
    verification_status: 'under_review', trust_score: 60, maelon_score: 85,
    pending_viewings: 5, inquiries: 14,
  },
];

function Analytics({ listings }) {
  const totalViews = listings.reduce((a, l) => a + (l.views_count || 0), 0);
  const totalInquiries = listings.reduce((a, l) => a + (l.inquiries || 0), 0);
  const totalViewings = listings.reduce((a, l) => a + (l.pending_viewings || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-blue-500' },
          { label: 'Inquiries', value: totalInquiries, icon: MessageCircle, color: 'text-purple-500' },
          { label: 'Pending Viewings', value: totalViewings, icon: Calendar, color: 'text-brass' },
          { label: 'Active Listings', value: listings.filter(l => l.status === 'available').length, icon: Building2, color: 'text-emerald-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <p className="font-heading text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-brass/5 border border-brass/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-brass" />
          <span className="font-semibold text-foreground">AI Recommendations</span>
        </div>
        <div className="space-y-2">
          {[
            'List your Kilimani property — demand is 82% this month',
            'Consider reducing Kilimani rent by KES 2,000 to fill faster',
            'Add more photos to your listings to increase views by 40%',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Inquiries() {
  const inquiries = [
    { name: 'Amina K.', university: 'Strathmore', property: '2BR Madaraka', time: '2hr ago', message: 'Hi, is the property still available? I am interested in viewing it this weekend.' },
    { name: 'James M.', university: 'UoN', property: '1BR Kilimani', time: '5hr ago', message: 'What floor is it on? Does it have parking?' },
    { name: 'Wanjiku N.', university: 'USIU', property: '1BR Kilimani', time: '1 day ago', message: 'Is the price negotiable for a 12-month lease?' },
  ];
  return (
    <div className="space-y-4">
      {inquiries.map((inq, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
                <span className="text-navy text-sm font-semibold">{inq.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{inq.name}</p>
                <p className="text-xs text-muted-foreground">{inq.university} · re: {inq.property}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{inq.time}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted/40 rounded-xl">{inq.message}</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-navy text-white rounded-full text-xs px-4">Reply</Button>
            <Button size="sm" variant="outline" className="rounded-full text-xs px-4">Schedule Viewing</Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function LandlordPortal() {
  const [activeTab, setActiveTab] = useState('listings');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [listings] = useState(MOCK_LISTINGS);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="bg-navy border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading text-lg font-semibold">M</span>
            </div>
            <span className="font-heading text-xl text-white hidden sm:block">Maelon<span className="text-brass">.</span></span>
          </Link>
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          <span className="text-white/60 text-sm hidden sm:block">Landlord Portal</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowClaimModal(true)} size="sm" className="bg-brass hover:bg-brass-light text-navy font-semibold rounded-full gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Claim / Add Listing
          </Button>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Tab Bar */}
      <div className="bg-card border-b border-border sticky top-[65px] z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto hide-scrollbar py-2">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-brass/10 text-brass border border-brass/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {activeTab === 'listings' && (
            <div className="space-y-4">
              {listings.map((listing, i) => <ListingCard key={listing.id} listing={listing} index={i} />)}
            </div>
          )}
          {activeTab === 'viewings' && <ViewingSchedule />}
          {activeTab === 'inquiries' && <Inquiries />}
          {activeTab === 'analytics' && <Analytics listings={listings} />}
        </motion.div>
      </div>

      <AnimatePresence>
        {showClaimModal && <ClaimListingModal onClose={() => setShowClaimModal(false)} />}
      </AnimatePresence>
    </div>
  );
}