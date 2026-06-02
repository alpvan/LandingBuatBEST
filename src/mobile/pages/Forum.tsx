import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Heart, Send, ChevronDown } from 'lucide-react';
import { auth } from '../../firebase';
import {
  subscribeForum,
  createPost,
  likePost,
  ForumPost,
  GameTag,
} from '../services/forumService';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

const GAME_TAGS: GameTag[] = ['Semua', 'MLBB', 'PUBGM', 'Valorant', 'HOK'];

const Forum: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameTag>('Semua');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameTag>('MLBB');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [showGamePicker, setShowGamePicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = auth.currentUser;

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeForum(activeGame, (data) => {
      setPosts(data);
      setLoading(false);
    });
    return unsub;
  }, [activeGame]);

  const handlePost = async () => {
    const content = newPost.trim();
    if (!content || posting) return;

    const author = {
      uid: user?.uid ?? 'anonymous',
      name: user?.displayName ?? 'Anggota BEST',
      photoURL: user?.photoURL ?? undefined,
    };

    setPosting(true);
    try {
      await createPost(author, selectedGame, content);
      setNewPost('');
    } catch (err) {
      console.error('Post error:', err);
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    await likePost(postId);
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  const getTimeAgo = (ts: any) => {
    try {
      const date = ts?.toDate ? ts.toDate() : new Date(ts);
      return formatDistanceToNow(date, { addSuffix: true, locale: idLocale });
    } catch {
      return 'baru saja';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mobile-page-header">
        <div className="mobile-page-title flex items-center gap-2">
          <MessageSquare size={20} className="text-yellow-400" />
          Forum
        </div>
        <div className="mobile-page-subtitle">Diskusi antar anggota divisi</div>
      </div>

      {/* Game filter tabs */}
      <div className="mobile-game-tabs pt-4">
        {GAME_TAGS.map((g) => (
          <button
            key={g}
            className={`mobile-game-tab ${activeGame === g ? 'active' : ''}`}
            onClick={() => setActiveGame(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Posts list */}
      <div className="flex-1 overflow-y-auto pb-2">
        {loading ? (
          <div className="mobile-spinner" />
        ) : posts.length === 0 ? (
          <div className="mobile-empty">
            <div className="mobile-empty-icon">💬</div>
            <div className="mobile-empty-text">
              Belum ada post di forum {activeGame !== 'Semua' ? activeGame : ''}.{'\n'}
              Jadilah yang pertama!
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="forum-post-card">
              {/* Author row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="forum-avatar">
                  {post.author.photoURL
                    ? <img src={post.author.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                    : getInitial(post.author.name)
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white truncate">{post.author.name}</span>
                    <span className={`forum-game-tag ${post.game}`}>{post.game}</span>
                  </div>
                  <span className="text-[11px] text-gray-500">{getTimeAgo(post.createdAt)}</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-200 leading-relaxed mb-3">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                <button
                  className="flex items-center gap-1.5 text-xs text-gray-500 transition-colors"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart size={13} className="hover:text-red-400" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MessageSquare size={13} />
                  <span>{post.replyCount} balasan</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input bar */}
      <div className="forum-input-bar">
        {/* Game selector */}
        <div className="relative">
          <button
            className={`forum-game-tag ${selectedGame} px-3 py-2 flex items-center gap-1 text-xs font-bold`}
            onClick={() => setShowGamePicker(!showGamePicker)}
          >
            {selectedGame}
            <ChevronDown size={10} />
          </button>
          {showGamePicker && (
            <div
              className="absolute bottom-full left-0 mb-1 rounded-xl overflow-hidden z-50"
              style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', minWidth: 100 }}
            >
              {(['MLBB', 'PUBGM', 'Valorant', 'HOK'] as GameTag[]).map((g) => (
                <button
                  key={g}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold hover:bg-white/5"
                  style={{ color: g === selectedGame ? '#FFD700' : '#9ca3af' }}
                  onClick={() => { setSelectedGame(g); setShowGamePicker(false); }}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        <textarea
          ref={textareaRef}
          className="forum-textarea"
          placeholder="Tulis sesuatu..."
          rows={1}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 100) + 'px';
          }}
        />
        <button
          className="forum-send-btn"
          onClick={handlePost}
          disabled={posting || !newPost.trim()}
          style={{ opacity: !newPost.trim() ? 0.4 : 1 }}
        >
          <Send size={16} color="#050505" />
        </button>
      </div>
    </div>
  );
};

export default Forum;
