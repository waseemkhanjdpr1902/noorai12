/* ============================================================
   NoorAI — AI Chat Module
   js/chat.js
   - Calls your backend proxy (/api/chat → Anthropic Claude)
   - Falls back to rich Islamic knowledge base if proxy unavailable
   ============================================================ */

const Chat = (() => {

  /* ── State ────────────────────────────────────────────────── */
  let conversations = {};  // { id: { id, title, messages:[], createdAt } }
  let activeConvId  = null;
  let isStreaming   = false;

  /* ── Load/Save from localStorage ─────────────────────────── */
  function loadConversations() {
    try {
      conversations = JSON.parse(localStorage.getItem('noorai_convs') || '{}');
    } catch { conversations = {}; }
  }

  function saveConversations() {
    localStorage.setItem('noorai_convs', JSON.stringify(conversations));
  }

  /* ── Create new conversation ──────────────────────────────── */
  function newConversation() {
    const id = 'conv_' + Date.now();
    conversations[id] = {
      id,
      title:     'New Conversation',
      messages:  [],
      createdAt: new Date().toISOString(),
    };
    activeConvId = id;
    saveConversations();
    return id;
  }

  /* ── Get conversation list (sorted newest first) ──────────── */
  function getConversationList() {
    return Object.values(conversations).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getActiveConversation() {
    return activeConvId ? conversations[activeConvId] : null;
  }

  function switchConversation(id) {
    if (conversations[id]) { activeConvId = id; return true; }
    return false;
  }

  function deleteConversation(id) {
    delete conversations[id];
    if (activeConvId === id) { activeConvId = null; }
    saveConversations();
  }

  /* ── Call AI (backend proxy) ──────────────────────────────── */
  async function callAIProxy(messages) {
    let response;
    try {
      response = await fetch(CONFIG.AI_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          system: CONFIG.AI_SYSTEM_PROMPT,
          max_tokens: 1200,
        }),
      });
    } catch (networkErr) {
      throw new Error('Network error — could not reach /api/chat: ' + networkErr.message);
    }

    if (!response.ok) {
      let errMsg = `Server error ${response.status}`;
      try {
        const errData = await response.json();
        errMsg = errData.error || errMsg;
      } catch {}
      throw new Error(errMsg);
    }

    const data = await response.json();

    // Extract text from Anthropic response format
    if (Array.isArray(data.content)) {
      const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('');
      if (text) return text;
    }

    // Fallback fields
    if (data.text) return data.text;
    if (data.response) return data.response;

    throw new Error('Empty response received from AI');
  }

  /* ── Islamic Knowledge Fallback ───────────────────────────── */
  const FALLBACK_RESPONSES = [
    {
      patterns: ['salah', 'prayer', 'namaz', 'wudu', 'ablution', 'times', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding the five daily prayers (Salah):

<div class="arabic-quote">أَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ</div>

*"Establish prayer, give Zakat, and bow with those who bow."* — Quran 2:43

The five daily prayers are:
- **Fajr** — Dawn prayer (2 Fard rakats)
- **Dhuhr** — Midday prayer (4 Fard rakats)  
- **Asr** — Afternoon prayer (4 Fard rakats)
- **Maghrib** — Sunset prayer (3 Fard rakats)
- **Isha** — Night prayer (4 Fard rakats)

**For Wudu (ablution):** Intention (niyyah), wash hands three times, rinse mouth and nose, wash face, wash arms to elbows, wipe head, wash feet to ankles.

<span class="source-ref">Source: Quran 2:43, Sahih Bukhari 1/7</span>

For complete rulings on prayer times specific to your location, please use the Prayer Times feature or consult a local scholar.`,
    },
    {
      patterns: ['quran', 'recite', 'memorize', 'hifz', 'surah', 'ayah', 'verse'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding the Holy Quran:

<div class="arabic-quote">إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ</div>

*"Indeed, this Quran guides to what is most upright."* — Quran 17:9

The Prophet ﷺ said: **"The best of you are those who learn the Quran and teach it."** <span class="source-ref">Sahih Bukhari 5027</span>

**Tips for Quran memorization (Hifz):**
- Begin with short surahs from Juz Amma (30th Juz)
- Revise what you have memorized before adding new verses
- Connect meanings to the words for deeper retention
- Recite in your prayers to solidify memorization
- Find a qualified teacher (Hafiz) for proper Tajweed

**Benefits of recitation:** Each letter carries 10 rewards. <span class="source-ref">Tirmidhi 2910</span>

Use the **Quran Reader** feature to read with translations and listen to beautiful recitations. May Allah make it easy for you. 🤲`,
    },
    {
      patterns: ['zakat', 'charity', 'sadaqah', 'nisab', 'gold', 'silver'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding Zakat:

<div class="arabic-quote">وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ</div>

*"Establish prayer and give Zakat."* — Quran 2:43

**Zakat Basics:**
- Zakat is the **3rd pillar of Islam** and obligatory on eligible Muslims
- **Nisab (minimum threshold):** Equivalent of 87.48g of gold OR 612.36g of silver
- **Rate:** 2.5% of eligible wealth held for one lunar year (Hawl)
- **Eligible assets:** Cash, gold, silver, trade goods, investments

**Who must pay Zakat?**
- Muslim, free, adult (post-puberty), sane
- Owns wealth above nisab for a full lunar year
- The wealth must be "in excess" of personal needs

**Zakat Al-Fitr:** Obligatory on every Muslim before Eid Al-Fitr prayer — approximately 2.5kg of staple food (or equivalent in money).

<span class="source-ref">Source: Quran 2:43, Sahih Bukhari 1400-1461</span>

Use our **Islamic Finance Calculator** for precise calculations. For complex situations, please consult a qualified scholar.`,
    },
    {
      patterns: ['fasting', 'ramadan', 'sawm', 'suhoor', 'iftar', 'roza'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding Fasting (Sawm):

<div class="arabic-quote">يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ</div>

*"O believers! Fasting is prescribed for you."* — Quran 2:183

**The Prophet ﷺ said:** *"Whoever fasts Ramadan out of faith and hope for reward, his previous sins are forgiven."* <span class="source-ref">Sahih Bukhari 38</span>

**Pillars of Fasting:**
- **Niyyah** (intention) — made before Fajr
- **Abstain** from food, drink, and intimacy from Fajr to Maghrib
- **Suhoor** (pre-dawn meal) is sunnah — don't skip it!
- **Iftar** — break with dates and water following the Sunnah

**What breaks the fast:** Eating, drinking, intimate relations, intentional vomiting, blood cupping with intent to break fast.

**What does NOT break the fast:** Unintentional eating/drinking (forgotten), eye drops, injections not for nourishment, bleeding.

**Laylat Al-Qadr** is in the last 10 odd nights of Ramadan — *"better than a thousand months"* (Quran 97:3).

May Allah accept your fasting. 🌙`,
    },
    {
      patterns: ['hajj', 'umrah', 'mecca', 'makkah', 'pilgrimage', 'ihram', 'tawaf', 'kaaba'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding Hajj & Umrah:

<div class="arabic-quote">وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا</div>

*"Pilgrimage to this House is an obligation by Allah upon whoever is able among the people."* — Quran 3:97

**Hajj (5th Pillar of Islam):**
- Obligatory once in a lifetime for those who are able (physically and financially)
- Performed in Dhul Hijjah (12th Islamic month), specifically 8–13th

**Pillars of Hajj:**
1. **Ihram** — Sacred state of consecration
2. **Wuquf at Arafah** (9th Dhul Hijjah) — The heart of Hajj
3. **Tawaf Al-Ifadah** — Circumambulating the Kaaba
4. **Sa'i** — Walking between Safa and Marwa

**Umrah:** The lesser pilgrimage — not obligatory but highly recommended Sunnah. Can be performed any time of year.

**Virtue:** The Prophet ﷺ said: *"An accepted Hajj has no reward except Paradise."* <span class="source-ref">Sahih Bukhari 1773</span>

May Allah grant you the opportunity for Hajj and Umrah. 🕌`,
    },
    {
      patterns: ['dua', 'supplication', 'prayer', 'ask allah', 'morning', 'evening', 'adhkar'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding Dua (Supplication):

<div class="arabic-quote">وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ</div>

*"Your Lord said: Call upon Me, I will respond to you."* — Quran 40:60

**Essential Morning Adhkar:**
- *Subhan Allahi wa bihamdihi* (100x) — removes sins like foam on sea
- *Ayat Al-Kursi* (after each prayer)
- *"Allahumma bika asbahna..."* — morning supplication

**Essential Evening Adhkar:**
- *"A'udhu bikalimatillahit-tammati min sharri ma khalaq"* — protection from harm
- *Al-Ikhlas, Al-Falaq, An-Nas* (3x each) — protection for night

**Best times for Dua:**
- Last third of the night (Tahajjud time)
- Between Adhan and Iqamah
- While prostrating (Sujood)
- After obligatory prayers
- On Fridays between Asr and Maghrib

**Etiquette:** Face Qibla, raise hands, begin with praise of Allah and salawat on the Prophet ﷺ, be sincere and persistent.

<span class="source-ref">Sources: Quran 40:60, Sahih Muslim 482, Abu Dawud 1479</span>`,
    },
    {
      patterns: ['halal', 'haram', 'permissible', 'forbidden', 'ruling', 'fatwa', 'islamic law'],
      response: `**Bismillah Ar-Rahman Ar-Rahim**

Regarding Halal and Haram (Permissible and Forbidden):

<div class="arabic-quote">يَسْأَلُونَكَ مَاذَا أُحِلَّ لَهُمْ ۖ قُلْ أُحِلَّ لَكُمُ الطَّيِّبَاتُ</div>

*"They ask you what has been made lawful for them. Say: All good things have been made lawful for you."* — Quran 5:4

**General Principles in Islamic Jurisprudence (Fiqh):**
- The **default** for all things is permissibility (halal) unless explicitly prohibited
- Harm (dharar) must be prevented — "No harm and no harm in return" <span class="source-ref">Ibn Majah 2340</span>
- Necessity (darura) can make what is forbidden temporarily permissible
- Intentions matter — actions are judged by intentions <span class="source-ref">Bukhari 1</span>

**Major Categories of Haram:**
- Pork and its derivatives
- Intoxicants (alcohol, drugs)
- Blood (as food)
- Riba (usury/interest)
- Gambling (Maysir)
- Slaughtered animals not done in Allah's name

**Note:** For specific modern questions (cryptocurrency, insurance, medical procedures), please consult a qualified scholar or mufti as these require careful analysis of your specific situation. The **four major madhabs** (Hanafi, Maliki, Shafi'i, Hanbali) may have differing opinions on specific issues.`,
    },
  ];

  function generateFallbackResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    const matched = FALLBACK_RESPONSES.find(r => r.patterns.some(p => lower.includes(p)));

    if (matched) return matched.response;

    // Generic Islamic response
    return `**Bismillah Ar-Rahman Ar-Rahim**

JazakAllah Khair for your question about *"${userMessage.substring(0, 60)}..."*

<div class="arabic-quote">وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا</div>

*"And of knowledge, you have been given only a little."* — Quran 17:85

I'd like to provide you with a well-sourced answer on this topic. Based on Islamic scholarship:

**Key Principles to consider:**
- Always return to the Quran and authentic Sunnah for guidance
- Seek knowledge from qualified scholars (Ulama)
- When in doubt, choose the path of caution (Ihtiyat)
- Make dua for guidance: *"Rabbi zidni ilma"* — "My Lord, increase me in knowledge"

**Recommended resources:**
- IslamQA.info for scholarly Q&A
- SeekersGuidance.org for structured learning
- Local mosque scholars for personal matters

> ⚠️ **Note:** This AI assistant provides educational information. For important religious decisions, please always consult a qualified Islamic scholar (Mufti or Alim).

<span class="source-ref">Quran 17:85 | Seeking knowledge is obligatory — Sunan Ibn Majah 224</span>`;
  }

  /* ── Process markdown-like formatting ─────────────────────── */
  function formatAIMessage(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '</p><p>• ')
      .replace(/^- /g, '• ')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  /* ── Main send message ────────────────────────────────────── */
  async function sendMessage(userText, onStream) {
    if (!userText.trim()) return null;
    if (isStreaming) return null;

    // Auth check
    const user = Auth.getCurrentUser();
    if (!user) { window.location.href = '/login'; return null; }

    // Usage check
    if (!Auth.checkAiUsage()) {
      return {
        error: true,
        message: `You've used all ${CONFIG.PLANS[user.plan]?.ai_messages_per_month || 15} messages for this month. Upgrade to Hidayah Pro for unlimited access.`,
        upgradeRequired: true,
      };
    }

    // Ensure conversation exists
    if (!activeConvId) newConversation();
    const conv = conversations[activeConvId];

    // Add user message
    const userMsg = { role: 'user', content: userText, timestamp: new Date().toISOString() };
    conv.messages.push(userMsg);

    // Auto-generate title from first message
    if (conv.messages.length === 1) {
      conv.title = userText.substring(0, 50) + (userText.length > 50 ? '...' : '');
    }

    isStreaming = true;
    let aiText = '';

    try {
      // Build message history for API (last 10 messages for context)
      const apiMessages = conv.messages.slice(-10).map(m => ({
        role:    m.role,
        content: m.content,
      }));

      // Try real API proxy first
      try {
        aiText = await callAIProxy(apiMessages);
      } catch (proxyErr) {
        console.error('AI Proxy error:', proxyErr.message);
        // Show the real error so user/developer can diagnose
        if (typeof UI !== 'undefined' && UI.Toast) {
          UI.Toast.warning('AI Notice', 'Live AI unavailable — using offline mode. Error: ' + proxyErr.message);
        }
        await new Promise(r => setTimeout(r, 400));
        aiText = generateFallbackResponse(userText);
      }

    } finally {
      isStreaming = false;
    }

    // Add AI message to conversation
    const aiMsg = { role: 'assistant', content: aiText, timestamp: new Date().toISOString() };
    conv.messages.push(aiMsg);
    saveConversations();

    return { message: aiMsg, conversation: conv };
  }

  /* ── Load conversation messages into UI ───────────────────── */
  function loadConversationMessages(convId) {
    const conv = conversations[convId];
    if (!conv) return [];
    activeConvId = convId;
    return conv.messages;
  }

  /* ── Clear all conversations ──────────────────────────────── */
  function clearAllConversations() {
    conversations = {};
    activeConvId  = null;
    saveConversations();
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    loadConversations();
  }

  return {
    init,
    newConversation,
    getConversationList,
    getActiveConversation,
    switchConversation,
    deleteConversation,
    sendMessage,
    loadConversationMessages,
    clearAllConversations,
    formatAIMessage,
  };

})();
