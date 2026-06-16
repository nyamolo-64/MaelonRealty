import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye, MousePointer, Users, TrendingUp, Calendar, DollarSign,
  BarChart3, Building2, Sparkles, ArrowUpRight, Bell, CheckCircle2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line
} from 'recharts';

const VIEWS_DATA = [
  { day: 'Mon', views: 48, inquiries: 8, matches: 3 },
  { day: 'Tue', views: 62, inquiries: 12, matches: 5 },
  { day: 'Wed', views: 55, inquiries: 9, matches: 4 },
  { day: 'Thu', views: 79, inquiries: 18, matches: 8 },
  { day: 'Fri', views: 91, inquiries: 22, matches: 11 },
  { day: 'Sat', views: 104, inquiries: 28, matches: 14 },
  { day: 'Sun', views: 88, inquiries: 20, matches: 9 },
];

const DEMAND_MONTHS = [
  { month: 'Jan', demand: 45, price: 14000 },
  { month: 'Feb', demand: 55, price: 14200 },
  { month: 'Mar', demand: 72, price: 14500 },
  { month: 'Apr', demand: 80, price: 15000 },
  { month: 'May', demand: 88, price: 15200 },
  { month: 'Jun', demand: 76, price: 15000 },
  { month: 'Jul', demand: 62, price: 14800 },
  { month: 'Aug', demand: 91, price: 15500 },
  { month: 'Sep', demand: 95, price: 16000 },
  { month: 'Oct', demand: 86, price: 15800 },
  { month: 'Nov', demand: 68, price: 14900 },
  { month: 'Dec', demand: 48, price: 14000 },
];

const LISTINGS = [
  {
    id: 1, name: 'Madaraka 2BR Apartment', type: '2 Bedroom', rent: 24000,
    views: 342, ctr: 18, matches: 24, occupancy: 95, score: 94,
    status: 'occupied', nextVacancy: 'Aug 2025',
    recommendation: 'List now for September intake — peak demand season',
  },
  {
    id: 2, name: 'South B Studio Bedsitter', type: 'Studio', rent: 12000,
    views: 198, ctr: 22, matches: 31, occupancy: 100, score: 88,
    status: 'occupied', nextVacancy: 'Dec 2025',
    recommendation: 'Consider a KES 500 rent increase — demand is 94% in South B',
  },
  {
    id: 3, name: 'Kilimani 1BR Apartment', type: '1 Bedroom', rent: 22000,
    views: 421, ctr: 14, matches: 18, occupancy: 78, score: 85,
    status: 'available', nextVacancy: 'Now',
    recommendation: 'Price is slightly above market. Consider KES 20,000 to fill faster',
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}{p.name === 'price' ? '' : ''}</p>
      ))}
    </div>
  );
};

export default function LandlordDashboard() {
  const [selectedListing, setSelectedListing] = useState(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 bottom-0 w-64 h-full bg-blue-500/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-brass" />
            <span className="text-brass font-semibold text-sm uppercase tracking-widest">Landlord Intelligence</span>
          </div>
          <h2 className="font-heading text-3xl text-white font-light">
            Property <span className="italic text-brass">Analytics Dashboard</span>
          </h2>
          <p className="text-white/50 text-sm mt-2">AI-powered insights to maximise your occupancy and revenue.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Listing Views', value: '961', sub: 'This week', icon: Eye, color: 'text-blue-500', change: '+24%' },
          { label: 'Match Requests', value: '73', sub: 'This week', icon: Users, color: 'text-emerald-500', change: '+31%' },
          { label: 'Click-through Rate', value: '18.2%', sub: 'Avg across listings', icon: MousePointer, color: 'text-purple-500', change: '+5%' },
          { label: 'Occupancy Rate', value: '91%', sub: 'Portfolio average', icon: Building2, color: 'text-brass', change: '+3%' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {kpi.change}
              </span>
            </div>
            <p className="font-heading text-2xl font-semibold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            <p className="text-xs text-muted-foreground/60">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Views chart + Demand Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Weekly Activity</h3>
          <p className="text-xs text-muted-foreground mb-5">Views, enquiries & matches per day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={VIEWS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="views" name="views" fill="#3b82f6" radius={[3, 3, 0, 0]} opacity={0.7} />
              <Bar dataKey="inquiries" name="inquiries" fill="#C5A059" radius={[3, 3, 0, 0]} />
              <Bar dataKey="matches" name="matches" fill="#10b981" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[{ c: '#3b82f6', l: 'Views' }, { c: '#C5A059', l: 'Enquiries' }, { c: '#10b981', l: 'Matches' }].map(l => (
              <div key={l.l} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: l.c }} /> {l.l}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Student Demand Forecast</h3>
          <p className="text-xs text-muted-foreground mb-5">12-month predictive demand & recommended pricing</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={DEMAND_MONTHS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={v => `${(v/1000).toFixed(0)}K`} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line yAxisId="left" type="monotone" dataKey="demand" name="demand %" stroke="#C5A059" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="price" name="price" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" /> Best months to advertise: August & September
            </p>
            <p className="text-xs text-emerald-700 mt-0.5">Student intake period drives demand up to 95%</p>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Your Listings</h3>
        <div className="space-y-4">
          {LISTINGS.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                selectedListing === i ? 'border-brass/40 shadow-lg' : 'border-border hover:border-brass/20'
              }`}
              onClick={() => setSelectedListing(selectedListing === i ? -1 : i)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground">{listing.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        listing.status === 'occupied'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {listing.status === 'occupied' ? '✓ Occupied' : '⚡ Available Now'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{listing.type} · KES {listing.rent.toLocaleString()}/mo</p>
                  </div>
                  <div className="flex gap-4 text-center flex-wrap">
                    {[
                      { v: listing.views, l: 'Views', c: 'text-blue-600' },
                      { v: `${listing.ctr}%`, l: 'CTR', c: 'text-purple-600' },
                      { v: listing.matches, l: 'Matches', c: 'text-emerald-600' },
                      { v: `${listing.occupancy}%`, l: 'Occupancy', c: 'text-brass' },
                    ].map(s => (
                      <div key={s.l}>
                        <p className={`font-bold text-sm ${s.c}`}>{s.v}</p>
                        <p className="text-xs text-muted-foreground">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="mt-3 flex items-start gap-2 p-3 bg-brass/5 rounded-xl border border-brass/15">
                  <Sparkles className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground"><span className="font-semibold text-brass">AI Insight:</span> {listing.recommendation}</p>
                </div>

                {selectedListing === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3"
                  >
                    {[
                      { label: 'Maelon Score', value: `${listing.score}/100`, icon: Sparkles },
                      { label: 'Next Vacancy', value: listing.nextVacancy, icon: Calendar },
                      { label: 'Recommended Rent', value: `KES ${(listing.rent * 1.03).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, icon: TrendingUp },
                      { label: 'Demand Index', value: '91%', icon: BarChart3 },
                    ].map(item => (
                      <div key={item.label} className="bg-muted/50 rounded-xl p-3">
                        <item.icon className="w-4 h-4 text-brass mb-1" />
                        <p className="font-semibold text-sm text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}