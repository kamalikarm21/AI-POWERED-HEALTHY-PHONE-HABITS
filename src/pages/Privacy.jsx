import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Shield, Lock, Eye, Trash2, Cpu, Database, CheckCircle } from 'lucide-react';

const PRIVACY_PRINCIPLES = [
  {
    icon: Cpu,
    title: 'On-Device Processing',
    description: 'All habit analysis and pattern detection happens directly on your device. Your raw usage data never leaves your phone.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
  },
  {
    icon: Database,
    title: 'Data Minimization',
    description: 'We collect only what is necessary to generate insights. No tracking of specific content, websites, or personal messages.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: Lock,
    title: 'Secure Storage',
    description: 'All stored data is encrypted and access-controlled. Your preferences and usage summaries are stored locally using secure browser storage.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/30',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'You can view exactly what data FocusAI stores about you at any time. Nothing is hidden, no data is sold to third parties.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
  },
];

const DATA_COLLECTED = [
  { item: 'App usage duration (aggregated)', collected: true },
  { item: 'Phone pickup frequency', collected: true },
  { item: 'Focus session history', collected: true },
  { item: 'User feedback and preferences', collected: true },
  { item: 'App content or messages', collected: false },
  { item: 'Location data', collected: false },
  { item: 'Personal photos or files', collected: false },
  { item: 'Identity or contact information', collected: false },
];

export default function Privacy() {
  return (
    <AppLayout title="Privacy">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 mb-6 border border-emerald-100 dark:border-emerald-800/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Data. Your Control.</h2>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Built with privacy as a foundation, not an afterthought</p>
          </div>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          FocusAI is designed to help you understand your phone habits without compromising your privacy.
          Your phone habit data should remain yours — private, secure, and under your full control.
        </p>
      </div>

      {/* Principles */}
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Privacy Principles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {PRIVACY_PRINCIPLES.map(({ icon: Icon, title, description, color, bg }) => (
          <div key={title} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* Data collected vs not */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">What We Collect (and What We Don&apos;t)</h3>
        <div className="space-y-2.5">
          {DATA_COLLECTED.map(({ item, collected }) => (
            <div key={item} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                collected ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {collected ? (
                  <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span className="text-red-500 dark:text-red-400 text-xs font-bold">✕</span>
                )}
              </div>
              <span className={`text-sm ${
                collected ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500 line-through'
              }`}>
                {item}
              </span>
              <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                collected
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              }`}>
                {collected ? 'Collected' : 'Never'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delete data */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
            <Trash2 size={16} className="text-red-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Right to Delete</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              You can delete all stored data at any time from Settings → Reset Demo Data.
              This immediately removes all locally stored preferences, feedback, and session history.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
