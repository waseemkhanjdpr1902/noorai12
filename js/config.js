/* ============================================================
   NoorAI — Configuration & Constants
   js/config.js
   ============================================================ */

const CONFIG = {
  /* ── App Info ── */
  APP_NAME:    'NoorAI',
  APP_VERSION: '1.0.0',
  APP_URL:     window.location.origin,

  /* ── Razorpay ── */
  // ⚠️  Replace with your live key before going live
  RAZORPAY_KEY: 'rzp_live_PASTE_YOUR_LIVE_KEY_HERE'   // ← REPLACE THIS,

  /* ── External APIs ── */
  QURAN_API:    'https://api.alquran.cloud/v1',
  PRAYER_API:   'https://api.aladhan.com/v1',
  AI_PROXY_URL: '/api/chat',          // Your backend proxy endpoint

  /* ── Auth ── */
  TOKEN_KEY:    'noorai_token',
  USER_KEY:     'noorai_user',
  SESSION_MINS: 1440,                 // 24 hours

  /* ── Plans ── */
  PLANS: {
    free: {
      id: 'free',
      name: 'Nur',
      displayName: 'Nur (Free)',
      price_monthly: 0,
      price_annual:  0,
      price_lifetime:0,
      ai_messages_per_month: 15,
      quran_access: true,
      prayer_times: true,
      habit_tracker: false,
      dream_interp:  false,
      finance_tools: false,
      audio_recitation: true,
    },
    pro: {
      id: 'pro',
      name: 'Hidayah',
      displayName: 'Hidayah (Pro)',
      price_monthly:  39900,  // paise
      price_annual:   309900, // paise (₹3,099)
      amount_monthly_display:  '₹399',
      amount_annual_display:   '₹259/mo',
      amount_annual_billed:    '₹3,099/year',
      razorpay_plan_monthly:   'plan_pro_monthly',  // replace with real Razorpay plan IDs
      razorpay_plan_annual:    'plan_pro_annual',
      ai_messages_per_month: -1,  // unlimited
      quran_access: true,
      prayer_times: true,
      habit_tracker: true,
      dream_interp:  true,
      finance_tools: true,
      audio_recitation: true,
      priority_support: true,
    },
    lifetime: {
      id: 'lifetime',
      name: 'Barakah',
      displayName: 'Barakah (Lifetime)',
      price_one_time: 799900, // paise (₹7,999)
      amount_display: '₹7,999',
      ai_messages_per_month: -1,
      quran_access: true,
      prayer_times: true,
      habit_tracker: true,
      dream_interp:  true,
      finance_tools: true,
      audio_recitation: true,
      priority_support: true,
      early_access: true,
    },
  },

  /* ── AI System Prompt ── */
  AI_SYSTEM_PROMPT: `You are NoorAI, an Islamic AI companion created to help Muslims learn about their faith. You provide guidance grounded in the Holy Quran and authentic Sunnah (Hadith).

Guidelines:
1. Always begin answers with "Bismillah" or relevant Islamic greeting when appropriate
2. Quote relevant Quranic verses in Arabic with transliteration and translation
3. Reference Hadith with proper attribution (e.g., Sahih Bukhari, Muslim)
4. Present multiple scholarly opinions when there is legitimate difference
5. Always remind users to consult qualified scholars for important matters
6. Be warm, respectful, and encouraging
7. When discussing rulings, mention different madhabs (schools of jurisprudence) where relevant
8. Use proper Islamic terminology (salah, wudu, etc.) with English explanations
9. Never claim absolute authority — you are an educational tool, not a mufti
10. Include dua (supplications) when relevant
11. Keep responses structured: context, Quranic/Hadith evidence, scholarly opinion, practical guidance

Respond in the same language the user writes in (Arabic, Urdu, English, etc.).`,

  /* ── Quran Editions ── */
  QURAN_EDITIONS: {
    arabic:      'quran-uthmani',
    english:     'en.sahih',
    urdu:        'ur.ahmedali',
    transliteration: 'en.transliteration',
  },

  /* ── Reciters ── */
  RECITERS: [
    { id: 'ar.alafasy',    name: 'Mishary Al-Afasy' },
    { id: 'ar.abdulbasit', name: 'Abdul Basit' },
    { id: 'ar.husary',     name: 'Mahmoud Khalil Al-Hussary' },
    { id: 'ar.minshawi',   name: 'Mohamed Siddiq Al-Minshawi' },
  ],

  /* ── Prayer Calc Methods ── */
  PRAYER_METHODS: {
    1:  'University of Islamic Sciences, Karachi',
    2:  'Islamic Society of North America (ISNA)',
    3:  'Muslim World League',
    4:  'Umm Al-Qura University, Makkah',
    5:  'Egyptian General Authority of Survey',
    15: 'Dianet İşleri Başkanlığı (Turkey)',
  },

  /* ── Daily Hadith (static) ── */
  DAILY_HADITHS: [
    { text: 'The best of you are those who learn the Quran and teach it.', source: 'Sahih Bukhari 5027' },
    { text: 'Verily, with hardship comes ease.', source: 'Quran 94:5' },
    { text: 'None of you truly believes until he wishes for his brother what he wishes for himself.', source: 'Sahih Bukhari 13' },
    { text: 'Make things easy and do not make them difficult.', source: 'Sahih Bukhari 69' },
    { text: 'The strong man is not the one who can wrestle; the strong man is the one who can control himself when angry.', source: 'Sahih Bukhari 6114' },
    { text: 'Allah does not judge you by your appearance or wealth, but by your hearts and deeds.', source: 'Sahih Muslim 2564' },
    { text: 'Whoever is not grateful to people has not been grateful to Allah.', source: 'Sunan Abi Dawud 4811' },
  ],
};

// Freeze config to prevent accidental mutation
Object.freeze(CONFIG);
Object.freeze(CONFIG.PLANS);
