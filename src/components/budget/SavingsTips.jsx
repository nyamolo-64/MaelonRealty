import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, TrendingDown, Bus, ShoppingCart, Wifi, Coffee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORY_ICONS = { transport: Bus, food: ShoppingCart, internet: Wifi, entertainment: Coffee, general: Lightbulb };
const CATEGORY_COLORS = { transport: 'bg-blue-50 border-blue-200 text-blue-700', food: 'bg-emerald-50 border-emerald-200 text-emerald-700', internet: 'bg-purple-50 border-purple-200 text-purple-700', entertainment: 'bg-pink-50 border-pink-200 text-pink-700', general: 'bg-brass/10 border-brass/20 text-brass' };

export default function SavingsTips({ tips, loading, onFetch, surplus }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-brass/10 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-brass animate-pulse" />
        </div>
        <p className="font-heading text-xl text-foreground">Analysing your budget…</p>
        <p className="text-muted-foreground text-sm mt-2">Generating personalised Nairobi savings tips</p>
        <div className="w-8 h-8 border-2 border-brass/20 border-t-brass rounded-full animate-spin mt-6" />
      </div>
    );
  }

  if (!tips) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brass/10 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-brass" />
        </div>
        <h3 className="font-heading text-2xl text-foreground">AI Savings Advisor</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">Get personalised, Nairobi-specific tips to stretch your student budget further.</p>
        <Button onClick={onFetch} className="mt-6 bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full gap-2">
          <Sparkles className="w-4 h-4" /> Generate My Tips
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary banner */}
      {tips.summary && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy rounded-2xl p-5 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-brass flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-navy" />
          </div>
          <div>
            <p className="text-brass font-semibold text-sm mb-1">AI Financial Summary</p>
            <p className="text-white/80 text-sm leading-relaxed">{tips.summary}</p>
          </div>
        </motion.div>
      )}

      {/* Tips grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(tips.tips || []).map((tip, i) => {
          const category = (tip.category || 'general').toLowerCase();
          const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.general;
          const Icon = CATEGORY_ICONS[category] || Lightbulb;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-5 ${colorClass}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm leading-tight">{tip.title}</p>
                  {tip.potential_saving && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold mt-1 mb-2 bg-white/50 px-2 py-0.5 rounded-full">
                      <TrendingDown className="w-3 h-3" /> Save {tip.potential_saving}
                    </span>
                  )}
                  <p className="text-xs leading-relaxed opacity-80">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button onClick={onFetch} variant="outline" className="w-full gap-2">
        <Sparkles className="w-4 h-4 text-brass" /> Regenerate Tips
      </Button>
    </div>
  );
}