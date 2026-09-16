import React from 'react';
import { Brain, AlertTriangle, Clock, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AIInsight({ insight }) {
  const navigate = useNavigate();
  const { title, description, trigger, period, pattern } = insight;

  return (
    <div className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 rounded-2xl p-6 shadow-sm border border-primary-100 dark:border-primary-800/40">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
          <Brain size={18} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">AI Habit Analysis</p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{title}</h3>
        </div>
      </div>

      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">{description}</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle size={12} className="text-amber-500" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Trigger</p>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">{trigger}</p>
        </div>
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1 mb-1">
            <Clock size={12} className="text-red-500" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">High Risk</p>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">{period}</p>
        </div>
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-3">
          <div className="flex items-center gap-1 mb-1">
            <Zap size={12} className="text-primary-500" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pattern</p>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">{pattern}</p>
        </div>
      </div>

      <button
        onClick={() => navigate('/insights')}
        className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        View Full Analysis <ChevronRight size={16} />
      </button>
    </div>
  );
}
