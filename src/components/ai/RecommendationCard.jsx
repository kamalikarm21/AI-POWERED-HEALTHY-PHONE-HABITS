import React, { useState } from 'react';
import { BellOff, Timer, BookOpen, Moon, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { feedbackStorage } from '../../services/storageService';
import { useNavigate } from 'react-router-dom';

const ICON_MAP = { BellOff, Timer, BookOpen, Moon };

const FEEDBACK_REASONS = [
  'Less frequent reminders',
  'Different recommendation',
  'More study-focused suggestions',
  'Fewer notifications',
];

export function RecommendationCard({ rec }) {
  const navigate = useNavigate();
  const { id, title, description, icon, difficulty, impact, actionLabel, category } = rec;
  const Icon = ICON_MAP[icon] || Timer;
  const savedFeedback = feedbackStorage.getFeedback(id);
  const [feedback, setFeedback] = useState(savedFeedback);
  const [showReasonPicker, setShowReasonPicker] = useState(false);

  const handleHelpful = () => {
    feedbackStorage.saveFeedback(id, true);
    setFeedback({ helpful: true });
    setShowReasonPicker(false);
  };

  const handleNotHelpful = () => {
    setShowReasonPicker(true);
    feedbackStorage.saveFeedback(id, false);
    setFeedback({ helpful: false });
  };

  const handleReason = (reason) => {
    feedbackStorage.saveFeedback(id, false, reason);
    setFeedback({ helpful: false, reason });
    setShowReasonPicker(false);
  };

  const handleAction = () => {
    if (category === 'focus') navigate('/focus');
    else if (category === 'reading') navigate('/focus');
    else navigate('/settings');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
            <div className="flex gap-1 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                impact === 'High' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
              }`}>{impact} Impact</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>

      <button
        onClick={handleAction}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors mb-3"
      >
        {actionLabel} <ChevronRight size={14} />
      </button>

      {/* Feedback */}
      {!feedback ? (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex-1">Was this helpful?</span>
          <button
            onClick={handleHelpful}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
          >
            <ThumbsUp size={12} /> Helpful
          </button>
          <button
            onClick={handleNotHelpful}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ThumbsDown size={12} /> Not helpful
          </button>
        </div>
      ) : feedback.helpful ? (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-100 dark:border-slate-700">
          ✓ Great! We'll use this feedback to improve your future recommendations.
        </p>
      ) : showReasonPicker ? (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">What would you prefer?</p>
          <div className="flex flex-wrap gap-1.5">
            {FEEDBACK_REASONS.map(reason => (
              <button
                key={reason}
                onClick={() => handleReason(reason)}
                className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
              >
                {reason}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
          {feedback.reason ? `Preference saved: ${feedback.reason}` : 'Thanks for the feedback!'}
        </p>
      )}
    </div>
  );
}
