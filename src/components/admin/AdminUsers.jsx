import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, UserCheck, Search, Filter, MoreHorizontal } from 'lucide-react';

const MOCK_USERS = [
  { id: '1', name: 'Amina Korir', email: 'amina@strathmore.edu', role: 'user', type: 'student', university: 'Strathmore', status: 'active', trust: 95, joined: '2025-01-10' },
  { id: '2', name: 'John Mwangi', email: 'john@gmail.com', role: 'user', type: 'landlord', university: '', status: 'active', trust: 80, joined: '2025-02-14' },
  { id: '3', name: 'Grace Njeri', email: 'grace@usiu.ac.ke', role: 'user', type: 'student', university: 'USIU', status: 'active', trust: 100, joined: '2024-11-05' },
  { id: '4', name: 'Brian Ochieng', email: 'brian@ku.ac.ke', role: 'user', type: 'student', university: 'KU', status: 'active', trust: 60, joined: '2025-05-20' },
  { id: '5', name: 'Admin User', email: 'admin@maelon.co.ke', role: 'admin', type: 'admin', university: '', status: 'active', trust: 100, joined: '2024-09-01' },
  { id: '6', name: 'Suspicious Account', email: 'free123@temp.com', role: 'user', type: 'student', university: '', status: 'suspended', trust: 10, joined: '2025-06-01' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = MOCK_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || u.type === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">User Management</h2>
          <p className="text-sm text-muted-foreground">{MOCK_USERS.length} registered users</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'student', 'landlord', 'admin', 'suspended'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-all ${filter === f ? 'bg-brass/10 border-brass/30 text-brass' : 'border-border text-muted-foreground'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {['User', 'Type', 'University', 'Trust Score', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0">
                        <span className="text-navy text-xs font-bold">{user.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${
                      user.type === 'admin' ? 'bg-navy/10 text-navy border-navy/20' :
                      user.type === 'landlord' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>{user.type}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{user.university || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-brass" style={{ width: `${user.trust}%` }} />
                      </div>
                      <span className={`text-xs font-semibold ${user.trust >= 80 ? 'text-emerald-600' : user.trust >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{user.trust}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{user.joined}</td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}