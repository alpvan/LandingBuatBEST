import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import BottomNavBar, { TabName } from './components/BottomNavBar';
import MobileHome from './pages/MobileHome';
import LiveScore from './pages/LiveScore';
import Forum from './pages/Forum';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { initPushNotifications } from './services/pushNotificationService';
import './mobile.css';

const MobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      if (Capacitor.isNativePlatform()) {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#050505' });
        await SplashScreen.hide({ fadeOutDuration: 300 });
        await initPushNotifications();
      }
    };
    init();
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <MobileHome onNavigate={setActiveTab} />;
      case 'livescore':
        return <LiveScore />;
      case 'forum':
        return <Forum />;
      case 'notifications':
        return <Notifications onRead={() => setNotifCount(0)} />;
      case 'profile':
        return <Profile />;
      default:
        return <MobileHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="mobile-app-root">
      <div className="mobile-status-bar-spacer" />

      <main className="mobile-page-content">
        {renderPage()}
      </main>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notifCount={notifCount}
      />

      <div className="mobile-bottom-safe-area" />
    </div>
  );
};

export default MobileApp;
