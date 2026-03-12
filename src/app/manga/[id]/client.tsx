"use client";

import type { CSSProperties } from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CoverImage from "@/components/CoverImage";

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
  coverPositionX?: number;
  coverPositionY?: number;
  genre: string[];
  status: string;
  views: number;
  avgRating: number;
  ratingCount: number;
  author: { id: string; name: string; image?: string };
  _count: { chapters: number; comments: number };
};

type ReadHistory = {
  chapterId: string;
  chapter: { id: string; chapterNum: number; title: string };
} | null;

export default function MangaDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [history, setHistory] = useState<ReadHistory>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [ratingDone, setRatingDone] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`/api/manga/${id}`).then((r) => {
        if (!r.ok) throw new Error("Không tìm thấy manga");
        return r.json();
      }),
      fetch(`/api/manga/${id}/chapters`).then((r) => (r.ok ? r.json() : [])),
      fetch(`/api/manga/${id}/comments`).then((r) => (r.ok ? r.json() : [])),
      fetch(`/api/manga/${id}/follow`).then((r) => (r.ok ? r.json() : { following: false })),
      fetch(`/api/manga/${id}/read-history`).then((r) => (r.ok ? r.json() : { history: null })),
    ])
      .then(([mg, chs, cms, flw, hist]) => {
        setManga(mg);
        setChapters(Array.isArray(chs) ? chs : []);
        setComments(Array.isArray(cms) ? cms : []);
        setFollowing(flw.following ?? false);
        setHistory(hist.history ?? null);
        setShowFullDesc(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const toggleFollow = useCallback(async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    const res = await fetch(`/api/manga/${id}/follow`, { method: "POST" });
    const data = await res.json();
    setFollowing(data.following);
  }, [id, session, router]);

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
      setComments((prev) => [newComment, ...prev]);
      setComment("");
    }

    setSubmitting(false);
  }, [comment, id, session]);

  const handleRating = useCallback(
    async (score: number) => {
      if (!session) {
        router.push("/login");
        return;
      }
      if (ratingDone) return;

      setUserRating(score);

      const res = await fetch(`/api/manga/${id}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });

      if (res.ok) setRatingDone(true);
    },
    [id, session, ratingDone, router]
  );

  if (loading) {
    return (
      <div style={S.center}>
        <div style={S.spinner} />
        <p style={S.spinnerText}>Đang tải manga...</p>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div style={S.center}>
        <p style={{ color: "#c9a84c", fontFamily: "'Inter',sans-serif", fontSize: 18 }}>
          ⚠ {error || "Không tìm thấy manga"}
        </p>
        <button onClick={() => router.push("/")} style={S.plainBtn}>
          ← Quay về trang chủ
        </button>
      </div>
    );
  }

  const sortedChapters = [...chapters].sort((a, b) => b.chapterNum - a.chapterNum);
  const firstChapter = [...chapters].sort((a, b) => a.chapterNum - b.chapterNum)[0];
  const latestChapter = [...chapters].sort((a, b) => b.chapterNum - a.chapterNum)[0];
  const continueChapter = history?.chapter ?? null;

  const cleanDesc = (manga.description || "").trim();
  const hasLongDesc = cleanDesc.length > 220;
  const shortDesc = hasLongDesc ? `${cleanDesc.slice(0, 220).trim()}...` : cleanDesc;
  const displayDesc = showFullDesc ? cleanDesc : shortDesc;

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .detail-back:hover { color: #c9a84c !important; }
        .detail-btn { transition: all 0.22s ease; cursor: pointer; }
        .detail-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 20px rgba(201,168,76,0.16); }
        .chapter-row { transition: all 0.2s ease; cursor: pointer; }
        .chapter-row:hover { background: rgba(201,168,76,0.08) !important; border-color: rgba(201,168,76,0.26) !important; }
        .star { cursor: pointer; transition: transform 0.12s ease; user-select: none; }
        .star:hover { transform: scale(1.15); }
        textarea:focus { outline: none; border-color: rgba(201,168,76,0.36) !important; box-shadow: 0 0 0 1px rgba(201,168,76,0.14); }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up { animation: fadeUp 0.42s ease both; }

        @media (max-width: 900px) {
          .detail-hero {
            grid-template-columns: 1fr !important;
          }
          .detail-cover-wrap {
            margin: 0 auto;
          }
          .detail-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={S.ambient}>
        <div style={S.ambientGlowA} />
        <div style={S.ambientGlowB} />
        <div style={S.ambientOverlay} />
      </div>

      <nav style={S.nav}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <div
            onClick={() => router.push("/")}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}
          >
            <img src="/logo.png" alt="logo" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "contain" }} />
            <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.08em", color: "#f0e6d0" }}>
              M<span style={{ color: "#c9a84c" }}>AI</span>NGA
            </div>
          </div>

          <div style={S.navDivider} />

          <span className="detail-back" onClick={() => router.push("/")} style={S.navBack}>
            Trang chủ
          </span>

          <span style={S.navTitle}>{manga.title}</span>
        </div>
      </nav>

      <div style={S.container}>
        <section className="fade-up" style={S.heroShell}>
          <div className="detail-hero" style={S.heroGrid}>
            <div className="detail-cover-wrap" style={S.coverWrap}>
              <CoverImage
                src={manga.coverImage}
                alt={manga.title}
                positionX={manga.coverPositionX ?? 50}
                positionY={manga.coverPositionY ?? 50}
                aspectRatio="3 / 4"
                borderRadius={18}
                style={{
                  maxWidth: 260,
                  boxShadow: "0 14px 34px rgba(0,0,0,0.42)",
                }}
              />
            </div>

            <div style={S.heroInfo}>
              <div style={S.genreRow}>
                {manga.genre?.map((g) => (
                  <span key={g} style={S.genreTag}>
                    {g}
                  </span>
                ))}
              </div>

              <h1 style={S.title}>{manga.title}</h1>

              <div style={S.metaLine}>
                <span>
                  Tác giả: <span style={S.metaHighlight}>@{manga.author?.name}</span>
                </span>
                <span style={S.metaDot}>•</span>
                <span>{manga.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}</span>
              </div>

              <div style={S.infoCardRow}>
                <div style={S.infoCard}>
                  <div style={S.infoCardLabel}>THỂ LOẠI</div>
                  <div style={S.infoCardValue}>
                    {manga.genre?.length ? manga.genre.join(" • ") : "Chưa cập nhật"}
                  </div>
                </div>

                <div style={{ ...S.infoCard, flex: 1.2 }}>
                  <div style={S.infoCardLabel}>MÔ TẢ</div>
                  <div style={S.infoCardValueDesc}>{displayDesc || "Chưa có mô tả cho manga này."}</div>

                  {hasLongDesc && (
                    <button
                      className="detail-btn"
                      onClick={() => setShowFullDesc((v) => !v)}
                      style={S.readMoreBtn}
                    >
                      {showFullDesc ? "Thu gọn" : "Xem thêm"}
                    </button>
                  )}
                </div>
              </div>

              <div style={S.statGrid}>
                <div style={S.statCard}>
                  <div style={S.statValue}>{chapters.length}</div>
                  <div style={S.statLabel}>Chapter</div>
                </div>
                <div style={S.statCard}>
                  <div style={S.statValue}>{manga.avgRating > 0 ? manga.avgRating.toFixed(1) : "—"}</div>
                  <div style={S.statLabel}>Đánh giá</div>
                </div>
                <div style={S.statCard}>
                  <div style={S.statValue}>{manga.views ?? 0}</div>
                  <div style={S.statLabel}>Lượt xem</div>
                </div>
                <div style={S.statCard}>
                  <div style={S.statValue}>{manga._count?.comments ?? comments.length}</div>
                  <div style={S.statLabel}>Bình luận</div>
                </div>
              </div>

              <div style={S.actionRow}>
                {continueChapter ? (
                  <button
                    className="detail-btn"
                    onClick={() => router.push(`/manga/${id}/chapter/${continueChapter.id}`)}
                    style={S.primaryBtn}
                  >
                    ▶ Đọc tiếp Chapter {continueChapter.chapterNum}
                  </button>
                ) : (
                  <button
                    className="detail-btn"
                    disabled={!firstChapter}
                    onClick={() => firstChapter && router.push(`/manga/${id}/chapter/${firstChapter.id}`)}
                    style={{
                      ...S.primaryBtn,
                      opacity: firstChapter ? 1 : 0.45,
                      cursor: firstChapter ? "pointer" : "default",
                    }}
                  >
                    📖 Đọc từ đầu
                  </button>
                )}

                {continueChapter && firstChapter && (
                  <button
                    className="detail-btn"
                    onClick={() => router.push(`/manga/${id}/chapter/${firstChapter.id}`)}
                    style={S.secondaryBtn}
                  >
                    Từ đầu
                  </button>
                )}

                {latestChapter && (
                  <button
                    className="detail-btn"
                    onClick={() => router.push(`/manga/${id}/chapter/${latestChapter.id}`)}
                    style={S.secondaryBtn}
                  >
                    Mới nhất
                  </button>
                )}

                <button className="detail-btn" onClick={toggleFollow} style={following ? S.followingBtn : S.secondaryBtn}>
                  {following ? "🔖 Đang theo dõi" : "🔖 Theo dõi"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="fade-up detail-main-grid" style={S.mainGrid}>
          <div style={S.leftCol}>
            <div style={S.panel}>
              <div style={S.panelHeader}>
                <h2 style={S.sectionTitle}>📚 Danh sách chapter</h2>
                <span style={S.sectionMeta}>{chapters.length} chapter</span>
              </div>

              {sortedChapters.length === 0 ? (
                <div style={S.empty}>Chưa có chapter nào.</div>
              ) : (
                <div style={S.chapterList}>
                  {sortedChapters.map((ch) => (
                    <div
                      key={ch.id}
                      className="chapter-row"
                      onClick={() => router.push(`/manga/${id}/chapter/${ch.id}`)}
                      style={{
                        ...S.chapterRow,
                        background: history?.chapterId === ch.id ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
                        borderColor: history?.chapterId === ch.id ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={S.chapterLeft}>
                        <div style={S.chapterNumber}>Chapter {ch.chapterNum}</div>
                        <div style={S.chapterTitleWrap}>
                          <div style={S.chapterTitle}>{ch.title || `Chapter ${ch.chapterNum}`}</div>
                          {history?.chapterId === ch.id && <span style={S.readingNow}>Đang đọc</span>}
                        </div>
                      </div>

                      <div style={S.chapterRight}>
                        <span style={S.chapterMeta}>👁 {ch.views ?? 0}</span>
                        <span style={S.chapterMeta}>{new Date(ch.createdAt).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={S.panel}>
              <div style={S.panelHeader}>
                <h2 style={S.sectionTitle}>💬 Bình luận</h2>
                <span style={S.sectionMeta}>{comments.length}</span>
              </div>

              <div style={{ marginBottom: 22 }}>
                {session ? (
                  <>
                    <textarea
                      rows={4}
                      placeholder="Viết bình luận của bạn..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={S.textarea}
                    />
                    <button
                      className="detail-btn"
                      onClick={handleComment}
                      disabled={submitting || !comment.trim()}
                      style={{
                        ...S.primaryBtn,
                        marginTop: 12,
                        opacity: submitting || !comment.trim() ? 0.45 : 1,
                        cursor: submitting || !comment.trim() ? "default" : "pointer",
                      }}
                    >
                      {submitting ? "Đang gửi..." : "Gửi bình luận"}
                    </button>
                  </>
                ) : (
                  <p style={S.dimText}>
                    <span style={S.metaHighlight} onClick={() => router.push("/login")}>
                      Đăng nhập
                    </span>{" "}
                    để bình luận.
                  </p>
                )}
              </div>

              {comments.length === 0 ? (
                <div style={S.empty}>Chưa có bình luận nào. Hãy là người đầu tiên!</div>
              ) : (
                <div style={S.commentList}>
                  {comments.map((c) => (
                    <div key={c.id} style={S.commentCard}>
                      <div style={S.commentHead}>
                        <div style={S.avatar}>
                          {c.user?.image ? (
                            <img
                              src={c.user.image}
                              alt={c.user.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                            />
                          ) : (
                            "👤"
                          )}
                        </div>
                        <div>
                          <div style={S.commentUser}>{c.user?.name}</div>
                          <div style={S.commentDate}>{new Date(c.createdAt).toLocaleDateString("vi-VN")}</div>
                        </div>
                      </div>
                      <p style={S.commentBody}>{c.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={S.rightCol}>
            <div style={S.sidePanel}>
              <h3 style={S.sideTitle}>⭐ Đánh giá manga</h3>

              {!session ? (
                <p style={S.dimText}>
                  <span style={S.metaHighlight} onClick={() => router.push("/login")}>
                    Đăng nhập
                  </span>{" "}
                  để đánh giá.
                </p>
              ) : ratingDone ? (
                <p style={{ ...S.dimText, color: "#c9a84c" }}>Bạn đã đánh giá {userRating}/5.</p>
              ) : (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="star"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => handleRating(star)}
                      style={{
                        fontSize: 30,
                        color: star <= (hoveredStar || userRating) ? "#c9a84c" : "rgba(240,230,208,0.16)",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={S.sidePanel}>
              <h3 style={S.sideTitle}>ℹ Thông tin nhanh</h3>
              <div style={S.quickList}>
                <div style={S.quickRow}>
                  <span style={S.quickLabel}>Tác giả</span>
                  <span style={S.quickValue}>@{manga.author?.name}</span>
                </div>
                <div style={S.quickRow}>
                  <span style={S.quickLabel}>Trạng thái</span>
                  <span style={S.quickValue}>{manga.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}</span>
                </div>
                <div style={S.quickRow}>
                  <span style={S.quickLabel}>Chapter</span>
                  <span style={S.quickValue}>{chapters.length}</span>
                </div>
                <div style={S.quickRow}>
                  <span style={S.quickLabel}>Bình luận</span>
                  <span style={S.quickValue}>{manga._count?.comments ?? comments.length}</span>
                </div>
              </div>
            </div>

            <div style={S.sidePanel}>
              <h3 style={S.sideTitle}>🏷 Thể loại</h3>
              <div style={S.sideGenreWrap}>
                {manga.genre?.map((g) => (
                  <span key={g} style={S.sideGenreTag}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const S: Record<string, CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0b0f 0%, #08090c 52%, #06070a 100%)",
    color: "#f0e6d0",
    position: "relative",
  },

  ambient: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    overflow: "hidden",
  },
  ambientGlowA: {
    position: "absolute",
    top: -120,
    left: "50%",
    transform: "translateX(-50%)",
    width: 900,
    height: 420,
    background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 32%, transparent 70%)",
    filter: "blur(18px)",
  },
  ambientGlowB: {
    position: "absolute",
    right: -120,
    top: 180,
    width: 380,
    height: 380,
    background: "radial-gradient(circle, rgba(180,190,220,0.06) 0%, transparent 72%)",
    filter: "blur(20px)",
  },
  ambientOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.36) 100%)",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    position: "relative",
    zIndex: 1,
  },
  spinner: {
    width: 42,
    height: 42,
    border: "3px solid rgba(201,168,76,0.14)",
    borderTop: "3px solid #c9a84c",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  spinnerText: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 16,
    color: "#c9a84c",
  },

  plainBtn: {
    marginTop: 12,
    padding: "10px 20px",
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.22)",
    borderRadius: 10,
    color: "#c9a84c",
    cursor: "pointer",
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
  },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(8,8,10,0.84)",
    borderBottom: "1px solid rgba(201,168,76,0.10)",
    backdropFilter: "blur(16px)",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: 64,
  },
  navBack: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
    color: "rgba(240,230,208,0.56)",
    cursor: "pointer",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  navDivider: {
    width: 1,
    height: 20,
    background: "rgba(255,255,255,0.08)",
    flexShrink: 0,
  },
  navTitle: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
    color: "rgba(240,230,208,0.72)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  container: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "36px 24px 80px",
    position: "relative",
    zIndex: 1,
  },

  heroShell: {
    marginBottom: 30,
    borderRadius: 24,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,168,76,0.10)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.32)",
    overflow: "hidden",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: 28,
    padding: 28,
  },
  coverWrap: {
    width: "100%",
  },

  heroInfo: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  genreRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  genreTag: {
    padding: "5px 12px",
    borderRadius: 999,
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.18)",
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    color: "#c9a84c",
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  title: {
    fontFamily: "'Cinzel',serif",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: 700,
    lineHeight: 1.18,
    marginBottom: 12,
    color: "#f0e6d0",
  },
  metaLine: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
    color: "rgba(240,230,208,0.48)",
    marginBottom: 16,
  },
  metaHighlight: {
    color: "#c9a84c",
    cursor: "pointer",
  },
  metaDot: {
    opacity: 0.3,
  },

  infoCardRow: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 0.9fr) minmax(260px, 1.3fr)",
    gap: 12,
    marginBottom: 22,
  },
  infoCard: {
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  infoCardLabel: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    color: "rgba(240,230,208,0.30)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  infoCardValue: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 15,
    color: "rgba(240,230,208,0.82)",
    lineHeight: 1.6,
    fontWeight: 600,
  },
  infoCardValueDesc: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    color: "rgba(240,230,208,0.70)",
    lineHeight: 1.7,
  },
  readMoreBtn: {
    marginTop: 10,
    padding: "8px 12px",
    background: "rgba(201,168,76,0.10)",
    border: "1px solid rgba(201,168,76,0.20)",
    borderRadius: 10,
    color: "#c9a84c",
    fontFamily: "'Inter',sans-serif",
    fontSize: 12,
    fontWeight: 700,
    width: "fit-content",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 12,
    marginBottom: 22,
  },
  statCard: {
    padding: "14px 14px 12px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  statValue: {
    fontFamily: "'Cinzel',serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#c9a84c",
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    color: "rgba(240,230,208,0.38)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },

  actionRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "12px 22px",
    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
    border: "none",
    borderRadius: 10,
    color: "#080808",
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.03em",
  },
  secondaryBtn: {
    padding: "12px 18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    color: "#f0e6d0",
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    fontWeight: 600,
  },
  followingBtn: {
    padding: "12px 18px",
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.24)",
    borderRadius: 10,
    color: "#c9a84c",
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    fontWeight: 700,
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 320px",
    gap: 24,
    alignItems: "start",
  },
  leftCol: {
    minWidth: 0,
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  panel: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 22,
    marginBottom: 22,
  },
  sidePanel: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 20,
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: "'Cinzel',serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#f0e6d0",
  },
  sectionMeta: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 12,
    color: "rgba(240,230,208,0.38)",
  },
  sideTitle: {
    fontFamily: "'Cinzel',serif",
    fontSize: 16,
    fontWeight: 700,
    color: "#f0e6d0",
    marginBottom: 14,
  },

  chapterList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  chapterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "15px 16px",
    border: "1px solid",
    borderRadius: 14,
  },
  chapterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
  },
  chapterNumber: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 12,
    color: "#c9a84c",
    fontWeight: 700,
    minWidth: 86,
    letterSpacing: "0.04em",
  },
  chapterTitleWrap: {
    minWidth: 0,
  },
  chapterTitle: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    color: "rgba(240,230,208,0.82)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  readingNow: {
    display: "inline-block",
    marginTop: 4,
    fontSize: 10,
    color: "#c9a84c",
    fontFamily: "'Inter',sans-serif",
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  chapterRight: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    flexShrink: 0,
  },
  chapterMeta: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    color: "rgba(240,230,208,0.34)",
  },

  textarea: {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 14,
    color: "#f0e6d0",
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    resize: "none",
    lineHeight: 1.6,
  },

  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  commentCard: {
    padding: 16,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
  },
  commentHead: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    overflow: "hidden",
    flexShrink: 0,
  },
  commentUser: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#f0e6d0",
    marginBottom: 2,
  },
  commentDate: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    color: "rgba(240,230,208,0.34)",
  },
  commentBody: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
    color: "rgba(240,230,208,0.72)",
    lineHeight: 1.65,
  },

  quickList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  quickRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    paddingBottom: 10,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  quickLabel: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 12,
    color: "rgba(240,230,208,0.40)",
  },
  quickValue: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 12,
    color: "#f0e6d0",
    fontWeight: 600,
    textAlign: "right",
  },

  sideGenreWrap: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  sideGenreTag: {
    padding: "6px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.16)",
    color: "#c9a84c",
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    fontWeight: 600,
  },

  empty: {
    textAlign: "center",
    padding: "34px 20px",
    color: "rgba(240,230,208,0.30)",
    fontFamily: "'Inter',sans-serif",
    fontSize: 14,
  },
  dimText: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
    color: "rgba(240,230,208,0.42)",
    lineHeight: 1.6,
  },
};