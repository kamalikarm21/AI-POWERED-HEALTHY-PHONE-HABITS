import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap, BarChart3, Brain, Sparkles, ArrowRight, Shield,
  Clock, Smartphone, TrendingUp, CheckCircle, ChevronDown,
  Sun, Moon, Menu, X,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function NavBar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white">FocusAI</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <a href="#why" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Why FocusAI</a>
          <a href="#how" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
          <a href="#ai" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">AI</a>
          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === 'light' ? <Moon size={16} className="text-slate-600" /> : <Sun size={16} className="text-amber-400" />}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Open Dashboard
          </button>
        </div>
        <button
          className="sm:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={20} className="text-slate-700 dark:text-slate-300" /> : <Menu size={20} className="text-slate-700 dark:text-slate-300" />}
        </button>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-3">
          <button
            onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}
            className="w-full px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl"
          >
            Open Dashboard
          </button>
        </div>
      )}
    </nav>
  );
}

function DashboardMockup() {
  return (
    <div className="relative max-w-sm mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-5 overflow-hidden">
        {/* Mock header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-full mb-1"></div>
            <div className="h-2 w-32 bg-slate-100 dark:bg-slate-700/50 rounded-full"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40"></div>
        </div>
        {/* Focus score mockup */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-3 mb-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 56 56" className="-rotate-90 w-14 h-14">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e8f0" strokeWidth="5" />
              <circle cx="28" cy="28" r="22" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="138" strokeDashoffset="30" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-900 dark:text-white">78</span>
            </div>
          </div>
          <div>
            <div className="h-2.5 w-20 bg-slate-200 dark:bg-slate-600 rounded-full mb-1.5"></div>
            <div className="h-4 w-12 bg-primary-100 dark:bg-primary-900/40 rounded-full"></div>
          </div>
        </div>
        {/* Stat bar mockup */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {['#6366f1', '#10b981', '#f59e0b', '#ef4444'].map((c, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-2.5">
              <div className="h-2 w-12 rounded-full mb-1.5" style={{ backgroundColor: c, opacity: 0.3 }}></div>
              <div className="h-4 w-14 bg-slate-200 dark:bg-slate-600 rounded-full mb-1"></div>
              <div className="h-2 w-10 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
            </div>
          ))}
        </div>
        {/* Bar chart mockup */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
          <div className="flex items-end gap-1 h-12">
            {[60, 80, 45, 90, 55, 70, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%`, backgroundColor: '#6366f1', opacity: 0.7 }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 dark:bg-primary-900/40 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-violet-200 dark:bg-violet-900/40 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
    </div>
  );
}

const WHY_CARDS = [
  {
    icon: BarChart3,
    title: 'Understand Your Habits',
    desc: 'Analyze app usage, session frequency and time-of-day patterns to get a complete picture of your digital behavior.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
  },
  {
    icon: Brain,
    title: 'Detect Distractions',
    desc: 'Identify social media, entertainment and notification-driven distraction patterns before they interrupt your focus.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/30',
  },
  {
    icon: Sparkles,
    title: 'Personalized Guidance',
    desc: 'Receive context-aware AI suggestions and gentle nudges tailored to your specific usage patterns and study goals.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Screen Time',
    desc: 'Collect usage data across all your apps and sessions.',
    color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  },
  {
    n: 2,
    title: 'Self Awareness',
    desc: 'AI detects your distraction triggers, patterns, and risk periods.',
    color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  },
  {
    n: 3,
    title: 'Better Habits',
    desc: 'Personalized recommendations guide lasting behavioral change.',
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  },
];

const AI_FLOW = [
  'Phone Usage Data',
  'Data Collection',
  'Usage Pattern Analysis',
  'ML / Pattern Detection',
  'Distraction Trigger Detection',
  'Personalized Recommendation',
  'AI Nudge',
  'User Feedback',
  'Model Personalization',
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <NavBar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-full mb-6">
                <Sparkles size={14} className="text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">AI-Powered Habit Coach</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                Understand your phone.<br />
                <span className="bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">
                  Take back your focus.
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                An AI-powered phone habit assistant that understands your usage patterns, detects distraction triggers,
                and helps you build healthier study habits.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  View My Dashboard <ArrowRight size={18} />
                </button>
                <a
                  href="#how"
                  className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  How It Works <ChevronDown size={18} />
                </a>
              </div>
            </div>
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* Why FocusAI */}
      <section id="why" className="py-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Why FocusAI?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Most screen-time tools just monitor or restrict. FocusAI understands your behavior and helps you change it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CARDS.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={24} className={color} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step process */}
      <section id="how" className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              From Screen Time → Self Awareness → Better Habits
            </h2>
            <p className="text-slate-600 dark:text-slate-400">A three-stage journey powered by AI</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex-1 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center text-2xl font-extrabold mx-auto mb-4`}>
                    {s.n}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={32} className="text-slate-300 dark:text-slate-600 flex-shrink-0 rotate-90 md:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">The Problem We&apos;re Solving</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Students today face unprecedented digital distractions. Existing tools don&apos;t address the root cause.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Smartphone, text: 'Excessive smartphone use interrupts focused learning' },
                  { icon: Clock, text: 'Notification-driven phone checking breaks study sessions' },
                  { icon: Shield, text: 'Existing controls are reactive, not personalized' },
                  { icon: Brain, text: 'No behavioral guidance for lasting habit change' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={12} className="text-red-500" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">FocusAI&apos;s Approach</h3>
              <ul className="space-y-3">
                {[
                  'Understand before restricting',
                  'Personalize to individual patterns',
                  'Guide with gentle nudges, not harsh limits',
                  'Improve continuously through feedback',
                  'Respect privacy with on-device processing',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Architecture */}
      <section id="ai" className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">How AI Works</h2>
            <p className="text-slate-600 dark:text-slate-400">
              The complete AI pipeline behind FocusAI&apos;s personalized recommendations
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            {AI_FLOW.map((step, i) => (
              <React.Fragment key={step}>
                <div className={`w-full max-w-xs text-center px-6 py-3 rounded-xl font-semibold text-sm ${
                  i === 0
                    ? 'bg-primary-600 text-white'
                    : i === AI_FLOW.length - 1
                    ? 'bg-emerald-600 text-white'
                    : i % 2 === 0
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                    : 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800'
                }`}>
                  {step}
                </div>
                {i < AI_FLOW.length - 1 && (
                  <div className="text-slate-300 dark:text-slate-600 text-xl leading-none">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-primary-600 to-violet-700">
        <div className="max-w-3xl mx-auto text-center">
          <TrendingUp size={40} className="text-primary-200 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to take control of your attention?</h2>
          <p className="text-primary-200 mb-8 text-lg">
            Join the FocusAI demo and see what your phone habits reveal about your study patterns.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
          >
            Open My Dashboard <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary-600 flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">FocusAI</span>
            <span className="text-xs text-slate-500">– AI-Powered Healthy Phone Habits</span>
          </div>
          <p className="text-xs text-slate-500">© 2024 FocusAI · College AI Project Demo · All data is simulated</p>
        </div>
      </footer>
    </div>
  );
}
