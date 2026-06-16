import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Shield, GraduationCap } from 'lucide-react';

export default function ReviewCard({ review, index }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const handleHelpful = () => {
    if (!voted) { setHelpful(h => h + 1); setVoted(true); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-card rounded-2xl border border-border p-5 hover:border-brass/20 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
          <span className="text-navy font-semibold text-sm">{review.author[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-sm">{review.author}</p>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                    <Shield className="w-3 h-3" /> Verified Tenant
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <GraduationCap className="w-3 h-3" />{review.university} · {review.date}
              </p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mt-3">{review.content}</p>

          {/* Sub-ratings */}
          {review.categories && (
            <div className="flex flex-wrap gap-2 mt-3">
              {Object.entries(review.categories).map(([cat, score]) => (
                <span key={cat} className="flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1 rounded-full">
                  <span className="text-muted-foreground capitalize">{cat}:</span>
                  <span className="font-semibold text-foreground">{score}/5</span>
                </span>
              ))}
            </div>
          )}

          {/* Tags */}
          {review.tags && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {review.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-brass/10 text-brass text-xs rounded-full border border-brass/20">{tag}</span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
            <button
              onClick={handleHelpful}
              className={`flex items-center gap-1.5 text-xs transition-all ${voted ? 'text-emerald-600 font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({helpful})
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}