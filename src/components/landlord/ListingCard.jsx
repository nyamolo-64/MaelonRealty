import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye, Calendar, MessageCircle, Shield, CheckCircle2, Clock, AlertTriangle, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VERIFICATION_CONFIG = {
  verified: { label: 'Verified', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 },
  under_review: { label: 'Under Review', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: Clock },
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
  flagged: { label: 'Flagged', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', icon: AlertTriangle },
  rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle },
};

export default function ListingCard({ listing, index }) {
  const vc = VERIFICATION_CONFIG[listing.verification_status] || VERIFICATION_CONFIG.pending;
  const VIcon = vc.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
      className={`bg-card rounded-2xl border overflow-hidden hover:shadow-lg transition-all ${listing.featured ? 'border-brass/30' : 'border-border'}`}>
      {listing.featured && (
        <div className="bg-brass/10 border-b border-brass/20 px-5 py-2 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-brass fill-brass" />
          <span className="text-xs text-brass font-semibold">Featured Listing</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-foreground">{listing.title}</h3>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${vc.bg} ${vc.color} ${vc.border}`}>
                <VIcon className="w-3 h-3" />{vc.label}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${listing.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-muted text-muted-foreground border-border'}`}>
                {listing.status === 'available' ? '⚡ Available' : '● Occupied'}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brass" />{listing.area}</span>
              <span>KES {listing.rent?.toLocaleString()}/mo</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{listing.views_count} views</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`font-bold text-xl ${listing.maelon_score >= 90 ? 'text-emerald-600' : listing.maelon_score >= 80 ? 'text-brass' : 'text-muted-foreground'}`}>
              {listing.maelon_score}
            </p>
            <p className="text-xs text-muted-foreground">Maelon Score</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          {listing.pending_viewings > 0 && (
            <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-medium">
              <Calendar className="w-3.5 h-3.5" />{listing.pending_viewings} pending viewings
            </span>
          )}
          {listing.inquiries > 0 && (
            <span className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-medium">
              <MessageCircle className="w-3.5 h-3.5" />{listing.inquiries} inquiries
            </span>
          )}
          {listing.trust_score && (
            <span className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 font-medium">
              <Shield className="w-3.5 h-3.5" />Trust: {listing.trust_score}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          <Button size="sm" variant="outline" className="rounded-full text-xs px-4">Edit Details</Button>
          <Link to="/book-viewing">
            <Button size="sm" variant="outline" className="rounded-full text-xs px-4 gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> View Schedule
            </Button>
          </Link>
          {!listing.featured && (
            <Button size="sm" className="bg-brass/10 text-brass hover:bg-brass/20 border border-brass/20 rounded-full text-xs px-4 gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Upgrade to Featured
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}