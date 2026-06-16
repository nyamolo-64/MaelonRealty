import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Play, Ruler, MapPin, Bed, Bath, Wifi, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TourViewer({ property }) {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);

  const room = property.rooms[currentRoom];

  return (
    <div className="space-y-5">
      {/* Main Viewer */}
      <div className={`relative rounded-2xl overflow-hidden bg-black ${fullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[420px] sm:h-[500px]'}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentRoom}
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="glass-panel-dark px-3 py-1.5 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-xs font-medium">LIVE 360°</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowMeasurements(s => !s)}
              className={`glass-panel-dark px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${showMeasurements ? 'border-brass text-brass' : 'text-white/70'}`}
            >
              <Ruler className="w-3.5 h-3.5" /> Measurements
            </button>
            <button onClick={() => setFullscreen(f => !f)} className="glass-panel-dark p-2 rounded-xl text-white/70 hover:text-white transition-colors">
              {fullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Measurement overlay */}
        <AnimatePresence>
          {showMeasurements && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="border-2 border-brass/60 rounded-lg w-3/4 h-2/3 relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brass text-navy text-xs font-bold px-2 py-0.5 rounded">
                  {room.size.split(' ')[0]}m
                </div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-brass text-navy text-xs font-bold px-2 py-0.5 rounded rotate-90">
                  {Math.round(parseInt(room.size) * 0.7)}m
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 px-4 py-2 rounded-xl text-center">
                    <p className="text-brass font-bold text-xl">{room.size}</p>
                    <p className="text-white/70 text-xs">{room.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={() => setCurrentRoom(r => (r - 1 + property.rooms.length) % property.rooms.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentRoom(r => (r + 1) % property.rooms.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-heading text-2xl text-white">{property.title}</h3>
              <p className="text-white/60 text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{property.area}</p>
            </div>
            <div className="text-right">
              <p className="text-brass font-bold text-xl">KES {(property.rent / 1000).toFixed(0)}K</p>
              <p className="text-white/50 text-xs">per month</p>
            </div>
          </div>

          {/* Room pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
            {property.rooms.map((r, i) => (
              <button
                key={i}
                onClick={() => setCurrentRoom(i)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === currentRoom ? 'bg-brass text-navy' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {r.name} · {r.size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-semibold text-foreground mb-4">Property Specs</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Bedrooms', value: property.specs.beds, icon: Bed },
              { label: 'Bathrooms', value: property.specs.baths, icon: Bath },
              { label: 'Total Size', value: property.specs.size, icon: Ruler },
              { label: 'Floor', value: `${property.specs.floor}th`, icon: MapPin },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-4 h-4 text-brass" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-semibold text-foreground mb-4">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map(a => (
              <span key={a} className="px-3 py-1.5 bg-brass/10 text-brass text-xs font-medium rounded-full border border-brass/20">{a}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{property.rating}</span>
            <span className="text-muted-foreground text-sm">({property.reviews} tenant reviews)</span>
          </div>
          <Button className="w-full mt-4 bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl">
            Book a Viewing
          </Button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">All Rooms</p>
        <div className="grid grid-cols-4 gap-3">
          {property.rooms.map((r, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.04 }}
              onClick={() => setCurrentRoom(i)}
              className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all ${i === currentRoom ? 'border-brass' : 'border-transparent'}`}
            >
              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-white text-xs font-medium truncate">{r.name}</p>
                <p className="text-white/60 text-[10px]">{r.size}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}