import React from 'react';
import { Check } from 'lucide-react';

export default function OptionCard({ label, description, icon: Icon, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'border-brass bg-brass/5 text-foreground'
          : 'border-border bg-card text-foreground hover:border-brass/30 hover:bg-muted/50'
      }`}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            selected ? 'bg-brass/20 text-brass' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{label}</p>
          {description && <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{description}</p>}
        </div>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-brass flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-navy" />
          </div>
        )}
      </div>
    </button>
  );
}