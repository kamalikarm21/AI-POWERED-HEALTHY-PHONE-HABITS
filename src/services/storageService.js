// storageService.js – localStorage abstraction for FocusAI

const PREFIX = 'focusai_';

export const storageService = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('FocusAI: localStorage write failed', e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {}
  },

  clear() {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
      keys.forEach(k => localStorage.removeItem(k));
    } catch {}
  },
};

// High-level helpers
export const feedbackStorage = {
  saveFeedback(recommendationId, helpful, reason = null) {
    const all = storageService.get('feedback', {});
    all[recommendationId] = { helpful, reason, timestamp: Date.now() };
    storageService.set('feedback', all);
  },

  getFeedback(recommendationId) {
    const all = storageService.get('feedback', {});
    return all[recommendationId] || null;
  },

  getAllFeedback() {
    return storageService.get('feedback', {});
  },
};

export const focusSessionStorage = {
  saveSessions(sessions) {
    storageService.set('focus_sessions', sessions);
  },

  getSessions() {
    return storageService.get('focus_sessions', []);
  },

  addSession(session) {
    const sessions = focusSessionStorage.getSessions();
    sessions.unshift({ ...session, id: Date.now(), timestamp: new Date().toISOString() });
    focusSessionStorage.saveSessions(sessions.slice(0, 50)); // keep last 50
  },
};

export const preferencesStorage = {
  getPreferences() {
    return storageService.get('preferences', {
      theme: 'light',
      smartNudges: true,
      focusReminders: true,
      screenTimeGoal: 4,
      studyGoal: 3,
      nudgeFrequency: 'normal',
      notifications: true,
    });
  },

  savePreferences(prefs) {
    storageService.set('preferences', prefs);
  },

  updatePreference(key, value) {
    const prefs = preferencesStorage.getPreferences();
    prefs[key] = value;
    preferencesStorage.savePreferences(prefs);
  },
};

export const chatStorage = {
  getHistory() {
    return storageService.get('chat_history', []);
  },
  saveHistory(messages) {
    storageService.set('chat_history', messages.slice(-100));
  },
  clearHistory() {
    storageService.remove('chat_history');
  },
};
