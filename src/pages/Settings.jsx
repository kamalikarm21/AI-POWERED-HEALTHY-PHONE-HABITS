import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { User, Target, Bell, Moon, Sun, Shield, RotateCcw, Smartphone, BookOpen, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Toggle({ checked, onChange, label, description, icon: Icon }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
          {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
          checked ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'
        }`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
          checked ? 'translate-x-5' : ''
        }`} />
      </button>
    </div>
  );
}

function GoalSlider({ label, icon: Icon, value, onChange, min, max, unit }) {
  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{label}</span>
        </div>
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{value} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-600"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-400">{min}{unit}</span>
        <span className="text-xs text-slate-400">{max}{unit}</span>
      </div>
    </div>
  );
}

export default function Settings() {
  const { preferences, updatePreference, user, resetDemoData } = useApp();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <AppLayout title="Settings">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Profile */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Profile</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
              <User size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{user?.name ?? 'Kamali'}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Student · FocusAI Demo</p>
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Member since Sep 2024</p>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} className="text-primary-600 dark:text-primary-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daily Goals</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            <GoalSlider
              label="Daily Screen-Time Goal"
              icon={Smartphone}
              value={preferences?.screenTimeGoal ?? 4}
              onChange={v => updatePreference('screenTimeGoal', v)}
              min={1} max={8} unit="h"
            />
            <GoalSlider
              label="Study Goal"
              icon={BookOpen}
              value={preferences?.studyGoal ?? 3}
              onChange={v => updatePreference('studyGoal', v)}
              min={1} max={6} unit="h/day"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-primary-600 dark:text-primary-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications &amp; Nudges</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            <Toggle
              checked={preferences?.smartNudges ?? true}
              onChange={v => updatePreference('smartNudges', v)}
              label="Smart Nudges"
              description="Adaptive, non-intrusive reminders based on your patterns"
              icon={Zap}
            />
            <Toggle
              checked={preferences?.focusReminders ?? true}
              onChange={v => updatePreference('focusReminders', v)}
              label="Focus Reminders"
              description="Gentle reminders to start focus sessions"
              icon={Target}
            />
            <Toggle
              checked={preferences?.notifications ?? true}
              onChange={v => updatePreference('notifications', v)}
              label="Notifications"
              description="Daily habit summaries and progress updates"
              icon={Bell}
            />
          </div>
        </div>

        {/* Theme */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            {theme === 'dark' ? <Moon size={16} className="text-primary-400" /> : <Sun size={16} className="text-amber-500" />}
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appearance</h3>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { if (theme !== 'light') toggleTheme(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all duration-200 ${
                theme === 'light'
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Sun size={16} /> Light
            </button>
            <button
              onClick={() => { if (theme !== 'dark') toggleTheme(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all duration-200 ${
                theme === 'dark'
                  ? 'border-primary-600 bg-primary-900/20 text-primary-400'
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Moon size={16} /> Dark
            </button>
          </div>
        </div>

        {/* Privacy link */}
        <div
          onClick={() => navigate('/privacy')}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <Shield size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Privacy &amp; Data</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your data, your control</p>
          </div>
          <span className="text-slate-400">›</span>
        </div>

        {/* Reset demo */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Demo Data</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Reset all demo data, feedback, and preferences to default.
          </p>
          {resetDone ? (
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">✓ Demo data reset successfully!</p>
          ) : showResetConfirm ? (
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <RotateCcw size={14} /> Reset Demo Data
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
