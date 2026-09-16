# FocusAI – AI-Powered Healthy Phone Habits

> An AI-powered phone habit assistant that understands your usage patterns, detects distraction triggers, and helps you build healthier study habits.

## 🌐 Live Demo

**https://kamalikarm21.github.io/AI-POWERED-HEALTHY-PHONE-HABITS/**

## 🚀 Features

- 📊 **Dashboard** – Focus score, screen time, study time, phone pickups, distraction time
- 📈 **Analytics** – Interactive charts with 7-day/30-day breakdowns, app usage, distraction risk timeline
- 🤖 **AI Coach** – Personalized chat-based recommendations powered by AI pattern analysis
- ⏱️ **Focus Session** – Pomodoro-style circular timer (25/45/60 min modes)
- 💡 **Insights** – Weekly habit analysis, best/worst focus times, streak tracking
- ⚙️ **Settings** – Goal sliders, smart nudge toggles, dark mode, data reset
- 🔒 **Privacy** – On-device processing concept, data minimization, full transparency
- 🎬 **Presentation Mode** – 6-step interactive demo for college presentations

## 🛠️ Tech Stack

| Technology | Version |
|-----------|---------|
| React | 18.3 |
| Vite | 5.4 |
| Tailwind CSS | 3.4 |
| Recharts | 2.x |
| Lucide React | 0.441 |
| React Router | 6.x |

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/kamalikarm21/AI-POWERED-HEALTHY-PHONE-HABITS.git

# Install dependencies
cd AI-POWERED-HEALTHY-PHONE-HABITS
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Sidebar, Header, MobileNav, AppLayout
│   ├── ui/           # Button, Card, Badge
│   ├── dashboard/    # StatCard, FocusScore, UsageChart, AppUsageChart, AIInsight
│   ├── ai/           # RecommendationCard (with feedback loop)
│   ├── nudge/        # NudgeCard (smart nudge system)
│   └── PresentationModal.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Dashboard.jsx
│   ├── Analytics.jsx
│   ├── AIChatPage.jsx
│   ├── FocusSession.jsx
│   ├── Insights.jsx
│   ├── Settings.jsx
│   └── Privacy.jsx
├── services/
│   ├── aiService.js        # Simulated AI (API hook-in ready)
│   ├── analyticsService.js
│   └── storageService.js
├── context/
│   ├── AppContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useTimer.js
│   └── useLocalStorage.js
└── data/
    └── demoData.js
```

## 🤖 AI Architecture

```
Phone Usage Data
      ↓
Data Collection
      ↓
Usage Pattern Analysis
      ↓
ML / Pattern Detection
      ↓
Distraction Trigger Detection
      ↓
Personalized Recommendation Engine
      ↓
AI Nudge
      ↓
User Feedback
      ↓
Model Personalization
```

## 🔑 Connecting a Real AI API

In `src/services/aiService.js`, replace the `generateResponse()` function body with your OpenAI or Gemini API call. The hook-in point is clearly documented in the source.

## 📱 Demo Mode

All dashboard data is simulated with realistic student usage patterns. Click **"Reset Demo Data"** in Settings to restore defaults.

## 🏫 College AI Project

This project was built as a college AI course demonstration, showcasing:
- Personalized AI recommendations
- Behavioral pattern detection
- Feedback loop for model personalization
- Privacy-first design principles

---

*Built with ❤️ for better focus and healthier digital habits.*
