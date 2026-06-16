import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, User, Phone, Mail, MapPin, DollarSign, ChevronRight, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STAGES = [
  { id: 'new', label: 'New Leads', color: 'bg-blue-500', light: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'contacted', label: 'Contacted', color: 'bg-purple-500', light: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'viewing_scheduled', label: 'Viewing Scheduled', color: 'bg-amber-500', light: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'viewing_done', label: 'Viewing Done', color: 'bg-orange-500', light: 'bg-orange-50 border-orange-200 text-orange-700' },
  { id: 'negotiating', label: 'Negotiating', color: 'bg-indigo-500', light: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { id: 'closed_won', label: 'Closed ✓', color: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
];

const MOCK_LEADS = [
  { id: '1', name: 'Amina K.', email: 'amina@strathmore.edu', phone: '+254712345678', university: 'Strathmore', budget_min: 10000, budget_max: 15000, area_preference: 'Madaraka', lead_type: 'student', source: 'website', stage: 'viewing_scheduled', priority: 'high', deal_value: 12000 },
  { id: '2', name: 'James M.', email: 'james@uon.ac.ke', phone: '+254723456789', university: 'UoN', budget_min: 8000, budget_max: 12000, area_preference: 'Parklands', lead_type: 'student', source: 'referral', stage: 'new', priority: 'medium', deal_value: 10000 },
  { id: '3', name: 'John Mwangi', email: 'john@gmail.com', phone: '+254734567890', university: '', budget_min: 0, budget_max: 0, area_preference: 'Kilimani', lead_type: 'landlord', source: 'direct', stage: 'contacted', priority: 'high', deal_value: 80000 },
  { id: '4', name: 'Grace N.', email: 'grace@usiu.ac.ke', phone: '+254745678901', university: 'USIU', budget_min: 12000, budget_max: 18000, area_preference: 'Kasarani', lead_type: 'student', source: 'ambassador', stage: 'negotiating', priority: 'high', deal_value: 15000 },
  { id: '5', name: 'Brian O.', email: 'brian@ku.ac.ke', phone: '+254756789012', university: 'KU', budget_min: 6000, budget_max: 10000, area_preference: 'Kahawa', lead_type: 'student', source: 'social', stage: 'closed_won', priority: 'low', deal_value: 8500 },
  { id: '6', name: 'Sarah W.', email: 'sarah@jkuat.ac.ke', phone: '+254767890123', university: 'JKUAT', budget_min: 7000, budget_max: 11000, area_preference: 'Kahawa', lead_type: 'student', source: 'website', stage: 'viewing_done', priority: 'medium', deal_value: 9000 },
];

const PRIORITY_COLORS = { high: 'text-rose-600 bg-rose-50 border-rose-200', medium: 'text-amber-600 bg-amber-50 border-amber-200', low: 'text-slate-600 bg-muted border-border' };

export default function AdminLeads() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [view, setView] = useState('kanban');
  const [selected, setSelected] = useState(null);

  const totalPipelineValue = leads.reduce((a, l) => a + (l.deal_value || 0), 0);
  const wonValue = leads.filter(l => l.stage === 'closed_won').reduce((a, l) => a + (l.deal_value || 0), 0);

  const moveStage = (id, stage) => setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));

  return (
    <div className="space-y-6">
      {/* Header KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: leads.length, color: 'text-blue-500' },
          { label: 'Pipeline Value', value: `KES ${(totalPipelineValue/1000).toFixed(0)}K`, color: 'text-brass' },
          { label: 'Closed Won', value: leads.filter(l => l.stage === 'closed_won').length, color: 'text-emerald-500' },
          { label: 'Revenue Closed', value: `KES ${wonValue.toLocaleString()}`, color: 'text-emerald-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-card rounded-2xl border border-border p-4">
            <p className={`font-heading text-xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold text-foreground">Sales Pipeline</h2>
        <div className="flex gap-2">
          {['kanban', 'table'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-all ${view === v ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'kanban' && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGES.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage.id);
            return (
              <div key={stage.id} className="bg-muted/40 rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                    <span className="text-xs font-semibold text-foreground">{stage.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{stageLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {stageLeads.map(lead => (
                    <div key={lead.id} className="bg-card rounded-xl border border-border p-3 cursor-pointer hover:border-brass/30 transition-all"
                      onClick={() => setSelected(selected?.id === lead.id ? null : lead)}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm text-foreground truncate">{lead.name}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium capitalize ${PRIORITY_COLORS[lead.priority]}`}>{lead.priority}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{lead.lead_type} · {lead.area_preference}</p>
                      {lead.deal_value > 0 && (
                        <p className="text-xs font-semibold text-brass mt-1">KES {lead.deal_value.toLocaleString()}/mo</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === 'table' && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Name', 'Type', 'Source', 'Area', 'Budget', 'Stage', 'Priority', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => {
                  const stage = STAGES.find(s => s.id === lead.stage);
                  return (
                    <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-semibold text-foreground">{lead.name}</td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{lead.lead_type}</td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{lead.source}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.area_preference}</td>
                      <td className="px-4 py-3 text-foreground text-xs">
                        {lead.budget_min > 0 ? `KES ${(lead.budget_min/1000).toFixed(0)}K–${(lead.budget_max/1000).toFixed(0)}K` : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <select value={lead.stage} onChange={e => moveStage(lead.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border font-medium ${stage?.light} outline-none cursor-pointer`}>
                          {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${PRIORITY_COLORS[lead.priority]}`}>{lead.priority}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="ghost" className="text-xs text-brass hover:bg-brass/10 rounded-full px-2">
                          <Phone className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}