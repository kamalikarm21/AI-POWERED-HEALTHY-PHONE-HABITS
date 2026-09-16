import React from 'react';

export function AppUsageChart({ data }) {
  const maxMin = Math.max(...data.map(d => d.minutes));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">App Usage</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Today's breakdown</p>
        </div>
      </div>
      <div className="space-y-4">
        {data.map(({ app, minutes, color, formatted }) => (
          <div key={app}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{app}</span>
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
  );
}
