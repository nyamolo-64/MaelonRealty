// @ts-ignore
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Shield, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/api/base44Client';

function makeConvId(a, b) {
  return [a, b].sort().join('__');
}

function avatarColor(id) {
  const colors = ['from-brass to-brass-dark', 'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-purple-400 to-purple-600', 'from-rose-400 to-rose-600'];
  const idx = (id || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

export default function ChatWindow({ myProfile, otherProfile, matchScore, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
// @ts-ignore
const bottomRef = useRef<HTMLDivElement>(null);  const convId = makeConvId(myProfile.id, otherProfile.id);

  // @ts-ignore
  useEffect(() => {
    async function loadMessages() {
      const { data: msgs } = await supabase.from('messages')
  .select('*')
  .eq('conversation_id', convId)
  .order('created_at', { ascending: true })
  .limit(100);
setMessages(msgs || []);
      setLoading(false);
    }
    loadMessages();

    const unsub = supabase.channel(`messages:${convId}`)
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${convId}` },
    (payload) => setMessages(prev => [...prev, payload.new])
  ).subscribe();
return () => supabase.removeChannel(unsub);
  }, [convId]);

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setText('');
    await supabase.from('messages').insert({
      conversation_id: convId,
      sender_id: myProfile.id,
      recipient_id: otherProfile.id,
      content: trimmed,
      read: false,
    });
    setSending(false);
  }

  const initials = (otherProfile.full_name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const gradClass = avatarColor(otherProfile.id);
  const myInitials = (myProfile.full_name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
      style={{ height: '520px' }}
    >
      {/* Header */}
      <div className="bg-navy px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-sm font-semibold">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{otherProfile.full_name}</p>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Verified</span>
            <span>·</span>
            <Sparkles className="w-3 h-3 text-brass" />
            <span className="text-brass font-semibold">{matchScore}% match</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors flex-shrink-0">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center mb-3`}>
              <span className="text-white text-lg font-semibold">{initials}</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{otherProfile.full_name}</p>
            <p className="text-xs text-muted-foreground mt-1">{otherProfile.university} · {otherProfile.year_of_study}</p>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              You two are a <span className="text-brass font-semibold">{matchScore}% match</span>! Break the ice and say hello 👋
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isMe = msg.sender_id === myProfile.id;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center flex-shrink-0 mt-1`}>
                      <span className="text-white text-xs font-semibold">{initials}</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? 'bg-navy text-white rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {isMe && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-navy text-xs font-semibold">{myInitials}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div 
// @ts-ignore
        ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="px-3 py-3 border-t border-border flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Message ${otherProfile.full_name?.split(' ')[0]}…`}
          className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 transition-all"
          disabled={sending}
          autoFocus
        />
        <Button
          type="submit"
          size="icon"
          disabled={!text.trim() || sending}
          className="rounded-full w-9 h-9 bg-brass hover:bg-brass-light text-navy flex-shrink-0 disabled:opacity-40"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </motion.div>
  );
}