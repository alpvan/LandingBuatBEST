import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { auth } from './src/firebase';
import { useAuthStore } from './src/store/useAuthStore';

import { LandingPage } from './src/pages/LandingPage';
import { Login } from './src/pages/Login';
import { AdminDashboard } from './src/pages/AdminDashboard';
import { AdminRoute } from './src/components/AdminRoute';
import MobileApp from './src/mobile/MobileApp';

const App: React.FC = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(timeout);
      setUser(user);
      setLoading(false);
    }, (error) => {
      clearTimeout(timeout);
      console.error('Firebase Auth error:', error);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [setUser, setLoading]);

  // ── Render native mobile app when running inside Capacitor ──
  if (Capacitor.isNativePlatform()) {
    return <MobileApp />;
  }

  // ── Render web app ──
  return (
    <Router basename="/brawijaya-esport">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/alvan/login" element={<Login />} />

        <Route path="/alvan" element={<AdminRoute />}>
          <Route index element={<Navigate to="/alvan/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;