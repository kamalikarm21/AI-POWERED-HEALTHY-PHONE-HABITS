import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Sun, Moon, Smartphone, Calendar, TrendingUp, Flame } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { WEEKLY_USAGE, HABIT_INSIGHTS, AI_INSIGHTS, RECOMMENDATIONS } from '../data/demoData';
import { RecommendationCard } from '../components/ai/RecommendationCard';

const SUMMARY_CARDS = [
  {
    title: 'Best Focus Time',
    value: HABIT_INSIGHTS.bestFocusTime,
    icon: Sun,
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    iconColor: 'text-amber-500',
    desc: 'Your most productive window',
  },
  {
    title: 'Most Distracting Time',
    value: HABIT_INSIGHTS.worstFocusTime,
    icon: Moon,
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-700',
    iconColor: 'text-red-500',
    desc: 'Your highest distraction risk',
  },
  {
    title: 'Most Distracting App',
    value: HABIT_INSIGHTS.mostDistractingApp,
    icon: Smartphone,
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-700',
    iconColor: 'text-rose-500',
    desc: '28% of daily phone time',
  },
  {
    title: 'Most Productive Day',
    value: HABIT_INSIGHTS.mostProductiveDay,
    icon: Calendar,
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    iconColor: 'text-emerald-500',
    desc: 'Highest study time this week',
  },
];

export default function Insights() {
  return (
    <AppLayout title="Insights">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Digital Habit Insights</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          AI-powered analysis of your phone usage patterns.
        </p>
      </div>

      {/* Streak banner */}
      <div className="bg-gradient-to-r from-primary-600 to-violet-600 rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={18} className="text-orange-300" />
              <span className="text-sm font-bold text-primary-100">{HABIT_INSIGHTS.streakDays}-Day Streak!</span>
            </div>
            <p className="text-lg font-bold">You're on a roll, Kamali 🔥</p>
            <p className="text-sm text-primary-200 mt-0.5">
              Focus score improved {HABIT_INSIGHTS.weeklyImprovement}% this week.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{HABIT_INSIGHTS.weeklyImprovement}%</p>
            <p className="text-xs text-primary-200">Weekly improvement</p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SUMMARY_CARDS.map(({ title, value, icon: Icon, bg, border, iconColor, desc }) => (
          <div key={title} className={`rounded-2xl p-4 border ${bg} ${border}`}>
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800/50 flex items-center justify-center mb-3">
              <Icon size={16} className={iconColor} />
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>

      {/* Weekly comparison chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Progress</h3>
          <TrendingUp size={16} className="text-emerald-500" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Screen time vs Study time trend</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={WEEKLY_USAGE} barSize={16} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              formatter={(v, name) => [`${Math.floor(v / 60)}h ${v % 60}m`, name]}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
            <Bar dataKey="screenTime" name="Screen Time" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="studyTime" name="Study Time" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="distraction" name="Distraction" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI explanation */}
      <div className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 rounded-2xl p-5 border border-primary-100 dark:border-primary-800/40 mb-6">
        <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">AI Analysis</p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Your data shows a clear pattern: <strong>morning hours (9–11 AM)</strong> are your most productive,
          while evenings are your biggest risk zone. Social media usage on Instagram spikes after 8 PM and
          correlates directly with lower focus scores the following morning. Your Tuesday performance is
          consistently the best — this may be because you don't have heavy coursework due on Wednesdays.
        </p>
      </div>

      {/* All Recommendations */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Personalized Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOMMENDATIONS.map(rec => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
