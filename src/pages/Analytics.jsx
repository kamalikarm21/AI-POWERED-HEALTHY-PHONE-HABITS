import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import { WEEKLY_USAGE, MONTHLY_USAGE, CATEGORY_USAGE, HOURLY_RISK } from '../data/demoData';
import { analyticsService } from '../services/analyticsService';

const RANGES = ['Today', '7 Days', '30 Days'];

const TODAY_DATA = [
  { time: '9AM', screenTime: 18, studyTime: 45, distraction: 5 },
  { time: '10AM', screenTime: 22, studyTime: 55, distraction: 8 },
  { time: '11AM', screenTime: 15, studyTime: 50, distraction: 4 },
  { time: '12PM', screenTime: 45, studyTime: 10, distraction: 22 },
  { time: '1PM', screenTime: 38, studyTime: 8, distraction: 18 },
  { time: '2PM', screenTime: 28, studyTime: 40, distraction: 10 },
  { time: '3PM', screenTime: 32, studyTime: 35, distraction: 14 },
  { time: '4PM', screenTime: 40, studyTime: 20, distraction: 18 },
];

const CustomTooltipMin = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-3">
        <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">{label}</p>
        {payload.map(p => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-slate-500">{p.name}:</span>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              {typeof p.value === 'number' && p.value > 60
                ? `${Math.floor(p.value / 60)}h ${p.value % 60}m`
                : `${p.value}m`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, pct }) => {
  if (pct < 8) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {pct}%
    </text>
  );
};

export default function Analytics() {
  const [range, setRange] = useState('7 Days');
  const appUsage = analyticsService.getAppUsage();
  const maxMin = Math.max(...appUsage.map(d => d.minutes));

  const chartData = range === 'Today' ? TODAY_DATA : range === '7 Days' ? WEEKLY_USAGE : MONTHLY_USAGE;
  const xKey = range === 'Today' ? 'time' : range === '7 Days' ? 'day' : 'week';

  return (
    <AppLayout title="Analytics">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Screen-Time Analytics</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Detailed breakdown of your phone usage patterns</p>
        </div>
        {/* Range switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {RANGES.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                range === r
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Usage Over Time — {range}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={20} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltipMin />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
            <Bar dataKey="screenTime" name="Screen Time" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="studyTime" name="Study Time" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="distraction" name="Distraction" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category + App breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Donut chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Usage by Category</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={CATEGORY_USAGE}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {CATEGORY_USAGE.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}m`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {CATEGORY_USAGE.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-slate-600 dark:text-slate-400 flex-1">{cat.name}</span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">{cat.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App usage bars */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">App Usage Breakdown</h3>
          <div className="space-y-3.5">
            {appUsage.map(({ app, minutes, color, formatted }) => (
              <div key={app}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{app}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{formatted}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(minutes / maxMin) * 100}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distraction Risk Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Distraction Risk Timeline</h3>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Low
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />High
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Risk of distraction by time of day</p>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={HOURLY_RISK}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const v = payload[0].value;
                const lvl = v >= 70 ? 'High' : v >= 40 ? 'Medium' : 'Low';
                const c = v >= 70 ? 'text-red-600' : v >= 40 ? 'text-amber-600' : 'text-emerald-600';
                return (
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-2.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{label}</p>
                    <p className={`text-xs font-semibold ${c}`}>{lvl} Risk ({v}/100)</p>
                  </div>
                );
              }}
            />
            <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} fill="url(#riskGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AppLayout>
  );
}
