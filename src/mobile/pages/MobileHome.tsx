import React from 'react';
import { Trophy, Users, Calendar, Zap, MessageSquare, ChevronRight, Star, Shield } from 'lucide-react';
import { TabName } from '../components/BottomNavBar';

interface MobileHomeProps {
  onNavigate: (tab: TabName) => void;
}

const GAME_DIVISIONS = [
  { name: 'MLBB', color: '#ff6347', players: '12 Pemain' },
  { name: 'PUBGM', color: '#fbbf24', players: '16 Pemain' },
  { name: 'Valorant', color: '#ef4444', players: '10 Pemain' },
  { name: 'HOK', color: '#8b5cf6', players: '10 Pemain' },
];

const MobileHome: React.FC<MobileHomeProps> = ({ onNavigate }) => {
  return (
    <div className="pb-4">
      {/* ── Hero ── */}
      <div className="mobile-hero-gradient px-5 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-black border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
            <img src="/Logo.png" alt="BEST Logo" className="w-9 h-9 object-contain" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest text-yellow-500/80 uppercase">
              Unit Kegiatan Mahasiswa
            </div>
            <div className="text-base font-black text-white leading-tight">Brawijaya Esport</div>
          </div>
        </div>

        <h1 className="text-3xl font-black leading-none tracking-tight mb-2">
          <span className="text-white">SELAMAT</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
            DATANG!
          </span>
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          Komunitas esport terbesar di Universitas Brawijaya. Kompetisi, komunitas, dan prestasi.
        </p>

        <div className="flex gap-3">
          <button
            className="mobile-btn-gold flex-1"
            onClick={() => onNavigate('livescore')}
          >
            <Zap size={15} />
            Live Score
          </button>
          <button
            className="mobile-btn-ghost flex-1"
            onClick={() => onNavigate('forum')}
          >
            <MessageSquare size={15} />
            Forum
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="mobile-stats-row mt-3">
        {[
          { icon: Trophy, value: '50+', label: 'Prestasi' },
          { icon: Users, value: '800+', label: 'Anggota' },
          { icon: Calendar, value: '20+', label: 'Acara/Tahun' },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="mobile-stat-card">
            <Icon size={16} className="mx-auto mb-2 text-yellow-500/70" />
            <div className="mobile-stat-value">{value}</div>
            <div className="mobile-stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* ── BNEC 2026 Banner ── */}
      <div className="px-4 mb-4">
        <div
          className="rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(109,40,217,0.5) 0%, rgba(76,29,149,0.8) 100%)',
            border: '1px solid rgba(139,92,246,0.4)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="flex items-start gap-2 mb-1">
            <div
              className="text-[9px] font-black tracking-widest border border-purple-500/50 text-purple-400 px-2 py-0.5 rounded-sm"
              style={{ fontFamily: 'Courier New, monospace' }}
            >
              ● NEW
            </div>
          </div>
          <div
            className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-0.5"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            Turnamen Nasional
          </div>
          <div
            className="text-2xl font-black text-white tracking-wider mb-2"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            BNEC <span className="text-purple-300">2026</span>
          </div>
          <p className="text-xs text-purple-300/80 leading-relaxed">
            Brawijaya National Esport Championship — Daftarkan tim kamu sekarang!
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-purple-400">
            Lihat Detail <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* ── Game Divisions ── */}
      <div className="px-4 mb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white">Divisi Game</span>
          <Shield size={14} className="text-yellow-500/60" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {GAME_DIVISIONS.map(({ name, color, players }) => (
            <div
              key={name}
              className="rounded-2xl p-4 relative overflow-hidden cursor-pointer"
              style={{
                background: `rgba(18,18,28,0.9)`,
                border: `1px solid ${color}22`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-20"
                style={{ background: color }}
              />
              <div
                className="text-base font-black mb-1"
                style={{ color }}
              >
                {name}
              </div>
              <div className="text-[11px] text-gray-500">{players}</div>
              <div className="mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} fill={i < 4 ? color : 'none'} color={color} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="px-4 mt-4">
        <div className="text-sm font-bold text-white mb-3">Aksi Cepat</div>
        <div className="space-y-2">
          {[
            { label: 'Lihat Live Score', desc: 'Update skor real-time', tab: 'livescore' as TabName, icon: Zap, color: '#22c55e' },
            { label: 'Gabung Forum', desc: 'Diskusi dengan anggota', tab: 'forum' as TabName, icon: MessageSquare, color: '#FFD700' },
            { label: 'Lihat Profil', desc: 'Status & pendaftaran kamu', tab: 'profile' as TabName, icon: Users, color: '#8b5cf6' },
          ].map(({ label, desc, tab, icon: Icon, color }) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left"
              style={{
                background: 'rgba(18,18,28,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}33` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
