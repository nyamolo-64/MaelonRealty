import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, DollarSign, Calendar, Moon, BookOpen,
  Sparkles, ArrowRight, ArrowLeft, MapPin, Users, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const UNIVERSITIES = [
  'Strathmore University', 'University of Nairobi', 'USIU-Africa',
  'Kenyatta University', 'JKUAT', 'Other'
];

const NEIGHBORHOODS = [
  'Kilimani', 'Westlands', 'Lavington', 'Kileleshwa', 'South B',
  'Madaraka', 'Ngong Road', 'Parklands', 'Kasarani', 'Ruaka',
  'Rongai', 'Embakasi', 'Kahawa', 'South C', 'Lang\'ata'
];

const steps = [
  { id: 'basics', label: 'Basics', icon: GraduationCap },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'lifestyle', label: 'Lifestyle', icon: Moon },
  { id: 'location', label: 'Location', icon: MapPin },
];

const OptionPill = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
      selected
        ? 'bg-brass border-brass text-navy'
        : 'bg-card border-border text-muted-foreground hover:border-brass/40 hover:text-foreground'
    }`}
  >
    {label}
  </button>
);

export default function LivingMatchForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState({
    university: '',
    budget_min: 8000,
    budget_max: 20000,
    move_in_date: '',
    sleep_schedule: '',
    study_environment: '',
    cleanliness: '',
    social_level: '',
    guests: '',
    smoking: false,
    pets: false,
    preferred_location: [],
    room_type: '',
  });

  const set = (key, val) => setData(d => ({ ...d, [key]: val }));
  const toggleLocation = (loc) => {
    set('preferred_location', data.preferred_location.includes(loc)
      ? data.preferred_location.filter(l => l !== loc)
      : [...data.preferred_location, loc]
    );
  };

  const canNext = [
    data.university,
    data.budget_min && data.budget_max,
    data.sleep_schedule && data.cleanliness,
    data.preferred_location.length > 0,
  ];

  const goNext = () => {
    if (step < steps.length - 1) { setDirection(1); setStep(s => s + 1); }
    else onSubmit(data);
  };
  const goPrev = () => { setDirection(-1); setStep(s => Math.max(0, s - 1)); };

  const stepContent = [
    // Step 0: Basics
    <div key="basics" className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Which university do you attend?</label>
        <div className="flex flex-wrap gap-2">
          {UNIVERSITIES.map(u => (
            <OptionPill key={u} label={u} selected={data.university === u} onClick={() => set('university', u)} />
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">When do you want to move in?</label>
        <input
          type="date"
          value={data.move_in_date}
          onChange={e => set('move_in_date', e.target.value)}
          className="w-full max-w-xs bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-brass/30"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Room type preference</label>
        <div className="flex flex-wrap gap-2">
          {['Single room in shared house', 'Bedsitter', 'Studio', 'Any'].map(t => (
            <OptionPill key={t} label={t} selected={data.room_type === t} onClick={() => set('room_type', t)} />
          ))}
        </div>
      </div>
    </div>,

    // Step 1: Budget
    <div key="budget" className="space-y-8">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          Minimum monthly budget
          <span className="ml-2 text-brass font-bold text-base">KES {data.budget_min?.toLocaleString()}</span>
        </label>
        <input
          type="range" min={4000} max={50000} step={500}
          value={data.budget_min}
          onChange={e => set('budget_min', +e.target.value)}
          className="w-full accent-brass"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>KES 4,000</span><span>KES 50,000</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          Maximum monthly budget
          <span className="ml-2 text-brass font-bold text-base">KES {data.budget_max?.toLocaleString()}</span>
        </label>
        <input
          type="range" min={4000} max={80000} step={500}
          value={data.budget_max}
          onChange={e => set('budget_max', +e.target.value)}
          className="w-full accent-brass"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>KES 4,000</span><span>KES 80,000</span>
        </div>
      </div>
      <div className="bg-brass/10 rounded-2xl p-5 border border-brass/20">
        <p className="text-sm text-foreground font-semibold mb-1">Your Budget Range</p>
        <p className="font-heading text-3xl text-brass font-light">
          KES {data.budget_min?.toLocaleString()} – {data.budget_max?.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Combined with a roommate: KES {(data.budget_max * 2)?.toLocaleString()} total rent budget
        </p>
      </div>
    </div>,

    // Step 2: Lifestyle
    <div key="lifestyle" className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Sleep schedule</label>
        <div className="flex flex-wrap gap-2">
          {['Early bird (before 10pm)', 'Night owl (after midnight)', 'Flexible'].map(s => (
            <OptionPill key={s} label={s} selected={data.sleep_schedule === s} onClick={() => set('sleep_schedule', s)} />
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Study environment</label>
        <div className="flex flex-wrap gap-2">
          {['Quiet at all times', 'Moderate noise okay', 'Social & lively fine'].map(s => (
            <OptionPill key={s} label={s} selected={data.study_environment === s} onClick={() => set('study_environment', s)} />
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Cleanliness level</label>
        <div className="flex flex-wrap gap-2">
          {['Very tidy — everything in its place', 'Reasonably clean', 'Relaxed about mess'].map(s => (
            <OptionPill key={s} label={s} selected={data.cleanliness === s} onClick={() => set('cleanliness', s)} />
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Social level</label>
        <div className="flex flex-wrap gap-2">
          {['Very social — love hanging out', 'Balanced', 'Prefer my own space'].map(s => (
            <OptionPill key={s} label={s} selected={data.social_level === s} onClick={() => set('social_level', s)} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[
          { key: 'smoking', label: 'Smoker' },
          { key: 'pets', label: 'Has pets' },
        ].map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => set(key, !data[key])}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
              data[key] ? 'bg-brass border-brass text-navy' : 'bg-card border-border text-muted-foreground hover:border-brass/40'
            }`}
          >
            {data[key] ? '✓' : '○'} {label}
          </button>
        ))}
      </div>
    </div>,

    // Step 3: Location
    <div key="location" className="space-y-4">
      <p className="text-sm text-muted-foreground">Select all neighborhoods you'd be happy living in</p>
      <div className="flex flex-wrap gap-2">
        {NEIGHBORHOODS.map(n => (
          <OptionPill
            key={n} label={n}
            selected={data.preferred_location.includes(n)}
            onClick={() => toggleLocation(n)}
          />
        ))}
      </div>
      {data.preferred_location.length > 0 && (
        <div className="bg-brass/10 rounded-xl p-4 border border-brass/20">
          <p className="text-xs text-brass font-semibold">{data.preferred_location.length} neighborhoods selected</p>
          <p className="text-xs text-muted-foreground mt-1">More selections = wider match pool</p>
        </div>
      )}
    </div>,
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === step ? 'bg-brass text-navy' : i < step ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'
            }`}>
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </div>
            {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-emerald-400' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="h-1 bg-muted rounded-full mb-8">
        <motion.div
          className="h-full bg-brass rounded-full"
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="bg-card rounded-3xl border border-border shadow-sm p-6 sm:p-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-light text-foreground mb-6">
              {['Tell us about yourself', 'What\'s your budget?', 'Your lifestyle', 'Preferred locations'][step]}
            </h2>
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" onClick={goPrev} disabled={step === 0} className="text-muted-foreground disabled:opacity-0">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button
          onClick={goNext}
          disabled={!canNext[step]}
          className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full disabled:opacity-40 flex items-center gap-2"
        >
          {step === steps.length - 1 ? (
            <><Sparkles className="w-4 h-4" /> Find My Perfect Match</>
          ) : (
            <>Continue <ArrowRight className="w-4 h-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
}