import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

// Pages (lazy-loaded for better perf)
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import AIChatPage from './pages/AIChatPage';
import FocusSession from './pages/FocusSession';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-coach" element={<AIChatPage />} />
            <Route path="/focus" element={<FocusSession />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
