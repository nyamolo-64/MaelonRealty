import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Wifi, Shield, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/api/base44Client';
import { Link } from 'react-router-dom';

const PROPERTY_IMAGES = {
  'Madaraka': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  'South B': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'Kilimani': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  'Ngong Road': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'Westlands': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'Kasarani': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
};

const universities = [
  'Strathmore University',
  'University of Nairobi',
  'USIU-Africa',
  'Kenyatta University',
  'JKUAT',
];

export default function StudentHousing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
  const { data, error } = await supabase
    .from('property_listings')
    .select('*')
    .eq('verification_status', 'verified')
    .limit(3);
  console.log('Listings data:', data);
  console.log('Listings error:', error);
  setListings(data || []);
  setLoading(false);
};
    fetchListings();
  }, []);

  return (
    <section id="student-housing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-card rounded-2xl border border-border h-80 animate-pulse" />
            ))}
          </div>
        ) : (
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
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={PROPERTY_IMAGES[listing.area] || PROPERTY_IMAGES.default}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-brass text-navy text-xs font-bold rounded-full">
                      {listing.property_type}
                    </span>
                    <span className="px-3 py-1 glass-panel-dark text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{listing.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {listing.area}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-brass">
                      <Star className="w-4 h-4 fill-brass" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>

                  {listing.amenities && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {listing.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-heading font-semibold text-foreground">
                        KES {listing.rent?.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">/month</span>
                    </div>
                    <Link to="/book-viewing">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4">
                        Book Viewing
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/smart-marketplace">
            <Button variant="outline" className="rounded-full px-8 py-3 border-brass/30 text-foreground hover:bg-brass/10 hover:border-brass group">
              View All Student Housing
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}