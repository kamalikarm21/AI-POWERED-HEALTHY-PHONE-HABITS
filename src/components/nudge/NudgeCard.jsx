import React from 'react';
import { AlertCircle, X, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NudgeCard({ onDismiss }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-80 animate-slide-up">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-amber-200 dark:border-amber-700 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Gentle Nudge</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              You've opened social media 4 times during your study session. Want to return to your focus session?
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { navigate('/focus'); onDismiss(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Play size={12} />
                Return to Focus
              </button>
              <button
                onClick={onDismiss}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={14} className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
