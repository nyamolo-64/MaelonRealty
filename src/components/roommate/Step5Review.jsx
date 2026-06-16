import React from 'react';
import { Shield, Star, Sparkles, MapPin, GraduationCap, DollarSign, Users, Moon } from 'lucide-react';

function ReviewRow({ label, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-3 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm w-40 flex-shrink-0">{label}</span>
      <span className="text-foreground text-sm font-medium">
        {Array.isArray(value) ? value.join(', ') : String(value === true ? 'Yes' : value === false ? 'No' : value)}
      </span>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-brass" />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Step5Review({ data }) {
  const initials = (data.full_name || '?').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const budgetStr = data.budget_min && data.budget_max
    ? `KES ${Number(data.budget_min).toLocaleString()} – ${Number(data.budget_max).toLocaleString()}/mo`
    : '—';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground">
          Review your <span className="italic text-brass">Profile</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Here's how potential roommates will see you. You can edit anytime after submission.
        </p>
      </div>

      {/* Profile Preview Card */}
      <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center">
            <span className="text-navy text-2xl font-semibold">{initials}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-navy flex items-center justify-center">
            <Shield className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-semibold">{data.full_name || 'Your Name'}</h3>
            <span className="px-2.5 py-0.5 bg-brass/20 text-brass text-xs rounded-full font-medium">
              {data.year_of_study || 'Year'}
            </span>
          </div>
          <p className="text-white/60 text-sm mt-1 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            {data.university || 'University'}{data.course ? ` — ${data.course}` : ''}
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-white/50 text-xs">
            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{budgetStr}</span>
            {(data.preferred_location || []).length > 0 && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {(data.preferred_location || []).slice(0, 2).join(', ')}
                {(data.preferred_location || []).length > 2 ? ` +${(data.preferred_location || []).length - 2}` : ''}
              </span>
            )}
          </div>
          {data.about_me && (
            <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-2">{data.about_me}</p>
          )}
          {(data.interests || []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(data.interests || []).map((interest) => (
                <span key={interest} className="px-2.5 py-1 bg-white/10 text-white/70 text-xs rounded-full">{interest}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Section title="Lifestyle" icon={Moon}>
          <ReviewRow label="Sleep schedule" value={data.sleep_schedule} />
          <ReviewRow label="Study environment" value={data.study_environment} />
          <ReviewRow label="Cleanliness" value={data.cleanliness} />
          <ReviewRow label="Social level" value={data.social_level} />
        </Section>

        <Section title="Housing Preferences" icon={MapPin}>
          <ReviewRow label="Room type" value={data.room_type} />
          <ReviewRow label="Move-in date" value={data.move_in_date} />
          <ReviewRow label="Lease duration" value={data.lease_duration} />
          <ReviewRow label="Guests" value={data.guests} />
        </Section>

        <Section title="Other Details" icon={Users}>
          <ReviewRow label="Cooking" value={data.cooking_frequency} />
          <ReviewRow label="Roommate gender pref." value={data.preferred_roommate_gender} />
          <ReviewRow label="Smoker" value={data.smoking} />
          <ReviewRow label="Has / wants pets" value={data.pets} />
          <ReviewRow label="Works from home" value={data.work_from_home} />
        </Section>

        <Section title="AI Matching" icon={Sparkles}>
          <div className="py-3 text-sm text-muted-foreground leading-relaxed">
            Based on your answers, our AI will calculate compatibility scores against{' '}
            <span className="text-brass font-medium">2,500+ verified student profiles</span> and surface your
            best matches within 24 hours. You'll receive a notification via your registered email.
          </div>
        </Section>
      </div>

      <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
        <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-emerald-800 text-sm leading-relaxed">
          <strong>Your privacy is protected.</strong> Only your first name, university, year, budget range, and interests
          are shown to potential matches. Your phone number and full name are never shared without your explicit consent.
        </p>
      </div>
    </div>
  );
}