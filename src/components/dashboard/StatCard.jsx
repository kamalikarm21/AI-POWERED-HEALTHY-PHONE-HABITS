import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'text-primary-600', iconBg = 'bg-primary-50 dark:bg-primary-900/30', trend, trendLabel, trendPositive }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trendPositive
    ? 'text-emerald-600 dark:text-emerald-400'
    : trendPositive === false
    ? 'text-red-500 dark:text-red-400'
    : 'text-slate-500 dark:text-slate-400';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          {trendLabel && (
            <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
              <TrendIcon size={13} />
              <span className="text-xs font-semibold">{trendLabel}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Icon size={20} className={iconColor} />
          </div>
        )}
      </div>
    </div>
  );
}
