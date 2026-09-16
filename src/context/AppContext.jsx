import React, { createContext, useContext, useState, useCallback } from 'react';
import { storageService, preferencesStorage } from '../services/storageService';
import { TODAY_STATS, DEMO_USER } from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [demoMode, setDemoMode] = useState(true);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeCount, setNudgeCount] = useState(0);
  const [focusSessionActive, setFocusSessionActive] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [presentationStep, setPresentationStep] = useState(0);
  const [preferences, setPreferences] = useState(() => preferencesStorage.getPreferences());
  const [todayStats, setTodayStats] = useState(() => {
    const saved = storageService.get('today_stats', null);
    return saved || { ...TODAY_STATS };
  });
  const [user] = useState(DEMO_USER);

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      preferencesStorage.savePreferences(updated);
      return updated;
    });
  }, []);

  const resetDemoData = useCallback(() => {
    storageService.clear();
    setTodayStats({ ...TODAY_STATS });
    setPreferences(preferencesStorage.getPreferences());
    setNudgeCount(0);
    setShowNudge(false);
  }, []);

  const triggerNudge = useCallback(() => {
    if (preferences.smartNudges) {
      setNudgeCount(n => n + 1);
      setShowNudge(true);
    }
  }, [preferences.smartNudges]);

  const dismissNudge = useCallback(() => {
    setShowNudge(false);
  }, []);

  const startPresentationMode = useCallback(() => {
    setPresentationMode(true);
    setPresentationStep(0);
  }, []);

  const endPresentationMode = useCallback(() => {
    setPresentationMode(false);
    setPresentationStep(0);
  }, []);

  const nextPresentationStep = useCallback(() => {
    setPresentationStep(prev => prev + 1);
  }, []);

  const value = {
    demoMode,
    setDemoMode,
    showNudge,
    nudgeCount,
    triggerNudge,
    dismissNudge,
    focusSessionActive,
    setFocusSessionActive,
    presentationMode,
    presentationStep,
    startPresentationMode,
    endPresentationMode,
    nextPresentationStep,
    preferences,
    updatePreference,
    todayStats,
    setTodayStats,
    user,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
