import React, { useState, useCallback } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Play, Pause, RotateCcw, CheckCircle, Zap } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { focusSessionStorage } from '../services/storageService';
import { useApp } from '../context/AppContext';

const MODES = [
  { label: '25 min Focus', minutes: 25, color: '#6366f1' },
  { label: '45 min Deep Focus', minutes: 45, color: '#8b5cf6' },
  { label: '60 min Study', minutes: 60, color: '#059669' },
];

function CircularTimer({ progress, secondsLeft, color, isComplete }) {
  const size = 220;
  const strokeWidth = 12;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          className="dark:stroke-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={isComplete ? '#10b981' : color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {isComplete ? (
          <CheckCircle size={48} className="text-emerald-500" />
        ) : (
          <>
            <span className="text-5xl font-bold text-slate-900 dark:text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">remaining</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function FocusSession() {
  const [modeIdx, setModeIdx] = useState(0);
  const { setFocusSessionActive } = useApp();
  const mode = MODES[modeIdx];

  const handleComplete = useCallback(() => {
    setFocusSessionActive(false);
    focusSessionStorage.addSession({
      duration: mode.minutes,
      mode: mode.label,
      completed: true,
      date: new Date().toISOString().split('T')[0],
    });
  }, [mode, setFocusSessionActive]);

  const { secondsLeft, isRunning, isComplete, progress, start, pause, reset } = useTimer(
    mode.minutes * 60,
    handleComplete
  );

  const handleStart = () => {
    start();
    setFocusSessionActive(true);
  };

  const handlePause = () => {
    pause();
    setFocusSessionActive(false);
  };

  const handleReset = () => {
    reset();
    setFocusSessionActive(false);
  };

  const handleModeChange = (idx) => {
    if (isRunning) return;
    setModeIdx(idx);
    setFocusSessionActive(false);
  };

  return (
    <AppLayout title="Focus Session">
      <div className="max-w-lg mx-auto">
        {/* Mode selector */}
        <div className="flex items-center gap-2 mb-8 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-sm border border-slate-100 dark:border-slate-700">
          {MODES.map((m, i) => (
            <button
              key={m.label}
              onClick={() => handleModeChange(i)}
              disabled={isRunning}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                modeIdx === i
                  ? 'text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
              style={modeIdx === i ? { backgroundColor: m.color } : {}}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Timer card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 text-center">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Current Session
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap size={16} className="text-primary-600" />
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{mode.label}</span>
          </div>

          {/* Circular timer */}
          <div className="flex justify-center mb-6">
            <CircularTimer
              progress={progress}
              secondsLeft={secondsLeft}
              color={mode.color}
              isComplete={isComplete}
            />
          </div>

          {/* Status message */}
          <div className="mb-8">
            {isComplete ? (
              <div>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Focus Session Complete! 🎉</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {mode.minutes} minutes of distraction-free focus.
                </p>
              </div>
            ) : isRunning ? (
              <p className="text-sm text-slate-600 dark:text-slate-400">Stay focused. You're doing great. 💪</p>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">Ready to start your focus session?</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            {!isComplete && (
              <>
                {isRunning ? (
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  >
                    <Pause size={18} /> Pause
                  </button>
                ) : (
                  <button
                    onClick={handleStart}
                    className="flex items-center gap-2 px-8 py-3 text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    style={{ backgroundColor: mode.color }}
                  >
                    <Play size={18} /> Start
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all duration-200"
                  aria-label="Reset timer"
                >
                  <RotateCcw size={18} />
                </button>
              </>
            )}
            {isComplete && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                <RotateCcw size={18} /> Start New Session
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-5 border border-primary-100 dark:border-primary-800/40">
          <p className="text-xs font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wide mb-3">Focus Tips</p>
          <ul className="space-y-2">
            {[
              'Put your phone face-down or in another room',
              'Close all non-essential browser tabs',
              'Use noise-cancelling headphones if available',
              'Keep water nearby to stay hydrated',
            ].map(tip => (
              <li key={tip} className="flex items-start gap-2 text-xs text-primary-700 dark:text-primary-300">
                <span className="mt-0.5 text-primary-400">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
