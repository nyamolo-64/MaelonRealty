import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Brain, Sparkles, MapPin, DollarSign, Users, Home, Loader2, Mic, Paperclip } from 'lucide-react';
//No importing base44 here since this component is used in the landing page before users are authenticated
import ReactMarkdown from 'react-markdown';

const QUICK_PROMPTS = [
  { icon: DollarSign, text: 'Find me housing under KES 15,000 near Strathmore' },
  { icon: Users, text: 'I need a roommate who is quiet and studious' },
  { icon: MapPin, text: 'Which neighborhoods are safest for female students?' },
  { icon: Home, text: 'Compare Kilimani vs Westlands for a student on a tight budget' },
  { icon: Sparkles, text: 'What is the best time of year to rent in Nairobi?' },
  { icon: Brain, text: 'Help me create a move-in checklist for my first apartment' },
];

const SYSTEM_PROMPT = `You are Maelon AI — the world's most advanced student housing assistant for Nairobi, Kenya. 
You are warm, expert, and concise. You help students find housing, understand neighborhoods, plan budgets, find roommates, and navigate the Nairobi rental market.

Key knowledge:
- Nairobi neighborhoods: Kilimani (upscale, KES 20K-50K), Westlands (modern, KES 18K-45K), South B (affordable, KES 10K-22K), Kasarani (student area, KES 8K-18K), Madaraka (near Strathmore, KES 12K-25K), Ngong Road (mid-range, KES 15K-30K), Ruaka (growing, KES 10K-20K)
- Universities: Strathmore (Madaraka/Kilimani), UoN (CBD area), USIU (Kasarani), KU (Kahawa), JKUAT (Juja)
- Transport: Matatu routes are main transport, Uber available, monthly transport budget typically KES 3K-8K
- Student needs: WiFi reliability, security, water supply, proximity to campus, kitchen access
- Maelon platform features: Virtual tours, budget planner, reputation network, roommate matching, viewing scheduling

Always be specific, mention actual Nairobi locations, and give price ranges in KES. Be friendly and proactive in suggesting next steps.`;

export default function AIConcierge() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm **Maelon AI**, your personal housing concierge. I know every corner of Nairobi's student housing market.\n\nTell me about yourself — your university, budget, and what matters most to you — and I'll find your perfect home. 🏡"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const history = [...messages, { role: 'user', content: userMsg }]
      .map(m => `${m.role === 'user' ? 'User' : 'Maelon AI'}: ${m.content}`)
      .join('\n\n');

    const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{ 
      role: 'user', 
      content: `${SYSTEM_PROMPT}\n\nConversation history:\n${history}\n\nMaelon AI:`
    }]
  })
});
const data = await res.json();
const response = data.content[0].text;
setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-navy flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/8 glass-panel-dark">
        <div className="flex items-center gap-3">
          <Link to="/maelon-os"><button className="text-white/40 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button></Link>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center">
            <Brain className="w-5 h-5 text-navy" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Maelon AI™</p>
            <p className="text-white/40 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Housing Concierge
            </p>
          </div>
        </div>
        <span className="text-xs text-brass bg-brass/10 border border-brass/20 px-3 py-1 rounded-full font-medium">AI Powered</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-navy" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-brass text-navy font-medium'
                  : 'glass-panel text-white/90'
              }`}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown
                    className="text-sm leading-relaxed prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_strong]:text-brass [&_a]:text-brass"
                  >{msg.content}</ReactMarkdown>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brass to-brass-dark flex items-center justify-center">
              <Brain className="w-4 h-4 text-navy" />
            </div>
            <div className="glass-panel rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-brass animate-spin" />
              <span className="text-white/50 text-sm">Analysing Nairobi housing data…</span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts (show only at start) */}
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-4">
          <p className="text-white/30 text-xs mb-3 uppercase tracking-wider font-semibold">Suggested questions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {QUICK_PROMPTS.map((p, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => sendMessage(p.text)}
                className="flex items-center gap-2.5 text-left px-4 py-2.5 rounded-xl glass-panel hover:border-brass/30 transition-all text-white/60 hover:text-white text-sm group"
              >
                <p.icon className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                <span className="text-xs leading-tight">{p.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-white/8">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about housing, neighborhoods, budget, roommates…"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brass/40 focus:bg-white/8 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-brass flex items-center justify-center disabled:opacity-40 flex-shrink-0"
          >
            <Send className="w-4 h-4 text-navy" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}