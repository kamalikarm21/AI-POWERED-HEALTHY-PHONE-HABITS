import React from 'react';
import { Menu, Sun, Moon, Bell, Database } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';

export function Header({ title, onMenuOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { demoMode, triggerNudge } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuOpen}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
          </div>
          {demoMode && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 dark:bg-violet-900/20 rounded-full">
              <Database size={12} className="text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Demo Mode</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerNudge}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Simulate nudge"
          >
            <Bell size={18} className="text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={18} className="text-slate-600" />
            ) : (
              <Sun size={18} className="text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
