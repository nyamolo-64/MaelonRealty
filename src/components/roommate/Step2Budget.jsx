import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, MapPin, Calendar, Home } from 'lucide-react';
import OptionCard from './OptionCard';

const LOCATIONS = ['Kilimani', 'Westlands', 'Madaraka', 'Kasarani', 'Karen', 'Lavington', 'Parklands', 'Ruaraka', 'Embakasi', 'South B / South C'];
const LEASE_DURATIONS = ['1-3 months', '3-6 months', '6-12 months', '1 year+'];
const ROOM_TYPES = [
  { value: 'Single room in shared house', label: 'Single Room', description: 'Your own room in a shared house' },
  { value: 'Shared room (bunk)', label: 'Shared Room', description: 'Sharing a room — most affordable' },
  { value: 'Bedsitter', label: 'Bedsitter', description: 'Self-contained single room with kitchenette' },
  { value: 'Studio', label: 'Studio', description: 'Private studio apartment' },
];

export default function Step2Budget({ data, onChange }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });

  const toggleLocation = (loc) => {
    const curr = data.preferred_location || [];
    const updated = curr.includes(loc) ? curr.filter((l) => l !== loc) : [...curr, loc];
    onChange({ ...data, preferred_location: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground">
          Budget & <span className="italic text-brass">Location</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          We'll only show you matches within your budget range and preferred areas.
        </p>
      </div>

      {/* Budget Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-brass" /> Monthly Budget (KES) *
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Minimum</Label>
            <Input
              type="number"
              placeholder="e.g. 10000"
              value={data.budget_min || ''}
              onChange={(e) => onChange({ ...data, budget_min: Number(e.target.value) })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Maximum</Label>
            <Input
              type="number"
              placeholder="e.g. 25000"
              value={data.budget_max || ''}
              onChange={(e) => onChange({ ...data, budget_max: Number(e.target.value) })}
              className="h-12 rounded-xl"
            />
          </div>
        </div>
        {data.budget_min && data.budget_max && (
          <p className="text-brass text-sm font-medium">
            KES {Number(data.budget_min).toLocaleString()} – {Number(data.budget_max).toLocaleString()} / month
          </p>
        )}
      </div>

      {/* Preferred Locations */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brass" /> Preferred Neighborhoods (select all that apply)
        </Label>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => {
            const selected = (data.preferred_location || []).includes(loc);
            return (
              <button
                key={loc}
                type="button"
                onClick={() => toggleLocation(loc)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                  selected
                    ? 'border-brass bg-brass/10 text-brass'
                    : 'border-border bg-card text-muted-foreground hover:border-brass/30'
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Home className="w-4 h-4 text-brass" /> Room Type Preference
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROOM_TYPES.map((rt) => (
            <OptionCard
              key={rt.value}
              label={rt.label}
              description={rt.description}
              selected={data.room_type === rt.value}
              onClick={() => set('room_type')(rt.value)}
            />
          ))}
        </div>
      </div>

      {/* Move-in & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brass" /> Desired Move-in Date
          </Label>
          <Input
            type="date"
            value={data.move_in_date || ''}
            onChange={(e) => onChange({ ...data, move_in_date: e.target.value })}
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold">Lease Duration</Label>
          <Select value={data.lease_duration || ''} onValueChange={set('lease_duration')}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {LEASE_DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}