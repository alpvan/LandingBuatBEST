import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  increment,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../../firebase';

export type GameTag = 'MLBB' | 'PUBGM' | 'Valorant' | 'HOK' | 'Semua';

export interface ForumReply {
  id: string;
  author: { uid: string; name: string; photoURL?: string };
  content: string;
  createdAt: any;
}

export interface ForumPost {
  id: string;
  author: { uid: string; name: string; photoURL?: string };
  game: GameTag;
  content: string;
  createdAt: any;
  likes: number;
  replyCount: number;
}

// Subscribe to forum posts (real-time)
export const subscribeForum = (
  game: GameTag,
  callback: (posts: ForumPost[]) => void
): Unsubscribe => {
  let q = query(
    collection(db, 'forum-posts'),
    orderBy('createdAt', 'desc')
  );
  if (game !== 'Semua') {
    q = query(
      collection(db, 'forum-posts'),
      where('game', '==', game),
      orderBy('createdAt', 'desc')
    );
  }
  return onSnapshot(q, (snap) => {
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ForumPost));
    callback(posts);
  });
};

// Create a new post
export const createPost = async (
  author: { uid: string; name: string; photoURL?: string },
  game: GameTag,
  content: string
) => {
  await addDoc(collection(db, 'forum-posts'), {
    author,
    game,
    content,
    createdAt: serverTimestamp(),
    likes: 0,
    replyCount: 0,
  });
};

// Like a post
export const likePost = async (postId: string) => {
  await updateDoc(doc(db, 'forum-posts', postId), { likes: increment(1) });
};

// Add reply to post
export const addReply = async (
  postId: string,
  author: { uid: string; name: string; photoURL?: string },
  content: string
) => {
  await addDoc(collection(db, `forum-posts/${postId}/replies`), {
    author,
    content,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, 'forum-posts', postId), { replyCount: increment(1) });
};

// Subscribe to replies of a post
export const subscribeReplies = (
  postId: string,
  callback: (replies: ForumReply[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, `forum-posts/${postId}/replies`),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(q, (snap) => {
    const replies = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ForumReply));
    callback(replies);
  });
};
