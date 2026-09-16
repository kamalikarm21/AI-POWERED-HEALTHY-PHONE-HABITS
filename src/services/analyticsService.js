// analyticsService.js – Data aggregation helpers for FocusAI

import { WEEKLY_USAGE, APP_USAGE, CATEGORY_USAGE, TODAY_STATS } from '../data/demoData';

export const analyticsService = {
  /**
   * Format minutes into "Xh Ym" display string
   */
  formatMinutes(minutes) {
    if (!minutes && minutes !== 0) return '—';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  },

  /**
   * Get today's summary stats
   */
  getTodayStats() {
    return { ...TODAY_STATS };
  },

  /**
   * Get weekly usage data
   */
  getWeeklyData() {
    return WEEKLY_USAGE.map(d => ({
      ...d,
      screenTimeFormatted: analyticsService.formatMinutes(d.screenTime),
      studyTimeFormatted: analyticsService.formatMinutes(d.studyTime),
      distractionFormatted: analyticsService.formatMinutes(d.distraction),
    }));
  },

  /**
   * Get app usage sorted by most used
   */
  getAppUsage() {
    return [...APP_USAGE].sort((a, b) => b.minutes - a.minutes).map(app => ({
      ...app,
      formatted: analyticsService.formatMinutes(app.minutes),
      pct: Math.round((app.minutes / APP_USAGE.reduce((s, a) => s + a.minutes, 0)) * 100),
    }));
  },

  /**
   * Get category usage breakdown
   */
  getCategoryUsage() {
    return CATEGORY_USAGE;
  },

  /**
   * Calculate focus score
   */
  calculateFocusScore(stats = TODAY_STATS) {
    const screenTimePenalty = Math.max(0, (stats.screenTime - 240) * 0.1);
    const studyBonus = stats.studyTime * 0.3;
    const pickupPenalty = Math.max(0, (stats.pickups - 30) * 0.5);
    const score = Math.round(100 - screenTimePenalty + studyBonus - pickupPenalty - stats.distraction * 0.2);
    return Math.min(100, Math.max(0, score));
  },

  /**
   * Get percentage of goal achieved
   */
  getGoalProgress(current, goal) {
    return Math.min(100, Math.round((current / (goal * 60)) * 100));
  },

  /**
   * Get trend label
   */
  getTrend(delta) {
    if (delta > 0) return { label: `+${delta}%`, type: 'up' };
    if (delta < 0) return { label: `${delta}%`, type: 'down' };
    return { label: 'No change', type: 'neutral' };
  },
};

export default analyticsService;
