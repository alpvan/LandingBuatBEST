import React, { useState, useEffect } from 'react';
import { Zap, Clock, ChevronRight, Wifi } from 'lucide-react';
import { subscribeLiveScores, LiveMatch } from '../services/liveScoreService';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

type GameFilter = 'Semua' | 'MLBB' | 'PUBGM' | 'Valorant' | 'HOK';
const GAMES: GameFilter[] = ['Semua', 'MLBB', 'PUBGM', 'Valorant', 'HOK'];

const GAME_COLORS: Record<string, string> = {
  MLBB: '#ff6347',
  PUBGM: '#fbbf24',
  Valorant: '#ef4444',
  HOK: '#8b5cf6',
};

// Demo seed data shown when Firebase is empty
const DEMO_MATCHES: LiveMatch[] = [
  {
    id: '1',
    game: 'MLBB',
    team1: { name: 'BEST Alfa', score: 2 },
    team2: { name: 'UGM Eagles', score: 1 },
    status: 'live',
    round: 'Semifinal',
    startTime: Date.now() - 1000 * 60 * 40,
  },
  {
    id: '2',
    game: 'PUBGM',
    team1: { name: 'BEST Predator', score: 0 },
    team2: { name: 'ITS Thunder', score: 0 },
    status: 'upcoming',
    round: 'Quarterfinal',
    startTime: Date.now() + 1000 * 60 * 30,
  },
  {
    id: '3',
    game: 'Valorant',
    team1: { name: 'BEST Sigma', score: 13 },
    team2: { name: 'UI Phantom', score: 7 },
    status: 'finished',
    round: 'Group Stage',
    startTime: Date.now() - 1000 * 60 * 120,
  },
  {
    id: '4',
    game: 'HOK',
    team1: { name: 'BEST Delta', score: 3 },
    team2: { name: 'UNPAD Nexus', score: 2 },
    status: 'live',
    round: 'Grand Final',
    startTime: Date.now() - 1000 * 60 * 15,
  },
];

const MatchCard: React.FC<{ match: LiveMatch }> = ({ match }) => {
  const color = GAME_COLORS[match.game] || '#FFD700';

  return (
    <div className={`match-card ${match.status}`}>
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {match.status === 'live' && (
            <div className="match-live-badge">
              <span className="match-live-dot" />
              LIVE
            </div>
          )}
          {match.status === 'upcoming' && (
            <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2 py-1 rounded-full">
              <Clock size={9} />
              SEGERA
            </div>
          )}
          {match.status === 'finished' && (
            <div className="text-[9px] font-bold tracking-widest text-gray-500 bg-gray-500/10 border border-gray-500/20 px-2 py-1 rounded-full">
              SELESAI
            </div>
          )}
          <span
            className="text-[9px] font-bold tracking-widest px-2 py-0.5 rounded"
            style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
          >
            {match.game}
          </span>
        </div>
        <span className="text-[10px] text-gray-500">{match.round}</span>
      </div>

      {/* Teams */}
      <div className="match-team-row">
        <span className="match-team-name">{match.team1.name}</span>
        <div className="flex items-center gap-1">
          <span className="match-score" style={{ color: match.team1.score > match.team2.score ? '#FFD700' : '#e5e7eb' }}>
            {match.team1.score}
          </span>
          <span className="match-score-divider">:</span>
          <span className="match-score" style={{ color: match.team2.score > match.team1.score ? '#FFD700' : '#e5e7eb' }}>
            {match.team2.score}
          </span>
        </div>
        <span className="match-team-name right">{match.team2.name}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-gray-500">
          {match.status === 'upcoming'
            ? `Mulai ${formatDistanceToNow(match.startTime, { addSuffix: true, locale: idLocale })}`
            : match.status === 'live'
            ? `Berlangsung ${formatDistanceToNow(match.startTime, { addSuffix: false, locale: idLocale })}`
            : `Selesai ${formatDistanceToNow(match.startTime, { addSuffix: true, locale: idLocale })}`}
        </span>
        <button className="flex items-center gap-1 text-[11px] text-gray-500">
          Detail <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
};

const LiveScore: React.FC = () => {
  const [matches, setMatches] = useState<LiveMatch[]>(DEMO_MATCHES);
  const [activeGame, setActiveGame] = useState<GameFilter>('Semua');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase RTDB
    const unsubscribe = subscribeLiveScores((liveMatches) => {
      if (liveMatches.length > 0) {
        setMatches(liveMatches);
        setConnected(true);
      }
      // If empty, keep demo data showing
    });
    return unsubscribe;
  }, []);

  const filtered = activeGame === 'Semua'
    ? matches
    : matches.filter((m) => m.game === activeGame);

  const liveCount = matches.filter((m) => m.status === 'live').length;

  return (
    <div className="pb-24 flex flex-col h-full">
      {/* Header */}
      <div className="mobile-page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="mobile-page-title flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              Live Score
            </div>
            <div className="mobile-page-subtitle">
              {liveCount > 0 ? `${liveCount} pertandingan sedang berlangsung` : 'Tidak ada pertandingan live'}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold"
            style={{ color: connected ? '#22c55e' : '#6b7280' }}>
            <Wifi size={12} />
            {connected ? 'Live' : 'Demo'}
          </div>
        </div>
      </div>

      {/* Game filter tabs */}
      <div className="mobile-game-tabs pt-4">
        {GAMES.map((g) => (
          <button
            key={g}
            className={`mobile-game-tab ${activeGame === g ? 'active' : ''}`}
            onClick={() => setActiveGame(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Match cards */}
      <div className="overflow-y-auto flex-1">
        {filtered.length === 0 ? (
          <div className="mobile-empty">
            <div className="mobile-empty-icon">🎮</div>
            <div className="mobile-empty-text">
              Belum ada pertandingan {activeGame !== 'Semua' ? activeGame : ''} saat ini
            </div>
          </div>
        ) : (
          filtered.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </div>
  );
};

export default LiveScore;
