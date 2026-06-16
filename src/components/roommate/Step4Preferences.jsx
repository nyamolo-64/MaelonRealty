import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Heart } from 'lucide-react';

const GENDER_PREFS = [
  { value: 'Same gender only', label: 'Same Gender', description: 'I prefer to live with people of the same gender' },
  { value: 'Any gender', label: 'Any Gender', description: 'I have no gender preference for my roommate' },
  { value: 'No preference', label: 'No Preference', description: "It doesn't matter to me" },
];

const INTERESTS_LIST = [
  'Sports & Fitness', 'Music', 'Reading', 'Cooking', 'Gaming', 'Travel',
  'Art & Design', 'Tech & Coding', 'Films & TV', 'Hiking', 'Photography',
  'Fashion', 'Business & Entrepreneurship', 'Spirituality', 'Volunteering',
];

export default function Step4Preferences({ data, onChange }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });

  const toggleInterest = (interest) => {
    const curr = data.interests || [];
    const updated = curr.includes(interest)
      ? curr.filter((i) => i !== interest)
      : [...curr, interest];
    onChange({ ...data, interests: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground">
          Preferences & <span className="italic text-brass">About You</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Help potential roommates get to know you before they even reach out.
        </p>
      </div>

      {/* Roommate Gender Preference */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Users className="w-4 h-4 text-brass" /> Preferred Roommate Gender
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GENDER_PREFS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('preferred_roommate_gender')(opt.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                data.preferred_roommate_gender === opt.value
                  ? 'border-brass bg-brass/5'
                  : 'border-border bg-card hover:border-brass/30'
              }`}
            >
              <p className="font-medium text-sm text-foreground">{opt.label}</p>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Heart className="w-4 h-4 text-brass" /> Your Interests (select up to 6)
        </Label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS_LIST.map((interest) => {
            const selected = (data.interests || []).includes(interest);
            const atMax = (data.interests || []).length >= 6;
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                disabled={!selected && atMax}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                  selected
                    ? 'border-brass bg-brass/10 text-brass'
                    : atMax
                    ? 'border-border bg-muted/30 text-muted-foreground/50 cursor-not-allowed'
                    : 'border-border bg-card text-muted-foreground hover:border-brass/30'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {(data.interests || []).length}/6 selected
        </p>
      </div>

      {/* About Me */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">About Me</Label>
        <Textarea
          placeholder="Write a short intro about yourself — your background, what you're studying, what you enjoy. This is what potential roommates read first!"
          value={data.about_me || ''}
          onChange={(e) => onChange({ ...data, about_me: e.target.value })}
          className="rounded-xl min-h-[140px] resize-none text-sm leading-relaxed"
          maxLength={400}
        />
        <p className="text-xs text-muted-foreground text-right">
          {(data.about_me || '').length}/400 characters
        </p>
      </div>
    </div>
  );
}