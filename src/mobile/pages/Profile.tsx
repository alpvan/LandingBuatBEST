import React, { useState } from 'react';
import { User, Trophy, Calendar, Shield, LogIn, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

const DIVISIONS = ['MLBB', 'PUBGM', 'Valorant', 'HOK'];

const Profile: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('MLBB');

  auth.onAuthStateChanged((u) => setUser(u));

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        console.error('Login error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getInitial = (name: string | null) =>
    name ? name.charAt(0).toUpperCase() : '?';

  if (!user) {
    // ── Not logged in ──
    return (
      <div className="flex flex-col h-full">
        <div className="mobile-page-header">
          <div className="mobile-page-title flex items-center gap-2">
            <User size={20} className="text-yellow-400" />
            Profil
          </div>
          <div className="mobile-page-subtitle">Login untuk akses penuh</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
          {/* Illustration */}
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center"
            style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}
          >
            <User size={52} className="text-yellow-500/40" />
          </div>

          <div className="text-center">
            <div className="text-xl font-black text-white mb-2">Belum Login</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Login dengan akun Google untuk melihat profil, status pendaftaran BNEC, dan riwayat event.
            </p>
          </div>

          <button
            className="mobile-btn-gold w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            <LogIn size={17} />
            {loading ? 'Memuat...' : 'Login dengan Google'}
          </button>

          <div className="text-xs text-gray-600 text-center leading-relaxed">
            Dengan login, kamu menyetujui kebijakan privasi Brawijaya Esport.
          </div>
        </div>
      </div>
    );
  }

  // ── Logged in ──
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8">
      {/* Header */}
      <div className="mobile-page-header">
        <div className="mobile-page-title flex items-center gap-2">
          <User size={20} className="text-yellow-400" />
          Profil
        </div>
      </div>

      {/* Avatar & name */}
      <div className="px-6 py-6 flex flex-col items-center gap-3">
        <div className="profile-avatar-ring">
          <div className="profile-avatar-inner">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitial(user.displayName)
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-white">{user.displayName ?? 'Anggota BEST'}</div>
          <div className="text-sm text-gray-400">{user.email}</div>
          <div className="mt-2 flex items-center justify-center gap-1 text-xs font-bold text-yellow-500">
            <Shield size={12} />
            Anggota Aktif
          </div>
        </div>
      </div>

      {/* Division selector */}
      <div className="px-4 mb-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
          Divisi Saya
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DIVISIONS.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className="p-3 rounded-xl text-sm font-bold text-left transition-all"
              style={{
                background: selectedDivision === div ? 'rgba(255,215,0,0.1)' : 'rgba(18,18,28,0.8)',
                border: selectedDivision === div ? '1.5px solid rgba(255,215,0,0.4)' : '1px solid rgba(255,255,255,0.07)',
                color: selectedDivision === div ? '#FFD700' : '#6b7280',
              }}
            >
              {div}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
          Statistik
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Trophy, value: '3', label: 'Turnamen' },
            { icon: Calendar, value: '8', label: 'Event' },
            { icon: Shield, value: '1', label: 'Gelar' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="mobile-stat-card">
              <Icon size={14} className="mx-auto mb-1.5 text-yellow-500/60" />
              <div className="mobile-stat-value text-lg">{value}</div>
              <div className="mobile-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BNEC Registration Status */}
      <div className="px-4 mb-4">
        <div
          className="p-4 rounded-2xl"
          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white mb-0.5">BNEC 2026</div>
              <div className="text-xs text-gray-400">Status Pendaftaran</div>
            </div>
            <div
              className="text-xs font-bold px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
            >
              Belum Daftar
            </div>
          </div>
          <button className="mt-3 mobile-btn-gold w-full text-sm py-2.5">
            Daftar Sekarang
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
          Pengaturan
        </div>
        {[
          { label: 'Edit Profil', icon: Edit2 },
          { label: 'Notifikasi', icon: Trophy },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="w-full flex items-center gap-4 p-4 rounded-2xl mb-2 text-left"
            style={{ background: 'rgba(18,18,28,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
              <Icon size={16} className="text-gray-400" />
            </div>
            <span className="flex-1 text-sm font-medium text-gray-300">{label}</span>
            <ChevronRight size={15} className="text-gray-600" />
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl mt-2 text-left"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
        >
          <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
            <LogOut size={16} className="text-red-400" />
          </div>
          <span className="flex-1 text-sm font-medium text-red-400">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
