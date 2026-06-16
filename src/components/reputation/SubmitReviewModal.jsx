import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['landlord', 'building', 'safety', 'internet', 'maintenance'];

export default function SubmitReviewModal({ onClose, properties }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    property: properties[0].id,
    rating: 0,
    content: '',
    categories: { landlord: 0, building: 0, safety: 0, internet: 0, maintenance: 0 },
    tags: [],
    author: '',
    university: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const TAG_OPTIONS = ['Great Landlord', 'Safe Area', 'Fast WiFi', 'Clean', 'Affordable', 'Slow Maintenance', 'Noisy', 'Water Issues', 'Modern', 'Responsive'];

  const toggleTag = (tag) => setForm(f => ({
    ...f,
    tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag]
  }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-border">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-heading text-2xl text-foreground">Review Submitted!</h3>
          <p className="text-muted-foreground text-sm mt-2">Your review is under moderation and will appear within 24 hours. Thank you for helping fellow students!</p>
          <Button onClick={onClose} className="mt-6 w-full bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl">Done</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-card rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card px-6 pt-5 pb-3 border-b border-border flex items-center justify-between z-10">
          <h3 className="font-semibold text-foreground">Write a Review</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Property select */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Property</label>
            <select value={form.property} onChange={e => setForm(f => ({ ...f, property: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brass/30">
              {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          {/* Overall rating */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Overall Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, rating: s }))}
                  className="transition-transform hover:scale-110">
                  <Star className={`w-8 h-8 ${s <= form.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Category ratings */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Rate Specific Areas</label>
            <div className="space-y-3">
              {CATEGORIES.map(cat => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-foreground w-28">{cat}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setForm(f => ({ ...f, categories: { ...f.categories, [cat]: s } }))}>
                        <Star className={`w-5 h-5 ${s <= form.categories[cat] ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Your Name</label>
              <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                placeholder="First name + initial" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brass/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">University</label>
              <input value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                placeholder="Your university" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brass/30" />
            </div>
          </div>

          {/* Written review */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Your Review</label>
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={4}
              placeholder="Share your honest experience — this helps fellow students make informed decisions..."
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Quick Tags</label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.tags.includes(tag) ? 'border-brass bg-brass/10 text-brass' : 'border-border text-muted-foreground hover:border-brass/30'
                  }`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!form.rating || !form.content || !form.author || loading}
            className="w-full bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl h-12 gap-2"
          >
            {loading ? <><span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />Submitting…</> : 'Submit Review'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}