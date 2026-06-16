import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Wifi, Wrench, Building2, User } from 'lucide-react';

const RATING_CATEGORIES = [
  { key: 'landlord', label: 'Landlord', icon: User, color: '#C5A059' },
  { key: 'building', label: 'Building', icon: Building2, color: '#3b82f6' },
  { key: 'safety', label: 'Safety', icon: Shield, color: '#10b981' },
  { key: 'internet', label: 'Internet', icon: Wifi, color: '#8b5cf6' },
  { key: 'maintenance', label: 'Maintenance', icon: Wrench, color: '#f59e0b' },
];

function StarRow({ score, max = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(score) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
      ))}
    </div>
  );
}

export default function RatingOverview({ property, reviews }) {
  const overallDistribution = [5,4,3,2,1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === stars).length / reviews.length) * 100) : 0
  }));

  return (
    <div className="space-y-6">
      {/* Overall + distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center text-center">
          <p className="font-heading text-6xl font-light text-foreground">{property.overallRating}</p>
          <StarRow score={property.overallRating} />
          <p className="text-muted-foreground text-sm mt-2">Based on {property.totalReviews} reviews</p>
          {property.tags && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {property.tags.map(t => <span key={t} className="px-3 py-1 bg-brass/10 text-brass text-xs rounded-full border border-brass/20">{t}</span>)}
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h4 className="font-semibold text-foreground mb-4">Rating Distribution</h4>
          <div className="space-y-2">
            {overallDistribution.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category ratings */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {RATING_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-2xl border border-border p-4 text-center"
          >
            <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: cat.color + '20' }}>
              <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
            </div>
            <p className="font-bold text-xl text-foreground">{property.ratings[cat.key]?.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{cat.label}</p>
            <div className="flex justify-center mt-1.5">
              <StarRow score={property.ratings[cat.key]} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}