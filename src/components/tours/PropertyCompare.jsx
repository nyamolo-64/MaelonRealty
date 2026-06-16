import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, MapPin, Ruler } from 'lucide-react';

const COMPARE_ROWS = [
  { label: 'Monthly Rent', key: 'rent', format: v => `KES ${v.toLocaleString()}` },
  { label: 'Area', key: 'area', format: v => v },
  { label: 'Type', key: 'type', format: v => v },
  { label: 'Bedrooms', key: 'specs.beds', format: v => v },
  { label: 'Bathrooms', key: 'specs.baths', format: v => v },
  { label: 'Size', key: 'specs.size', format: v => v },
  { label: 'Floor', key: 'specs.floor', format: v => `${v}th` },
  { label: 'Rating', key: 'rating', format: v => `${v} ★` },
  { label: 'Reviews', key: 'reviews', format: v => `${v} reviews` },
];

function getVal(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

export default function PropertyCompare({ properties, compareList, onToggle }) {
  const [a, b] = compareList;

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Select 2 Properties to Compare</p>
        <div className="flex gap-3 flex-wrap">
          {properties.map(p => (
            <button
              key={p.id}
              onClick={() => onToggle(p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                compareList.find(c => c.id === p.id)
                  ? 'border-brass bg-brass/10 text-brass'
                  : 'border-border text-muted-foreground hover:border-brass/30'
              }`}
            >
              {compareList.find(c => c.id === p.id) ? <Check className="w-3.5 h-3.5" /> : null}
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {a && b ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Property headers */}
          <div className="grid grid-cols-3 border-b border-border">
            <div className="p-4 bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Category</p>
            </div>
            {[a, b].map((prop, idx) => (
              <div key={prop.id} className={`p-4 ${idx === 0 ? 'border-l border-border' : 'border-l border-border'}`}>
                <div className="relative h-24 rounded-xl overflow-hidden mb-3">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-white text-xs font-semibold leading-tight">{prop.title}</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground text-sm">{prop.title}</p>
                <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{prop.area}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-foreground">{prop.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Compare rows */}
          {COMPARE_ROWS.map((row, i) => {
            const valA = getVal(a, row.key);
            const valB = getVal(b, row.key);
            const numA = typeof valA === 'number' ? valA : null;
            const numB = typeof valB === 'number' ? valB : null;
            const betterA = numA !== null && numB !== null && (row.key === 'rent' ? numA < numB : numA > numB);
            const betterB = numA !== null && numB !== null && (row.key === 'rent' ? numB < numA : numB > numA);

            return (
              <div key={row.label} className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-muted/10' : ''}`}>
                <div className="p-3 flex items-center">
                  <span className="text-xs text-muted-foreground font-medium">{row.label}</span>
                </div>
                {[{ prop: a, better: betterA }, { prop: b, better: betterB }].map(({ prop, better }, idx) => (
                  <div key={prop.id} className={`p-3 flex items-center gap-2 border-l border-border ${better ? 'bg-emerald-50' : ''}`}>
                    <span className={`text-sm font-semibold ${better ? 'text-emerald-600' : 'text-foreground'}`}>
                      {row.format(getVal(prop, row.key))}
                    </span>
                    {better && <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><Check className="w-2.5 h-2.5 text-white" /></div>}
                  </div>
                ))}
              </div>
            );
          })}

          {/* Amenities */}
          <div className="grid grid-cols-3 bg-muted/10">
            <div className="p-3 flex items-center">
              <span className="text-xs text-muted-foreground font-medium">Amenities</span>
            </div>
            {[a, b].map(prop => (
              <div key={prop.id} className="p-3 border-l border-border">
                <div className="flex flex-wrap gap-1.5">
                  {prop.amenities.map(am => (
                    <span key={am} className="px-2 py-0.5 bg-brass/10 text-brass text-xs rounded-full">{am}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Ruler className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Select 2 properties above to compare them side by side.</p>
        </div>
      )}
    </div>
  );
}