import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, XCircle, Flag, Eye, Clock, Building2, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_PROPERTIES = [
    { id: '1', title: '2BR Apartment – Madaraka Estate', area: 'Madaraka', landlord: 'John M.', rent: 24000, status: 'under_review', submitted: '2025-06-04', photos: 6, trust_score: 72, flags: [], notes: '' },
    { id: '2', title: '3BR House – Kasarani', area: 'Kasarani', landlord: 'Grace W.', rent: 30000, status: 'pending', submitted: '2025-06-05', photos: 3, trust_score: 55, flags: ['Missing title deed'], notes: '' },
    { id: '3', title: 'Studio – Westlands', area: 'Westlands', landlord: 'Unknown', rent: 8000, status: 'flagged', submitted: '2025-06-03', photos: 1, trust_score: 20, flags: ['Suspicious price', 'No phone verification', 'Duplicate listing detected'], notes: 'AI flagged as possible scam' },
    { id: '4', title: '1BR Apartment – Lavington', area: 'Lavington', landlord: 'Peter K.', rent: 25000, status: 'pending', submitted: '2025-06-06', photos: 8, trust_score: 81, flags: [], notes: '' },
];

const STATUS_CONFIG = {
    pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
    under_review: { label: 'Under Review', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: Eye },
    verified: { label: 'Verified', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 },
    rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
    flagged: { label: 'Flagged', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', icon: Flag },
};

export default function AdminVerification() {
    const [properties, setProperties] = useState(MOCK_PROPERTIES);
    const [filter, setFilter] = useState('all');

    const updateStatus = (id, status) => {
        setProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    const filtered = filter === 'all' ? properties : properties.filter(p => p.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h2 className="font-heading text-2xl font-semibold text-foreground">Property Verification Queue</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{properties.filter(p => p.status === 'pending' || p.status === 'under_review').length} properties awaiting review</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['all', 'pending', 'under_review', 'flagged', 'verified'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-all ${filter === f ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground hover:border-brass/20'}`}>
                            {f.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filtered.map((prop, i) => {
                    const sc = STATUS_CONFIG[prop.status];
                    const StatusIcon = sc.icon;
                    return (
                        <motion.div key={prop.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className="bg-card rounded-2xl border border-border p-5">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="font-semibold text-foreground">{prop.title}</h3>
                                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${sc.bg} ${sc.color} ${sc.border}`}>
                                            <StatusIcon className="w-3 h-3" />{sc.label}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                        <span>{prop.area}</span>
                                        <span>Landlord: {prop.landlord}</span>
                                        <span>KES {prop.rent.toLocaleString()}/mo</span>
                                        <span>{prop.photos} photos</span>
                                        <span>Submitted: {prop.submitted}</span>
                                    </div>
                                    {prop.flags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {prop.flags.map((f, fi) => (
                                                <span key={fi} className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                                                    <AlertTriangle className="w-3 h-3" />{f}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {prop.notes && (
                                        <div className="mt-2 p-2.5 bg-muted/50 rounded-lg text-xs text-muted-foreground flex items-start gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-brass flex-shrink-0 mt-0.5" />{prop.notes}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <div className="text-center">
                                        <p className={`font-bold text-lg ${prop.trust_score >= 70 ? 'text-emerald-600' : prop.trust_score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{prop.trust_score}</p>
                                        <p className="text-xs text-muted-foreground">Trust Score</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateStatus(prop.id, 'verified')}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-full text-xs flex items-center gap-1"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Approve
                                        </button>
                                        <button onClick={() => updateStatus(prop.id, 'flagged')}
                                             className="border-amber-300 text-amber-700 hover:bg-amber-50 px-3 py-2 rounded-full text-xs flex items-center gap-1">
                                            <Flag className="w-3.5 h-3.5" /> Flag
                                        </button>
                                        <button  onClick={() => updateStatus(prop.id, 'rejected')}
                                             className="border-red-200 text-red-600 hover:bg-red-50 rounded-full text-xs px-3 py-2 flex items-center gap-1">
                                            <XCircle className="w-3.5 h-3.5" /> Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}