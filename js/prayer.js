/* ============================================================
   NoorAI — Prayer Times Module
   js/prayer.js
   Uses: api.aladhan.com (free, public)
   ============================================================ */

const Prayer = (() => {

  const PRAYER_NAMES = [
    { key: 'Fajr',    arabic: 'الفجر',   icon: '🌅' },
    { key: 'Sunrise', arabic: 'الشروق',  icon: '☀️' },
    { key: 'Dhuhr',   arabic: 'الظهر',   icon: '🕐' },
    { key: 'Asr',     arabic: 'العصر',   icon: '🌤' },
    { key: 'Maghrib', arabic: 'المغرب',  icon: '🌇' },
    { key: 'Isha',    arabic: 'العشاء',  icon: '🌙' },
  ];

  let cachedTimes = null;
  let lastFetchDate = null;

  /* ── Fetch prayer times by coordinates ───────────────────── */
  async function fetchByCoords(lat, lng, method = 3) {
    const today = new Date().toLocaleDateString('en-CA');
    if (cachedTimes && lastFetchDate === today) return cachedTimes;

    const url = `${CONFIG.PRAYER_API}/timings?latitude=${lat}&longitude=${lng}&method=${method}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error('Prayer times API error');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.status);

    const timings   = json.data.timings;
    const date      = json.data.date;
    const hijriDate = date.hijri;

    const result = {
      timings,
      date: {
        gregorian: date.gregorian.date,
        hijri:     `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`,
      },
      meta: json.data.meta,
    };

    cachedTimes  = result;
    lastFetchDate = today;
    localStorage.setItem('noorai_prayer_cache', JSON.stringify({ result, date: today }));
    return result;
  }

  /* ── Fetch by city ────────────────────────────────────────── */
  async function fetchByCity(city, country = 'IN', method = 3) {
    const url = `${CONFIG.PRAYER_API}/timingsByCity?city=${encodeURIComponent(city)}&country=${country}&method=${method}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error('Prayer times API error');
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.status);
    return json.data;
  }

  /* ── Get user's location then times ──────────────────────── */
  async function getUserPrayerTimes() {
    // Try cached data first
    try {
      const stored = JSON.parse(localStorage.getItem('noorai_prayer_cache') || 'null');
      const today  = new Date().toLocaleDateString('en-CA');
      if (stored && stored.date === today) { cachedTimes = stored.result; return stored.result; }
    } catch {}

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // Fallback to Mumbai if no geolocation
        fetchByCity('Mumbai', 'IN').then(d => {
          const r = { timings: d.timings, date: { gregorian: d.date.gregorian.date, hijri: `${d.date.hijri.day} ${d.date.hijri.month.en} ${d.date.hijri.year} AH` }, meta: d.meta };
          cachedTimes = r;
          resolve(r);
        }).catch(reject);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude).then(resolve).catch(reject),
        () => fetchByCity('Mumbai', 'IN').then(d => {
          const r = { timings: d.timings, date: { gregorian: d.date.gregorian.date, hijri: `${d.date.hijri.day} ${d.date.hijri.month.en} ${d.date.hijri.year} AH` }, meta: d.meta };
          cachedTimes = r;
          resolve(r);
        }).catch(reject),
        { timeout: 5000 }
      );
    });
  }

  /* ── Parse time string to minutes since midnight ──────────── */
  function toMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  /* ── Get next prayer ──────────────────────────────────────── */
  function getNextPrayer(timings) {
    const now  = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();

    const prayers = PRAYER_NAMES.filter(p => p.key !== 'Sunrise' && timings[p.key]);
    for (const prayer of prayers) {
      const pMins = toMinutes(timings[prayer.key]);
      if (pMins > mins) return { ...prayer, time: timings[prayer.key], minutesLeft: pMins - mins };
    }
    // Next day's Fajr
    return { ...PRAYER_NAMES[0], time: timings.Fajr, minutesLeft: (24*60 - mins) + toMinutes(timings.Fajr) };
  }

  /* ── Format time (12-hour) ────────────────────────────────── */
  function formatTime(timeStr) {
    if (!timeStr) return '--:--';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${String(m).padStart(2,'0')} ${period}`;
  }

  /* ── Format minutes left ──────────────────────────────────── */
  function formatCountdown(minutes) {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  /* ── Build HTML prayer list ───────────────────────────────── */
  function renderPrayerList(data, containerEl) {
    if (!containerEl || !data) return;
    const timings   = data.timings;
    const nextPrayer = getNextPrayer(timings);

    containerEl.innerHTML = PRAYER_NAMES.map(p => {
      if (!timings[p.key]) return '';
      const isNext = p.key === nextPrayer.key;
      return `
        <li class="prayer-item ${isNext ? 'active' : ''}">
          <span class="prayer-name">${p.icon} ${p.key}</span>
          <span class="prayer-arabic">${p.arabic}</span>
          <span class="prayer-time">${formatTime(timings[p.key])}${isNext ? `<span class="next-prayer-badge badge badge-gold" style="margin-left:8px">${formatCountdown(nextPrayer.minutesLeft)}</span>` : ''}</span>
        </li>
      `;
    }).join('');
  }

  /* ── Monthly calendar ─────────────────────────────────────── */
  async function getMonthlyCalendar(lat, lng, month, year, method = 3) {
    const url = `${CONFIG.PRAYER_API}/calendar?latitude=${lat}&longitude=${lng}&method=${method}&month=${month}&year=${year}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error('Calendar API error');
    const json = await res.json();
    return json.data;
  }

  return {
    PRAYER_NAMES,
    getUserPrayerTimes,
    fetchByCoords,
    fetchByCity,
    getNextPrayer,
    formatTime,
    formatCountdown,
    renderPrayerList,
    getMonthlyCalendar,
  };

})();
