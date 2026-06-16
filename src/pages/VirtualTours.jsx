import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Maximize2, RotateCcw, ChevronLeft, ChevronRight, Ruler, GitCompare, X, Check, MapPin, Bed, Bath, Wifi, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TourViewer from '@/components/tours/TourViewer';
import FloorPlan from '@/components/tours/FloorPlan';
import PropertyCompare from '@/components/tours/PropertyCompare';

const PROPERTIES = [
  {
    id: 1,
    title: '2BR Modern Apartment',
    area: 'Kilimani',
    rent: 28000,
    type: '2 Bedroom',
    rating: 4.8,
    reviews: 34,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    rooms: [
      { name: 'Living Room', size: '18 m²', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80' },
      { name: 'Master Bedroom', size: '14 m²', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80' },
      { name: 'Kitchen', size: '10 m²', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80' },
      { name: 'Bathroom', size: '6 m²', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80' },
    ],
    specs: { beds: 2, baths: 1, size: '65 m²', floor: 4 },
    amenities: ['WiFi', 'Security', 'Parking', 'Water 24/7'],
    videoUrl: null,
  },
  {
    id: 2,
    title: 'Studio Loft',
    area: 'Westlands',
    rent: 18000,
    type: 'Studio',
    rating: 4.6,
    reviews: 22,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    ],
    rooms: [
      { name: 'Main Space', size: '28 m²', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80' },
      { name: 'Kitchen Corner', size: '8 m²', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80' },
      { name: 'Bathroom', size: '5 m²', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80' },
    ],
    specs: { beds: 1, baths: 1, size: '36 m²', floor: 2 },
    amenities: ['WiFi', 'Security', 'Gym Access'],
    videoUrl: null,
  },
  {
    id: 3,
    title: '1BR Cozy Unit',
    area: 'South B',
    rent: 15000,
    type: '1 Bedroom',
    rating: 4.4,
    reviews: 18,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80',
    ],
    rooms: [
      { name: 'Bedroom', size: '13 m²', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80' },
      { name: 'Living Area', size: '15 m²', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80' },
      { name: 'Kitchen', size: '8 m²', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80' },
    ],
    specs: { beds: 1, baths: 1, size: '42 m²', floor: 1 },
    amenities: ['Security', 'Water 24/7', 'Borehole'],
    videoUrl: null,
  },
];

export default function VirtualTours() {
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);
  const [activeTab, setActiveTab] = useState('tour'); // tour | floorplan | compare
  const [compareList, setCompareList] = useState([PROPERTIES[0], PROPERTIES[1]]);

  const toggleCompare = (prop) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === prop.id);
      if (exists) return prev.filter(p => p.id !== prop.id);
      if (prev.length >= 2) return [prev[1], prop];
      return [...prev, prop];
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-navy border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white gap-1.5 px-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
          <div className="h-5 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading font-semibold text-sm">M</span>
            </div>
            <span className="font-heading text-lg text-white">Virtual Tours</span>
          </div>
        </div>
        <div className="flex gap-2">
          {['tour', 'floorplan', 'compare'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-brass text-navy' : 'text-white/50 hover:text-white'
              }`}
            >
              {tab === 'floorplan' ? 'Floor Plan' : tab === 'compare' ? 'Compare' : '360° Tour'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">
        {/* Property List Sidebar */}
        <aside className="lg:w-80 bg-card border-r border-border flex-shrink-0">
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Available Tours</p>
            <div className="space-y-3">
              {PROPERTIES.map(prop => (
                <motion.button
                  key={prop.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedProperty(prop)}
                  className={`w-full text-left rounded-xl overflow-hidden border transition-all ${
                    selectedProperty.id === prop.id ? 'border-brass shadow-lg' : 'border-border hover:border-brass/30'
                  }`}
                >
                  <div className="relative h-28">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                      <div>
                        <p className="text-white text-sm font-semibold leading-tight">{prop.title}</p>
                        <p className="text-white/70 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{prop.area}</p>
                      </div>
                      <span className="text-xs font-bold text-brass bg-navy/80 px-2 py-1 rounded-lg">
                        KES {(prop.rent / 1000).toFixed(0)}K
                      </span>
                    </div>
                    {selectedProperty.id === prop.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brass flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-navy" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-card flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{prop.specs.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{prop.specs.baths}</span>
                      <span className="flex items-center gap-1"><Ruler className="w-3 h-3" />{prop.specs.size}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <Star className="w-3 h-3 fill-current" />{prop.rating}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'tour' && <TourViewer property={selectedProperty} />}
              {activeTab === 'floorplan' && <FloorPlan property={selectedProperty} />}
              {activeTab === 'compare' && (
                <PropertyCompare
                  properties={PROPERTIES}
                  compareList={compareList}
                  onToggle={toggleCompare}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}