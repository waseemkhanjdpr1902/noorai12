/* ============================================================
   NoorAI — UI Utilities
   js/ui.js
   ============================================================ */

const UI = (() => {

  /* ── Toast Notifications ──────────────────────────────────── */
  function ensureToastContainer() {
    let c = document.getElementById('toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  /**
   * Show a toast notification
   * @param {string} title
   * @param {string} message
   * @param {'info'|'success'|'error'|'warning'} type
   * @param {number} duration - ms (0 = permanent)
   */
  function toast(title, message = '', type = 'info', duration = 4500) {
    const container = ensureToastContainer();
    const icons = { info: '✦', success: '✓', error: '✕', warning: '⚠' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <span class="toast-icon">${icons[type] || '✦'}</span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${message ? `<div class="toast-msg">${message}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Close">✕</button>
    `;
    el.querySelector('.toast-close').addEventListener('click', () => removeToast(el));
    container.appendChild(el);
    if (duration > 0) setTimeout(() => removeToast(el), duration);
    return el;
  }

  function removeToast(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = '0.3s ease';
    setTimeout(() => el.remove(), 300);
  }

  const Toast = {
    info:    (t, m, d) => toast(t, m, 'info', d),
    success: (t, m, d) => toast(t, m, 'success', d),
    error:   (t, m, d) => toast(t, m, 'error', d),
    warning: (t, m, d) => toast(t, m, 'warning', d),
  };

  /* ── Modal ────────────────────────────────────────────────── */
  function showModal({ title, body, actions = [], id, size = 'md' }) {
    closeModal(); // Close any existing modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = id || 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const actionsHTML = actions.map(a =>
      `<button class="btn ${a.class || 'btn-secondary'}" data-action="${a.id}">${a.label}</button>`
    ).join('');

    overlay.innerHTML = `
      <div class="modal modal-${size}">
        <button class="modal-close" aria-label="Close modal">✕</button>
        ${title ? `<h2 class="modal-title">${title}</h2>` : ''}
        <div class="modal-body">${body}</div>
        ${actionsHTML ? `<div class="modal-actions">${actionsHTML}</div>` : ''}
      </div>
    `;

    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

    // Wire action buttons
    actions.forEach(a => {
      overlay.querySelector(`[data-action="${a.id}"]`)?.addEventListener('click', () => {
        a.onClick?.();
      });
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Focus trap
    const firstFocusable = overlay.querySelector('button, [href], input, select, textarea, [tabindex]');
    firstFocusable?.focus();

    return overlay;
  }

  function closeModal(id) {
    const overlay = document.getElementById(id || 'modal-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = '0.2s ease';
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 200);
    }
  }

  /* ── Loading Overlay ──────────────────────────────────────── */
  function showLoading(message = 'Loading…') {
    let overlay = document.getElementById('loading-overlay');
    if (overlay) { overlay.querySelector('p').textContent = message; return; }
    overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(8,13,26,0.85);
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; gap:16px; z-index:9999;
      font-family:var(--font-ui); font-size:0.88rem; color:var(--text-muted);
    `;
    overlay.innerHTML = `<div class="spinner spinner-lg"></div><p>${message}</p>`;
    document.body.appendChild(overlay);
  }

  function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) { overlay.style.opacity = '0'; overlay.style.transition = '0.2s'; setTimeout(() => overlay.remove(), 200); }
  }

  /* ── Button Loading State ─────────────────────────────────── */
  function setButtonLoading(btn, loading, text) {
    if (loading) {
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = `<span class="btn-text">${text || btn.textContent}</span>`;
      btn.classList.add('loading');
      btn.disabled = true;
    } else {
      btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }

  /* ── Form Validation ──────────────────────────────────────── */
  function showFieldError(input, message) {
    input.classList.add('error');
    const existing = input.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
    const err = document.createElement('div');
    err.className = 'form-error';
    err.innerHTML = `<span>⚠</span> ${message}`;
    input.parentNode.appendChild(err);
  }

  function clearFieldError(input) {
    input.classList.remove('error');
    input.parentNode.querySelector('.form-error')?.remove();
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.form-error').forEach(e => e.remove());
    form.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
  }

  /* ── Password Strength ────────────────────────────────────── */
  function updatePasswordStrength(password, containerEl) {
    if (!containerEl) return;
    let strength = 0;
    if (password.length >= 8)   strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const bars   = containerEl.querySelectorAll('.strength-bar');
    const label  = containerEl.querySelector('.strength-label');
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const classes = ['', 'weak', 'medium', 'medium', 'strong'];

    bars.forEach((bar, i) => {
      bar.className = 'strength-bar ' + (i < strength ? classes[strength] : '');
    });
    if (label) { label.textContent = labels[strength] || ''; label.style.color = strength >= 3 ? 'var(--success)' : strength === 2 ? 'var(--warning)' : 'var(--error)'; }
  }

  /* ── Scroll Reveal ────────────────────────────────────────── */
  function initScrollReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* ── Mobile Sidebar ───────────────────────────────────────── */
  function initSidebar() {
    const toggle  = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('show');
    });
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  /* ── Mobile Nav Header ────────────────────────────────────── */
  function initMobileNav() {
    const btn   = document.getElementById('hamburger-btn');
    const panel = document.getElementById('mobile-nav-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      panel.setAttribute('aria-hidden', !open);
    });
  }

  /* ── Active Nav Links ─────────────────────────────────────── */
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
      if (link.getAttribute('href') && path.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });
  }

  /* ── Auto-resize Textarea ─────────────────────────────────── */
  function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  }

  /* ── Format Date ──────────────────────────────────────────── */
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60)   return 'just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  }

  /* ── Populate Nav User Info ───────────────────────────────── */
  function populateUserUI() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    // Avatar initials
    document.querySelectorAll('.user-avatar').forEach(el => {
      el.textContent = user.name.charAt(0).toUpperCase();
    });
    // Name
    document.querySelectorAll('.user-name').forEach(el => { el.textContent = user.name; });
    // Plan badge
    document.querySelectorAll('.user-plan').forEach(el => {
      const planName = CONFIG.PLANS[user.plan]?.name || 'Free';
      el.textContent = planName + ' Plan';
    });
    // Messages remaining
    document.querySelectorAll('.ai-messages-left').forEach(el => {
      const rem = Auth.getRemainingMessages();
      el.textContent = rem === 'unlimited' ? '∞ messages' : `${rem} messages left`;
    });
  }

  /* ── Copy to Clipboard ─────────────────────────────────────── */
  async function copyToClipboard(text, btnEl) {
    try {
      await navigator.clipboard.writeText(text);
      if (btnEl) {
        const orig = btnEl.textContent;
        btnEl.textContent = '✓ Copied!';
        setTimeout(() => { btnEl.textContent = orig; }, 1800);
      }
      return true;
    } catch { return false; }
  }

  /* ── Debounce ─────────────────────────────────────────────── */
  function debounce(fn, delay) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }

  /* ── Dropdown Toggle ──────────────────────────────────────── */
  function initDropdowns() {
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-dropdown]');
      document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {
        if (!trigger || menu.id !== trigger.dataset.dropdown) menu.classList.add('hidden');
      });
      if (trigger) {
        const menu = document.getElementById(trigger.dataset.dropdown);
        menu?.classList.toggle('hidden');
      }
    });
  }

  /* ── Tab Switcher ─────────────────────────────────────────── */
  function initTabs(containerSelector) {
    document.querySelectorAll(containerSelector || '.tabs').forEach(tabs => {
      tabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const target = btn.dataset.tab;
          const panel  = document.getElementById(target);
          document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
          panel?.classList.remove('hidden');
          btn.dispatchEvent(new CustomEvent('tab:change', { detail: { tab: target }, bubbles: true }));
        });
      });
    });
  }

  /* ── Hijri Date ───────────────────────────────────────────── */
  function getHijriDate() {
    try {
      const now  = new Date();
      const opts = { calendar: 'islamic-umalqura', day: 'numeric', month: 'long', year: 'numeric' };
      return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', opts).format(now);
    } catch {
      return 'Hijri date unavailable';
    }
  }

  /* ── Greeting based on time ───────────────────────────────── */
  function getIslamicGreeting() {
    const h = new Date().getHours();
    if (h < 5)  return 'Tahajjud Time 🌙';
    if (h < 7)  return 'Fajr Mubarak 🌅';
    if (h < 12) return 'Sabah Al-Khair ☀️';
    if (h < 14) return 'Dhuhr Time 🕌';
    if (h < 17) return 'Good Afternoon ✨';
    if (h < 19) return 'Asr Mubarak 🌤';
    if (h < 21) return 'Maghrib Mubarak 🌇';
    return 'Isha Mubarak 🌃';
  }

  /* ── Init All ─────────────────────────────────────────────── */
  function init() {
    initScrollReveal();
    initMobileNav();
    initSidebar();
    initDropdowns();
    initTabs();
    setActiveNav();
    if (Auth.isAuthenticated()) populateUserUI();
  }

  return {
    Toast, toast,
    showModal, closeModal,
    showLoading, hideLoading,
    setButtonLoading,
    showFieldError, clearFieldError, clearAllErrors,
    updatePasswordStrength,
    initScrollReveal,
    autoResize,
    formatDate, timeAgo,
    populateUserUI,
    copyToClipboard,
    debounce,
    getHijriDate,
    getIslamicGreeting,
    init,
  };

})();

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => UI.init());
