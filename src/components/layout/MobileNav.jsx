import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Bot, Timer, Lightbulb } from 'lucide-react';

const MOBILE_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/ai-coach', label: 'AI Coach', icon: Bot },
  { to: '/focus', label: 'Focus', icon: Timer },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {MOBILE_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 dark:text-slate-500'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
