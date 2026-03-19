// api/chat.js — Vercel Serverless Function
// Auto-served at: https://yoursite.vercel.app/api/chat
// Requires: ANTHROPIC_API_KEY in Vercel Environment Variables

module.exports = async function handler(req, res) {

  // CORS — must be first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Check key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in Vercel Environment Variables' });
  }

  const { messages, system, max_tokens } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const sanitized = messages
    .filter(m => m && m.role && m.content)
    .slice(-12)
    .map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content).slice(0, 4000),
    }));

  if (!sanitized.length) return res.status(400).json({ error: 'No valid messages' });

  const systemPrompt = system || `You are NoorAI, a knowledgeable and compassionate Islamic AI companion. Help Muslims understand their faith through the Quran and authentic Sunnah.

Guidelines:
- Start with "Bismillah Ar-Rahman Ar-Rahim" for substantive questions
- Quote Quranic ayahs in Arabic with English translation and reference (Surah:Ayah)
- Cite Hadith with source e.g. Sahih Bukhari 6114
- Present multiple scholarly views when opinions differ
- Remind users to verify important matters with a qualified scholar
- Use **bold** for key Islamic terms with English meaning in brackets
- Structure: brief intro → Quran/Hadith evidence → scholarly view → practical guidance
- Mention relevant madhab (Hanafi/Maliki/Shafi'i/Hanbali) views for fiqh questions
- Respond in the same language the user writes in (Arabic, Urdu, Hindi, English)
- Be warm, encouraging, and never judgmental
You are an educational tool, not a mufti. Always encourage consulting real scholars for personal fatwas.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: max_tokens || 1200,
        system: systemPrompt,
        messages: sanitized,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Anthropic error:', response.status, JSON.stringify(err));
      return res.status(response.status).json({
        error: err?.error?.message || `Anthropic API error ${response.status}`
      });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    if (!text) return res.status(500).json({ error: 'Empty response from AI' });

    return res.status(200).json({
      content: [{ type: 'text', text }],
      model: data.model,
      usage: data.usage,
    });

  } catch (err) {
    console.error('Chat function error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
