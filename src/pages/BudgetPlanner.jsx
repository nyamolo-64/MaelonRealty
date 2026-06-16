import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Sparkles, TrendingDown, TrendingUp, Lightbulb, Target, PiggyBank, Bus, Zap, Wifi, ShoppingCart, BookOpen, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
//No importing base44 here since this component is used in the landing page before users are authenticated
import AffordabilityScore from '@/components/budget/AffordabilityScore';
import CostBreakdown from '@/components/budget/CostBreakdown';
import SavingsTips from '@/components/budget/SavingsTips';

const UNIVERSITIES = [
  'Strathmore University', 'University of Nairobi', 'USIU-Africa',
  'Kenyatta University', 'JKUAT', 'Other'
];

const AREAS = ['Kilimani', 'Westlands', 'South B', 'Kasarani', 'Ngong Road', 'Madaraka', 'Ruaka', 'Rongai'];

const TRANSPORT_COSTS = {
  'Strathmore University': { Kilimani: 200, Westlands: 1200, 'South B': 600, Kasarani: 2800, 'Ngong Road': 800, Madaraka: 400, Ruaka: 2400, Rongai: 3200 },
  'University of Nairobi': { Kilimani: 600, Westlands: 800, 'South B': 800, Kasarani: 1800, 'Ngong Road': 1200, Madaraka: 800, Ruaka: 2000, Rongai: 2800 },
  'USIU-Africa': { Kilimani: 2000, Westlands: 1200, 'South B': 2400, Kasarani: 400, 'Ngong Road': 2800, Madaraka: 2400, Ruaka: 800, Rongai: 3600 },
  'Kenyatta University': { Kilimani: 2400, Westlands: 2000, 'South B': 2800, Kasarani: 600, 'Ngong Road': 3200, Madaraka: 2800, Ruaka: 1800, Rongai: 4000 },
  'JKUAT': { Kilimani: 3200, Westlands: 2800, 'South B': 3600, Kasarani: 1400, 'Ngong Road': 4000, Madaraka: 3600, Ruaka: 2600, Rongai: 4800 },
  'Other': { Kilimani: 1200, Westlands: 1200, 'South B': 1200, Kasarani: 1200, 'Ngong Road': 1200, Madaraka: 1200, Ruaka: 1200, Rongai: 1200 },
};

export default function BudgetPlanner() {
  const [form, setForm] = useState({
    university: 'Strathmore University',
    area: 'Kilimani',
    rent: 20000,
    allowance: 25000,
    food: 6000,
    utilities: 2500,
    wifi: 1500,
    entertainment: 2000,
    books: 1500,
    personal: 1500,
  });
  const [aiTips, setAiTips] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeSection, setActiveSection] = useState('calculator');

  const transport = TRANSPORT_COSTS[form.university]?.[form.area] ?? 1200;
  const totalExpenses = form.rent + transport + form.food + form.utilities + form.wifi + form.entertainment + form.books + form.personal;
  const surplus = form.allowance - totalExpenses;
  const affordabilityScore = Math.min(100, Math.max(0, Math.round(((form.allowance - totalExpenses) / form.allowance) * 100 + 50)));

  const costItems = [
    { label: 'Rent', amount: form.rent, icon: DollarSign, color: '#C5A059', pct: Math.round((form.rent / totalExpenses) * 100) },
    { label: 'Transport', amount: transport, icon: Bus, color: '#3b82f6', pct: Math.round((transport / totalExpenses) * 100) },
    { label: 'Food', amount: form.food, icon: ShoppingCart, color: '#10b981', pct: Math.round((form.food / totalExpenses) * 100) },
    { label: 'Utilities', amount: form.utilities, icon: Zap, color: '#f59e0b', pct: Math.round((form.utilities / totalExpenses) * 100) },
    { label: 'WiFi', amount: form.wifi, icon: Wifi, color: '#8b5cf6', pct: Math.round((form.wifi / totalExpenses) * 100) },
    { label: 'Entertainment', amount: form.entertainment, icon: Coffee, color: '#ec4899', pct: Math.round((form.entertainment / totalExpenses) * 100) },
    { label: 'Books', amount: form.books, icon: BookOpen, color: '#06b6d4', pct: Math.round((form.books / totalExpenses) * 100) },
    { label: 'Personal Care', amount: form.personal, icon: Target, color: '#84cc16', pct: Math.round((form.personal / totalExpenses) * 100) },
  ];

  const fetchAITips = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a financial advisor for university students in Nairobi, Kenya.
      Student details:
      - University: ${form.university}
      - Living area: ${form.area}
      - Monthly allowance: KES ${form.allowance}
      - Monthly rent: KES ${form.rent}
      - Transport: KES ${transport}/month
      - Food: KES ${form.food}
      - Monthly surplus/deficit: KES ${surplus}

      Provide 5 practical, specific money-saving tips for this student. Be very practical and Nairobi-specific. Focus on actionable advice.
      
      Respond only with a JSON object like: { "tips": [{ "title": "...", "description": "...", "potential_saving": "...", "category": "..." }], "summary": "..." }`
          }]
        })
      });
      const data = await res.json();
      const result = JSON.parse(data.content[0].text);
      setAiTips(result);
      setActiveSection('tips');
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAI(false);
    }
  };

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-navy border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="sm" className="text-white/60 hover:text-white gap-1.5 px-2"><ArrowLeft className="w-4 h-4" />Back</Button></Link>
          <div className="h-5 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brass flex items-center justify-center">
              <PiggyBank className="w-4 h-4 text-navy" />
            </div>
            <span className="font-heading text-lg text-white">Budget Planner</span>
          </div>
        </div>
        <div className="flex gap-2">
          {['calculator', 'breakdown', 'tips'].map(s => (
            <button key={s} onClick={() => setActiveSection(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${activeSection === s ? 'bg-brass text-navy' : 'text-white/50 hover:text-white'}`}>
              {s === 'breakdown' ? 'Breakdown' : s === 'tips' ? 'AI Tips' : 'Calculator'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Score Banner */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="bg-navy rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
          <AffordabilityScore score={affordabilityScore} surplus={surplus} />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-heading text-2xl sm:text-3xl text-white font-light">
              Student <span className="italic text-brass">Budget</span> Planner
            </h1>
            <p className="text-white/50 text-sm mt-1">Plan your monthly living costs in Nairobi with AI-powered insights</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="bg-white/5 rounded-xl px-4 py-2 text-center">
                <p className="text-brass font-semibold text-lg">KES {totalExpenses.toLocaleString()}</p>
                <p className="text-white/40 text-xs">Total Monthly</p>
              </div>
              <div className={`rounded-xl px-4 py-2 text-center ${surplus >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                <p className={`font-semibold text-lg ${surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {surplus >= 0 ? '+' : ''}KES {surplus.toLocaleString()}
                </p>
                <p className="text-white/40 text-xs">{surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {activeSection === 'calculator' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-5">
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-brass" />Your Situation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">University</label>
                        <select value={form.university} onChange={e => update('university', e.target.value)}
                          className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brass/30">
                          {UNIVERSITIES.map(u => <option key={u}>{u}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Area</label>
                        <select value={form.area} onChange={e => update('area', e.target.value)}
                          className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brass/30">
                          {AREAS.map(a => <option key={a}>{a}</option>)}
                        </select>
                      </div>
                      <SliderInput label="Monthly Allowance" value={form.allowance} min={10000} max={80000} step={1000} onChange={v => update('allowance', v)} prefix="KES" color="text-emerald-500" />
                      <SliderInput label="Estimated Rent" value={form.rent} min={5000} max={60000} step={500} onChange={v => update('rent', v)} prefix="KES" color="text-brass" />
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-brass" />Monthly Expenses</h3>
                    <div className="space-y-3">
                      <SliderInput label="Food & Groceries" value={form.food} min={2000} max={15000} step={500} onChange={v => update('food', v)} prefix="KES" />
                      <SliderInput label="Utilities (water/electricity)" value={form.utilities} min={500} max={5000} step={100} onChange={v => update('utilities', v)} prefix="KES" />
                      <SliderInput label="WiFi / Data" value={form.wifi} min={500} max={4000} step={100} onChange={v => update('wifi', v)} prefix="KES" />
                      <SliderInput label="Entertainment & Social" value={form.entertainment} min={0} max={8000} step={200} onChange={v => update('entertainment', v)} prefix="KES" />
                      <SliderInput label="Books & Supplies" value={form.books} min={0} max={5000} step={200} onChange={v => update('books', v)} prefix="KES" />
                      <SliderInput label="Personal Care" value={form.personal} min={500} max={5000} step={200} onChange={v => update('personal', v)} prefix="KES" />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-5">
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bus className="w-4 h-4 text-brass" />Transport Estimate</h3>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{form.area} → {form.university}</span>
                        <span className="font-bold text-foreground">KES {transport.toLocaleString()}/mo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Based on daily matatu/bus fares × 22 working days</p>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4">Monthly Summary</h3>
                    <div className="space-y-2">
                      {costItems.map(item => (
                        <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                            <span className="text-sm text-muted-foreground">{item.label}</span>
                          </div>
                          <span className="text-sm font-medium text-foreground">KES {item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 mt-1">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-lg text-foreground">KES {totalExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={fetchAITips}
                    disabled={loadingAI}
                    className="w-full bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl h-12 flex items-center gap-2"
                  >
                    {loadingAI ? (
                      <><span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />Generating AI Tips…</>
                    ) : (
                      <><Sparkles className="w-4 h-4" />Get AI Savings Recommendations</>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'breakdown' && <CostBreakdown costItems={costItems} totalExpenses={totalExpenses} allowance={form.allowance} surplus={surplus} />}
            {activeSection === 'tips' && <SavingsTips tips={aiTips} loading={loadingAI} onFetch={fetchAITips} surplus={surplus} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SliderInput({ label, value, min, max, step, onChange, prefix, color = 'text-brass' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <span className={`text-sm font-semibold ${color}`}>{prefix} {value.toLocaleString()}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-brass" />
    </div>
  );
}