import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { NudgeCard } from '../nudge/NudgeCard';
import { PresentationModal } from '../PresentationModal';
import { useApp } from '../../context/AppContext';

export function AppLayout({ children, title }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showNudge, dismissNudge, presentationMode } = useApp();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />

      {/* Mobile overlay sidebar */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onMenuOpen={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />

      {/* Nudge */}
      {showNudge && <NudgeCard onDismiss={dismissNudge} />}

      {/* Presentation Modal */}
      {presentationMode && <PresentationModal />}
    </div>
  );
}
