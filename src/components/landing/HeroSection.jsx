import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, MapPin, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STUDENT_IMG = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80';
const PREMIUM_IMG = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';
export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('student');

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Background Images */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: activeTab === 'student' ? 1 : 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img src={STUDENT_IMG} alt="Student housing" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: activeTab === 'premium' ? 1 : 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img src={PREMIUM_IMG} alt="Premium properties" className="w-full h-full object-cover" />
        </motion.div>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-brass text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Nairobi's Premier PropTech Platform
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] max-w-4xl"
        >
          Where Students &<br />
          <span className="italic text-brass">Premium Living</span><br />
          Converge
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed font-light"
        >
          Discover verified student housing, find your ideal roommate, and explore
          premium properties across Nairobi — all in one intelligent platform.
        </motion.p>

        {/* Tab Switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex gap-3"
        >
          <button
            onClick={() => setActiveTab('student')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'student'
                ? 'bg-brass text-navy'
                : 'glass-panel text-white/70 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Student Living
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'premium'
                ? 'bg-brass text-navy'
                : 'glass-panel text-white/70 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Premium Properties
          </button>
        </motion.div>

        {/* AI Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 max-w-2xl"
        >
          <div className="glass-panel-dark rounded-2xl p-2 flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Sparkles className="w-5 h-5 text-brass flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'student'
                    ? 'Try: "Room near Strathmore under 25k KES..."'
                    : 'Try: "3BR apartment in Kilimani with parking..."'
                }
                className="flex-1 bg-transparent border-none text-white placeholder:text-white/30 text-base py-3 focus:outline-none"
              />
            </div>
            <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-6 py-3 rounded-xl flex items-center gap-2 h-auto">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
          <p className="mt-3 text-white/30 text-sm flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            AI-powered search — describe what you're looking for in natural language
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-16 flex flex-wrap gap-8 sm:gap-16"
        >
          {[
            { value: '2,500+', label: 'Verified Listings' },
            { value: '15K+', label: 'Students Matched' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '5', label: 'University Partners' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-heading font-light text-brass">{stat.value}</p>
              <p className="text-white/40 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}