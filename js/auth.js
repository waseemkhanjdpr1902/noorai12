/* ============================================================
   NoorAI — Authentication System v2
   Uses localStorage (client-side demo auth)
   No crypto.subtle — works on all browsers & environments
   ============================================================ */

const Auth = (() => {

  const USERS_KEY   = 'noorai_users';
  const SESSION_KEY = 'noorai_session';

  /* ── Simple hash (no crypto.subtle needed) ────────────────── */
  function hashPassword(password) {
    // Simple but consistent hash — good enough for localStorage demo
    const str = password + 'noorai_2026_salt';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    // Make it a longer string using btoa of multiple rounds
    let h = Math.abs(hash).toString(16);
    for (let i = 0; i < str.length; i += 3) {
      h += Math.abs((hash ^ str.charCodeAt(i) * 31)).toString(36);
    }
    return btoa(h).replace(/[^a-zA-Z0-9]/g, '').slice(0, 40);
  }

  /* ── Generate session token ───────────────────────────────── */
  function generateToken() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  }

  /* ── Generate user ID ────────────────────────────────────── */
  function generateId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  /* ── Get / save users ────────────────────────────────────── */
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  }
  function saveUsers(users) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
  }

  /* ── Get / save session ──────────────────────────────────── */
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  }
  function saveSession(user, token) {
    try {
      const sess = { token, user, loggedInAt: Date.now() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
      // Also keep in old keys for compatibility
      localStorage.setItem('noorai_token', token);
      localStorage.setItem('noorai_user', JSON.stringify(user));
    } catch {}
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('noorai_token');
    localStorage.removeItem('noorai_user');
  }

  /* ══════════════════════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════════════════════ */

  /* ── Register ─────────────────────────────────────────────── */
  function register(name, email, password) {
    try {
      if (!name?.trim())  return { success: false, error: 'Name is required.' };
      if (!email?.trim()) return { success: false, error: 'Email is required.' };
      if (!password)      return { success: false, error: 'Password is required.' };

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return { success: false, error: 'Please enter a valid email address.' };

      if (password.length < 6)
        return { success: false, error: 'Password must be at least 6 characters.' };

      const users = getUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()))
        return { success: false, error: 'An account with this email already exists. Please sign in.' };

      const user = {
        id:           generateId(),
        name:         name.trim(),
        email:        email.toLowerCase().trim(),
        password:     hashPassword(password),
        plan:         'free',
        aiMessages:   0,
        aiResetDate:  new Date().toISOString().slice(0, 7),
        bookmarks:    [],
        createdAt:    new Date().toISOString(),
      };

      users.push(user);
      saveUsers(users);

      const sessionUser = { ...user };
      delete sessionUser.password;
      const token = generateToken();
      saveSession(sessionUser, token);

      return { success: true, user: sessionUser };

    } catch (err) {
      console.error('Register error:', err);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  /* ── Login ────────────────────────────────────────────────── */
  function login(email, password) {
    try {
      if (!email?.trim()) return { success: false, error: 'Email is required.' };
      if (!password)      return { success: false, error: 'Password is required.' };

      const users = getUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

      if (!found)
        return { success: false, error: 'No account found with this email. Please sign up first.' };

      const hashed = hashPassword(password);
      if (found.password !== hashed)
        return { success: false, error: 'Incorrect password. Please try again.' };

      const sessionUser = { ...found };
      delete sessionUser.password;
      const token = generateToken();
      saveSession(sessionUser, token);

      return { success: true, user: sessionUser };

    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  /* ── Logout ───────────────────────────────────────────────── */
  function logout() {
    clearSession();
    window.location.href = '/login';
  }

  /* ── Get current user ────────────────────────────────────── */
  function getCurrentUser() {
    try {
      // Try new session format first
      const sess = getSession();
      if (sess?.user && sess?.token) return sess.user;
      // Fallback to old format
      const token = localStorage.getItem('noorai_token');
      if (!token) return null;
      return JSON.parse(localStorage.getItem('noorai_user') || 'null');
    } catch { return null; }
  }

  function isAuthenticated() {
    return !!getCurrentUser();
  }

  /* ── Route guards ─────────────────────────────────────────── */
  function requireAuth(redirectTo) {
    if (!isAuthenticated()) {
      const next = redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : '';
      window.location.href = '/login' + next;
      return false;
    }
    return true;
  }

  function requireGuest() {
    if (isAuthenticated()) {
      window.location.href = '/dashboard';
      return false;
    }
    return true;
  }

  /* ── Update plan ─────────────────────────────────────────── */
  function updatePlan(planId) {
    try {
      const user = getCurrentUser();
      if (!user) return false;
      user.plan = planId;
      user.planUpdatedAt = new Date().toISOString();
      saveSession(user, generateToken());

      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) { users[idx].plan = planId; saveUsers(users); }
      return true;
    } catch { return false; }
  }

  /* ── Update profile ──────────────────────────────────────── */
  function updateProfile(data) {
    try {
      const user = getCurrentUser();
      if (!user) return { success: false, error: 'Not signed in.' };

      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx === -1) return { success: false, error: 'User not found.' };

      if (data.name?.trim()) { users[idx].name = data.name.trim(); user.name = data.name.trim(); }
      if (data.email?.trim()) {
        const taken = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() && u.id !== user.id);
        if (taken) return { success: false, error: 'Email already in use by another account.' };
        users[idx].email = data.email.toLowerCase().trim();
        user.email = users[idx].email;
      }
      saveUsers(users);
      saveSession(user, generateToken());
      return { success: true, user };
    } catch (err) {
      return { success: false, error: 'Update failed.' };
    }
  }

  /* ── Change password ─────────────────────────────────────── */
  function changePassword(currentPassword, newPassword) {
    try {
      const user = getCurrentUser();
      if (!user) return { success: false, error: 'Not signed in.' };

      const users = getUsers();
      const dbUser = users.find(u => u.id === user.id);
      if (!dbUser) return { success: false, error: 'User not found.' };

      if (dbUser.password !== hashPassword(currentPassword))
        return { success: false, error: 'Current password is incorrect.' };

      if (newPassword.length < 6)
        return { success: false, error: 'New password must be at least 6 characters.' };

      dbUser.password = hashPassword(newPassword);
      const idx = users.findIndex(u => u.id === user.id);
      users[idx] = dbUser;
      saveUsers(users);
      return { success: true };
    } catch {
      return { success: false, error: 'Password change failed.' };
    }
  }

  /* ── AI usage tracking ───────────────────────────────────── */
  function checkAiUsage() {
    try {
      const user = getCurrentUser();
      if (!user) return false;
      const plan = (CONFIG?.PLANS?.[user.plan]) || CONFIG?.PLANS?.free;
      if (!plan || plan.ai_messages_per_month === -1) return true;

      const month = new Date().toISOString().slice(0, 7);
      if (user.aiResetDate !== month) { user.aiMessages = 0; user.aiResetDate = month; }
      if (user.aiMessages >= plan.ai_messages_per_month) return false;

      user.aiMessages = (user.aiMessages || 0) + 1;
      saveSession(user, localStorage.getItem('noorai_token') || generateToken());

      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) { users[idx].aiMessages = user.aiMessages; users[idx].aiResetDate = month; saveUsers(users); }
      return true;
    } catch { return true; } // fail open
  }

  function getRemainingMessages() {
    try {
      const user = getCurrentUser();
      if (!user) return 0;
      const plan = CONFIG?.PLANS?.[user.plan] || CONFIG?.PLANS?.free;
      if (!plan || plan.ai_messages_per_month === -1) return 'unlimited';
      const month = new Date().toISOString().slice(0, 7);
      const used = user.aiResetDate === month ? (user.aiMessages || 0) : 0;
      return Math.max(0, plan.ai_messages_per_month - used);
    } catch { return 'unlimited'; }
  }

  /* ── Quran bookmarks ─────────────────────────────────────── */
  function addBookmark(surah, ayah) {
    const user = getCurrentUser();
    if (!user) return false;
    if (!user.bookmarks) user.bookmarks = [];
    const key = `${surah}:${ayah}`;
    if (!user.bookmarks.includes(key)) {
      user.bookmarks.push(key);
      saveSession(user, localStorage.getItem('noorai_token') || generateToken());
      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) { users[idx].bookmarks = user.bookmarks; saveUsers(users); }
    }
    return true;
  }

  function removeBookmark(surah, ayah) {
    const user = getCurrentUser();
    if (!user) return false;
    user.bookmarks = (user.bookmarks || []).filter(b => b !== `${surah}:${ayah}`);
    saveSession(user, localStorage.getItem('noorai_token') || generateToken());
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx].bookmarks = user.bookmarks; saveUsers(users); }
    return true;
  }

  function isBookmarked(surah, ayah) {
    const user = getCurrentUser();
    if (!user || !user.bookmarks) return false;
    return user.bookmarks.includes(`${surah}:${ayah}`);
  }

  return {
    register, login, logout,
    getCurrentUser, isAuthenticated,
    requireAuth, requireGuest,
    updatePlan, updateProfile, changePassword,
    canAccess: (f) => !!(CONFIG?.PLANS?.[getCurrentUser()?.plan||'free']?.[f]),
    checkAiUsage, getRemainingMessages,
    addBookmark, removeBookmark, isBookmarked,
  };

})();
