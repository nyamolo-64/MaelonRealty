import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import StudentHousing from '@/components/landing/StudentHousing';
import PremiumProperties from '@/components/landing/PremiumProperties';
import RoommateMatching from '@/components/landing/RoommateMatching';
import WhyMaelon from '@/components/landing/WhyMaelon';
import Testimonials from '@/components/landing/Testimonials';
import Neighborhoods from '@/components/landing/Neighborhoods';
import NeighborhoodGuides from '@/components/landing/NeighborhoodGuides';
import FlagshipFeature from '@/components/landing/FlagshipFeature';
import IntelligenceTeaser from '@/components/landing/IntelligenceTeaser';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import EcosystemSection from '@/components/landing/EcosystemSection';
import SmartAssistant from '@/components/livingmatch/SmartAssistant';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function Home() {
  const [showAssistant, setShowAssistant] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FlagshipFeature />
      <StudentHousing />
      <PremiumProperties />
      <RoommateMatching />
      <IntelligenceTeaser />
      <EcosystemSection />
      <WhyMaelon />
      <Testimonials />
      <Neighborhoods />
      <NeighborhoodGuides />
      <ContactSection />
      <Footer />

      {/* Floating Smart Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brass shadow-2xl flex items-center justify-center hover:bg-brass-light transition-all hover:scale-110 group"
      >
        <Brain className="w-6 h-6 text-navy" />
        <span className="absolute right-16 bg-navy text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Smart Housing Assistant
        </span>
      </motion.button>

      <AnimatePresence>
        {showAssistant && <SmartAssistant onClose={() => setShowAssistant(false)} />}
      </AnimatePresence>
    </div>
  );
}