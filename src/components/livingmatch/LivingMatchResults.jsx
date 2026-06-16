import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowLeft, Users, DollarSign, MapPin, GraduationCap,
  Brain, Shield, CheckCircle2, Star, Wifi, TrendingUp, Clock,
  Home, Bus, Loader2, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/api/base44Client';
import SmartAssistant from '@/components/livingmatch/SmartAssistant';

const CAMPUS_COMMUTE = {
  'Strathmore University': { Kilimani: 5, Westlands: 20, Lavington: 10, 'South B': 15, Madaraka: 8, 'Ngong Road': 12 },
  'University of Nairobi': { Westlands: 15, Parklands: 10, Kilimani: 20, Kasarani: 35, 'South B': 25 },
  'USIU-Africa': { Kasarani: 10, Ruaka: 20, 'Ngong Road': 45, Westlands: 25 },
  'Kenyatta University': { Kasarani: 15, Kahawa: 10, Ruaka: 30 },
  'JKUAT': { Kahawa: 20, Kasarani: 25 },
};

const NEIGHBORHOOD_DATA = {
  Kilimani: { safety: 88, internet: 92, student_pop: 75, avg_rent: 22000 },
  Westlands: { safety: 82, internet: 95, student_pop: 70, avg_rent: 28000 },
  Lavington: { safety: 90, internet: 90, student_pop: 65, avg_rent: 25000 },
  'South B': { safety: 75, internet: 80, student_pop: 85, avg_rent: 14000 },
  Madaraka: { safety: 78, internet: 78, student_pop: 90, avg_rent: 12000 },
  'Ngong Road': { safety: 80, internet: 82, student_pop: 80, avg_rent: 15000 },
  Parklands: { safety: 85, internet: 88, student_pop: 72, avg_rent: 20000 },
  Kasarani: { safety: 72, internet: 75, student_pop: 88, avg_rent: 10000 },
  Ruaka: { safety: 74, internet: 78, student_pop: 82, avg_rent: 11000 },
  Rongai: { safety: 76, internet: 72, student_pop: 78, avg_rent: 9000 },
  Kahawa: { safety: 70, internet: 70, student_pop: 85, avg_rent: 8500 },
  Embakasi: { safety: 68, internet: 72, student_pop: 76, avg_rent: 9500 },
  'South C': { safety: 74, internet: 78, student_pop: 80, avg_rent: 13000 },
  "Lang'ata": { safety: 76, internet: 76, student_pop: 79, avg_rent: 13500 },
  Kileleshwa: { safety: 87, internet: 91, student_pop: 68, avg_rent: 26000 },
};

function ScoreRing({ score, size = 100, color = '#C5A059', label }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={`${progress} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${progress} ${circ}` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize="18" fontWeight="700" fill={color} fontFamily="Inter">{score}%</text>
      </svg>
      {label && <span className="text-xs text-muted-foreground font-medium">{label}</span>}
    </div>
  );
}

function ScoreBar({ label, score, color = 'bg-brass', delay = 0 }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground w-8 text-right">{score}%</span>
    </div>
  );
}

export default function LivingMatchResults({ formData, onBack, onOpenAssistant }) {
  const [aiResults, setAiResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    async function generate() {
      const { data: allProfiles } = await supabase.from('roommate_profiles').select('*').order('created_at', { ascending: false }).limit(40);
      setProfiles(allProfiles);

      // Build neighborhood ranking
      const locs = formData.preferred_location || [];
      const commuteData = CAMPUS_COMMUTE[formData.university] || {};
      const rankedNeighborhoods = locs.map(loc => ({
        name: loc,
        data: NEIGHBORHOOD_DATA[loc] || { safety: 75, internet: 78, student_pop: 75, avg_rent: 14000 },
        commute: commuteData[loc] || 25,
      })).sort((a, b) => {
        const scoreA = a.data.safety + a.data.student_pop - (a.commute * 2);
        const scoreB = b.data.safety + b.data.student_pop - (b.commute * 2);
        return scoreB - scoreA;
      });

      const prompt = `You are Maelon AI, the most intelligent student housing assistant in Africa.

Student Profile:
- University: ${formData.university}
- Monthly Budget: KES ${formData.budget_min?.toLocaleString()} – ${formData.budget_max?.toLocaleString()}
- Sleep Schedule: ${formData.sleep_schedule}
- Study Environment: ${formData.study_environment}
- Cleanliness: ${formData.cleanliness}
- Social Level: ${formData.social_level}
- Smoker: ${formData.smoking ? 'Yes' : 'No'}
- Preferred Neighborhoods: ${locs.join(', ')}
- Room Type: ${formData.room_type}

Available roommate profiles in database: ${allProfiles.length}
Top neighborhoods by suitability: ${rankedNeighborhoods.slice(0, 3).map(n => n.name).join(', ')}

Generate a comprehensive living match analysis. Be specific to Nairobi student housing context.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{ 
      role: 'user', 
      content: prompt + '\n\nRespond only with a valid JSON object containing these fields: match_score, roommate_compatibility, budget_compatibility, lifestyle_score, campus_convenience, top_neighborhood, neighborhood_reason, recommended_property_type, estimated_rent_split, monthly_transport_cost, monthly_utilities, total_monthly_cost, affordability_score, why_this_match (array), lifestyle_insights (array), smart_tips (array), area_description. No markdown, no explanation, just JSON.'
    }]
  })
});
const data = await response.json();
const result = JSON.parse(data.content[0].text);

setAiResults({ ...result, rankedNeighborhoods });
setLoading(false);
    }
    generate();
  }, [formData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-brass/10 flex items-center justify-center mx-auto mb-6 relative">
            <Brain className="w-10 h-10 text-brass" />
            <div className="absolute inset-0 rounded-2xl border-2 border-brass/30 animate-ping" />
          </div>
          <h2 className="font-heading text-3xl font-light text-foreground">Analysing Your Perfect Match</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Our AI is scanning {profiles.length} profiles, calculating commute times, and building your personalized living match report…
          </p>
          <div className="mt-8 space-y-3">
            {['Matching lifestyle profiles…', 'Calculating campus proximity…', 'Analysing budget compatibility…', 'Generating property recommendations…'].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <Loader2 className="w-4 h-4 text-brass animate-spin flex-shrink-0" />
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const ai = aiResults;
  const topNeighborhood = ai?.rankedNeighborhoods?.[0];
  const neighData = topNeighborhood ? (NEIGHBORHOOD_DATA[topNeighborhood.name] || {}) : {};

  return (
    <div className="bg-background min-h-screen">
      {/* Results Header */}
      <div className="bg-navy py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brass/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to search
          </button>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass/20 border border-brass/30 text-brass text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" /> AI Living Match Report
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-light text-white">
                Your <span className="italic text-brass">Perfect Match</span>
              </h1>
              <p className="text-white/60 mt-2">{formData.university} · KES {formData.budget_min?.toLocaleString()}–{formData.budget_max?.toLocaleString()}/mo</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <ScoreRing score={ai?.match_score ?? 82} size={110} color="#C5A059" />
                <p className="text-white/60 text-xs mt-1">Overall Match</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Match Score Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Roommate Compatibility', score: ai?.roommate_compatibility ?? 78, color: '#10b981', ringColor: '#10b981' },
            { label: 'Budget Compatibility', score: ai?.budget_compatibility ?? 85, color: '#3b82f6', ringColor: '#3b82f6' },
            { label: 'Lifestyle Match', score: ai?.lifestyle_score ?? 80, color: '#8b5cf6', ringColor: '#8b5cf6' },
            { label: 'Campus Convenience', score: ai?.campus_convenience ?? 75, color: '#C5A059', ringColor: '#C5A059' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-5 flex flex-col items-center text-center"
            >
              <ScoreRing score={item.score} size={80} color={item.color} />
              <p className="text-xs text-muted-foreground mt-3 leading-tight">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why This Match */}
        {ai?.why_this_match?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-brass/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brass" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Why This Match?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ai.why_this_match.map((reason, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-emerald-800">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Property + Cost */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Property Recommendation */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Home className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Property Recommendation</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-navy rounded-xl p-4">
                <p className="text-white/50 text-xs mb-1">Best match for you</p>
                <p className="text-white font-semibold text-lg">{ai?.recommended_property_type ?? 'Shared 2-bedroom apartment'}</p>
                <p className="text-brass text-sm mt-1 font-medium">in {ai?.top_neighborhood ?? topNeighborhood?.name ?? 'Kilimani'}</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your rent split</span>
                  <span className="font-semibold text-foreground">KES {(ai?.estimated_rent_split ?? 14000)?.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transport to campus</span>
                  <span className="font-semibold text-foreground">KES {(ai?.monthly_transport_cost ?? 2500)?.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated utilities</span>
                  <span className="font-semibold text-foreground">KES {(ai?.monthly_utilities ?? 1500)?.toLocaleString()}/mo</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total monthly cost</span>
                  <span className="font-bold text-brass text-lg">KES {(ai?.total_monthly_cost ?? 18000)?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Commute & Living */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Bus className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Campus & Living Insights</h2>
            </div>
            <div className="space-y-4">
              {topNeighborhood && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Clock className="w-5 h-5 text-brass flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{topNeighborhood.commute} min commute</p>
                    <p className="text-xs text-muted-foreground">{topNeighborhood.name} → {formData.university}</p>
                  </div>
                </div>
              )}
              <div className="space-y-3 mt-2">
                <ScoreBar label="Affordability" score={ai?.affordability_score ?? 75} color="bg-emerald-500" delay={0.3} />
                <ScoreBar label="Area Safety" score={neighData.safety ?? 80} color="bg-blue-500" delay={0.4} />
                <ScoreBar label="Internet Quality" score={neighData.internet ?? 82} color="bg-purple-500" delay={0.5} />
                <ScoreBar label="Student Popularity" score={neighData.student_pop ?? 78} color="bg-brass" delay={0.6} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Neighborhoods */}
        {ai?.rankedNeighborhoods?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Neighborhood Recommendations</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ai.rankedNeighborhoods.slice(0, 6).map((n, i) => {
                const nd = NEIGHBORHOOD_DATA[n.name] || { safety: 75, internet: 78, student_pop: 75, avg_rent: 14000 };
                return (
                  <motion.div
                    key={n.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className={`rounded-xl p-4 border ${i === 0 ? 'border-brass/30 bg-brass/5' : 'border-border bg-muted/30'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground text-sm">{n.name}</span>
                      {i === 0 && <span className="text-xs text-brass font-medium px-2 py-0.5 bg-brass/10 rounded-full">Best Pick</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                      <span>🚗 {n.commute} min</span>
                      <span>💰 KES {(nd.avg_rent / 1000).toFixed(0)}K avg</span>
                      <span>🛡 {nd.safety}% safe</span>
                      <span>📶 {nd.internet}% wifi</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {ai?.area_description && (
              <p className="text-sm text-muted-foreground mt-4 p-4 bg-muted/50 rounded-xl leading-relaxed">
                💡 {ai.area_description}
              </p>
            )}
          </motion.div>
        )}

        {/* Smart Tips + Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {ai?.lifestyle_insights?.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-foreground">Lifestyle Insights</h3>
              </div>
              <div className="space-y-3">
                {ai.lifestyle_insights.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {ai?.smart_tips?.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-brass" />
                <h3 className="font-semibold text-foreground">Smart Living Tips</h3>
              </div>
              <div className="space-y-3">
                {ai.smart_tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-navy rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass/20 border border-brass/30 text-brass text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Ready to find your perfect living match?
          </div>
          <h2 className="font-heading text-3xl font-light text-white mb-3">
            Take the <span className="italic text-brass">full questionnaire</span>
          </h2>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Create a full profile to get matched with real students and browse verified properties near your campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/roommate-questionnaire">
              <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full flex items-center gap-2">
                <Users className="w-4 h-4" /> Find Real Roommates
              </Button>
            </a>
            <Button
              variant="outline"
              onClick={() => setShowAssistant(true)}
              className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Ask Smart Assistant
            </Button>
          </div>
        </motion.div>
      </div>

      {showAssistant && <SmartAssistant onClose={() => setShowAssistant(false)} />}
    </div>
  );
}