import React from 'react';
import { Label } from '@/components/ui/label';
import { Moon, BookOpen, Sparkles, Users, Coffee, UtensilsCrossed, Laptop } from 'lucide-react';
import OptionCard from './OptionCard';

const SLEEP_OPTIONS = [
  { value: 'Early bird (before 10pm)', label: 'Early Bird', description: 'Lights out by 10pm — up with the sunrise', icon: Coffee },
  { value: 'Night owl (after midnight)', label: 'Night Owl', description: 'Hit my stride after midnight', icon: Moon },
  { value: 'Flexible', label: 'Flexible', description: 'Varies — I adapt to those around me', icon: Sparkles },
];

const STUDY_OPTIONS = [
  { value: 'Quiet at all times', label: 'Silent Zone', description: 'Need quiet to focus — no exceptions', icon: BookOpen },
  { value: 'Moderate noise okay', label: 'Moderate Noise OK', description: 'Background noise is fine, loud parties are not', icon: Users },
  { value: 'Social & lively fine', label: 'Lively & Social', description: 'I study better with background energy', icon: Coffee },
];

const CLEAN_OPTIONS = [
  { value: 'Very tidy — everything in its place', label: 'Very Tidy', description: 'Everything has a place and should be in it', icon: Sparkles },
  { value: 'Reasonably clean', label: 'Reasonably Clean', description: 'Clean and tidy, but not obsessive', icon: Coffee },
  { value: 'Relaxed about mess', label: 'Relaxed', description: 'Functional chaos — I tidy when needed', icon: Users },
];

const SOCIAL_OPTIONS = [
  { value: 'Very social — love hanging out', label: 'Very Social', description: 'Love communal meals and hanging out', icon: Users },
  { value: 'Balanced', label: 'Balanced', description: 'Social when I want to be, private too', icon: Coffee },
  { value: 'Prefer my own space', label: 'Private', description: 'Friendly but need my personal space', icon: Moon },
];

const GUEST_OPTIONS = [
  { value: 'Rarely / never', label: 'Rarely', description: "I don't bring guests over" },
  { value: 'Occasionally on weekends', label: 'Occasionally', description: 'Friends over some weekends' },
  { value: 'Frequently', label: 'Frequently', description: 'I host regularly — social butterfly' },
];

const COOK_OPTIONS = [
  { value: 'Cook every day', label: 'Daily Cook', description: 'I love cooking — kitchen is my space', icon: UtensilsCrossed },
  { value: 'A few times a week', label: 'Sometimes', description: 'Cook a few times, eat out the rest', icon: Coffee },
  { value: 'Rarely — mainly takeout', label: 'Takeout Person', description: 'Kitchen is mostly unused', icon: Sparkles },
];

function OptionGroup({ label, icon: Icon, options, value, onChange }) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-brass" />}
        {label}
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Step3Lifestyle({ data, onChange }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground">
          Your <span className="italic text-brass">Lifestyle</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Be honest — these answers power our compatibility algorithm. The more accurate you are, the better your matches.
        </p>
      </div>

      <OptionGroup
        label="Sleep Schedule"
        icon={Moon}
        options={SLEEP_OPTIONS}
        value={data.sleep_schedule}
        onChange={set('sleep_schedule')}
      />

      <OptionGroup
        label="Study Environment"
        icon={BookOpen}
        options={STUDY_OPTIONS}
        value={data.study_environment}
        onChange={set('study_environment')}
      />

      <OptionGroup
        label="Cleanliness Standard"
        icon={Sparkles}
        options={CLEAN_OPTIONS}
        value={data.cleanliness}
        onChange={set('cleanliness')}
      />

      <OptionGroup
        label="Social Energy"
        icon={Users}
        options={SOCIAL_OPTIONS}
        value={data.social_level}
        onChange={set('social_level')}
      />

      <OptionGroup
        label="Having Guests Over"
        options={GUEST_OPTIONS}
        value={data.guests}
        onChange={set('guests')}
      />

      <OptionGroup
        label="Cooking Habits"
        icon={UtensilsCrossed}
        options={COOK_OPTIONS}
        value={data.cooking_frequency}
        onChange={set('cooking_frequency')}
      />

      {/* Toggle Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { field: 'smoking', label: 'I smoke', description: 'Cigarettes, shisha, etc.' },
          { field: 'pets', label: 'I have / want pets', description: 'Dogs, cats, or other animals' },
          { field: 'work_from_home', label: 'I work / study from home', description: 'Most of my day is at home', icon: Laptop },
        ].map((item) => (
          <button
            key={item.field}
            type="button"
            onClick={() => onChange({ ...data, [item.field]: !data[item.field] })}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              data[item.field]
                ? 'border-brass bg-brass/5'
                : 'border-border bg-card hover:border-brass/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-foreground">{item.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                data[item.field] ? 'border-brass bg-brass' : 'border-border'
              }`}>
                {data[item.field] && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
            <p className="text-muted-foreground text-xs">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}