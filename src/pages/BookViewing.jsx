import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, CheckCircle2, Home, Building2,
  User, Mail, Phone, MessageCircle, ArrowLeft, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

function getDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) { // Exclude Sundays
      dates.push(d);
    }
  }
  return dates.slice(0, 10);
}

export default function BookViewing() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('property') || '1';
  const propertyTitle = urlParams.get('title') || 'Madaraka 2BR Apartment';
  const propertyArea = urlParams.get('area') || 'Madaraka';

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const dates = getDates();

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.ViewingRequest.create({
      property_id: propertyId,
      property_title: propertyTitle,
      property_area: propertyArea,
      student_name: form.name,
      student_email: form.email,
      student_phone: form.phone,
      message: form.message,
      preferred_date: selectedDate?.toISOString().split('T')[0],
      preferred_time: selectedTime,
      status: 'pending',
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="font-heading text-3xl font-light text-foreground">Viewing Requested!</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Your viewing request for <span className="font-semibold text-foreground">{propertyTitle}</span> has been sent.
            You'll receive a confirmation within 2 hours.
          </p>
          <div className="mt-5 p-4 bg-muted/50 rounded-2xl border border-border text-left space-y-2">
            <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-brass" /><span className="font-medium">{selectedDate?.toDateString()}</span></div>
            <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-brass" /><span className="font-medium">{selectedTime}</span></div>
            <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-brass" /><span className="font-medium">{propertyArea}</span></div>
          </div>
          <div className="flex gap-3 mt-8 justify-center">
            <Link to="/"><Button variant="outline" className="rounded-full px-6"><Home className="w-4 h-4 mr-1.5" /> Home</Button></Link>
            <Link to="/dashboard"><Button className="bg-brass text-navy rounded-full px-6 font-semibold">My Dashboard</Button></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-panel-dark border-b border-white/10 px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-lg font-semibold">M</span>
          </div>
          <span className="font-heading text-xl text-white">Maelon<span className="text-brass">.</span></span>
        </Link>
        <Link to="/"><Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-xs gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</Button></Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Property Info */}
        <div className="bg-navy rounded-2xl p-5 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brass/20 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-brass" />
          </div>
          <div>
            <p className="text-white font-semibold">{propertyTitle}</p>
            <p className="text-white/50 text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{propertyArea}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s ? 'bg-brass text-navy' : 'bg-muted text-muted-foreground'}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all ${step > s ? 'bg-brass' : 'bg-muted'}`} />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">Pick a Date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {dates.map(d => (
                  <button key={d.toISOString()} onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                      selectedDate?.toDateString() === d.toDateString()
                        ? 'border-brass bg-brass/10 text-brass'
                        : 'border-border bg-card hover:border-brass/40 text-foreground'
                    }`}>
                    <p className="font-semibold">{d.toLocaleDateString('en-KE', { weekday: 'short' })}</p>
                    <p className="text-xs mt-0.5">{d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</p>
                  </button>
                ))}
              </div>
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                    {TIME_SLOTS.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          selectedTime === t ? 'border-brass bg-brass/10 text-brass' : 'border-border bg-card hover:border-brass/40 text-foreground'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <Button onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime} className="w-full bg-navy text-white rounded-xl font-semibold py-3">
                Continue to Details →
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">Your Details</h2>
              <div className="space-y-4">
                {[
                  { key: 'name', label: 'Full Name', icon: User, placeholder: 'e.g. Amina Korir' },
                  { key: 'email', label: 'Email Address', icon: Mail, placeholder: 'your@email.com' },
                  { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+254 7XX XXX XXX' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" placeholder={f.placeholder} value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
                    </div>
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message (optional)</label>
                  <textarea placeholder="Any specific questions or requirements?" value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm h-24 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl">← Back</Button>
                <Button onClick={() => setStep(3)} disabled={!form.name || !form.email || !form.phone}
                  className="flex-1 bg-navy text-white rounded-xl font-semibold">Review →</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">Confirm Booking</h2>
              <div className="bg-muted/40 rounded-2xl border border-border p-5 space-y-3 mb-6">
                {[
                  { icon: Building2, label: 'Property', value: propertyTitle },
                  { icon: MapPin, label: 'Location', value: propertyArea },
                  { icon: Calendar, label: 'Date', value: selectedDate?.toDateString() },
                  { icon: Clock, label: 'Time', value: selectedTime },
                  { icon: User, label: 'Name', value: form.name },
                  { icon: Mail, label: 'Email', value: form.email },
                  { icon: Phone, label: 'Phone', value: form.phone },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-3 text-sm">
                    <r.icon className="w-4 h-4 text-brass flex-shrink-0" />
                    <span className="text-muted-foreground w-20 flex-shrink-0">{r.label}</span>
                    <span className="font-medium text-foreground">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-brass/5 border border-brass/20 rounded-xl p-4 mb-6 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                <p className="text-xs text-foreground">The landlord will confirm your viewing within 2 hours. You'll receive a WhatsApp and email confirmation.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl">← Back</Button>
                <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-brass hover:bg-brass-light text-navy rounded-xl font-semibold">
                  {loading ? 'Submitting…' : 'Confirm Viewing ✓'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}