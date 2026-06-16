import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, ArrowRight, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PREMIUM_IMG = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/e1f179b93_generated_e6dc0c25.png';
const PREMIUM_INT = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/a22959e3d_generated_137f3c1f.png';
const KILIMANI = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/52d844b99_generated_7840f324.png';
const KAREN = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/d0294d997_generated_f3858d74.png';

const properties = [
  {
    id: 1,
    title: 'Westlands Penthouse',
    subtitle: 'The Pinnacle of Urban Living',
    image: PREMIUM_IMG,
    price: 'KES 45M',
    type: 'Sale',
    location: 'Westlands, Nairobi',
    beds: 4,
    baths: 3,
    sqft: '3,200 sq ft',
    featured: true,
  },
  {
    id: 2,
    title: 'Kilimani Garden Apartment',
    subtitle: 'Contemporary Elegance',
    image: KILIMANI,
    price: 'KES 120K',
    type: 'Rent/mo',
    location: 'Kilimani, Nairobi',
    beds: 3,
    baths: 2,
    sqft: '2,100 sq ft',
    featured: false,
  },
  {
    id: 3,
    title: 'Karen Family Estate',
    subtitle: 'Serene Suburban Luxury',
    image: KAREN,
    price: 'KES 85M',
    type: 'Sale',
    location: 'Karen, Nairobi',
    beds: 5,
    baths: 4,
    sqft: '5,500 sq ft',
    featured: false,
  },
  {
    id: 4,
    title: 'Lavington Modern Villa',
    subtitle: 'Architectural Masterpiece',
    image: PREMIUM_INT,
    price: 'KES 65M',
    type: 'Sale',
    location: 'Lavington, Nairobi',
    beds: 4,
    baths: 3,
    sqft: '4,000 sq ft',
    featured: false,
  },
];

export default function PremiumProperties() {
  const [featured, ...rest] = properties;

  return (
    <section id="premium" className="py-24 bg-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brass/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brass/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brass text-sm font-semibold tracking-widest uppercase"
          >
            Premium Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-white mt-3"
          >
            Exceptional <span className="italic text-brass">Residences</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 max-w-lg mx-auto text-lg leading-relaxed"
          >
            Curated properties for discerning buyers and investors seeking
            the finest in Nairobi real estate.
          </motion.p>
        </div>

        {/* Featured + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Property */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden lg:row-span-2"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full min-h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-brass transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-4 py-1.5 bg-brass text-navy text-xs font-bold rounded-full mb-4">
                Featured • {featured.type}
              </span>
              <h3 className="font-heading text-3xl font-light text-white">{featured.title}</h3>
              <p className="text-white/50 text-sm mt-1">{featured.subtitle}</p>
              <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{featured.location}</span>
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{featured.beds} Beds</span>
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{featured.baths} Baths</span>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-3xl font-heading text-brass">{featured.price}</span>
                <Button className="bg-brass hover:bg-brass-light text-navy font-semibold rounded-full px-6">
                  View Property
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Other Properties */}
          {rest.map((prop, i) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-panel rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-brass/90 text-navy text-xs font-bold rounded-full">
                  {prop.type}
                </span>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-white text-lg">{prop.title}</h3>
                  <p className="text-white/40 text-sm mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />{prop.location}
                  </p>
                  <div className="flex gap-4 mt-3 text-white/50 text-sm">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{prop.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{prop.baths}</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{prop.sqft}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <span className="text-xl font-heading text-brass">{prop.price}</span>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-brass group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}