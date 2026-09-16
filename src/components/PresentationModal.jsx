import React from 'react';
import { X, ChevronRight, BarChart3, Brain, Sparkles, Timer, ThumbsUp, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRESENTATION_STEPS } from '../data/demoData';
import { useNavigate } from 'react-router-dom';

const ICON_MAP = { BarChart3, Brain, Sparkles, Timer, ThumbsUp, TrendingUp };

const STEP_ROUTES = ['/analytics', '/insights', '/ai-coach', '/focus', '/insights', '/dashboard'];

export function PresentationModal() {
  const { presentationStep, nextPresentationStep, endPresentationMode } = useApp();
  const navigate = useNavigate();
  const step = PRESENTATION_STEPS[presentationStep];
  const isLast = presentationStep >= PRESENTATION_STEPS.length - 1;
  const Icon = ICON_MAP[step?.icon] || BarChart3;

  const handleNext = () => {
    navigate(STEP_ROUTES[presentationStep]);
    if (isLast) {
      endPresentationMode();
    } else {
      nextPresentationStep();
    }
  };

  if (!step) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">Presentation Mode</span>
            <span className="text-xs text-slate-500">{presentationStep + 1} / {PRESENTATION_STEPS.length}</span>
          </div>
          <button onClick={endPresentationMode} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {PRESENTATION_STEPS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                i <= presentationStep ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Icon size={32} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">Step {step.step}</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={endPresentationMode}
            className="flex-1 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Exit
          </button>
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {isLast ? 'Finish' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
