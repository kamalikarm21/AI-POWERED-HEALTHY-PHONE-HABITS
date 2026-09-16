// aiService.js – Simulated AI response engine for FocusAI
// Structured so a real API (OpenAI / Gemini) can be connected later.

// ─── Types ──────────────────────────────────────────────────────────────────
// Message: { id, role: 'user'|'assistant', content, timestamp }
// Response: { content, typing: boolean }

// ─── Simulated Knowledge Base ────────────────────────────────────────────────
const CONTEXT = {
  screenTime: '4h 32m',
  studyTime: '2h 45m',
  pickups: 47,
  distractionTime: '1h 18m',
  focusScore: 78,
  topDistractingApp: 'Instagram',
  highRiskPeriod: '8:30 PM – 10:00 PM',
  pattern: 'frequent short phone sessions during study periods, especially after notifications',
  bestFocusTime: '9:00 AM – 11:00 AM',
  mostProductiveDay: 'Tuesday',
  streakDays: 4,
};

// ─── Response Map ────────────────────────────────────────────────────────────
const RESPONSES = [
  {
    keywords: ['distract', 'losing focus', 'focus often', 'why am i distract'],
    response: `Based on your recent data, your phone usage shows **${CONTEXT.pattern}**. 

Your distraction risk peaks between **${CONTEXT.highRiskPeriod}** with Instagram being your top trigger (${CONTEXT.topDistractingApp} — 1h 18m today).

**What I recommend:**
- Enable Do Not Disturb during study blocks
- Try a 25-minute Pomodoro session now
- Move Instagram off your home screen

Would you like to start a focus session right now?`,
  },
  {
    keywords: ['worst habit', 'bad habit', 'biggest problem', 'main problem'],
    response: `Your **biggest habit challenge** is evening social media scrolling. 

Here's the pattern I detected:
- **${CONTEXT.topDistractingApp}** accounts for 28% of your daily phone time
- Usage spikes sharply after **8:00 PM** and stays elevated until nearly 11:00 PM
- You average **${CONTEXT.pickups} phone pickups** per day — significantly above the recommended 30

The good news? On days you schedule a focus session before 8 PM, your evening distraction time drops by over 40%. 🎯`,
  },
  {
    keywords: ['study plan', 'plan', 'schedule', 'organize'],
    response: `Here's a **personalized study plan** based on your usage patterns:

**⏰ Morning Block (9:00 – 11:00 AM)**
Your best focus window. Schedule deep work here.

**☀️ Afternoon Block (2:00 – 4:00 PM)**
Moderate focus. Good for readings and reviews.

**📱 Evening (6:00 – 8:00 PM)**
Transition time. Wrap up, avoid starting new tasks.

**🌙 After 8:00 PM**
Your highest distraction risk. Set a digital sunset reminder.

**Daily Targets:**
- Study: 3 hours (you're at ${CONTEXT.studyTime} today — great!)
- Phone: Under 4 hours
- Focus sessions: 2–3 per day`,
  },
  {
    keywords: ['reduce screen time', 'use phone less', 'less time on phone', 'screen time'],
    response: `Great question! Here are **5 data-driven strategies** to reduce your screen time:

1. **Batch notifications** — Check messages at set times (e.g., 12 PM and 6 PM) instead of reactively
2. **App timer challenge** — Set a 45-minute daily limit on Instagram
3. **Morning phone-free window** — Keep your phone in another room for the first 30 minutes after waking
4. **Physical barrier** — Charge your phone in a different room at night
5. **Replace, don't restrict** — When you feel the urge to scroll, pick up a book instead

Your current screen time is **${CONTEXT.screenTime}**. Small changes can realistically get this under 3 hours within 2 weeks.`,
  },
  {
    keywords: ['evening', 'night', 'scrolling', 'scroll', 'bedtime'],
    response: `Your evening habits need the most attention. Here's what the data shows:

**8:30 PM – 10:00 PM:** Your highest distraction risk period (92/100 risk score)

**My recommendation:**
- Set a gentle focus reminder at **8:25 PM**
- Start a **30-minute reading session** instead of opening social media
- Enable "Wind Down" mode which dims your screen and limits apps

📚 On days you read instead of scroll in the evening, your next-day focus score is 23% higher on average.

Would you like me to set a daily reading reminder at 8:30 PM?`,
  },
  {
    keywords: ['start focus', 'focus session', 'pomodoro', 'timer', 'study session'],
    response: `Let's get you focused! Here's what I suggest:

**For right now:**
1. Put your phone face-down (or in another room)
2. Open your study material
3. Start the **25-minute Focus Timer** in FocusAI

**During your session:**
- Notifications will be tracked as interruptions
- I'll show you a summary when you finish
- Your Focus Score updates in real-time

You're on a **${CONTEXT.streakDays}-day streak** — don't break it! 🔥

Head to the **Focus Session** page to start your timer.`,
  },
  {
    keywords: ['instagram', 'social media', 'tiktok', 'youtube'],
    response: `Social media is your **#1 distraction trigger**. Here's the breakdown:

| App | Today | Category |
|-----|-------|---------|
| Instagram | 1h 18m | Social |
| YouTube | 52m | Entertainment |
| WhatsApp | 38m | Communication |

**The pattern:** You tend to open Instagram within **3 minutes of receiving a notification**, and the average session lasts 12 minutes longer than intended.

**Actionable steps:**
- Turn off Instagram push notifications
- Set a 30-min daily limit
- Move it to the second page of your home screen

These changes alone could save you **45+ minutes daily** for studying.`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: `Hi Kamali! 👋 

I'm your FocusAI Coach. Based on today's data:
- **Focus Score:** ${CONTEXT.focusScore}/100 (↑12% from yesterday)
- **Screen Time:** ${CONTEXT.screenTime}
- **Study Time:** ${CONTEXT.studyTime}

You're having a relatively good day! Your morning was productive. Watch out for the evening — your distraction risk will rise around 8:30 PM.

What would you like help with today?`,
  },
  {
    keywords: ['feedback', 'improve', 'personalize', 'better'],
    response: `FocusAI uses a **feedback loop** to improve your recommendations:

1. **You rate suggestions** (👍 or 👎)
2. **Patterns are analyzed** to understand your preferences
3. **Recommendations evolve** — less of what doesn't work, more of what does
4. **Models update** — new patterns become part of your baseline

The more feedback you give, the more personalized your experience becomes. Think of it as teaching your AI coach about *you*.

Would you like to rate some of your recent recommendations?`,
  },
];

// Default fallback
const DEFAULT_RESPONSE = `I understand you're asking about **"${'{input}'}"**. 

Based on your current data:
- Focus Score: ${CONTEXT.focusScore}/100
- Today's screen time: ${CONTEXT.screenTime}
- Top distraction: ${CONTEXT.topDistractingApp}

I'm continuously learning from your habits. Could you rephrase your question, or try one of the quick suggestions below? I'm here to help you build better focus habits! 🎯`;

// ─── Main Service ────────────────────────────────────────────────────────────
export const aiService = {
  /**
   * Generate a simulated AI response.
   * Replace this function body with a real API call when ready.
   *
   * @param {string} userMessage
   * @param {Array} conversationHistory - array of { role, content }
   * @returns {Promise<string>}
   */
  async generateResponse(userMessage, conversationHistory = []) {
    // Simulate network delay (500ms – 1.8s)
    const delay = 500 + Math.random() * 1300;
    await new Promise(resolve => setTimeout(resolve, delay));

    const lowerMsg = userMessage.toLowerCase();

    // Find best matching response
    for (const item of RESPONSES) {
      if (item.keywords.some(kw => lowerMsg.includes(kw))) {
        return item.response;
      }
    }

    // Return default with user input substituted
    return DEFAULT_RESPONSE.replace('{input}', userMessage.slice(0, 50));
  },

  /**
   * Hook point for real API integration.
   * Uncomment and configure when connecting to OpenAI/Gemini:
   *
   * async generateResponseFromAPI(userMessage, history) {
   *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
   *     method: 'POST',
   *     headers: {
   *       'Content-Type': 'application/json',
   *       'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
   *     },
   *     body: JSON.stringify({
   *       model: 'gpt-4o-mini',
   *       messages: [
   *         { role: 'system', content: SYSTEM_PROMPT },
   *         ...history,
   *         { role: 'user', content: userMessage },
   *       ],
   *     }),
   *   });
   *   const data = await response.json();
   *   return data.choices[0].message.content;
   * },
   */

  /**
   * Get contextual nudge message based on current state
   */
  getNudgeMessage(context = {}) {
    const { pickups = 0, currentApp = 'social media', sessionActive = false } = context;

    if (sessionActive && pickups > 3) {
      return {
        title: 'Gentle Nudge',
        message: `You've opened ${currentApp} ${pickups} times during your study session. Want to return to your focus session?`,
        type: 'warning',
      };
    }

    if (new Date().getHours() >= 20) {
      return {
        title: 'Evening Reminder',
        message: 'Your distraction risk is high right now. Consider a 20-minute reading break instead of scrolling.',
        type: 'info',
      };
    }

    return {
      title: 'Keep Going!',
      message: "You're building great habits. Your focus score is improving!",
      type: 'success',
    };
  },
};

export default aiService;
