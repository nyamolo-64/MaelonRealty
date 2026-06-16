import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, GraduationCap, Phone } from 'lucide-react';

const UNIVERSITIES = ['Strathmore University', 'University of Nairobi', 'USIU-Africa', 'Kenyatta University', 'JKUAT', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export default function Step1Personal({ data, onChange }) {
  const set = (field) => (val) => onChange({ ...data, [field]: val });
  const setInput = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground">
          Tell us about <span className="italic text-brass">yourself</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          This forms your public profile — only your first name and university are shown to potential matches.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="full_name" className="text-sm font-medium">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="full_name"
              placeholder="Your full name"
              value={data.full_name || ''}
              onChange={setInput('full_name')}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">University *</Label>
          <Select value={data.university || ''} onValueChange={set('university')}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select university" />
            </SelectTrigger>
            <SelectContent>
              {UNIVERSITIES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Year of Study *</Label>
          <Select value={data.year_of_study || ''} onValueChange={set('year_of_study')}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="course" className="text-sm font-medium">Course / Programme</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="course"
              placeholder="e.g. BSc Computer Science"
              value={data.course || ''}
              onChange={setInput('course')}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Gender</Label>
          <Select value={data.gender || ''} onValueChange={set('gender')}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="age" className="text-sm font-medium">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g. 20"
            min={16}
            max={40}
            value={data.age || ''}
            onChange={(e) => onChange({ ...data, age: Number(e.target.value) })}
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="+254 7XX XXX XXX"
              value={data.phone || ''}
              onChange={setInput('phone')}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}