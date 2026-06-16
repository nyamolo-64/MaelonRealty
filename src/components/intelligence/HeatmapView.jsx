import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Users, DollarSign, Wifi, Bus, Home, Info } from 'lucide-react';

const AREAS_GEO = [
  { name: 'Westlands', x: 28, y: 22, density: 70, demand: 71, rent: 28000, transport: 86, listings: 45 },
  { name: 'Parklands', x: 35, y: 18, density: 72, demand: 74, rent: 20000, transport: 80, listings: 38 },
  { name: 'Kilimani', x: 34, y: 38, density: 75, demand: 82, rent: 22000, transport: 82, listings: 62 },
  { name: 'Lavington', x: 26, y: 46, density: 65, demand: 66, rent: 25000, transport: 74, listings: 28 },
  { name: 'Kileleshwa', x: 30, y: 42, density: 68, demand: 70, rent: 26000, transport: 76, listings: 31 },
  { name: 'Madaraka', x: 42, y: 54, density: 90, demand: 94, rent: 12000, transport: 91, listings: 124 },
  { name: 'South B', x: 50, y: 58, density: 85, demand: 88, rent: 14000, transport: 84, listings: 98 },
  { name: 'South C', x: 47, y: 64, density: 80, demand: 82, rent: 13000, transport: 80, listings: 76 },
  { name: "Lang'ata", x: 35, y: 70, density: 79, demand: 77, rent: 13500, transport: 75, listings: 55 },
  { name: 'Ngong Road', x: 30, y: 58, density: 80, demand: 80, rent: 15000, transport: 80, listings: 70 },
  { name: 'Kasarani', x: 62, y: 20, density: 88, demand: 91, rent: 10000, transport: 80, listings: 110 },
  { name: 'Ruaka', x: 20, y: 12, density: 82, demand: 85, rent: 11000, transport: 78, listings: 85 },
  { name: 'Kahawa', x: 68, y: 12, density: 85, demand: 87, rent: 8500, transport: 76, listings: 92 },
  { name: 'Embakasi', x: 72, y: 52, density: 76, demand: 74, rent: 9500, transport: 72, listings: 65 },
  { name: 'Rongai', x: 40, y: 85, density: 78, demand: 75, rent: 9000, transport: 68, listings: 58 },
];

const LAYERS = [
  { id: 'density', label: 'Student Density', icon: Users, color: '#8b5cf6', field: 'density' },
  { id: 'demand', label: 'Roommate Demand', icon: Users, color: '#C5A059', field: 'demand' },
  { id: 'rent', label: 'Avg Rent', icon: DollarSign, color: '#10b981', field: 'rent' },
  { id: 'transport', label: 'Transport Access', icon: Bus, color: '#3b82f6', field: 'transport' },
  { id: 'listings', label: 'Active Listings', icon: Home, color: '#f59e0b', field: 'listings' },
];

function getHeatColor(value, max, colorHex) {
  const intensity = value / max;
  const alpha = 0.15 + intensity * 0.7;
  return { opacity: alpha, color: colorHex };
}

function getBubbleSize(value, max) {
  return 18 + (value / max) * 34;
}

export default function HeatmapView() {
  const [activeLayer, setActiveLayer] = useState('density');
  const [hoveredArea, setHoveredArea] = useState(null);

  const layer = LAYERS.find(l => l.id === activeLayer);
  const values = AREAS_GEO.map(a => a[layer.field]);
  const maxVal = Math.max(...values);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Campus Housing Heatmap</h2>
          <p className="text-sm text-muted-foreground mt-1">Interactive student density and demand visualization across Nairobi</p>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-xl border border-border text-xs text-muted-foreground">
          <Info className="w-3.5 h-3.5" /> Hover bubbles for details
        </div>
      </div>

      {/* Layer selector */}
      <div className="flex flex-wrap gap-2">
        {LAYERS.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(l.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              activeLayer === l.id
                ? 'text-white border-transparent'
                : 'bg-card border-border text-muted-foreground hover:border-brass/30'
            }`}
            style={activeLayer === l.id ? { backgroundColor: l.color, borderColor: l.color } : {}}
          >
            <l.icon className="w-3.5 h-3.5" />
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border overflow-hidden relative" style={{ height: '480px' }}>
            {/* Map background - stylized Nairobi grid */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, hsl(220 20% 96%) 0%, hsl(220 20% 92%) 100%)',
            }}>
              {/* Grid lines representing roads */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(222 47% 10%)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Major roads */}
                <line x1="0" y1="240" x2="800" y2="240" stroke="hsl(222 47% 20%)" strokeWidth="2" opacity="0.3" />
                <line x1="400" y1="0" x2="400" y2="600" stroke="hsl(222 47% 20%)" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="360" x2="800" y2="360" stroke="hsl(222 47% 20%)" strokeWidth="1.5" opacity="0.2" />
                <line x1="240" y1="0" x2="240" y2="600" stroke="hsl(222 47% 20%)" strokeWidth="1.5" opacity="0.2" />
                <line x1="560" y1="0" x2="560" y2="600" stroke="hsl(222 47% 20%)" strokeWidth="1.5" opacity="0.2" />
              </svg>
              {/* Nairobi CBD indicator */}
              <div className="absolute" style={{ left: '45%', top: '45%' }}>
                <div className="w-3 h-3 rounded-full bg-navy/40 border-2 border-navy/60" />
                <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-navy/60 font-medium whitespace-nowrap">CBD</span>
              </div>
            </div>

            {/* Heatmap bubbles */}
            {AREAS_GEO.map((area) => {
              const val = area[layer.field];
              const size = getBubbleSize(val, maxVal);
              const { opacity } = getHeatColor(val, maxVal, layer.color);
              const isHovered = hoveredArea?.name === area.name;

              return (
                <motion.div
                  key={area.name}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isHovered ? 20 : 10,
                  }}
                  onMouseEnter={() => setHoveredArea(area)}
                  onMouseLeave={() => setHoveredArea(null)}
                  whileHover={{ scale: 1.2 }}
                >
                  {/* Outer glow */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: size * 1.6,
                      height: size * 1.6,
                      backgroundColor: layer.color,
                      opacity: opacity * 0.3,
                      transform: 'translate(-50%, -50%)',
                      left: '50%',
                      top: '50%',
                    }}
                  />
                  {/* Main bubble */}
                  <div
                    className="rounded-full flex items-center justify-center relative border-2"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: layer.color,
                      opacity: 0.85,
                      borderColor: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <span className="text-white font-bold" style={{ fontSize: Math.max(8, size / 5) }}>
                      {layer.id === 'rent'
                        ? `${(val / 1000).toFixed(0)}K`
                        : layer.id === 'listings'
                          ? val
                          : `${val}%`}
                    </span>
                  </div>
                  {/* Label */}
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-semibold text-navy/80 bg-white/80 px-1.5 py-0.5 rounded-md shadow-sm">
                      {area.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Hover tooltip */}
            {hoveredArea && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 bg-navy/95 rounded-xl p-4 text-white shadow-2xl border border-white/10 z-30 min-w-48"
              >
                <p className="font-semibold text-base mb-2">{hoveredArea.name}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <span className="text-white/50">Student density</span><span className="text-brass font-medium">{hoveredArea.density}%</span>
                  <span className="text-white/50">Roommate demand</span><span className="text-brass font-medium">{hoveredArea.demand}%</span>
                  <span className="text-white/50">Avg rent</span><span className="font-medium">KES {hoveredArea.rent.toLocaleString()}</span>
                  <span className="text-white/50">Active listings</span><span className="font-medium">{hoveredArea.listings}</span>
                  <span className="text-white/50">Transport</span><span className="font-medium">{hoveredArea.transport}%</span>
                </div>
              </motion.div>
            )}

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 rounded-xl p-3 shadow-lg border border-border text-xs">
              <p className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: layer.color }} />
                {layer.label}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Low</span>
                <div className="flex gap-0.5 mx-1">
                  {[0.2, 0.4, 0.6, 0.8, 1].map(o => (
                    <div key={o} className="w-4 h-3 rounded-sm" style={{ backgroundColor: layer.color, opacity: o }} />
                  ))}
                </div>
                <span className="text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Panel */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Top Areas by {layer.label}</h3>
          <p className="text-xs text-muted-foreground mb-4">Ranked highest to lowest</p>
          <div className="space-y-3">
            {[...AREAS_GEO]
              .sort((a, b) => b[layer.field] - a[layer.field])
              .slice(0, 10)
              .map((area, i) => {
                const val = area[layer.field];
                const maxV = Math.max(...AREAS_GEO.map(a => a[layer.field]));
                return (
                  <div key={area.name} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <span className="text-xs font-medium text-foreground w-20 flex-shrink-0 truncate">{area.name}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: layer.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(val / maxV) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06 }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-14 text-right text-foreground">
                      {layer.id === 'rent' ? `KES ${(val/1000).toFixed(0)}K` : layer.id === 'listings' ? val : `${val}%`}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}