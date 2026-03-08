"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type ChapterMeta = {
  id: string;
  title: string;
  chapterNum: number;
  views: number;
  createdAt: string;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: { name: string; image?: string };
};

type Manga = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genre: string[];
  status: string;
  views: number;
  avgRating: number;
  ratingCount: number;
  author: { id: string; name: string; image?: string };
  _count: { chapters: number; comments: number };
};

export default function MangaDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [manga, setManga]       = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const [comment, setComment]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [ratingDone, setRatingDone] = useState(false);
  const [following, setFollowing]   = useState(false);

  // ── Fetch tất cả data ──
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/manga/${id}`).then(r => { if (!r.ok) throw new Error("Không tìm thấy manga"); return r.json(); }),
      fetch(`/api/manga/${id}/chapters`).then(r => r.ok ? r.json() : []),
      fetch(`/api/manga/${id}/comments`).then(r => r.ok ? r.json() : []),
    ])
      .then(([mg, chs, cms]) => {
        setManga(mg);
        setChapters(Array.isArray(chs) ? chs : []);
        setComments(Array.isArray(cms) ? cms : []);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  // ── Submit comment ──
  const handleComment = useCallback(async () => {
    if (!comment.trim() || !session) return;
    setSubmitting(true);
    const res = await fetch(`/api/manga/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment.trim() }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments(prev => [newComment, ...prev]);
      setComment("");
    }
    setSubmitting(false);
  }, [comment, id, session]);

  // ── Submit rating ──
  const handleRating = useCallback(async (score: number) => {
    if (!session || ratingDone) return;
    setUserRating(score);
    const res = await fetch(`/api/manga/${id}/ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score }),
    });
    if (res.ok) setRatingDone(true);
  }, [id, session, ratingDone]);

  if (loading) return (
    <div style={S.center}>
      <div style={S.spinner} />
      <p style={S.spinnerText}>Đang tải...</p>
    </div>
  );

  if (error || !manga) return (
    <div style={S.center}>
      <p style={{ color: "#c9411e", fontFamily: "'Oswald',sans-serif", fontSize: 20 }}>⚠ {error || "Không tìm thấy manga"}</p>
      <button onClick={() => router.push("/")} style={S.plainBtn}>← Trang chủ</button>
    </div>
  );

  const firstChapter  = chapters[0];
  const latestChapter = chapters[chapters.length - 1];

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Oswald:wght@400;600;700&family=Noto+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .back-btn:hover { color: #c9411e !important; }
        .chapter-item { transition: background 0.18s, border-color 0.18s; cursor: pointer; }
        .chapter-item:hover { background: rgba(201,65,30,0.1) !important; border-color: rgba(201,65,30,0.3) !important; }
        .star { cursor: pointer; transition: transform 0.1s; user-select: none; }
        .star:hover { transform: scale(1.2); }
        .glow-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .glow-btn:hover:not(:disabled) { box-shadow: 0 0 20px rgba(201,65,30,0.5); transform: translateY(-1px); }
        .glow-btn:disabled { opacity: 0.4; cursor: default; }
        textarea { resize: none; }
        textarea:focus { outline: none; border-color: #c9411e !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        .fade-up { animation: fadeUp 0.45s ease both; }
      `}</style>

      {/* NAV */}
      <nav style={S.nav}>
        <span className="back-btn" onClick={() => router.push("/")} style={S.navBack}>← Trang chủ</span>
        <div style={S.navDivider} />
        <span style={S.navTitle}>{manga.title}</span>
      </nav>

      <div style={S.container}>

        {/* ── HERO ── */}
        <div style={S.hero} className="fade-up">
          {/* Cover */}
          <div style={S.coverWrap}>
            {manga.coverImage ? (
              <img src={manga.coverImage} alt={manga.title} style={S.cover} />
            ) : (
              <div style={S.coverFallback}><span style={{ fontSize: 60 }}>📖</span></div>
            )}
          </div>

          {/* Info */}
          <div style={S.info}>
            {/* Genres */}
            <div style={{ marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {manga.genre?.map(g => (
                <span key={g} style={S.genreTag}>{g}</span>
              ))}
            </div>

            <h1 style={S.title}>{manga.title}</h1>

            <p style={S.authorLine}>
              Tác giả: <span style={{ color: "#c9411e" }}>@{manga.author?.name}</span>
            </p>

            <p style={S.desc}>{manga.description || "Chưa có mô tả."}</p>

            {/* Stats */}
            <div style={S.statsRow}>
              {[
                ["📚", chapters.length, "Chapter"],
                ["⭐", manga.avgRating > 0 ? manga.avgRating.toFixed(1) : "—", "Đánh giá"],
                ["💬", manga._count?.comments ?? comments.length, "Bình luận"],
              ].map(([icon, val, label]) => (
                <div key={label as string} style={S.stat}>
                  <div style={S.statVal}>{icon} {val}</div>
                  <div style={S.statLabel}>{label as string}</div>
                </div>
              ))}
            </div>

            {/* Status */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 12,
                fontFamily: "'Noto Sans', sans-serif",
                background: manga.status === "completed" ? "rgba(34,197,94,0.15)" : "rgba(201,65,30,0.15)",
                border: `1px solid ${manga.status === "completed" ? "rgba(34,197,94,0.3)" : "rgba(201,65,30,0.3)"}`,
                color: manga.status === "completed" ? "#22c55e" : "#c9411e",
              }}>
                {manga.status === "completed" ? "✅ Hoàn thành" : "🔄 Đang tiến hành"}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                className="glow-btn"
                disabled={!firstChapter}
                onClick={() => firstChapter && router.push(`/manga/${id}/chapter/${firstChapter.id}`)}
                style={{ ...S.primaryBtn, opacity: firstChapter ? 1 : 0.4 }}
              >
                📖 Đọc từ đầu
              </button>
              {chapters.length > 1 && (
                <button
                  className="glow-btn"
                  onClick={() => router.push(`/manga/${id}/chapter/${latestChapter.id}`)}
                  style={S.secondaryBtn}
                >
                  ⏩ Chapter mới nhất
                </button>
              )}
              <button
                onClick={() => setFollowing(f => !f)}
                style={{
                  ...S.secondaryBtn,
                  background: following ? "rgba(201,65,30,0.2)" : "rgba(255,255,255,0.05)",
                  borderColor: following ? "rgba(201,65,30,0.4)" : "rgba(255,255,255,0.1)",
                  color: following ? "#c9411e" : "rgba(232,224,212,0.6)",
                }}
              >
                {following ? "🔖 Đang theo dõi" : "🔖 Theo dõi"}
              </button>
            </div>
          </div>
        </div>

        {/* ── RATING ── */}
        <div style={S.card} className="fade-up">
          <h3 style={S.cardTitle}>⭐ Đánh giá manga này</h3>
          {!session ? (
            <p style={S.dimText}>Đăng nhập để đánh giá</p>
          ) : ratingDone ? (
            <p style={{ fontFamily: "'Noto Sans',sans-serif", fontSize: 14, color: "#f5a623" }}>
              ✅ Bạn đã đánh giá {userRating}/5 — cảm ơn!
            </p>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  className="star"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleRating(star)}
                  style={{ fontSize: 32, color: star <= (hoveredStar || userRating) ? "#f5a623" : "rgba(232,224,212,0.2)" }}
                >★</span>
              ))}
            </div>
          )}
        </div>

        {/* ── CHAPTERS ── */}
        <div style={{ marginBottom: 40 }} className="fade-up">
          <h2 style={S.sectionTitle}>📚 Danh sách chapter ({chapters.length})</h2>
          {chapters.length === 0 ? (
            <div style={S.empty}>Chưa có chapter nào được đăng tải</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {chapters.map(ch => (
                <div
                  key={ch.id}
                  className="chapter-item"
                  onClick={() => router.push(`/manga/${id}/chapter/${ch.id}`)}
                  style={S.chapterRow}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={S.chNum}>Chapter {ch.chapterNum}</span>
                    <span style={S.chTitle}>{ch.title}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={S.dimText}>👁 {ch.views ?? 0}</span>
                    <span style={S.dimText}>{new Date(ch.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── COMMENTS ── */}
        <div className="fade-up">
          <h2 style={S.sectionTitle}>💬 Bình luận ({comments.length})</h2>

          {/* Input */}
          <div style={{ marginBottom: 24 }}>
            {session ? (
              <>
                <textarea
                  rows={3}
                  placeholder="Viết bình luận của bạn..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  style={S.textarea}
                />
                <button
                  className="glow-btn"
                  onClick={handleComment}
                  disabled={submitting || !comment.trim()}
                  style={{ ...S.primaryBtn, marginTop: 10, opacity: (submitting || !comment.trim()) ? 0.5 : 1 }}
                >
                  {submitting ? "Đang gửi..." : "Gửi bình luận"}
                </button>
              </>
            ) : (
              <p style={S.dimText}>
                <span style={{ color: "#c9411e", cursor: "pointer" }} onClick={() => router.push("/login")}>Đăng nhập</span> để bình luận
              </p>
            )}
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {comments.length === 0 ? (
              <div style={S.empty}>Chưa có bình luận nào. Hãy là người đầu tiên!</div>
            ) : (
              comments.map(c => (
                <div key={c.id} style={S.commentCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={S.avatar}>
                      {c.user?.image
                        ? <img src={c.user.image} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                        : "👤"}
                    </div>
                    <span style={S.commentUser}>{c.user?.name}</span>
                    <span style={S.dimText}>{new Date(c.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <p style={S.commentBody}>{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#e8e0d4" },
  center: { minHeight: "100vh", background: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 },
  spinner: { width: 40, height: 40, border: "3px solid rgba(201,65,30,0.2)", borderTop: "3px solid #c9411e", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  spinnerText: { fontFamily: "'Oswald',sans-serif", fontSize: 18, color: "#c9411e" },
  plainBtn: { padding: "8px 20px", background: "rgba(201,65,30,0.1)", border: "1px solid rgba(201,65,30,0.2)", borderRadius: 8, color: "#c9411e", cursor: "pointer", fontFamily: "'Noto Sans',sans-serif", fontSize: 13 },
  nav: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", padding: "0 24px", display: "flex", alignItems: "center", gap: 16, height: 60 },
  navBack: { fontFamily: "'Noto Sans',sans-serif", fontSize: 13, color: "rgba(232,224,212,0.5)", cursor: "pointer", transition: "color 0.2s" },
  navDivider: { width: 1, height: 20, background: "rgba(255,255,255,0.1)" },
  navTitle: { fontFamily: "'Noto Sans',sans-serif", fontSize: 13, color: "rgba(232,224,212,0.7)" },
  container: { maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" },
  hero: { display: "flex", gap: 32, marginBottom: 48, flexWrap: "wrap" },
  coverWrap: { flexShrink: 0 },
  cover: { width: 200, height: 280, borderRadius: 10, objectFit: "cover", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", display: "block" },
  coverFallback: { width: 200, height: 280, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" },
  info: { flex: 1, minWidth: 280 },
  genreTag: { padding: "3px 10px", background: "rgba(201,65,30,0.15)", border: "1px solid rgba(201,65,30,0.3)", borderRadius: 20, fontFamily: "'Noto Sans',sans-serif", fontSize: 11, color: "#c9411e" },
  title: { fontFamily: "'Oswald',sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 },
  authorLine: { fontFamily: "'Noto Sans',sans-serif", fontSize: 13, color: "rgba(232,224,212,0.5)", marginBottom: 16 },
  desc: { fontFamily: "'Noto Sans',sans-serif", fontSize: 14, color: "rgba(232,224,212,0.6)", lineHeight: 1.7, marginBottom: 20 },
  statsRow: { display: "flex", gap: 24, marginBottom: 20 },
  stat: { textAlign: "center" },
  statVal: { fontFamily: "'Oswald',sans-serif", fontSize: 18, color: "#c9411e" },
  statLabel: { fontFamily: "'Noto Sans',sans-serif", fontSize: 11, color: "rgba(232,224,212,0.4)", marginTop: 2 },
  primaryBtn: { padding: "10px 24px", background: "#c9411e", borderRadius: 8, color: "#fff", fontFamily: "'Noto Sans',sans-serif", fontSize: 14, fontWeight: 600, boxShadow: "0 4px 15px rgba(201,65,30,0.3)" },
  secondaryBtn: { padding: "10px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e8e0d4", fontFamily: "'Noto Sans',sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 24, marginBottom: 32 },
  cardTitle: { fontFamily: "'Oswald',sans-serif", fontSize: 18, marginBottom: 16 },
  sectionTitle: { fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 20 },
  chapterRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 },
  chNum: { fontFamily: "'Oswald',sans-serif", fontSize: 14, color: "#c9411e", minWidth: 80 },
  chTitle: { fontFamily: "'Noto Sans',sans-serif", fontSize: 14, color: "rgba(232,224,212,0.8)" },
  empty: { textAlign: "center", padding: "40px", color: "rgba(232,224,212,0.3)", fontFamily: "'Noto Sans',sans-serif" },
  textarea: { width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e8e0d4", fontFamily: "'Noto Sans',sans-serif", fontSize: 14 },
  commentCard: { padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 },
  avatar: { width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#c9411e,#6a1a8a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, overflow: "hidden", flexShrink: 0 },
  commentUser: { fontFamily: "'Noto Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#c9411e" },
  commentBody: { fontFamily: "'Noto Sans',sans-serif", fontSize: 14, color: "rgba(232,224,212,0.7)", lineHeight: 1.6 },
  dimText: { fontFamily: "'Noto Sans',sans-serif", fontSize: 12, color: "rgba(232,224,212,0.3)" },
};
