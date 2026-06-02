import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy, Calendar, Users, ChevronRight, Star, Zap,
  Target, Swords, Clock, AlertCircle
} from 'lucide-react';
import Reveal from './Reveal';
import GlitchReveal from './GlitchReveal';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Game {
  title: string;
  short: string;
  tag: string;
  teams: string;
  format: string;
  img: string | null;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
  pixelColor: string;
}

// ─── Countdown ─────────────────────────────────────────────────────────────────
const TARGET_DATE = new Date('2026-08-15T09:00:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Pixel Digit ───────────────────────────────────────────────────────────────
const PixelDigit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prev !== value) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(value); setFlip(false); }, 150);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const str = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <div className="absolute inset-0 bnec-pixel-bg rounded-sm opacity-30" />
        <div
          className={`relative px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-sm border border-purple-500/60
            bg-[#0d0020]/90 backdrop-blur-sm min-w-[50px] sm:min-w-[66px] md:min-w-[78px]
            shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-150
            ${flip ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
        >
          <span
            className="bnec-pixel-font text-xl sm:text-3xl md:text-4xl font-black text-purple-200
              drop-shadow-[0_0_8px_rgba(168,85,247,0.9)] block text-center tabular-nums"
          >
            {str}
          </span>
        </div>
        <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-purple-500" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-purple-500" />
        <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-purple-500" />
        <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-purple-500" />
      </div>
      <span className="bnec-pixel-font text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500">
        {label}
      </span>
    </div>
  );
};

const TimeSep: React.FC = () => (
  <div className="flex flex-col justify-center gap-1.5 mb-5">
    <span className="block w-1.5 h-1.5 bg-purple-400 rounded-none animate-pulse" />
    <span className="block w-1.5 h-1.5 bg-purple-400 rounded-none animate-pulse" style={{ animationDelay: '0.5s' }} />
  </div>
);

// ─── Game data ─────────────────────────────────────────────────────────────────
const GAMES: Game[] = [
  {
    title: 'Honor of Kings',   short: 'HOK',   tag: 'MOBA',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-amber-500', accentTo: 'to-yellow-300',
    glowColor: 'rgba(245,158,11,0.35)', pixelColor: '#F59E0B',
  },
  {
    title: 'E-Football',       short: 'EFF',   tag: 'SPORTS SIM',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-emerald-500', accentTo: 'to-green-300',
    glowColor: 'rgba(16,185,129,0.35)', pixelColor: '#10B981',
  },
  {
    title: 'Valorant',         short: 'VAL',   tag: 'TACTICAL FPS',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-red-600', accentTo: 'to-rose-400',
    glowColor: 'rgba(239,68,68,0.35)', pixelColor: '#EF4444',
  },
  {
    title: 'PUBG Mobile',      short: 'PUBGM', tag: 'BATTLE ROYALE',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-orange-600', accentTo: 'to-amber-400',
    glowColor: 'rgba(234,88,12,0.35)', pixelColor: '#EA580C',
  },
  {
    title: 'Tekken',           short: 'TKN',   tag: 'FIGHTING',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-blue-700', accentTo: 'to-blue-400',
    glowColor: 'rgba(29,78,216,0.35)', pixelColor: '#1D4ED8',
  },
  {
    title: 'Mobile Legends',   short: 'MLBB',  tag: 'MOBA',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-sky-500', accentTo: 'to-cyan-300',
    glowColor: 'rgba(14,165,233,0.35)', pixelColor: '#0EA5E9',
  },
  {
    title: 'Free Fire',        short: 'FF',    tag: 'BATTLE ROYALE',
    teams: 'TBA', format: 'TBA',
    img: null,
    accentFrom: 'from-orange-500', accentTo: 'to-yellow-400',
    glowColor: 'rgba(249,115,22,0.35)', pixelColor: '#F97316',
  },
];

// ─── Timeline ──────────────────────────────────────────────────────────────────
const TIMELINE = [
  { num: '01', label: 'Pendaftaran',  date: 'Coming Soon', desc: 'Buka pendaftaran tim dari seluruh Indonesia', icon: Users },
  { num: '02', label: 'Penyisihan',   date: 'Coming Soon', desc: 'Babak penyisihan online per divisi game',    icon: Target },
  { num: '03', label: 'Semifinal',    date: 'Coming Soon', desc: 'Top tim terbaik berebut tiket Grand Final',   icon: Swords },
  { num: '04', label: 'Grand Final',  date: 'Coming Soon', desc: 'Perebutan gelar juara nasional & hadiah utama', icon: Trophy },
];

// ─── TBA Placeholder ───────────────────────────────────────────────────────────
const TBABadge: React.FC<{ small?: boolean }> = ({ small }) => (
  <span
    className={`bnec-pixel-font inline-flex items-center gap-1 border border-purple-500/40 bg-purple-950/60
      text-purple-400 uppercase tracking-widest rounded-sm
      ${small ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-1'}`}
  >
    <AlertCircle className={small ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
    TBA
  </span>
);

// ─── Logo Placeholder ──────────────────────────────────────────────────────────
const GameLogoPlaceholder: React.FC<{ short: string; accentFrom: string; accentTo: string; pixelColor: string }> = ({
  short, accentFrom, accentTo, pixelColor,
}) => (
  <div className="relative w-14 h-14 flex items-center justify-center">
    <div className={`absolute inset-0 bg-gradient-to-br ${accentFrom} ${accentTo} opacity-20 blur-lg rounded-sm`} />
    <div className="relative w-14 h-14 border-2 border-dashed border-purple-600/50 rounded-sm flex flex-col items-center justify-center gap-0.5 bg-[#0d0020]/80">
      <span
        className="bnec-pixel-font font-black text-[10px] leading-none"
        style={{ color: pixelColor, textShadow: `0 0 8px ${pixelColor}` }}
      >
        {short}
      </span>
      <span className="bnec-pixel-font text-[7px] text-purple-600 tracking-widest">SOON</span>
    </div>
    <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5" style={{ background: pixelColor }} />
    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5" style={{ background: pixelColor }} />
    <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5" style={{ background: pixelColor }} />
    <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5" style={{ background: pixelColor }} />
  </div>
);

// ─── Pixel Bg ─────────────────────────────────────────────────────────────────
const SceneBg: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: [2, 3, 4, 2, 3][i % 5],
    top: `${(i * 37 + 13) % 100}%`,
    left: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.4) % 6}s`,
    dur: `${3 + (i * 0.3) % 4}s`,
    color: i % 4 === 0 ? '#c084fc' : i % 4 === 1 ? '#7c3aed' : i % 4 === 2 ? '#a855f7' : '#ddd6fe',
    opacity: 0.15 + (i % 5) * 0.07,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060010] via-[#0b0018] to-[#040008]" />
      {/* Large glows */}
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-900/20 blur-[200px]" />
      <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-violet-800/15 blur-[160px] animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[140px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
      {/* CRT Scanlines */}
      <div className="absolute inset-0 bnec-scanlines opacity-[0.035]" />
      {/* Dot Grid */}
      <div className="absolute inset-0 bnec-dot-grid opacity-[0.05]" />
      {/* Pixel particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-pulse"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left, animationDelay: p.delay, animationDuration: p.dur, opacity: p.opacity, background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
        />
      ))}
      {/* Top / Bottom fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

// ─── Section label pill ────────────────────────────────────────────────────────
const SectionPill: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-purple-500/40 bg-purple-950/50 mb-6">
    <span className="text-purple-400">{icon}</span>
    <span className="bnec-pixel-font text-purple-300 text-[10px] sm:text-xs uppercase tracking-[0.2em]">{label}</span>
  </div>
);

// ─── Section heading ───────────────────────────────────────────────────────────
const SectionHeading: React.FC<{ plain: string; accent: string }> = ({ plain, accent }) => (
  <h3 className="bnec-pixel-font text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight">
    {plain} <span className="bnec-title-gradient">{accent}</span>
  </h3>
);

// ─── Pixel corner decorator ────────────────────────────────────────────────────
const Corners: React.FC<{ color?: string; size?: number }> = ({ color = 'border-purple-500/50', size = 3 }) => (
  <>
    <span className={`absolute top-0 left-0 w-${size} h-${size} border-t-2 border-l-2 ${color}`} />
    <span className={`absolute top-0 right-0 w-${size} h-${size} border-t-2 border-r-2 ${color}`} />
    <span className={`absolute bottom-0 left-0 w-${size} h-${size} border-b-2 border-l-2 ${color}`} />
    <span className={`absolute bottom-0 right-0 w-${size} h-${size} border-b-2 border-r-2 ${color}`} />
  </>
);

// ─── Empty Logo Box ───────────────────────────────────────────────────────────
const EmptyLogoBox: React.FC<{ pixelColor: string }> = ({ pixelColor }) => (
  <div className="relative w-14 h-14">
    {/* Subtle color glow behind */}
    <div
      className="absolute inset-0 blur-lg opacity-20 rounded-sm"
      style={{ background: pixelColor }}
    />
    {/* Main empty box */}
    <div
      className="relative w-14 h-14 border border-dashed rounded-sm bg-[#0d0020]/80"
      style={{ borderColor: `${pixelColor}60` }}
    />
    {/* Pixel corner accents */}
    <span className="absolute -top-px -left-px w-2 h-2" style={{ background: pixelColor, opacity: 0.7 }} />
    <span className="absolute -top-px -right-px w-2 h-2" style={{ background: pixelColor, opacity: 0.7 }} />
    <span className="absolute -bottom-px -left-px w-2 h-2" style={{ background: pixelColor, opacity: 0.7 }} />
    <span className="absolute -bottom-px -right-px w-2 h-2" style={{ background: pixelColor, opacity: 0.7 }} />
  </div>
);
const GameCard: React.FC<{ game: Game; index: number; isActive: boolean; onClick: () => void }> = ({
  game, index, isActive, onClick,
}) => {

  return (
    <Reveal delay={index * 60}>
      <div
        onClick={onClick}
        className={`relative group cursor-pointer rounded-sm border transition-all duration-300 p-4 sm:p-5 overflow-hidden select-none
          ${isActive
            ? 'border-purple-400/80 bg-purple-900/40 -translate-y-1'
            : 'border-purple-900/50 bg-[#0d0020]/60 hover:border-purple-500/60 hover:bg-purple-950/50 hover:-translate-y-1'
          }`}
        style={{ boxShadow: isActive ? `0 0 30px ${game.glowColor}, 0 0 60px ${game.glowColor}40` : undefined }}
      >
        <Corners />

        {/* Game glow bg */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% -10%, ${game.glowColor} 0%, transparent 70%)` }}
        />

        {/* Index tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="bnec-pixel-font text-[9px] text-purple-700 font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="bnec-pixel-font text-[9px] font-bold px-1.5 py-0.5 rounded-sm border"
            style={{ color: game.pixelColor, borderColor: `${game.pixelColor}40`, background: `${game.pixelColor}12` }}
          >
            {game.tag}
          </span>
        </div>

        {/* Logo — empty box placeholder */}
        <div className="flex justify-center mb-4">
          <div className="group-hover:scale-110 transition-transform duration-300">
            <EmptyLogoBox pixelColor={game.pixelColor} />
          </div>
        </div>

        {/* Title */}
        <h4 className="bnec-pixel-font text-sm font-black text-white text-center mb-0.5 group-hover:text-purple-200 transition-colors leading-tight">
          {game.title}
        </h4>
        <p className="bnec-pixel-font text-[10px] text-purple-500 text-center mb-3">{game.short}</p>

        {/* Divider */}
        <div className="border-t border-purple-900/60 pt-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-gray-600 flex items-center gap-1">
              <Users className="w-2.5 h-2.5" /> Kuota
            </span>
            <TBABadge small />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-gray-600 flex items-center gap-1">
              <Trophy className="w-2.5 h-2.5" /> Hadiah
            </span>
            <TBABadge small />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-gray-600 flex items-center gap-1">
              <Target className="w-2.5 h-2.5" /> Format
            </span>
            <TBABadge small />
          </div>
        </div>

        {isActive && (
          <div className="mt-3 pt-2 border-t border-purple-800/40 text-center">
            <span className="bnec-pixel-font text-[9px] text-purple-500 animate-pulse tracking-widest">▶ SELECTED</span>
          </div>
        )}
      </div>
    </Reveal>
  );
};

// ─── Sponsor Slot ──────────────────────────────────────────────────────────────
const TIER_CONFIG = {
  title:  { border: 'border-yellow-500/40',  bg: 'bg-yellow-950/10',  glow: 'rgba(234,179,8,0.15)',   label: 'TITLE SPONSOR',  accent: '#EAB308', w: 'w-full max-w-md', h: 'h-28 sm:h-36' },
  gold:   { border: 'border-amber-500/35',   bg: 'bg-amber-950/10',   glow: 'rgba(245,158,11,0.12)',  label: 'GOLD SPONSOR',   accent: '#F59E0B', w: 'w-full',          h: 'h-20 sm:h-24' },
  silver: { border: 'border-gray-500/30',    bg: 'bg-gray-950/10',    glow: 'rgba(156,163,175,0.10)', label: 'SILVER SPONSOR', accent: '#9CA3AF', w: 'w-full',          h: 'h-16 sm:h-20' },
  media:  { border: 'border-purple-700/30',  bg: 'bg-purple-950/10',  glow: 'rgba(124,58,237,0.10)',  label: 'MEDIA PARTNER',  accent: '#7C3AED', w: 'w-full',          h: 'h-12 sm:h-14' },
} as const;

type SponsorTier = keyof typeof TIER_CONFIG;

const SponsorSlot: React.FC<{ tier: SponsorTier; index: number }> = ({ tier, index }) => {
  const cfg = TIER_CONFIG[tier];
  return (
    <div
      className={`relative group cursor-default transition-all duration-300
        rounded-sm border border-dashed ${cfg.border} ${cfg.bg}
        ${cfg.w} ${cfg.h} flex items-center justify-center
        hover:scale-[1.02] hover:border-opacity-60`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 50%, ${cfg.glow} 0%, transparent 70%)` }}
      />

      {/* Pixel corner dots */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 opacity-50" style={{ background: cfg.accent }} />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 opacity-50" style={{ background: cfg.accent }} />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 opacity-50" style={{ background: cfg.accent }} />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 opacity-50" style={{ background: cfg.accent }} />

      {/* Slot number watermark */}
      <span
        className="absolute bottom-1.5 right-2 bnec-pixel-font text-[8px] opacity-20"
        style={{ color: cfg.accent }}
      >
        #{String(index + 1).padStart(2, '0')}
      </span>

      {/* Center content */}
      <div className="flex flex-col items-center gap-1.5 relative z-10">
        {/* Blinking open dot */}
        <span
          className="w-2 h-2 rounded-full animate-ping opacity-50"
          style={{ background: cfg.accent }}
        />
        <span
          className="bnec-pixel-font font-bold tracking-widest uppercase opacity-30 group-hover:opacity-60 transition-opacity"
          style={{
            color: cfg.accent,
            fontSize: tier === 'title' ? '11px' : tier === 'media' ? '7px' : '9px',
          }}
        >
          {cfg.label}
        </span>
        {tier !== 'media' && (
          <span
            className="bnec-pixel-font text-[7px] tracking-[0.2em] uppercase opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ color: cfg.accent }}
          >
            AVAILABLE
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const BnecSection: React.FC = () => {
  const countdown = useCountdown(TARGET_DATE);
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (logoRef.current?.complete) setLogoLoaded(true);
  }, []);

  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bnec" className="relative overflow-hidden" style={{ scrollMarginTop: '80px' }}>
      <SceneBg />

      {/* ════════════════ HERO BANNER ════════════════ */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-24 md:pt-24 md:pb-20">

        {/* Top eyebrow badge */}
        <GlitchReveal>
          <Reveal>
            <div className="bnec-pixel-badge inline-flex items-center gap-2 px-4 sm:px-6 py-2 mb-8
              border border-purple-500/50 bg-purple-950/70 backdrop-blur-sm">
              <span className="w-2 h-2 bg-purple-400 animate-ping" />
              <span className="bnec-pixel-font text-purple-300 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em]">
                Turnamen Esport Nasional Resmi
              </span>
              <span className="w-2 h-2 bg-purple-400 animate-ping" style={{ animationDelay: '0.6s' }} />
            </div>
          </Reveal>
        </GlitchReveal>

        {/* BNEC Logo */}
        <Reveal delay={80}>
          <div className="relative mb-6 flex items-center justify-center">
            {/* Multi-layer glow */}
            <div className="absolute w-72 h-72 rounded-full bg-purple-700/20 blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute w-48 h-48 rounded-full bg-violet-600/25 blur-[50px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

            <img
              ref={logoRef}
              src="./bnec-logo.png"
              alt="BNEC Logo"
              onLoad={() => setLogoLoaded(true)}
              className={`relative z-10 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 object-contain
                drop-shadow-[0_0_60px_rgba(168,85,247,0.7)]
                transition-all duration-700 ${logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.8)) drop-shadow(0 0 60px rgba(124,58,237,0.5))' }}
            />

            {/* Rotating ring */}
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border border-dashed border-purple-700/30"
              style={{ animation: 'spin 20s linear infinite' }} />
            <div className="absolute w-44 h-44 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full border border-dotted border-purple-600/20"
              style={{ animation: 'spin 14s linear infinite reverse' }} />

            {/* Orbiting pixel dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-purple-400 rounded-none"
                style={{
                  transform: `rotate(${deg}deg) translateX(140px) rotate(-${deg}deg)`,
                  animation: `spin ${20}s linear infinite`,
                  animationDelay: `${-i * (20 / 6)}s`,
                  opacity: 0.5 + (i % 3) * 0.15,
                  boxShadow: '0 0 6px rgba(168,85,247,0.8)',
                }}
              />
            ))}
          </div>
        </Reveal>

        {/* Main title */}
        <Reveal delay={150}>
          <div className="text-center mb-2 px-2">
            <h1 className="font-black uppercase leading-none">
              <span
                className="bnec-pixel-font block text-4xl sm:text-5xl md:text-7xl lg:text-8xl
                  text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                BRAWIJAYA
              </span>
              <span
                className="bnec-pixel-font block text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                  bnec-title-gradient tracking-widest my-1"
              >
                NATIONAL
              </span>
              <span
                className="bnec-pixel-font block text-4xl sm:text-5xl md:text-7xl lg:text-8xl
                  text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                ESPORT
              </span>
              <span
                className="bnec-pixel-font block text-xl sm:text-2xl md:text-3xl lg:text-4xl
                  tracking-[0.3em] sm:tracking-[0.5em] text-purple-300 mt-2"
                style={{ textShadow: '0 0 20px rgba(192,132,252,0.6)' }}
              >
                CHAMPIONSHIP
              </span>
            </h1>
          </div>
        </Reveal>

        {/* Year */}
        <Reveal delay={200}>
          <div className="flex items-center gap-3 mb-8 mt-2">
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-purple-500/60" />
            <span className="bnec-pixel-font text-xs sm:text-sm text-purple-500 tracking-[0.5em] uppercase">— 2026 —</span>
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-purple-500/60" />
          </div>
        </Reveal>

        {/* Short desc */}
        <Reveal delay={240}>
          <p className="text-center text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mb-8 px-4">
            Kompetisi esport paling bergengsi oleh{' '}
            <span className="text-purple-300 font-bold">Brawijaya Esport</span>
            {' '}— mempertemukan tim terbaik se-Indonesia dalam{' '}
            <span className="text-purple-300 font-bold">7 divisi game</span>.
          </p>
        </Reveal>

        {/* Prize Total — TBA */}
        <Reveal delay={270}>
          <div className="relative group cursor-default mb-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-700 via-violet-500 to-purple-700
              rounded-sm blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse" />
            <div className="relative px-8 sm:px-14 py-4 sm:py-5 bg-[#0a0018] rounded-sm border border-purple-500/50 text-center">
              <Corners color="border-purple-400/60" size={3} />
              <div className="bnec-pixel-font text-[9px] sm:text-[11px] text-purple-500 tracking-[0.3em] uppercase mb-2">
                Total Prize Pool
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="bnec-pixel-font text-2xl sm:text-3xl md:text-4xl font-black text-purple-400 tracking-widest">
                  TO BE ANNOUNCED
                </span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="w-1 h-1 bg-purple-600 animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-1 bg-purple-600 animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-1 h-1 bg-purple-600 animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Countdown */}
        <Reveal delay={300}>
          <div className="text-center mb-10">
            <p className="bnec-pixel-font text-[9px] sm:text-[10px] text-purple-600 uppercase tracking-[0.35em] mb-4">
              ⏱ Grand Final Countdown
            </p>
            <div className="flex items-end gap-2 sm:gap-3 justify-center">
              <PixelDigit value={countdown.days}    label="Hari" />
              <TimeSep />
              <PixelDigit value={countdown.hours}   label="Jam" />
              <TimeSep />
              <PixelDigit value={countdown.minutes} label="Menit" />
              <TimeSep />
              <PixelDigit value={countdown.seconds} label="Detik" />
            </div>
          </div>
        </Reveal>

        {/* CTA row */}
        <Reveal delay={330}>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            {/* Primary */}
            <button
              onClick={scrollToEvents}
              className="bnec-pixel-font group relative overflow-hidden rounded-sm font-black uppercase
                tracking-widest text-sm px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-violet-600
                group-hover:from-purple-600 group-hover:to-violet-500 transition-all duration-300" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 100%)' }} />
              <Corners color="border-white/20" size={2} />
              <span className="relative flex items-center gap-2 text-white">
                <Zap className="w-4 h-4" />
                Daftar Sekarang
              </span>
            </button>

            {/* Secondary */}
            <button
              onClick={() => document.getElementById('bnec-divisions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bnec-pixel-font group rounded-sm font-black uppercase tracking-widest text-sm
                px-8 sm:px-10 py-3.5 sm:py-4 border border-purple-500/50 text-purple-300
                bg-purple-950/30 hover:bg-purple-900/50 hover:border-purple-400
                hover:text-purple-200 transition-all duration-300 hover:scale-105
                flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-purple-500 group-hover:text-purple-300 transition-colors fill-current" />
              Lihat Divisi
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </Reveal>

        {/* Scroll arrow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-purple-600/70" />
          <div className="w-2 h-2 border-r-2 border-b-2 border-purple-500 rotate-45 -mt-2" />
        </div>
      </div>

      {/* ════════════════ GAME DIVISIONS ════════════════ */}
      <div id="bnec-divisions" className="relative z-10 px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <Reveal>
            <div className="text-center mb-12">
              <SectionPill icon={<Swords className="w-4 h-4" />} label="Divisi Pertandingan" />
              <SectionHeading plain="7 Game" accent="Kategori" />
              <p className="mt-3 text-xs sm:text-sm text-gray-500 bnec-pixel-font tracking-widest">
                Detail & hadiah tiap divisi akan diumumkan segera
              </p>
            </div>
          </Reveal>

          {/* Game grid — 7 cards: 4 top row, 3 bottom centered */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
            {GAMES.slice(0, 4).map((game, i) => (
              <GameCard
                key={game.short}
                game={game}
                index={i}
                isActive={activeGame === i}
                onClick={() => setActiveGame(activeGame === i ? null : i)}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {GAMES.slice(4).map((game, i) => (
              <GameCard
                key={game.short}
                game={game}
                index={i + 4}
                isActive={activeGame === i + 4}
                onClick={() => setActiveGame(activeGame === i + 4 ? null : i + 4)}
              />
            ))}
          </div>

          {/* Coming soon info bar */}
          <Reveal delay={100}>
            <div className="mt-8 relative px-5 sm:px-8 py-4 rounded-sm border border-purple-800/40 bg-purple-950/20 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
              <Corners color="border-purple-700/40" size={2} />
              <AlertCircle className="w-5 h-5 text-purple-500 shrink-0" />
              <p className="text-center sm:text-left text-xs sm:text-sm text-gray-500 leading-relaxed">
                Detail teknis (kuota tim, format pertandingan, dan hadiah) akan diumumkan secara resmi.
                Pantau terus media sosial kami!
              </p>
            </div>
          </Reveal>

          {/* ════════════════ PRIZE ════════════════ */}
          <div className="mt-24">
            <Reveal>
              <div className="text-center mb-12">
                <SectionPill icon={<Trophy className="w-4 h-4" />} label="Prize Pool" />
                <SectionHeading plain="Hadiah" accent="Turnamen" />
              </div>
            </Reveal>

            {/* TBA Prize big card */}
            <Reveal delay={100}>
              <div className="relative max-w-2xl mx-auto group cursor-default">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-800/40 via-violet-700/30 to-purple-800/40
                  rounded-sm blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative rounded-sm border border-purple-700/50 bg-[#080015] overflow-hidden">
                  <Corners color="border-purple-500/60" size={4} />
                  {/* Top bar */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-purple-900/50 bg-purple-950/40">
                    <span className="bnec-pixel-font text-[10px] text-purple-600 tracking-widest uppercase">
                      BNEC 2026 // prize_pool.exe
                    </span>
                    <div className="ml-auto flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="px-8 sm:px-14 py-12 sm:py-16 text-center">
                    {/* Big glowing TBA */}
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 text-purple-500/20 blur-2xl bnec-pixel-font text-6xl sm:text-8xl font-black select-none">
                        ???
                      </div>
                      <div className="relative bnec-pixel-font text-5xl sm:text-7xl md:text-8xl font-black tracking-widest"
                        style={{
                          background: 'linear-gradient(180deg, #c084fc 0%, #7c3aed 50%, #4c1d95 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: 'none',
                          filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
                        }}
                      >
                        TBA
                      </div>
                    </div>
                    <p className="bnec-pixel-font text-xs sm:text-sm text-purple-500 tracking-[0.25em] mb-4">
                      TO BE ANNOUNCED SOON
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-purple-800/50 bg-purple-950/40">
                      <span className="w-1.5 h-1.5 bg-purple-500 animate-ping" />
                      <span className="bnec-pixel-font text-[10px] text-purple-400 tracking-widest">
                        Hadiah per divisi akan diumumkan segera
                      </span>
                    </div>

                    {/* Scanning line animation */}
                    <div className="mt-8 relative h-px bg-purple-900/40 overflow-hidden rounded-full">
                      <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                        style={{ animation: 'bnec-scan 2s ease-in-out infinite' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════════════════ TIMELINE ════════════════ */}
          <div className="mt-24">
            <Reveal>
              <div className="text-center mb-12">
                <SectionPill icon={<Calendar className="w-4 h-4" />} label="Jadwal Kompetisi" />
                <SectionHeading plain="Alur" accent="Turnamen" />
              </div>
            </Reveal>

            <div className="relative max-w-2xl mx-auto">
              {/* Vertical connector */}
              <div className="absolute left-7 sm:left-9 top-8 bottom-8 w-px
                bg-gradient-to-b from-purple-600/80 via-purple-700/40 to-transparent" />

              <div className="space-y-5">
                {TIMELINE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={i} delay={i * 80} direction="left">
                      <div className="relative flex items-start gap-4 sm:gap-6 pl-16 sm:pl-20 group">
                        {/* Phase box */}
                        <div className="absolute left-0 w-14 h-14 sm:w-18 sm:h-18 rounded-sm border border-purple-700/60
                          bg-[#0a0018] flex flex-col items-center justify-center gap-0.5
                          group-hover:border-purple-500/80 group-hover:bg-purple-950/60 transition-all duration-300"
                          style={{ minWidth: 56, minHeight: 56, width: 56, height: 56 }}
                        >
                          <Corners color="border-purple-600/40" size={2} />
                          <Icon className="w-4 h-4 text-purple-500 group-hover:text-purple-300 transition-colors" />
                          <span className="bnec-pixel-font text-[9px] font-bold text-purple-700 group-hover:text-purple-500 transition-colors">
                            {item.num}
                          </span>
                        </div>

                        {/* Card */}
                        <div className="flex-1 p-4 sm:p-5 rounded-sm border border-purple-900/40 bg-purple-950/15
                          group-hover:border-purple-600/50 group-hover:bg-purple-950/30 transition-all duration-300">
                          <Corners color="border-purple-800/40" size={2} />
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                            <h4 className="bnec-pixel-font text-sm sm:text-base font-black text-white
                              group-hover:text-purple-200 transition-colors">
                              {item.label}
                            </h4>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm border border-purple-800/50
                              bg-purple-950/40 self-start sm:self-auto">
                              <Clock className="w-2.5 h-2.5 text-purple-600" />
                              <span className="bnec-pixel-font text-[9px] text-purple-500 tracking-widest">
                                {item.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ════════════════ SPONSORS ════════════════ */}
          <div className="mt-24">
            <Reveal>
              <div className="text-center mb-12">
                <SectionPill icon={<Star className="w-4 h-4" />} label="Sponsor & Partner" />
                <SectionHeading plain="Didukung" accent="Oleh" />
                <p className="mt-3 text-xs sm:text-sm text-gray-500 bnec-pixel-font tracking-widest">
                  Slot sponsor masih tersedia — hubungi kami untuk berkolaborasi
                </p>
              </div>
            </Reveal>

            {/* Tier: Title Sponsor */}
            <Reveal delay={50}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-yellow-600/40" />
                  <span className="bnec-pixel-font text-[9px] sm:text-[10px] text-yellow-600/80 tracking-[0.3em] uppercase">
                    ★ Title Sponsor
                  </span>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-yellow-600/40" />
                </div>
                <div className="flex justify-center">
                  <SponsorSlot tier="title" index={0} />
                </div>
              </div>
            </Reveal>

            {/* Tier: Gold Sponsor */}
            <Reveal delay={80}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-amber-500/40" />
                  <span className="bnec-pixel-font text-[9px] sm:text-[10px] text-amber-500/80 tracking-[0.3em] uppercase">
                    ◆ Gold Sponsor
                  </span>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-amber-500/40" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
                  {[0, 1, 2].map(i => <SponsorSlot key={i} tier="gold" index={i} />)}
                </div>
              </div>
            </Reveal>

            {/* Tier: Silver Sponsor */}
            <Reveal delay={110}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gray-400/30" />
                  <span className="bnec-pixel-font text-[9px] sm:text-[10px] text-gray-500/80 tracking-[0.3em] uppercase">
                    ● Silver Sponsor
                  </span>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gray-400/30" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
                  {[0, 1, 2, 3].map(i => <SponsorSlot key={i} tier="silver" index={i} />)}
                </div>
              </div>
            </Reveal>

            {/* Partner row */}
            <Reveal delay={140}>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-purple-700/30" />
                  <span className="bnec-pixel-font text-[9px] sm:text-[10px] text-purple-700/80 tracking-[0.3em] uppercase">
                    ○ Media Partner
                  </span>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-purple-700/30" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto">
                  {[0, 1, 2, 3, 4].map(i => <SponsorSlot key={i} tier="media" index={i} />)}
                </div>
              </div>
            </Reveal>

            {/* Contact CTA */}
            <Reveal delay={160}>
              <div className="relative max-w-xl mx-auto px-6 sm:px-10 py-6 rounded-sm border border-purple-800/40
                bg-purple-950/20 text-center">
                <Corners color="border-purple-700/50" size={3} />
                <p className="bnec-pixel-font text-[10px] sm:text-xs text-purple-500 tracking-widest uppercase mb-3">
                  Tertarik menjadi sponsor?
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  Dapatkan eksposur ke ribuan penggemar esport nasional.
                  Hubungi tim kami untuk paket sponsorship.
                </p>
                <a
                  href="#contact"
                  className="bnec-pixel-font inline-flex items-center gap-2 px-5 py-2.5 rounded-sm
                    border border-purple-600/60 bg-purple-950/60 text-purple-300 text-xs font-bold
                    uppercase tracking-widest hover:bg-purple-900/60 hover:border-purple-500
                    hover:text-purple-200 transition-all duration-300 hover:scale-105"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Hubungi Kami
                </a>
              </div>
            </Reveal>
          </div>

          {/* ════════════════ BOTTOM CTA ════════════════ */}
          <Reveal delay={100}>
            <div className="mt-20 text-center">
              {/* Decorative top line */}
              <div className="flex items-center gap-4 justify-center mb-8">
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-purple-700/50" />
                <div className="w-2 h-2 bg-purple-600 rotate-45" />
                <span className="bnec-pixel-font text-[10px] text-purple-700 tracking-[0.3em] uppercase">
                  Join the Battle
                </span>
                <div className="w-2 h-2 bg-purple-600 rotate-45" />
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-purple-700/50" />
              </div>

              <div className="relative inline-block group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-700 via-violet-500 to-purple-700
                  rounded-sm blur-xl opacity-50 group-hover:opacity-90 transition-all duration-500 animate-pulse" />
                <button
                  onClick={scrollToEvents}
                  className="bnec-pixel-font relative rounded-sm font-black uppercase tracking-widest
                    text-sm sm:text-base px-10 sm:px-16 py-4 sm:py-5
                    bg-gradient-to-r from-purple-700 to-violet-600
                    hover:from-purple-600 hover:to-violet-500
                    text-white transition-all duration-300 hover:scale-105
                    flex items-center gap-3 mx-auto overflow-hidden"
                >
                  <Corners color="border-white/20" size={3} />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)' }} />
                  <Star className="relative w-5 h-5 text-yellow-300 fill-current" />
                  <span className="relative">Daftar Tim Sekarang</span>
                  <ChevronRight className="relative w-5 h-5" />
                </button>
              </div>

              <p className="mt-5 bnec-pixel-font text-[10px] text-purple-700 tracking-[0.25em]">
                * Informasi pendaftaran akan segera diumumkan
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default BnecSection;
