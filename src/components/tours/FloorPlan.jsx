import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Info } from 'lucide-react';

const FLOOR_PLANS = {
  1: {
    rooms: [
      { id: 'living', label: 'Living Room', size: '18 m²', x: 10, y: 10, w: 45, h: 35, color: '#C5A05920' },
      { id: 'master', label: 'Master Bed', size: '14 m²', x: 57, y: 10, w: 35, h: 35, color: '#3b82f620' },
      { id: 'bedroom2', label: 'Bedroom 2', size: '12 m²', x: 57, y: 47, w: 35, h: 28, color: '#8b5cf620' },
      { id: 'kitchen', label: 'Kitchen', size: '10 m²', x: 10, y: 47, w: 30, h: 28, color: '#10b98120' },
      { id: 'bathroom', label: 'Bathroom', size: '6 m²', x: 42, y: 47, w: 13, h: 28, color: '#f59e0b20' },
    ]
  },
  2: {
    rooms: [
      { id: 'main', label: 'Main Space', size: '28 m²', x: 10, y: 10, w: 55, h: 60, color: '#C5A05920' },
      { id: 'kitchen', label: 'Kitchen', size: '8 m²', x: 67, y: 10, w: 25, h: 28, color: '#10b98120' },
      { id: 'bathroom', label: 'Bathroom', size: '5 m²', x: 67, y: 42, w: 25, h: 28, color: '#f59e0b20' },
    ]
  },
  3: {
    rooms: [
      { id: 'living', label: 'Living', size: '15 m²', x: 10, y: 10, w: 40, h: 40, color: '#C5A05920' },
      { id: 'bedroom', label: 'Bedroom', size: '13 m²', x: 52, y: 10, w: 40, h: 40, color: '#3b82f620' },
      { id: 'kitchen', label: 'Kitchen', size: '8 m²', x: 10, y: 52, w: 30, h: 30, color: '#10b98120' },
      { id: 'bathroom', label: 'Bathroom', size: '5 m²', x: 42, y: 52, w: 20, h: 30, color: '#f59e0b20' },
    ]
  }
};

export default function FloorPlan({ property }) {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const plan = FLOOR_PLANS[property.id] || FLOOR_PLANS[1];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Ruler className="w-4 h-4 text-brass" /> Interactive Floor Plan
          </h3>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Hover rooms for details</span>
        </div>

        {/* SVG Floor Plan */}
        <div className="relative w-full aspect-[4/3] bg-muted/30 rounded-xl border border-border overflow-hidden">
          <svg viewBox="0 0 100 85" className="w-full h-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="85" fill="url(#grid)" />

            {/* Outer walls */}
            <rect x="8" y="8" width="84" height="68" fill="none" stroke="#0A1128" strokeWidth="1.5" rx="1" />

            {/* Rooms */}
            {plan.rooms.map(room => (
              <g key={room.id} onMouseEnter={() => setHoveredRoom(room)} onMouseLeave={() => setHoveredRoom(null)}
                style={{ cursor: 'pointer' }}>
                <motion.rect
                  x={room.x} y={room.y} width={room.w} height={room.h}
                  fill={hoveredRoom?.id === room.id ? room.color.replace('20', '50') : room.color}
                  stroke={hoveredRoom?.id === room.id ? '#C5A059' : '#0A1128'}
                  strokeWidth={hoveredRoom?.id === room.id ? '0.8' : '0.4'}
                  rx="0.5"
                  style={{ transition: 'fill 0.2s, stroke 0.2s' }}
                />
                <text x={room.x + room.w / 2} y={room.y + room.h / 2 - 1.5}
                  textAnchor="middle" fontSize="3" fill="#0A1128" fontWeight="600">
                  {room.label}
                </text>
                <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 3.5}
                  textAnchor="middle" fontSize="2.5" fill="#666">
                  {room.size}
                </text>
              </g>
            ))}

            {/* Compass */}
            <text x="94" y="5" textAnchor="middle" fontSize="3" fill="#C5A059" fontWeight="700">N</text>
            <path d="M 94 6 L 94 9" stroke="#C5A059" strokeWidth="0.4" />
          </svg>

          {/* Hover tooltip */}
          {hoveredRoom && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3 bg-navy text-white px-4 py-3 rounded-xl shadow-xl pointer-events-none"
            >
              <p className="font-semibold text-sm">{hoveredRoom.label}</p>
              <p className="text-brass text-lg font-bold">{hoveredRoom.size}</p>
              <p className="text-white/50 text-xs">Tap to view in tour</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {plan.rooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl border border-border p-4 hover:border-brass/30 transition-all"
          >
            <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center" style={{ background: room.color }}>
              <Ruler className="w-4 h-4 text-foreground" />
            </div>
            <p className="font-semibold text-foreground text-sm">{room.label}</p>
            <p className="text-brass font-bold text-lg mt-0.5">{room.size}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}