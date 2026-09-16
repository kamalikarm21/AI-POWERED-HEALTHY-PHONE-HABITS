import React from 'react';

export function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 ${
        hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : ''
      } ${padding ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
