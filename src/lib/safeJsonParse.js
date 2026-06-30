export function safeJsonParse(text, fallback = {}) {
  if (!text) return fallback;
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    const toParse = jsonMatch ? jsonMatch[0] : cleaned;
    return JSON.parse(toParse);
  } catch (e) {
    console.error('Failed to parse AI response:', e, text);
    return fallback;
  }
}