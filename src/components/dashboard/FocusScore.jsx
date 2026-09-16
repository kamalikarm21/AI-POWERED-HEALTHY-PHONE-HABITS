import React from 'react';

export function FocusScore({ score = 78, delta = 12 }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 75) return '#10b981';
    if (s >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const color = getColor(score);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Focus Score</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Today's performance</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
          delta >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
        }`}>
          {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}%
        </div>
      </div>

      <div className="flex items-center justify-center">
        <svg width="140" height="140" className="-rotate-90">
          {/* Background ring */}
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" className="dark:stroke-slate-700" />
          {/* Score ring */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">{score}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">/100</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Poor</p>
          <div className="h-1 rounded-full bg-red-400 mt-1"></div>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Fair</p>
          <div className="h-1 rounded-full bg-amber-400 mt-1"></div>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Great</p>
          <div className="h-1 rounded-full bg-emerald-400 mt-1"></div>
        </div>
      </div>
    </div>
  );
}
