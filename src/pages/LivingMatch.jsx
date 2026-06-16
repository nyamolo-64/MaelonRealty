import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LivingMatchForm from '@/components/livingmatch/LivingMatchForm';
import LivingMatchResults from '@/components/livingmatch/LivingMatchResults';
import SmartAssistant from '@/components/livingmatch/SmartAssistant';

export default function LivingMatch() {
  const [step, setStep] = useState('form'); // form | loading | results
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  const handleFormSubmit = async (data) => {
    setFormData(data);
    setStep('loading');
    // results component handles AI calls
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel-dark border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-semibold">M</span>
          </div>
          <span className="font-heading text-xl text-white">Maelon<span className="text-brass">.</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAssistant(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brass/20 border border-brass/30 text-brass text-sm font-medium hover:bg-brass/30 transition-all"
          >
            <Brain className="w-4 h-4" /> Smart Assistant
          </button>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
              <Home className="w-4 h-4 mr-1.5" /> Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-20">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero */}
              <div className="relative bg-navy overflow-hidden py-20 px-4 text-center">
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-brass/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass/20 border border-brass/30 text-brass text-sm font-medium mb-6"
                  >
                    <Sparkles className="w-4 h-4" /> AI-Powered · Nairobi's Most Intelligent Housing Platform
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight"
                  >
                    Find Your Perfect
                    <br />
                    <span className="italic text-brass">Living Match</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 mt-6 text-lg max-w-xl mx-auto leading-relaxed"
                  >
                    One intelligent search. Roommates, properties, commute times, and budget — all matched to your lifestyle.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mt-8"
                  >
                    {['Roommate Matching', 'Budget Analysis', 'Campus Proximity', 'Lifestyle Score', 'Property Recommendations'].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-sm border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
              <LivingMatchForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {step === 'results' && formData && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LivingMatchResults
                formData={formData}
                onBack={() => setStep('form')}
                onOpenAssistant={() => setShowAssistant(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smart Assistant */}
      <AnimatePresence>
        {showAssistant && (
          <SmartAssistant onClose={() => setShowAssistant(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}