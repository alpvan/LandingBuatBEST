import { ref, onValue, off, DataSnapshot } from 'firebase/database';
import { rtdb } from '../../firebase';

export interface LiveMatch {
  id: string;
  game: 'MLBB' | 'PUBGM' | 'Valorant' | 'HOK';
  team1: { name: string; score: number; logo?: string };
  team2: { name: string; score: number; logo?: string };
  status: 'live' | 'upcoming' | 'finished';
  round: string;
  startTime: number;
}

export const subscribeLiveScores = (
  callback: (matches: LiveMatch[]) => void
): (() => void) => {
  const scoresRef = ref(rtdb, 'live-scores');

  const listener = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback([]);
      return;
    }
    const matches: LiveMatch[] = Object.entries(data).map(([id, val]) => ({
      id,
      ...(val as Omit<LiveMatch, 'id'>),
    }));
    // Sort: live first, then upcoming, then finished
    matches.sort((a, b) => {
      const order = { live: 0, upcoming: 1, finished: 2 };
      return order[a.status] - order[b.status];
    });
    callback(matches);
  };

  onValue(scoresRef, listener);

  // Return unsubscribe function
  return () => off(scoresRef, 'value', listener);
};

export const subscribeMatchById = (
  matchId: string,
  callback: (match: LiveMatch | null) => void
): (() => void) => {
  const matchRef = ref(rtdb, `live-scores/${matchId}`);
  const listener = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    callback(data ? { id: matchId, ...data } : null);
  };
  onValue(matchRef, listener);
  return () => off(matchRef, 'value', listener);
};
