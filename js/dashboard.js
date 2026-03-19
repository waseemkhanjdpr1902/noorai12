/* ============================================================
   NoorAI — Dashboard Page Logic
   js/dashboard.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // Require auth
  if (!Auth.requireAuth('/dashboard.html')) return;

  const user = Auth.getCurrentUser();

  /* ── Greeting ─────────────────────────────────────────────── */
  const greetingEl    = document.getElementById('greeting-text');
  const greetingName  = document.getElementById('greeting-name');
  const hijriEl       = document.getElementById('hijri-date');
  const hadithEl      = document.getElementById('daily-hadith');

  if (greetingEl)   greetingEl.textContent  = UI.getIslamicGreeting();
  if (greetingName) greetingName.textContent = `As-Salamu Alaykum, ${user.name.split(' ')[0]} 🌙`;
  if (hijriEl)      hijriEl.textContent      = UI.getHijriDate();

  // Daily hadith
  if (hadithEl) {
    const idx    = new Date().getDate() % CONFIG.DAILY_HADITHS.length;
    const hadith = CONFIG.DAILY_HADITHS[idx];
    hadithEl.innerHTML = `"${hadith.text}" <span class="text-gold">— ${hadith.source}</span>`;
  }

  /* ── Plan info ────────────────────────────────────────────── */
  const planBadge = document.getElementById('plan-badge');
  if (planBadge) {
    const planName = CONFIG.PLANS[user.plan]?.name || 'Free';
    planBadge.textContent = planName;
    planBadge.className   = `badge ${user.plan !== 'free' ? 'badge-gold' : 'badge-muted'}`;
  }

  const remainingEl = document.getElementById('messages-remaining');
  if (remainingEl) {
    const rem = Auth.getRemainingMessages();
    remainingEl.textContent = rem === 'unlimited' ? '∞' : rem;
  }

  /* ── Prayer Times ─────────────────────────────────────────── */
  const prayerList = document.getElementById('prayer-list');
  const prayerDate = document.getElementById('prayer-date');
  const nextPrayerEl = document.getElementById('next-prayer');

  if (prayerList) {
    prayerList.innerHTML = '<div class="loading-screen" style="min-height:120px"><div class="spinner spinner-sm"></div></div>';
    try {
      const data = await Prayer.getUserPrayerTimes();
      if (prayerDate) prayerDate.textContent = data.date.hijri;
      Prayer.renderPrayerList(data, prayerList);

      const next = Prayer.getNextPrayer(data.timings);
      if (nextPrayerEl) {
        nextPrayerEl.innerHTML = `Next: <strong>${next.key}</strong> in <strong>${Prayer.formatCountdown(next.minutesLeft)}</strong>`;
      }
    } catch (err) {
      prayerList.innerHTML = '<p style="padding:1rem;color:var(--text-muted);font-family:var(--font-ui);font-size:0.85rem">Could not load prayer times. Please check your connection.</p>';
    }
  }

  /* ── Daily Ayah ───────────────────────────────────────────── */
  const ayahArabicEl = document.getElementById('daily-ayah-arabic');
  const ayahTransEl  = document.getElementById('daily-ayah-translation');
  const ayahRefEl    = document.getElementById('daily-ayah-ref');

  if (ayahArabicEl) {
    try {
      const ayah = await QuranAPI.getRandomAyah();
      ayahArabicEl.textContent = ayah.arabic;
      if (ayahTransEl) ayahTransEl.textContent = `"${ayah.translation}"`;
      if (ayahRefEl)   ayahRefEl.textContent   = `Quran ${ayah.surahNumber}:${ayah.numberInSurah} — ${ayah.surahName}`;
    } catch {
      ayahArabicEl.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
      if (ayahTransEl) ayahTransEl.textContent = '"In the name of Allah, the Most Gracious, the Most Merciful."';
      if (ayahRefEl)   ayahRefEl.textContent   = 'Quran 1:1 — Al-Fatihah';
    }
  }

  /* ── Habits ───────────────────────────────────────────────── */
  const habitsEl = document.getElementById('habits-list');
  if (habitsEl) {
    const DEFAULT_HABITS = [
      { id: 'fajr',    name: 'Fajr Prayer', emoji: '🌅' },
      { id: 'dhuhr',   name: 'Dhuhr Prayer', emoji: '☀️' },
      { id: 'asr',     name: 'Asr Prayer', emoji: '🌤' },
      { id: 'maghrib', name: 'Maghrib Prayer', emoji: '🌇' },
      { id: 'isha',    name: 'Isha Prayer', emoji: '🌙' },
      { id: 'quran',   name: 'Quran Reading', emoji: '📖' },
      { id: 'dhikr',   name: 'Morning Dhikr', emoji: '📿' },
    ];

    const today    = new Date().toLocaleDateString('en-CA');
    const stored   = JSON.parse(localStorage.getItem('noorai_habits_' + today) || '[]');

    habitsEl.innerHTML = DEFAULT_HABITS.map(h => `
      <div class="habit-item">
        <div class="habit-checkbox ${stored.includes(h.id) ? 'checked' : ''}" data-habit="${h.id}" role="checkbox" aria-checked="${stored.includes(h.id)}" tabindex="0">
          ${stored.includes(h.id) ? '✓' : ''}
        </div>
        <span class="habit-name">${h.emoji} ${h.name}</span>
      </div>
    `).join('');

    // Toggle habits
    habitsEl.querySelectorAll('.habit-checkbox').forEach(box => {
      const toggle = () => {
        const habitId  = box.dataset.habit;
        const checked  = box.classList.toggle('checked');
        box.textContent = checked ? '✓' : '';
        box.setAttribute('aria-checked', checked);

        const habits = JSON.parse(localStorage.getItem('noorai_habits_' + today) || '[]');
        if (checked) { if (!habits.includes(habitId)) habits.push(habitId); }
        else { const idx = habits.indexOf(habitId); if (idx !== -1) habits.splice(idx, 1); }
        localStorage.setItem('noorai_habits_' + today, JSON.stringify(habits));

        updateHabitProgress(habits.length, DEFAULT_HABITS.length);
      };
      box.addEventListener('click', toggle);
      box.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') toggle(); });
    });

    updateHabitProgress(stored.length, DEFAULT_HABITS.length);
  }

  function updateHabitProgress(done, total) {
    const pct   = Math.round((done / total) * 100);
    const fill  = document.getElementById('habit-progress-fill');
    const label = document.getElementById('habit-progress-label');
    if (fill)  fill.style.width  = pct + '%';
    if (label) label.textContent = `${done}/${total} completed`;
  }

  /* ── Subscription upgrade prompt ────────────────────────────── */
  if (user.plan === 'free') {
    const upgradeEl = document.getElementById('upgrade-prompt');
    if (upgradeEl) upgradeEl.classList.remove('hidden');
  }

  /* ── Show subscribed toast (from payment redirect) ────────── */
  const params = new URLSearchParams(window.location.search);
  if (params.get('subscribed') === '1') {
    UI.Toast.success('Welcome to Premium! 🌟', 'Your subscription is now active. Enjoy unlimited access.');
    history.replaceState({}, '', '/dashboard.html');
  }

  /* ── Recent conversations ─────────────────────────────────── */
  Chat.init();
  const recentEl = document.getElementById('recent-chats');
  if (recentEl) {
    const convs = Chat.getConversationList().slice(0, 4);
    if (convs.length === 0) {
      recentEl.innerHTML = '<p style="font-family:var(--font-ui);font-size:0.85rem;color:var(--text-faint);padding:1rem 0">No conversations yet. Start chatting!</p>';
    } else {
      recentEl.innerHTML = convs.map(c => `
        <a href='/chat?conv=${c.id}" class="recent-chat-item">
          <span class="chat-item-icon">💬</span>
          <span class="chat-item-text">${c.title}</span>
          <span class="chat-item-time">${UI.timeAgo(c.createdAt)}</span>
        </a>
      `).join('');
    }
  }

  /* ── Logout button ────────────────────────────────────────── */
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', () => {
      UI.showModal({
        title: 'Sign Out',
        body:  'Are you sure you want to sign out of NoorAI?',
        actions: [
          { id: 'cancel', label: 'Cancel', class: 'btn-secondary', onClick: UI.closeModal },
          { id: 'logout', label: 'Sign Out', class: 'btn-danger',   onClick: Auth.logout },
        ],
      });
    });
  });
});
