"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type ChapterMeta = {
  id: string;
  title: string;
  chapterNum: number;
  views: number;
  createdAt: string;
};

type Manga = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genre: string[];
  status: "ongoing" | "completed" | "hiatus";
  avgRating: number;
  ratingCount: number;
  author: { id: string; name: string; image?: string };
  _count: { chapters: number; comments: number };
  createdAt: string;
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  ongoing:   { label: "Đang tiến hành", color: "#4caf82" },
  completed: { label: "Hoàn thành",     color: "#c9a84c" },
  hiatus:    { label: "Tạm dừng",       color: "#e05c5c" },
};

export default function MangaDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [manga, setManga]     = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/manga/${id}`).then(r => { if (!r.ok) throw new Error("Không tìm thấy manga"); return r.json(); }),
      fetch(`/api/manga/${id}/chapters`).then(r => { if (!r.ok) throw new Error("Lỗi tải chapters"); return r.json(); }),
    ])
      .then(([mg, chs]) => {
        setManga(mg);
        setChapters(Array.isArray(chs) ? chs : []);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={S.center}>
      <div style={S.spinner} />
      <p style={S.spinnerText}>Đang tải...</p>
    </div>
  );

  if (error || !manga) return (
    <div style={S.center}>
      <p style={{ color: "#e05c5c", fontFamily: "'Cinzel',serif", fontSize: 18 }}>⚠ {error || "Không tìm thấy manga"}</p>
      <button onClick={() => router.push("/")} style={S.backBtn}>← Trang chủ</button>
    </div>
  );

  const firstChapter = chapters[0];
  const status = STATUS_LABEL[manga.status] ?? STATUS_LABEL.ongoing;

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .chapter-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; border-bottom: 1px solid rgba(201,168,76,0.08);
          cursor: pointer; transition: background 0.18s;
          text-decoration: none;
        }
        .chapter-row:hover { background: rgba(201,168,76,0.07); }
        .chapter-row:last-child { border-bottom: none; }

        .read-btn {
          padding: 14px 32px; border-radius: 8px; font-size: 15px;
          font-family: 'Cinzel', serif; font-weight: 600; cursor: pointer;
          border: none; transition: transform 0.15s, opacity 0.15s;
          background: linear-gradient(135deg, #c9a84c, #8b6914);
          color: #080808; letter-spacing: 0.03em;
        }
        .read-btn:hover { transform: translateY(-2px); opacity: 0.92; }
        .read-btn:disabled { opacity: 0.3; cursor: default; transform: none; }

        .genre-tag {
          padding: 4px 12px; border-radius: 20px; font-size: 11px;
          font-family: 'Lora', serif; font-style: italic;
          border: 1px solid rgba(201,168,76,0.25);
          color: rgba(201,168,76,0.8); background: rgba(201,168,76,0.06);
          white-space: nowrap;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── BLURRED HERO BACKGROUND ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: manga.coverImage && !imgError ? `url(${manga.coverImage})` : "none",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(60px) brightness(0.18) saturate(1.4)",
        transform: "scale(1.1)",
      }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "rgba(8,8,8,0.75)" }} />

      {/* ── CONTENT ── */}
      <div style={S.content}>

        {/* Back */}
        <button onClick={() => router.push("/")} style={S.navBack} className="fade-up">
          ← Trang chủ
        </button>

        {/* ── HERO SECTION ── */}
        <div style={S.hero} className="fade-up">
          {/* Cover */}
          <div style={S.coverWrap}>
            {manga.coverImage && !imgError ? (
              <img
                src={manga.coverImage}
                alt={manga.title}
                style={S.cover}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={S.coverFallback}>
                <span style={{ fontSize: 48 }}>📖</span>
              </div>
            )}
            {/* Status badge */}
            <div style={{ ...S.statusBadge, background: status.color + "22", color: status.color, border: `1px solid ${status.color}44` }}>
              {status.label}
            </div>
          </div>

          {/* Info */}
          <div style={S.info}>
            <h1 style={S.title}>{manga.title}</h1>

            <p style={S.author}>
              ✍ <span style={{ color: "#c9a84c" }}>{manga.author?.name}</span>
            </p>

            {/* Genres */}
            {manga.genre?.length > 0 && (
              <div style={S.genreRow}>
                {manga.genre.map(g => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div style={S.statsRow}>
              <div style={S.stat}>
                <span style={S.statVal}>⭐ {manga.avgRating > 0 ? manga.avgRating.toFixed(1) : "—"}</span>
                <span style={S.statLabel}>{manga.ratingCount} đánh giá</span>
              </div>
              <div style={S.statDivider} />
              <div style={S.stat}>
                <span style={S.statVal}>📚 {manga._count.chapters}</span>
                <span style={S.statLabel}>chapters</span>
              </div>
              <div style={S.statDivider} />
              <div style={S.stat}>
                <span style={S.statVal}>💬 {manga._count.comments}</span>
                <span style={S.statLabel}>bình luận</span>
              </div>
            </div>

            {/* Description */}
            {manga.description && (
              <p style={S.desc}>{manga.description}</p>
            )}

            {/* CTA */}
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="read-btn"
                disabled={!firstChapter}
                onClick={() => firstChapter && router.push(`/manga/${id}/chapter/${firstChapter.id}`)}
              >
                {firstChapter ? "▶ Đọc từ đầu" : "Chưa có chapter"}
              </button>
            </div>
          </div>
        </div>

        {/* ── CHAPTERS LIST ── */}
        <div style={S.chapterSection} className="fade-up">
          <h2 style={S.sectionTitle}>
            Danh sách chapter
            <span style={S.chapterCount}>{chapters.length}</span>
          </h2>

          {chapters.length === 0 ? (
            <div style={S.empty}>Chưa có chapter nào được đăng tải</div>
          ) : (
            <div style={S.chapterList}>
              {chapters.map((ch, i) => (
                <div
                  key={ch.id}
                  className="chapter-row"
                  onClick={() => router.push(`/manga/${id}/chapter/${ch.id}`)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={S.chNum}>#{ch.chapterNum}</span>
                    <div>
                      <p style={S.chTitle}>{ch.title || `Chapter ${ch.chapterNum}`}</p>
                      <p style={S.chMeta}>
                        {new Date(ch.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={S.chViews}>👁 {ch.views ?? 0}</span>
                    <span style={S.chArrow}>→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#080808",
    color: "#f0e6d0",
    position: "relative",
  },
  center: {
    minHeight: "100vh",
    background: "#080808",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 16,
  },
  spinner: {
    width: 40, height: 40,
    border: "3px solid rgba(201,168,76,0.2)",
    borderTop: "3px solid #c9a84c",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  spinnerText: {
    fontFamily: "'Cinzel', serif", fontSize: 16, color: "#c9a84c",
  },
  backBtn: {
    marginTop: 12, padding: "8px 20px",
    background: "rgba(201,168,76,0.1)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 8, color: "#c9a84c", cursor: "pointer",
    fontFamily: "'Lora', serif", fontSize: 13,
  },
  content: {
    position: "relative", zIndex: 1,
    maxWidth: 900, margin: "0 auto",
    padding: "24px 20px 80px",
  },
  navBack: {
    background: "none", border: "none",
    color: "rgba(240,230,208,0.4)", cursor: "pointer",
    fontFamily: "'Lora', serif", fontSize: 13,
    marginBottom: 28, display: "block",
    transition: "color 0.2s",
  },
  hero: {
    display: "flex", gap: 36,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 52,
  },
  coverWrap: {
    position: "relative", flexShrink: 0,
  },
  cover: {
    width: 200, height: 280,
    objectFit: "cover", borderRadius: 10,
    boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.15)",
    display: "block",
  },
  coverFallback: {
    width: 200, height: 280, borderRadius: 10,
    background: "rgba(201,168,76,0.05)",
    border: "1px solid rgba(201,168,76,0.15)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  statusBadge: {
    position: "absolute", bottom: -12, left: "50%",
    transform: "translateX(-50%)",
    padding: "4px 14px", borderRadius: 20,
    fontSize: 11, fontFamily: "'Lora', serif",
    fontStyle: "italic", whiteSpace: "nowrap",
  },
  info: {
    flex: 1, minWidth: 240, paddingTop: 4,
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: 28, fontWeight: 700,
    color: "#f0e6d0", lineHeight: 1.2,
    marginBottom: 10,
    textShadow: "0 2px 20px rgba(201,168,76,0.2)",
  },
  author: {
    fontFamily: "'Lora', serif", fontSize: 14,
    color: "rgba(240,230,208,0.55)", marginBottom: 14,
  },
  genreRow: {
    display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20,
  },
  statsRow: {
    display: "flex", alignItems: "center", gap: 0,
    background: "rgba(201,168,76,0.05)",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: 10, padding: "14px 20px",
    marginBottom: 20,
  },
  stat: {
    display: "flex", flexDirection: "column",
    alignItems: "center", flex: 1, gap: 2,
  },
  statVal: {
    fontFamily: "'Cinzel', serif", fontSize: 15,
    color: "#f0e6d0", fontWeight: 600,
  },
  statLabel: {
    fontFamily: "'Lora', serif", fontSize: 11,
    color: "rgba(240,230,208,0.4)", fontStyle: "italic",
  },
  statDivider: {
    width: 1, height: 30,
    background: "rgba(201,168,76,0.15)",
    margin: "0 4px",
  },
  desc: {
    fontFamily: "'Lora', serif", fontSize: 14,
    color: "rgba(240,230,208,0.65)", lineHeight: 1.7,
    borderLeft: "2px solid rgba(201,168,76,0.3)",
    paddingLeft: 14,
  },
  chapterSection: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: 12, overflow: "hidden",
  },
  sectionTitle: {
    fontFamily: "'Cinzel', serif", fontSize: 16,
    color: "#c9a84c", fontWeight: 600,
    padding: "18px 20px",
    borderBottom: "1px solid rgba(201,168,76,0.1)",
    display: "flex", alignItems: "center", gap: 10,
  },
  chapterCount: {
    padding: "2px 10px", borderRadius: 20,
    background: "rgba(201,168,76,0.12)",
    color: "rgba(201,168,76,0.7)",
    fontSize: 12, fontWeight: 400,
  },
  chapterList: {},
  empty: {
    padding: "48px 20px", textAlign: "center",
    fontFamily: "'Lora', serif", fontStyle: "italic",
    color: "rgba(240,230,208,0.3)", fontSize: 14,
  },
  chNum: {
    fontFamily: "'Cinzel', serif", fontSize: 13,
    color: "rgba(201,168,76,0.5)", minWidth: 32,
  },
  chTitle: {
    fontFamily: "'Lora', serif", fontSize: 14,
    color: "#f0e6d0", marginBottom: 2,
  },
  chMeta: {
    fontFamily: "'Lora', serif", fontSize: 11,
    color: "rgba(240,230,208,0.3)", fontStyle: "italic",
  },
  chViews: {
    fontFamily: "'Lora', serif", fontSize: 12,
    color: "rgba(240,230,208,0.3)",
  },
  chArrow: {
    color: "rgba(201,168,76,0.4)", fontSize: 14,
  },
};
