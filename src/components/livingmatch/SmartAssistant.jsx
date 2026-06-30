import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Brain, Sparkles, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';

const QUICK_PROMPTS = [
  'Find housing under KSh 10,000 near Strathmore',
  'Find a roommate who studies at night',
  'Cheapest neighborhoods near USIU',
  'Compare Madaraka vs South B for students',
  'Best areas for Kenyatta University students',
  'What\'s the average rent in Kilimani?',
];

const SYSTEM_CONTEXT = `You are Maelon AI — the most intelligent student housing assistant in Nairobi, Kenya.
You know every neighborhood in Nairobi, their proximity to all major universities (Strathmore, UoN, USIU-Africa, Kenyatta University, JKUAT), average rent prices, safety scores, student population, and commute times.

Key data:
- Kilimani: KES 18-30K/mo, 5 min from Strathmore, very safe, great internet
- Westlands: KES 20-35K/mo, 15 min from UoN, upscale, lots of students
- South B: KES 10-18K/mo, 15 min from Strathmore, popular with students
- Madaraka: KES 8-14K/mo, 8 min from Strathmore, very student-friendly
- Kasarani: KES 7-12K/mo, 10 min from USIU, affordable
- Kahawa: KES 6-10K/mo, near KU and JKUAT, very budget-friendly
- Ruaka: KES 8-13K/mo, 20 min from USIU, growing area
- Parklands: KES 16-25K/mo, near UoN, diverse community
- Lavington: KES 20-30K/mo, near Strathmore, upscale
- Ngong Road: KES 12-18K/mo, good for Strathmore and JKUAT

Answer questions conversationally. Use emojis. Be specific with KES prices and commute times. Be helpful, friendly, and knowledgeable about the Nairobi student housing market.`;

export default function SmartAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm **Maelon AI** 👋 — your intelligent student housing assistant for Nairobi.\n\nI can help you find housing, compare neighborhoods, estimate costs, and match you with compatible roommates. What would you like to know? 🏠✨"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Student' : 'Maelon AI'}: ${m.content}`).join('\n');

    try {
      const { data, error } = await supabase.functions.invoke('dynamic-service', {
        body: {
          prompt: `${SYSTEM_CONTEXT}\n\nConversation so far:\n${history}\n\nStudent: ${msg}\n\nMaelon AI:`,
          max_tokens: 1000
        }
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (e) {
      console.error('Smart Assistant failed:', e);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
    };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 right-4 z-50 w-[400px] max-w-[calc(100vw-1rem)] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
      style={{ height: '580px' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-brass/20 flex items-center justify-center flex-shrink-0 border border-brass/30">
          <Brain className="w-5 h-5 text-brass" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Maelon Smart Assistant</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/50 text-xs">AI-powered · Nairobi Housing Expert</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors flex-shrink-0">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-brass/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-brass" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-navy text-white rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown
                    className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5"
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-lg bg-brass/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-brass" />
            </div>
            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick prompts — only when only the welcome message */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border hover:border-brass/40 hover:bg-brass/5 hover:text-brass text-muted-foreground transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
        className="px-3 py-3 border-t border-border flex items-center gap-2 flex-shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about housing, roommates, neighborhoods…"
          className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brass/30 transition-all"
          disabled={loading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || loading}
          className="rounded-full w-9 h-9 bg-brass hover:bg-brass-light text-navy flex-shrink-0 disabled:opacity-40"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </motion.div>
  );
}