import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import StepIndicator from '@/components/roommate/StepIndicator';
import Step1Personal from '@/components/roommate/Step1Personal';
import Step2Budget from '@/components/roommate/Step2Budget';
import Step3Lifestyle from '@/components/roommate/Step3Lifestyle';
import Step4Preferences from '@/components/roommate/Step4Preferences';
import Step5Review from '@/components/roommate/Step5Review';

const STEPS = [
  { label: 'Personal' },
  { label: 'Budget' },
  { label: 'Lifestyle' },
  { label: 'Preferences' },
  { label: 'Review' },
];

const STEP_COMPONENTS = [Step1Personal, Step2Budget, Step3Lifestyle, Step4Preferences, Step5Review];

function validateStep(step, data) {
  if (step === 0) return !!(data.full_name && data.university && data.year_of_study);
  if (step === 1) return !!(data.budget_min && data.budget_max);
  return true;
}

export default function RoommateQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const StepComponent = STEP_COMPONENTS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const canProceed = validateStep(currentStep, formData);

  const goNext = () => {
    if (!canProceed) return;
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await base44.entities.RoommateProfile.create({ ...formData, status: 'active' });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return <SuccessScreen data={formData} />;
  }

  return (
    <div className="min-h-screen bg-mist flex flex-col">
      {/* Top Bar */}
      <div className="glass-panel-dark border-b border-white/10 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-semibold">M</span>
          </div>
          <span className="font-heading text-xl text-white">Maelon<span className="text-brass">.</span></span>
        </Link>
        <div className="flex-1">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-2xl">
          {/* Progress bar */}
          <div className="h-1 bg-border rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-brass rounded-full"
              initial={false}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8"
            >
              <StepComponent data={formData} onChange={setFormData} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={goPrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            <span className="text-muted-foreground text-sm">
              Step {currentStep + 1} of {STEPS.length}
            </span>

            {isLast ? (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-brass hover:bg-brass-light text-navy font-semibold px-7 rounded-full flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Submit & Find Matches
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={goNext}
                disabled={!canProceed}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-7 rounded-full flex items-center gap-2 disabled:opacity-40"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Required fields note */}
          {!canProceed && currentStep < 2 && (
            <p className="text-center text-muted-foreground text-xs mt-4">
              * Please fill in the required fields to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ data }) {
  const initials = (data.full_name || '?').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-brass/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-12 h-12 text-navy" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-8 max-w-lg"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-light text-white">
          You're all set, <span className="italic text-brass">{(data.full_name || '').split(' ')[0]}!</span>
        </h1>
        <p className="text-white/60 mt-4 text-lg leading-relaxed">
          Your profile is live. Our AI is already scanning{' '}
          <span className="text-brass font-medium">2,500+ student profiles</span> to find your ideal matches.
        </p>

        <div className="glass-panel rounded-2xl p-6 mt-8 text-left space-y-4">
          {[
            { step: '1', text: 'Profile reviewed & verified within 24 hours' },
            { step: '2', text: 'Top matches delivered to your email' },
            { step: '3', text: 'Connect, chat, and move in — all through Maelon' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brass/20 text-brass flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.step}
              </div>
              <p className="text-white/70 text-sm leading-relaxed pt-1">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          <Link to="/dashboard">
            <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              View My Matches
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}