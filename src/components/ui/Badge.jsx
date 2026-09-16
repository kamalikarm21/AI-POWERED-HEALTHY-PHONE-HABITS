import React from 'react';

export function Badge({ children, variant = 'default', size = 'sm' }) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    primary: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300',
    success: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    warning: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    danger: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    demo: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  };
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };
  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
