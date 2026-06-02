import React from 'react';
import { Home, Zap, MessageSquare, Bell, User } from 'lucide-react';

export type TabName = 'home' | 'livescore' | 'forum' | 'notifications' | 'profile';

interface BottomNavBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  notifCount?: number;
}

const tabs: { name: TabName; icon: React.FC<any>; label: string }[] = [
  { name: 'home', icon: Home, label: 'Beranda' },
  { name: 'livescore', icon: Zap, label: 'Live Score' },
  { name: 'forum', icon: MessageSquare, label: 'Forum' },
  { name: 'notifications', icon: Bell, label: 'Notifikasi' },
  { name: 'profile', icon: User, label: 'Profil' },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange, notifCount = 0 }) => {
  return (
    <nav className="mobile-bottom-nav">
      {tabs.map(({ name, icon: Icon, label }) => {
        const isActive = activeTab === name;
        return (
          <button
            key={name}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(name)}
            aria-label={label}
          >
            <span className="mobile-nav-icon-wrap">
              {isActive && <span className="mobile-nav-glow" />}
              <span className="mobile-nav-badge-wrap">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={`mobile-nav-icon ${isActive ? 'active' : ''}`}
                />
                {name === 'notifications' && notifCount > 0 && (
                  <span className="mobile-nav-badge">{notifCount > 9 ? '9+' : notifCount}</span>
                )}
                {name === 'livescore' && (
                  <span className="mobile-live-dot" />
                )}
              </span>
            </span>
            <span className={`mobile-nav-label ${isActive ? 'active' : ''}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
