import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Wifi, Shield, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const STUDENT_ROOM = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/0f01ad439_generated_b27c8860.png';
const COLIVING = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/da27e562c_generated_a5acfccf.png';
const KILIMANI = 'https://media.base44.com/images/public/6a208ffc3f21e5ca2464ddd2/52d844b99_generated_7840f324.png';

const listings = [
  {
    id: 1,
    title: 'Modern Studio near Strathmore',
    image: STUDENT_ROOM,
    price: 'KES 18,000',
    period: '/month',
    location: 'Madaraka',
    proximity: '5 min walk to Strathmore',
    amenities: ['WiFi', 'Furnished', 'Security'],
    rating: 4.8,
    verified: true,
    tag: 'Popular',
  },
  {
    id: 2,
    title: 'Shared 2BR near UoN',
    image: COLIVING,
    price: 'KES 12,500',
    period: '/month',
    location: 'Kilimani',
    proximity: '10 min to University of Nairobi',
    amenities: ['WiFi', 'Gym', 'Parking'],
    rating: 4.6,
    verified: true,
    tag: 'Best Value',
  },
  {
    id: 3,
    title: 'Premium Bedsitter near USIU',
    image: KILIMANI,
    price: 'KES 22,000',
    period: '/month',
    location: 'Kasarani',
    proximity: '7 min to USIU-Africa',
    amenities: ['WiFi', 'Furnished', 'Balcony'],
    rating: 4.9,
    verified: true,
    tag: 'New',
  },
];

const universities = [
  'Strathmore University',
  'University of Nairobi',
  'USIU-Africa',
  'Kenyatta University',
  'JKUAT',
];

export default function StudentHousing() {
  return (
    <section id="student-housing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brass text-sm font-semibold tracking-widest uppercase"
            >
              Student Housing
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-light text-foreground mt-3"
            >
              Campus-Adjacent <span className="italic text-brass">Living</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-3 max-w-lg text-lg leading-relaxed"
            >
              Verified, affordable housing within minutes of Nairobi's top universities.
              Every listing is personally inspected and student-approved.
            </motion.p>
          </div>

          {/* University Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {universities.map((uni) => (
              <Badge
                key={uni}
                variant="outline"
                className="px-4 py-2 rounded-full text-sm font-medium border-brass/30 text-foreground hover:bg-brass/10 hover:border-brass cursor-pointer transition-all"
              >
                {uni}
              </Badge>
            ))}
          </motion.div>
        </div>

        {/* Listing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-brass/30 hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-brass text-navy text-xs font-bold rounded-full">
                    {listing.tag}
                  </span>
                  {listing.verified && (
                    <span className="px-3 py-1 glass-panel-dark text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                {/* Proximity Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-panel-dark rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brass" />
                    <span className="text-white text-sm font-medium">{listing.proximity}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{listing.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {listing.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-brass">
                    <Star className="w-4 h-4 fill-brass" />
                    <span className="text-sm font-semibold">{listing.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {listing.amenities.map((a) => (
                    <span key={a} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-heading font-semibold text-foreground">{listing.price}</span>
                    <span className="text-muted-foreground text-sm">{listing.period}</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" className="rounded-full px-8 py-3 border-brass/30 text-foreground hover:bg-brass/10 hover:border-brass group">
            View All Student Housing
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}