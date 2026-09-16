import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-slate-600 dark:text-slate-400">{p.name}:</span>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              {Math.floor(p.value / 60)}h {p.value % 60}m
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function UsageChart({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daily Usage</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Last 7 days</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={18} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-700" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            formatter={(v) => <span className="text-slate-600 dark:text-slate-400">{v}</span>}
          />
          <Bar dataKey="screenTime" name="Screen Time" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="studyTime" name="Study Time" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
