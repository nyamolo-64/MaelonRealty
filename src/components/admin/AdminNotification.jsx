import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Send, Users, User, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';

const NOTIFICATION_TYPES = [
  { value: 'roommate_match', label: 'Roommate Match', icon: '🤝' },
  { value: 'viewing_confirmed', label: 'Viewing Confirmed', icon: '📅' },
  { value: 'property_recommendation', label: 'Property Recommendation', icon: '🏠' },
  { value: 'verification_update', label: 'Verification Update', icon: '✅' },
  { value: 'referral_reward', label: 'Referral Reward', icon: '🎁' },
  { value: 'lead_update', label: 'Lead Update', icon: '📊' },
];

const RECENT_NOTIFICATIONS = [
  { title: 'New Roommate Match Found!', body: 'You have a 94% match with Amina K. in Madaraka', type: 'roommate_match', sent_to: 'James M.', time: '5 min ago' },
  { title: 'Viewing Confirmed', body: 'Your viewing for 2BR Madaraka on June 7 at 10:00 AM is confirmed', type: 'viewing_confirmed', sent_to: 'Grace N.', time: '30 min ago' },
  { title: 'Property Verification Update', body: 'Your Kilimani property has been approved for listing', type: 'verification_update', sent_to: 'John M.', time: '2hr ago' },
  { title: 'Referral Reward Earned!', body: 'You earned KES 500 for referring Brian O.', type: 'referral_reward', sent_to: 'Amina K.', time: '1 day ago' },
];

export default function AdminNotifications() {
  const [form, setForm] = useState({ type: 'property_recommendation', title: '', body: '', audience: 'all' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!form.title || !form.body) return;
    setSending(true);
    // In production, this would fan-out to all matching users
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    toast({ title: 'Notification sent!', description: `Sent to ${form.audience === 'all' ? 'all users' : form.audience} successfully.` });
    setTimeout(() => setSent(false), 3000);
    setForm(p => ({ ...p, title: '', body: '' }));
  };

  return (
    <div className="space-y-8">
      {/* Compose */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-brass" />
          <h3 className="font-semibold text-foreground">Send Notification</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Notification Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm">
                {NOTIFICATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Send To</label>
              <select value={form.audience} onChange={e => setForm(p => ({ ...p, audience: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm">
                <option value="all">All Users</option>
                <option value="students">Students Only</option>
                <option value="landlords">Landlords Only</option>
                <option value="ambassadors">Ambassadors Only</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
            <input type="text" placeholder="Notification title..." value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
            <textarea placeholder="Notification body..." value={form.body}
              onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 text-sm h-24 resize-none" />
          </div>
          <Button onClick={handleSend} disabled={!form.title || !form.body || sending}
            className="bg-brass hover:bg-brass-light text-navy font-semibold rounded-xl px-8 gap-2">
            {sent ? <><CheckCircle2 className="w-4 h-4" /> Sent!</> : sending ? 'Sending…' : <><Send className="w-4 h-4" /> Send Notification</>}
          </Button>
        </div>
      </div>

      {/* Recent Notifications */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Recent Notifications Sent</h3>
        <div className="space-y-3">
          {RECENT_NOTIFICATIONS.map((n, i) => {
            const typeConfig = NOTIFICATION_TYPES.find(t => t.value === n.type);
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brass/10 flex items-center justify-center flex-shrink-0 text-lg">
                  {typeConfig?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-foreground text-sm">{n.title}</p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                  <p className="text-xs text-brass mt-1 font-medium">→ {n.sent_to}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}