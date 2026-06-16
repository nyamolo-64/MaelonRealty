import React from 'react';
import { motion } from 'framer-motion';

export default function AffordabilityScore({ score, surplus }) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const r = 52;
  const circ = 2 * Math.PI * r;
  const progress = (clampedScore / 100) * circ;

  const color = clampedScore >= 70 ? '#10b981' : clampedScore >= 40 ? '#C5A059' : '#ef4444';
  const label = clampedScore >= 70 ? 'Affordable' : clampedScore >= 40 ? 'Tight' : 'Over Budget';

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r={r} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${progress} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            initial={{ strokeDasharray: `0 ${circ}` }}
            animate={{ strokeDasharray: `${progress} ${circ}` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <text x="60" y="54" textAnchor="middle" fontSize="22" fontWeight="700" fill={color} fontFamily="Inter">
            {clampedScore}
          </text>
          <text x="60" y="66" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="Inter">
            /100
          </text>
        </svg>
      </div>
      <p className="font-semibold mt-1" style={{ color }}>{label}</p>
      <p className="text-white/40 text-xs">Affordability Score</p>
    </div>
  );
}