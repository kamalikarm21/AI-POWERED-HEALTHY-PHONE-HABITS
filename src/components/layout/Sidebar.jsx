import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Bot, Timer, Lightbulb, Settings, Shield, Presentation, Zap, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/ai-coach', label: 'AI Coach', icon: Bot },
  { to: '/focus', label: 'Focus Session', icon: Timer },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/privacy', label: 'Privacy', icon: Shield },
];

export function Sidebar() {
  const { demoMode, startPresentationMode, user } = useApp();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 py-6 px-4">
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-2 mb-8 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">FocusAI</span>
        {demoMode && <Badge variant="demo">Demo</Badge>}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`
            }
          >
            <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Presentation Mode */}
      <div className="mt-4 space-y-3">
        <button
          onClick={startPresentationMode}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200"
        >
          <Presentation size={18} />
          Presentation Mode
        </button>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
            <User size={16} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
