import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Upload, CheckCircle2, MapPin, DollarSign, Phone, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';

const STEPS = ['Property Details', 'Photos & Media', 'Ownership Proof', 'Review'];

const AMENITIES = ['WiFi', 'Water 24/7', 'Security', 'Parking', 'CCTV', 'Generator', 'Laundry', 'Gym', 'Swimming Pool', 'Lift', 'Furnished', 'Balcony'];

export default function ClaimListingModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', area: '', property_type: 'Bedsitter', rent: '', description: '',
    landlord_name: '', landlord_phone: '', landlord_email: '', amenities: [],
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const toggleAmenity = a => setForm(p => ({
    ...p, amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a]
  }));

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.PropertyListing.create({
      ...form, rent: Number(form.rent), claimed: true, verification_status: 'pending',
    });
    setLoading(false);
    setDone(true);
    toast({ title: 'Listing submitted!', description: "Your property is under review. We'll confirm within 24 hours." });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        
        {done ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground">Listing Submitted!</h3>
            <p className="text-muted-foreground mt-2 text-sm">Your property has been submitted for verification. Our team will review within 24 hours.</p>
            <Button onClick={onClose} className="mt-6 bg-brass text-navy font-semibold rounded-full px-8">Done</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brass" />
                <h3 className="font-semibold text-foreground">Claim / Add Listing</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Progress */}
            <div className="px-5 py-3 border-b border-border">
              <div className="flex items-center gap-1">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? 'bg-brass' : 'bg-muted'}`} />
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{STEPS[step]} ({step + 1}/{STEPS.length})</p>
            </div>

            <div className="p-5 space-y-4">
              {step === 0 && (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Property Title</label>
                    <input type="text" placeholder="e.g. 2BR Apartment – Madaraka Estate" value={form.title}
                      onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Area / Neighbourhood</label>
                      <input type="text" placeholder="e.g. Madaraka" value={form.area}
                        onChange={e => setForm(p => ({ ...p, area: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Property Type</label>
                      <select value={form.property_type} onChange={e => setForm(p => ({ ...p, property_type: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm">
                        {['Single Room', 'Bedsitter', 'Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4+ Bedroom'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Monthly Rent (KES)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="number" placeholder="e.g. 15000" value={form.rent}
                        onChange={e => setForm(p => ({ ...p, rent: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                    <textarea placeholder="Describe the property..." value={form.description}
                      onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm h-20 resize-none" />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Upload Photos</label>
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-brass/50 transition-colors cursor-pointer">
                      <Image className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Click to upload photos</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each. Min 3 photos.</p>
                      <Button size="sm" variant="outline" className="mt-4 rounded-full">
                        <Upload className="w-4 h-4 mr-1.5" /> Browse Files
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {AMENITIES.map(a => (
                        <button key={a} onClick={() => toggleAmenity(a)}
                          className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                            form.amenities.includes(a) ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground hover:border-brass/20'
                          }`}>{a}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-3">
                    To verify ownership, please provide your contact details. Our team will reach out for document verification.
                  </p>
                  {[
                    { key: 'landlord_name', label: 'Your Full Name', placeholder: 'John Mwangi' },
                    { key: 'landlord_phone', label: 'Phone Number', placeholder: '+254 7XX XXX XXX' },
                    { key: 'landlord_email', label: 'Email Address', placeholder: 'john@example.com' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
                      <input type="text" placeholder={f.placeholder} value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center cursor-pointer hover:border-brass/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Upload Ownership Document</p>
                    <p className="text-xs text-muted-foreground mt-1">Title deed, lease agreement, or utility bill</p>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Review Your Listing</h3>
                  {[
                    { label: 'Title', value: form.title },
                    { label: 'Area', value: form.area },
                    { label: 'Type', value: form.property_type },
                    { label: 'Rent', value: `KES ${Number(form.rent).toLocaleString()}/mo` },
                    { label: 'Owner', value: form.landlord_name },
                    { label: 'Phone', value: form.landlord_phone },
                    { label: 'Amenities', value: form.amenities.join(', ') || 'None selected' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-3 text-sm py-2 border-b border-border/50">
                      <span className="text-muted-foreground w-20 flex-shrink-0">{r.label}</span>
                      <span className="font-medium text-foreground">{r.value || '—'}</span>
                    </div>
                  ))}
                  <div className="bg-brass/5 border border-brass/20 rounded-xl p-3 text-xs text-foreground mt-2">
                    By submitting, you confirm this property is yours and the information is accurate. Maelon will verify within 24 hours.
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-5 border-t border-border">
              {step > 0 && <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1 rounded-xl">← Back</Button>}
              {step < 3
                ? <Button onClick={() => setStep(s => s + 1)} className="flex-1 bg-navy text-white rounded-xl font-semibold">Continue →</Button>
                : <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-brass hover:bg-brass-light text-navy rounded-xl font-semibold">
                    {loading ? 'Submitting…' : 'Submit for Verification ✓'}
                  </Button>
              }
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}