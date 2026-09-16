// ============================================================
// demoData.js – Realistic student usage data for FocusAI Demo
// ============================================================

export const DEMO_USER = {
  name: 'Kamali',
  avatar: null,
  joinDate: '2024-09-01',
  studyGoal: 3, // hours/day
  screenTimeGoal: 4, // hours/day
};

// Last 7 days daily totals (minutes)
export const WEEKLY_USAGE = [
  { day: 'Mon', screenTime: 312, studyTime: 145, pickups: 52, distraction: 98 },
  { day: 'Tue', screenTime: 248, studyTime: 178, pickups: 38, distraction: 62 },
  { day: 'Wed', screenTime: 335, studyTime: 120, pickups: 61, distraction: 115 },
  { day: 'Thu', screenTime: 289, studyTime: 165, pickups: 44, distraction: 88 },
  { day: 'Fri', screenTime: 398, studyTime: 98,  pickups: 72, distraction: 148 },
  { day: 'Sat', screenTime: 421, studyTime: 82,  pickups: 79, distraction: 162 },
  { day: 'Sun', screenTime: 272, studyTime: 165, pickups: 47, distraction: 78  },
];

// Today's data
export const TODAY_STATS = {
  screenTime: 272,      // minutes
  studyTime: 165,       // minutes
  pickups: 47,
  distraction: 78,      // minutes
  focusScore: 78,
  focusScoreDelta: 12,  // percent change from yesterday
  screenTimeDelta: -18, // percent vs yesterday
};

// Last 30 days (aggregated weekly)
export const MONTHLY_USAGE = [
  { week: 'Sep 1', screenTime: 280, studyTime: 148, pickups: 48, distraction: 82 },
  { week: 'Sep 8', screenTime: 315, studyTime: 132, pickups: 56, distraction: 105 },
  { week: 'Sep 15', screenTime: 272, studyTime: 165, pickups: 47, distraction: 78 },
];

// App usage breakdown (minutes today)
export const APP_USAGE = [
  { app: 'Instagram',   minutes: 78,  category: 'social',    color: '#e1306c' },
  { app: 'YouTube',     minutes: 52,  category: 'entertainment', color: '#ff0000' },
  { app: 'WhatsApp',    minutes: 38,  category: 'communication', color: '#25d366' },
  { app: 'Chrome',      minutes: 31,  category: 'productivity',  color: '#4285f4' },
  { app: 'Spotify',     minutes: 24,  category: 'entertainment', color: '#1db954' },
  { app: 'Study Apps',  minutes: 49,  category: 'education',     color: '#6366f1' },
];

// Category breakdown
export const CATEGORY_USAGE = [
  { name: 'Social Media',   value: 78,  color: '#e1306c', pct: 29 },
  { name: 'Entertainment',  value: 76,  color: '#f59e0b', pct: 28 },
  { name: 'Communication',  value: 38,  color: '#10b981', pct: 14 },
  { name: 'Education',      value: 49,  color: '#6366f1', pct: 18 },
  { name: 'Productivity',   value: 31,  color: '#3b82f6', pct: 11 },
];

// Distraction risk by hour (0-23, value 0-100)
export const HOURLY_RISK = [
  { hour: '6AM',  risk: 10, label: 'Low' },
  { hour: '7AM',  risk: 18, label: 'Low' },
  { hour: '8AM',  risk: 22, label: 'Low' },
  { hour: '9AM',  risk: 15, label: 'Low' },
  { hour: '10AM', risk: 12, label: 'Low' },
  { hour: '11AM', risk: 20, label: 'Low' },
  { hour: '12PM', risk: 45, label: 'Medium' },
  { hour: '1PM',  risk: 38, label: 'Medium' },
  { hour: '2PM',  risk: 28, label: 'Low' },
  { hour: '3PM',  risk: 32, label: 'Medium' },
  { hour: '4PM',  risk: 40, label: 'Medium' },
  { hour: '5PM',  risk: 55, label: 'Medium' },
  { hour: '6PM',  risk: 62, label: 'Medium' },
  { hour: '7PM',  risk: 70, label: 'High' },
  { hour: '8PM',  risk: 88, label: 'High' },
  { hour: '9PM',  risk: 92, label: 'High' },
  { hour: '10PM', risk: 85, label: 'High' },
  { hour: '11PM', risk: 68, label: 'High' },
];

// AI insights
export const AI_INSIGHTS = [
  {
    id: 'insight_1',
    type: 'warning',
    title: 'Evening Distraction Peak',
    description: 'Your distraction risk is highest between 8:30 PM and 10:00 PM. Social media usage increases significantly during this period.',
    trigger: 'Social Media Notifications',
    period: '8:30 PM – 10:00 PM',
    pattern: 'Frequent short sessions',
  },
  {
    id: 'insight_2',
    type: 'info',
    title: 'Morning Focus Window',
    description: 'Your best focus time is 9:00 AM – 11:00 AM. Your phone pickups are lowest and study session duration is longest during this period.',
    trigger: 'Study sessions',
    period: '9:00 AM – 11:00 AM',
    pattern: 'Sustained deep focus',
  },
  {
    id: 'insight_3',
    type: 'success',
    title: 'Improving Trend',
    description: 'Your total distraction time has decreased by 18% compared to last week. Keep up the momentum!',
    trigger: 'Improved habits',
    period: 'Past 7 days',
    pattern: 'Gradual improvement',
  },
];

// Recommendations
export const RECOMMENDATIONS = [
  {
    id: 'rec_1',
    title: 'Reduce Notification Distractions',
    description: 'Your usage shows repeated interruptions from notifications. Muting non-essential apps during study could save you 35+ minutes daily.',
    icon: 'BellOff',
    category: 'notifications',
    difficulty: 'Easy',
    impact: 'High',
    actionLabel: 'Try This',
  },
  {
    id: 'rec_2',
    title: '25-Minute Focus Session',
    description: 'You usually lose focus after approximately 20–30 minutes. A structured Pomodoro session can help maintain concentration.',
    icon: 'Timer',
    category: 'focus',
    difficulty: 'Easy',
    impact: 'High',
    actionLabel: 'Start Session',
  },
  {
    id: 'rec_3',
    title: 'Reading Habit Builder',
    description: 'You have several free-time periods (especially 7–8 PM) that could be converted into reading sessions instead of scrolling.',
    icon: 'BookOpen',
    category: 'reading',
    difficulty: 'Medium',
    impact: 'Medium',
    actionLabel: 'Start Reading Goal',
  },
  {
    id: 'rec_4',
    title: 'Evening Digital Sunset',
    description: 'Setting a 9:00 PM screen cutoff could reduce your high-risk distraction window and improve sleep quality.',
    icon: 'Moon',
    category: 'sleep',
    difficulty: 'Medium',
    impact: 'High',
    actionLabel: 'Set Reminder',
  },
];

// Focus sessions history
export const FOCUS_SESSIONS_HISTORY = [
  { date: '2024-09-14', duration: 25, mode: 'Focus', completed: true },
  { date: '2024-09-14', duration: 45, mode: 'Deep Focus', completed: true },
  { date: '2024-09-13', duration: 25, mode: 'Focus', completed: false },
  { date: '2024-09-13', duration: 60, mode: 'Study', completed: true },
  { date: '2024-09-12', duration: 25, mode: 'Focus', completed: true },
];

// Insights page data
export const HABIT_INSIGHTS = {
  bestFocusTime: '9:00 AM – 11:00 AM',
  worstFocusTime: '8:30 PM – 10:00 PM',
  mostDistractingApp: 'Instagram',
  mostProductiveDay: 'Tuesday',
  avgDailyPickups: 52,
  avgFocusSessionLength: 24, // minutes
  streakDays: 4,
  weeklyImprovement: 12, // percent
};

// Presentation mode steps
export const PRESENTATION_STEPS = [
  {
    step: 1,
    title: 'View Screen-Time Data',
    description: 'FocusAI collects and visualizes your daily phone usage, app breakdown, and pickup frequency.',
    icon: 'BarChart3',
  },
  {
    step: 2,
    title: 'AI Detects Distraction Patterns',
    description: 'Our AI engine identifies your high-risk distraction periods, trigger apps, and behavioral patterns.',
    icon: 'Brain',
  },
  {
    step: 3,
    title: 'AI Gives Personalized Suggestion',
    description: 'Context-aware recommendations are generated specifically for your usage patterns and study goals.',
    icon: 'Sparkles',
  },
  {
    step: 4,
    title: 'User Starts Focus Session',
    description: 'A Pomodoro-style focus timer helps you build structured, distraction-free study periods.',
    icon: 'Timer',
  },
  {
    step: 5,
    title: 'User Gives Feedback',
    description: 'After each session and recommendation, you rate the suggestion and the AI learns your preferences.',
    icon: 'ThumbsUp',
  },
  {
    step: 6,
    title: 'AI Improves Future Recommendations',
    description: 'Your feedback fine-tunes the recommendation engine, making future nudges more personalized.',
    icon: 'TrendingUp',
  },
];
