import { base44 } from '@/api/base44Client';

/**
 * Rule-based pre-scorer: fast heuristic used as a fallback
 * and to pre-rank before sending to AI.
 */
export function heuristicScore(myProfile, other) {
  let score = 0;
  let total = 0;

  const add = (weight, points) => { total += weight; score += points; };

  // Budget overlap (most important — 20pts)
  if (myProfile.budget_min && myProfile.budget_max && other.budget_min && other.budget_max) {
    const overlapMin = Math.max(myProfile.budget_min, other.budget_min);
    const overlapMax = Math.min(myProfile.budget_max, other.budget_max);
    add(20, overlapMax >= overlapMin ? 20 : overlapMax >= overlapMin - 5000 ? 10 : 2);
  } else {
    add(20, 10); // neutral
  }

  // Same university bonus (15pts)
  add(15, myProfile.university === other.university ? 15 : other.university ? 5 : 7);

  // Sleep schedule (12pts) — exact match or close
  const sleepOrder = ['Early bird (before 10pm)', 'Flexible', 'Night owl (after midnight)'];
  const myS = sleepOrder.indexOf(myProfile.sleep_schedule);
  const theirS = sleepOrder.indexOf(other.sleep_schedule);
  add(12, myS === theirS ? 12 : Math.abs(myS - theirS) === 1 ? 7 : myS === -1 || theirS === -1 ? 6 : 2);

  // Cleanliness (10pts)
  const cleanOrder = ['Very tidy — everything in its place', 'Reasonably clean', 'Relaxed about mess'];
  const myC = cleanOrder.indexOf(myProfile.cleanliness);
  const theirC = cleanOrder.indexOf(other.cleanliness);
  add(10, myC === theirC ? 10 : Math.abs(myC - theirC) === 1 ? 6 : myC === -1 || theirC === -1 ? 5 : 1);

  // Study environment (8pts)
  add(8, myProfile.study_environment === other.study_environment ? 8
    : !myProfile.study_environment || !other.study_environment ? 4 : 2);

  // Social level (8pts)
  const socialOrder = ['Prefer my own space', 'Balanced', 'Very social — love hanging out'];
  const myL = socialOrder.indexOf(myProfile.social_level);
  const theirL = socialOrder.indexOf(other.social_level);
  add(8, myL === theirL ? 8 : Math.abs(myL - theirL) === 1 ? 5 : myL === -1 || theirL === -1 ? 4 : 1);

  // Guests preference (5pts)
  add(5, myProfile.guests === other.guests ? 5
    : !myProfile.guests || !other.guests ? 2 : 1);

  // Smoking — hard factor (10pts)
  add(10, myProfile.smoking === other.smoking ? 10 : 0);

  // Pets (5pts)
  add(5, myProfile.pets === other.pets ? 5 : 2);

  // Location overlap (8pts)
  const myLocs = myProfile.preferred_location || [];
  const theirLocs = other.preferred_location || [];
  const locOverlap = myLocs.filter((l) => theirLocs.includes(l)).length;
  const locMax = Math.max(myLocs.length, theirLocs.length);
  add(8, locMax > 0 ? Math.round((locOverlap / locMax) * 8) : 4);

  // Interests overlap (10pts)
  const myInt = myProfile.interests || [];
  const theirInt = other.interests || [];
  const intOverlap = myInt.filter((i) => theirInt.includes(i)).length;
  const intMax = Math.max(myInt.length, theirInt.length);
  add(10, intMax > 0 ? Math.round((intOverlap / intMax) * 10) : 5);

  // Gender preference compatibility (extra check, not scored but used for filtering)
  // (not penalized here, handled at display level)

  const raw = total > 0 ? (score / total) * 100 : 50;
  return Math.min(99, Math.max(35, Math.round(raw)));
}

/**
 * Build a concise profile summary for the AI prompt.
 */
function profileSummary(p) {
  return [
    `University: ${p.university || 'Unknown'}`,
    `Year: ${p.year_of_study || 'Unknown'}`,
    `Budget: KES ${p.budget_min || '?'}–${p.budget_max || '?'}/mo`,
    `Locations: ${(p.preferred_location || []).join(', ') || 'Any'}`,
    `Sleep: ${p.sleep_schedule || 'Not specified'}`,
    `Study env: ${p.study_environment || 'Not specified'}`,
    `Cleanliness: ${p.cleanliness || 'Not specified'}`,
    `Social level: ${p.social_level || 'Not specified'}`,
    `Guests: ${p.guests || 'Not specified'}`,
    `Cooking: ${p.cooking_frequency || 'Not specified'}`,
    `Smoking: ${p.smoking ? 'Yes' : 'No'}`,
    `Pets: ${p.pets ? 'Yes' : 'No'}`,
    `WFH: ${p.work_from_home ? 'Yes' : 'No'}`,
    `Interests: ${(p.interests || []).join(', ') || 'None listed'}`,
    `Room type: ${p.room_type || 'Any'}`,
    `Lease: ${p.lease_duration || 'Flexible'}`,
    p.about_me ? `Bio: ${p.about_me.slice(0, 120)}` : '',
  ].filter(Boolean).join(' | ');
}

/**
 * AI-powered matching: calls InvokeLLM with the user's profile
 * and up to 15 candidate profiles, returns enriched match objects.
 *
 * Returns array of { id, score, reasons, dealbreakers }
 */
export async function aiMatchProfiles(myProfile, candidates) {
  if (!candidates.length) return [];

  // Pre-rank with heuristic, take top 15 to keep prompt small
  const ranked = [...candidates]
    .map((c) => ({ ...c, _pre: heuristicScore(myProfile, c) }))
    .sort((a, b) => b._pre - a._pre)
    .slice(0, 15);

  const myDesc = profileSummary(myProfile);
  const candidateList = ranked
    .map((c, i) => `Candidate ${i + 1} (id: ${c.id}):\n${profileSummary(c)}`)
    .join('\n\n');

  const prompt = `You are an expert student housing compatibility analyst for Maelon Realty in Nairobi, Kenya.

Your task: given one student's profile (the "Seeker") and a list of candidate profiles, score each candidate's compatibility with the Seeker on a scale of 0–100 and provide short reasons.

Scoring guidelines:
- Budget overlap is critical (30% weight). If budgets don't overlap at all, cap score at 55.
- Sleep schedule compatibility is very important (15% weight). Mismatches cause daily conflict.
- Cleanliness level is very important (15% weight). Big mismatches cause serious friction.
- Lifestyle factors (guests, social level, smoking, pets) matter a lot (20% weight combined).
- Shared interests and location preferences add compatibility (10% each).
- Same university is a positive but not decisive (5%).
- Be realistic: scores 85+ mean genuine excellent matches, 70–84 good, 55–69 okay, below 55 poor.
- Hard dealbreaker: if one smokes and the other doesn't, penalise score heavily (−20 points).

Seeker profile:
${myDesc}

Candidates:
${candidateList}

Respond with a JSON object containing a "matches" array. Each item must have:
- "id": the candidate's id string
- "score": integer 0–100
- "reasons": array of 2–3 short strings explaining why they're compatible (focus on positives, be specific)
- "dealbreakers": array of 0–2 short strings for any significant incompatibilities (empty array if none)
`;

  const result = await base44.integrations.Core.InvokeLLM({
    prompt,
    response_json_schema: {
      type: 'object',
      properties: {
        matches: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
              dealbreakers: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    },
  });

  return result?.matches || [];
}