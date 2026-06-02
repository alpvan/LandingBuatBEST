import React, { useState } from 'react';
import { Bell, Trophy, Zap, Calendar, CheckCheck } from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'livescore' | 'event' | 'achievement' | 'forum';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

interface NotificationsProps {
  onRead: () => void;
}

const DEMO_NOTIFS: NotificationItem[] = [
  {
    id: '1',
    type: 'livescore',
    title: '⚡ BEST Alfa Menang!',
    body: 'BEST Alfa vs UGM Eagles — Skor 2:1 di Semifinal MLBB',
    time: '5 menit lalu',
    read: false,
  },
  {
    id: '2',
    type: 'event',
    title: '🎮 BNEC 2026 Dibuka!',
    body: 'Pendaftaran BNEC 2026 resmi dibuka. Daftarkan tim kamu sekarang.',
    time: '1 jam lalu',
    read: false,
  },
  {
    id: '3',
    type: 'achievement',
    title: '🏆 Prestasi Baru!',
    body: 'BEST berhasil meraih Juara 2 di Turnamen PUBGM Nasional.',
    time: '2 hari lalu',
    read: true,
  },
  {
    id: '4',
    type: 'forum',
    title: '💬 Balas Baru di Forum',
    body: 'Aldi Firmansyah membalas postingan kamu di forum MLBB.',
    time: '3 hari lalu',
    read: true,
  },
  {
    id: '5',
    type: 'livescore',
    title: '⚡ Pertandingan Akan Segera Dimulai',
    body: 'BEST Predator vs ITS Thunder — Valorant Quarterfinal mulai 30 menit lagi.',
    time: '3 hari lalu',
    read: true,
  },
];

const NOTIF_ICONS = {
  livescore: { icon: Zap, color: '#22c55e' },
  event: { icon: Calendar, color: '#8b5cf6' },
  achievement: { icon: Trophy, color: '#FFD700' },
  forum: { icon: Bell, color: '#3b82f6' },
};

const Notifications: React.FC<NotificationsProps> = ({ onRead }) => {
  const [notifs, setNotifs] = useState<NotificationItem[]>(DEMO_NOTIFS);

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    onRead();
  };

  const markRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mobile-page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="mobile-page-title flex items-center gap-2">
              <Bell size={20} className="text-yellow-400" />
              Notifikasi
              {unreadCount > 0 && (
                <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="mobile-page-subtitle">Update terbaru untukmu</div>
          </div>
          {unreadCount > 0 && (
            <button
              className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold"
              onClick={markAllRead}
            >
              <CheckCheck size={14} />
              Tandai Semua
            </button>
          )}
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto">
        {notifs.length === 0 ? (
          <div className="mobile-empty">
            <div className="mobile-empty-icon">🔔</div>
            <div className="mobile-empty-text">Belum ada notifikasi</div>
          </div>
        ) : (
          notifs.map((notif) => {
            const { icon: Icon, color } = NOTIF_ICONS[notif.type];
            return (
              <button
                key={notif.id}
                className={`notif-item w-full text-left ${!notif.read ? 'unread' : ''}`}
                onClick={() => markRead(notif.id)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-sm font-bold leading-tight ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                      {notif.title}
                    </span>
                    {!notif.read && <span className="notif-dot flex-shrink-0" />}
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${notif.read ? 'text-gray-600' : 'text-gray-400'}`}>
                    {notif.body}
                  </p>
                  <span className="text-[10px] text-gray-600 mt-1 block">{notif.time}</span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
