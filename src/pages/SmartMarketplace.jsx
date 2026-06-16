import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Sparkles, Upload, CheckCircle2, AlertCircle, Loader2, Tag, DollarSign, FileText, Camera, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const STEPS = ['Details', 'Photos', 'AI Review'];

export default function SmartMarketplace() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', area: '', type: '', rent: '', bedrooms: '', bathrooms: '',
    amenities: '', description: '', condition: 'good',
  });
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const AREAS = ['Kilimani', 'Westlands', 'South B', 'Kasarani', 'Madaraka', 'Ngong Road'];
  const TYPES = ['Single Room', 'Bedsitter', 'Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom'];

  const runAIReview = async () => {
    setLoading(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an AI listing optimization assistant for a premium Nairobi student housing platform called Maelon Realty.

Analyze this property listing and provide improvements:

Property Details:
- Title: ${form.title}
- Area: ${form.area}
- Type: ${form.type}
- Rent: KES ${form.rent}/month
- Bedrooms: ${form.bedrooms}, Bathrooms: ${form.bathrooms}
- Amenities mentioned: ${form.amenities}
- Description draft: ${form.description || 'None provided'}
- Condition: ${form.condition}

Provide: optimized title, compelling description, smart tags, suggested price range based on Nairobi market, quality score (0-100), and list any missing info that would improve the listing.`,
      response_json_schema: {
        type: 'object',
        properties: {
          optimized_title: { type: 'string' },
          ai_description: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          suggested_price_min: { type: 'number' },
          suggested_price_max: { type: 'number' },
          listing_quality_score: { type: 'number' },
          missing_info: { type: 'array', items: { type: 'string' } },
          strengths: { type: 'array', items: { type: 'string' } },
          improvements: { type: 'array', items: { type: 'string' } },
        }
      }
    });
    setAiResult(result);
    setLoading(false);
  };

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen bg-navy">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/8">
        <Link to="/maelon-os"><ArrowLeft className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" /></Link>
        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"><Building2 className="w-4 h-4 text-green-400" /></div>
        <div>
          <p className="text-white font-semibold text-sm">Smart Property Marketplace</p>
          <p className="text-white/40 text-xs">AI-powered listing creation</p>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${i === step ? 'bg-brass text-navy' : i < step ? 'text-emerald-400' : 'text-white/30'}`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs border-current">{i+1}</span>}
                {s}
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-emerald-500/50' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div className="glass-panel rounded-3xl p-6 space-y-5">
                <h2 className="text-white font-heading text-xl">Property Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Listing Title', key: 'title', placeholder: 'e.g. Spacious 2BR in Kilimani' },
                    { label: 'Monthly Rent (KES)', key: 'rent', placeholder: 'e.g. 25000', type: 'number' },
                    { label: 'Bedrooms', key: 'bedrooms', placeholder: 'e.g. 2', type: 'number' },
                    { label: 'Bathrooms', key: 'bathrooms', placeholder: 'e.g. 1', type: 'number' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">{f.label}</label>
                      <input type={f.type || 'text'} value={form[f.key]} onChange={e => update(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brass/40" />
                    </div>
                  ))}
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">Area</label>
                    <select value={form.area} onChange={e => update('area', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brass/40">
                      <option value="" className="bg-navy">Select area…</option>
                      {AREAS.map(a => <option key={a} className="bg-navy">{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">Property Type</label>
                    <select value={form.type} onChange={e => update('type', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brass/40">
                      <option value="" className="bg-navy">Select type…</option>
                      {TYPES.map(t => <option key={t} className="bg-navy">{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">Amenities (comma-separated)</label>
                  <input value={form.amenities} onChange={e => update('amenities', e.target.value)}
                    placeholder="WiFi, Security, Parking, Water 24/7, Gym…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-brass/40" />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">Description Draft (optional)</label>
                  <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3}
                    placeholder="AI will improve this…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm resize-none focus:outline-none focus:border-brass/40" />
                </div>
                <button onClick={() => setStep(1)} disabled={!form.title || !form.area || !form.type || !form.rent}
                  className="w-full bg-brass hover:bg-brass-light text-navy font-semibold py-3 rounded-xl disabled:opacity-40 transition-all">
                  Continue to Photos →
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="glass-panel rounded-3xl p-6 space-y-5">
                <h2 className="text-white font-heading text-xl">Photos & Media</h2>
                <div className="border-2 border-dashed border-white/15 rounded-2xl p-12 text-center hover:border-brass/40 transition-colors">
                  <Camera className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/50 font-medium">Drag & drop photos here</p>
                  <p className="text-white/25 text-sm mt-1">JPG, PNG up to 10MB each</p>
                  <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 text-sm hover:bg-white/10 transition-colors flex items-center gap-2 mx-auto">
                    <Upload className="w-4 h-4" /> Browse Files
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Living Room', 'Bedroom', 'Kitchen'].map(room => (
                    <div key={room} className="aspect-square bg-white/4 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2">
                      <Camera className="w-5 h-5 text-white/20" />
                      <p className="text-white/25 text-xs">{room}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 border border-white/10 text-white/50 py-3 rounded-xl hover:bg-white/5 transition-all text-sm">← Back</button>
                  <button onClick={() => { setStep(2); runAIReview(); }} className="flex-2 flex-1 bg-brass hover:bg-brass-light text-navy font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" /> Run AI Review
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                {loading ? (
                  <div className="glass-panel rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brass/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-brass animate-pulse" />
                    </div>
                    <p className="text-white font-heading text-xl">AI Analysing Your Listing…</p>
                    <p className="text-white/40 text-sm mt-2">Optimising title, description, pricing & tags</p>
                    <div className="w-8 h-8 border-2 border-brass/20 border-t-brass rounded-full animate-spin mx-auto mt-6" />
                  </div>
                ) : aiResult && (
                  <>
                    {/* Quality Score */}
                    <div className="glass-panel rounded-3xl p-6 flex items-center gap-6">
                      <div className="text-center flex-shrink-0">
                        <p className="font-heading text-5xl font-light" style={{ color: aiResult.listing_quality_score >= 80 ? '#10b981' : '#C5A059' }}>{aiResult.listing_quality_score}</p>
                        <p className="text-white/40 text-xs">Listing Quality</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">AI Optimised Listing</p>
                        <p className="text-white/40 text-sm">Your listing has been enhanced with AI-generated content and market pricing intelligence.</p>
                        <div className="flex gap-2 mt-3">
                          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">KES {aiResult.suggested_price_min?.toLocaleString()} – {aiResult.suggested_price_max?.toLocaleString()}</span>
                          <span className="text-xs text-brass bg-brass/10 border border-brass/20 px-3 py-1 rounded-full">Suggested range</span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="glass-panel rounded-2xl p-5 space-y-3">
                      <p className="text-white/40 text-xs uppercase tracking-wider font-semibold flex items-center gap-2"><FileText className="w-3.5 h-3.5" />AI Generated Content</p>
                      <div>
                        <p className="text-white/40 text-xs mb-1">Optimised Title</p>
                        <p className="text-white font-semibold">{aiResult.optimized_title}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-1">AI Description</p>
                        <p className="text-white/80 text-sm leading-relaxed">{aiResult.ai_description}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="glass-panel rounded-2xl p-5">
                      <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2"><Tag className="w-3.5 h-3.5" />Smart Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {aiResult.tags?.map(t => <span key={t} className="px-3 py-1 bg-brass/10 text-brass text-xs rounded-full border border-brass/20">{t}</span>)}
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aiResult.strengths?.length > 0 && (
                        <div className="glass-panel rounded-2xl p-5">
                          <p className="text-emerald-400 text-xs uppercase tracking-wider font-semibold mb-3">✓ Strengths</p>
                          {aiResult.strengths.map((s, i) => <p key={i} className="text-white/70 text-sm mb-1.5 flex items-start gap-2"><span className="text-emerald-500">•</span>{s}</p>)}
                        </div>
                      )}
                      {aiResult.missing_info?.length > 0 && (
                        <div className="glass-panel rounded-2xl p-5">
                          <p className="text-amber-400 text-xs uppercase tracking-wider font-semibold mb-3">⚠ Missing Info</p>
                          {aiResult.missing_info.map((m, i) => <p key={i} className="text-white/70 text-sm mb-1.5 flex items-start gap-2"><span className="text-amber-500">•</span>{m}</p>)}
                        </div>
                      )}
                    </div>

                    <button className="w-full bg-brass hover:bg-brass-light text-navy font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" /> Publish Listing
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}