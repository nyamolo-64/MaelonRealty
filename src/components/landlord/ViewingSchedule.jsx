import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, XCircle, User, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_VIEWINGS = [
  { id: '1', student_name: 'Amina K.', student_phone: '+254712345678', property_title: '2BR Madaraka', preferred_date: '2025-06-08', preferred_time: '10:00 AM', status: 'pending', message: 'I am very interested, what floor is it on?' },
  { id: '2', student_name: 'James M.', student_phone: '+254723456789', property_title: '2BR Madaraka', preferred_date: '2025-06-09', preferred_time: '2:00 PM', status: 'confirmed', message: '' },
  { id: '3', student_name: 'Grace N.', student_phone: '+254734567890', property_title: '1BR Kilimani', preferred_date: '2025-06-07', preferred_time: '11:00 AM', status: 'pending', message: 'Is parking included?' },
  { id: '4', student_name: 'Brian O.', student_phone: '+254745678901', property_title: '1BR Kilimani', preferred_date: '2025-06-05', preferred_time: '3:00 PM', status: 'completed', message: '' },
];

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  confirmed: { label: 'Confirmed', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  completed: { label: 'Completed', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  no_show: { label: 'No Show', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
};

export default function ViewingSchedule() {
  const [viewings, setViewings] = useState(MOCK_VIEWINGS);
  const [filter, setFilter] = useState('all');

  const updateStatus = (id, status) => setViewings(prev => prev.map(v => v.id === id ? { ...v, status } : v));

  const filtered = filter === 'all' ? viewings : viewings.filter(v => v.status === filter);

  const pending = viewings.filter(v => v.status === 'pending').length;
  const confirmed = viewings.filter(v => v.status === 'confirmed').length;
  const completed = viewings.filter(v => v.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: pending, color: 'text-amber-600' },
          { label: 'Confirmed', value: confirmed, color: 'text-emerald-600' },
          { label: 'Completed', value: completed, color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className={`font-heading text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'completed', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-all ${filter === f ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Viewing Cards */}
      <div className="space-y-4">
        {filtered.map((v, i) => {
          const sc = STATUS_CONFIG[v.status];
          return (
            <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
                    <span className="text-navy text-sm font-semibold">{v.student_name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{v.student_name}</p>
                    <p className="text-xs text-muted-foreground">{v.property_title}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${sc.bg} ${sc.color} ${sc.border}`}>{sc.label}</span>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brass" />{v.preferred_date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brass" />{v.preferred_time}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brass" />{v.student_phone}</span>
              </div>

              {v.message && (
                <div className="mt-3 p-3 bg-muted/40 rounded-xl text-xs text-muted-foreground">
                  <MessageCircle className="w-3.5 h-3.5 inline mr-1.5 text-brass" />"{v.message}"
                </div>
              )}

              {v.status === 'pending' && (
                <div className="flex gap-2 mt-4">
                  <Button size="sm" onClick={() => updateStatus(v.id, 'confirmed')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs px-4 gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                  </Button>
                  <Button size="sm" onClick={() => updateStatus(v.id, 'rejected')}
                    variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-full text-xs px-4 gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Decline
                  </Button>
                  <a href={`tel:${v.student_phone}`}>
                    <Button size="sm" variant="outline" className="rounded-full text-xs px-4 gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </Button>
                  </a>
                </div>
              )}
              {v.status === 'confirmed' && (
                <div className="flex gap-2 mt-4">
                  <Button size="sm" onClick={() => updateStatus(v.id, 'completed')}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs px-4 gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Complete
                  </Button>
                  <Button size="sm" onClick={() => updateStatus(v.id, 'no_show')}
                    variant="outline" className="rounded-full text-xs px-4">No Show</Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}