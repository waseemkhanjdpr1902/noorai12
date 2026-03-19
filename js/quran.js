/* ============================================================
   NoorAI — Quran API Module
   js/quran.js
   Uses: api.alquran.cloud (free, public)
   ============================================================ */

const QuranAPI = (() => {

  const BASE = CONFIG.QURAN_API;
  const cache = {};  // In-memory cache

  /* ── Fetch with cache ─────────────────────────────────────── */
  async function fetchCached(url, cacheKey) {
    if (cache[cacheKey]) return cache[cacheKey];
    const storageKey = 'noorai_quran_' + cacheKey;
    const stored = sessionStorage.getItem(storageKey);
    if (stored) { cache[cacheKey] = JSON.parse(stored); return cache[cacheKey]; }

    const res  = await fetch(url);
    if (!res.ok) throw new Error(`Quran API error: ${res.status}`);
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.status || 'API error');

    cache[cacheKey] = json.data;
    try { sessionStorage.setItem(storageKey, JSON.stringify(json.data)); } catch {}
    return json.data;
  }

  /* ── Get list of all 114 surahs ───────────────────────────── */
  async function getSurahList() {
    return fetchCached(`${BASE}/surah`, 'surah_list');
  }

  /* ── Get a full surah with editions ─────────────────────────── */
  async function getSurah(number, edition = 'quran-uthmani') {
    return fetchCached(`${BASE}/surah/${number}/${edition}`, `surah_${number}_${edition}`);
  }

  /* ── Get surah with translation ──────────────────────────────── */
  async function getSurahWithTranslation(number, translationEdition = 'en.sahih') {
    const key = `surah_parallel_${number}_${translationEdition}`;
    if (cache[key]) return cache[key];

    const [arabic, translation] = await Promise.all([
      getSurah(number, 'quran-uthmani'),
      getSurah(number, translationEdition),
    ]);

    const result = {
      number: arabic.number,
      name:   arabic.name,
      englishName: arabic.englishName,
      englishNameTranslation: arabic.englishNameTranslation,
      numberOfAyahs: arabic.numberOfAyahs,
      revelationType: arabic.revelationType,
      ayahs: arabic.ayahs.map((a, i) => ({
        number:          a.number,
        numberInSurah:   a.numberInSurah,
        arabic:          a.text,
        translation:     translation.ayahs[i]?.text || '',
        juz:             a.juz,
        sajda:           a.sajda,
      })),
    };

    cache[key] = result;
    return result;
  }

  /* ── Get a single ayah ────────────────────────────────────── */
  async function getAyah(reference, edition = 'en.sahih') {
    return fetchCached(`${BASE}/ayah/${reference}/${edition}`, `ayah_${reference}_${edition}`);
  }

  /* ── Search the Quran ─────────────────────────────────────── */
  async function searchQuran(query, edition = 'en.sahih') {
    const encoded = encodeURIComponent(query);
    const url = `${BASE}/search/${encoded}/all/${edition}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error('Search failed');
    const json = await res.json();
    return json.data?.matches || [];
  }

  /* ── Get random ayah (for dashboard) ─────────────────────── */
  async function getRandomAyah() {
    const surahNum = Math.ceil(Math.random() * 114);
    const surahData = await getSurahWithTranslation(surahNum);
    if (!surahData?.ayahs?.length) throw new Error('No ayahs');
    const idx = Math.floor(Math.random() * surahData.ayahs.length);
    const ayah = surahData.ayahs[idx];
    return { ...ayah, surahNumber: surahNum, surahName: surahData.englishName, surahArabic: surahData.name };
  }

  /* ── Get audio URL using alquran.cloud CDN (global ayah number) ── */
  // cdn.islamic.network is the official CDN — CORS-enabled, works in browsers
  // globalAyahNumber: 1-6236 (the sequential number across entire Quran)
  function getAyahAudioUrl(globalAyahNumber, reciter = 'ar.alafasy') {
    return `https://cdn.islamic.network/quran/audio/128/${reciter}/${globalAyahNumber}.mp3`;
  }

  /* ── Fetch full surah audio data from API ──────────────────── */
  // Returns ayahs array where each ayah has .audio (URL) and .number (global)
  async function getSurahAudio(surahNumber, reciter = 'ar.alafasy') {
    return fetchCached(`${BASE}/surah/${surahNumber}/${reciter}`, `audio_${surahNumber}_${reciter}`);
  }

  /* ── Metadata helpers ─────────────────────────────────────── */
  function getRevelationType(type) {
    return type === 'Meccan' ? '🕌 Meccan' : '🕍 Medinan';
  }

  function getRomanNumeral(n) {
    // Convert Arabic to Eastern Arabic numerals for display
    return n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  }

  /* ── Transliteration editions list ───────────────────────── */
  const EDITIONS = {
    'en.sahih':          { lang: 'English', name: 'Saheeh International' },
    'en.pickthall':      { lang: 'English', name: 'Pickthall' },
    'ur.ahmedali':       { lang: 'Urdu', name: 'Ahmed Ali' },
    'ur.jalandhry':      { lang: 'Urdu', name: 'Fateh Muhammad Jalandhry' },
    'fr.hamidullah':     { lang: 'French', name: 'Hamidullah' },
    'tr.diyanet':        { lang: 'Turkish', name: 'Diyanet Vakfı' },
    'id.indonesian':     { lang: 'Indonesian', name: 'Indonesian Ministry of Religious Affairs' },
    'ms.basmeih':        { lang: 'Malay', name: 'Abdullah Muhammad Basmeih' },
  };

  return {
    getSurahList,
    getSurah,
    getSurahWithTranslation,
    getAyah,
    searchQuran,
    getRandomAyah,
    getAyahAudioUrl,
    getSurahAudio,
    getRevelationType,
    getRomanNumeral,
    EDITIONS,
  };

})();
