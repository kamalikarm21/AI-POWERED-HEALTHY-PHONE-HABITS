import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { FocusScore } from '../components/dashboard/FocusScore';
import { UsageChart } from '../components/dashboard/UsageChart';
import { AppUsageChart } from '../components/dashboard/AppUsageChart';
import { AIInsight } from '../components/dashboard/AIInsight';
import { RecommendationCard } from '../components/ai/RecommendationCard';
import { Smartphone, Clock, BookOpen, Zap, Database } from 'lucide-react';
import { WEEKLY_USAGE, AI_INSIGHTS, RECOMMENDATIONS } from '../data/demoData';
import { analyticsService } from '../services/analyticsService';
import { useApp } from '../context/AppContext';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { user, todayStats } = useApp();
  const appUsage = analyticsService.getAppUsage();

  return (
    <AppLayout title="Dashboard">
      {/* Greeting */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {getGreeting()}, {user.name} 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's how your digital habits are looking today.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-full">
          <Database size={14} className="text-violet-600 dark:text-violet-400" />
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Demo Data</span>
        </div>
      </div>

      {/* Top row: Focus Score + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-1">
          <FocusScore score={todayStats.focusScore} delta={todayStats.focusScoreDelta} />
        </div>
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Screen Time"
            value={analyticsService.formatMinutes(todayStats.screenTime)}
            subtitle="Today's total"
            icon={Smartphone}
            iconColor="text-primary-600 dark:text-primary-400"
            iconBg="bg-primary-50 dark:bg-primary-900/30"
            trend="down"
            trendLabel="18% lower than yesterday"
            trendPositive={true}
          />
          <StatCard
            title="Study Time"
            value={analyticsService.formatMinutes(todayStats.studyTime)}
            subtitle="Active study"
            icon={BookOpen}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-50 dark:bg-emerald-900/30"
            trend="up"
            trendLabel="Goal: 3h daily"
            trendPositive={true}
          />
          <StatCard
            title="Phone Pickups"
            value={todayStats.pickups}
            subtitle="Today"
            icon={Zap}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-50 dark:bg-amber-900/30"
            trend="down"
            trendLabel="10% fewer than avg"
            trendPositive={true}
          />
          <StatCard
            title="Distraction Time"
            value={analyticsService.formatMinutes(todayStats.distraction)}
            subtitle="Today"
            icon={Clock}
            iconColor="text-red-500 dark:text-red-400"
            iconBg="bg-red-50 dark:bg-red-900/30"
            trend="down"
            trendLabel="Improving!"
            trendPositive={true}
          />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <UsageChart data={WEEKLY_USAGE} />
        <AppUsageChart data={appUsage} />
      </div>

      {/* AI Insight + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AIInsight insight={AI_INSIGHTS[0]} />
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recommended For You</h3>
          {RECOMMENDATIONS.slice(0, 2).map(rec => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
