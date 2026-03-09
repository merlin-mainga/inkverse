"use client";

import type { CSSProperties } from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Chapter = {
  id: string;
  title: string;
  chapterNum: number;
  pages: string[];
  views: number;
};

type ChapterMeta = {
  id: string;
  title: string;
  chapterNum: number;
  views: number;
};

type Manga = {
  id: string;
  title: string;
  coverImage?: string;
};

export default function ChapterReaderClient() {
  const { id, chapterId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [readMode, setReadMode] = useState<"scroll" | "page">("scroll");
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(0);

    Promise.all([
      fetch(`/api/chapters/${chapterId}`).then((r) => {
        if (!r.ok) throw new Error("Không tìm thấy chapter");
        return r.json();
      }),
      fetch(`/api/manga/${id}`).then((r) => {
        if (!r.ok) throw new Error("Không tìm thấy manga");
        return r.json();
      }),
      fetch(`/api/manga/${id}/chapters`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([ch, mg, chs]) => {
        setChapter(ch);
        setManga(mg);
        setChapters(Array.isArray(chs) ? chs : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [chapterId, id]);

  // Ghi read history
  useEffect(() => {
    if (!chapter || !session?.user) return;

    fetch(`/api/manga/${id}/read-history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId }),
    }).catch(() => {});
  }, [chapter, id, chapterId, session]);

  // Tăng view cho chapter + manga, chỉ 1 lần mỗi chapter trong 1 tab
  useEffect(() => {
    if (!chapterId) return;

    const viewKey = `viewed-chapter-${chapterId as string}`;

    if (typeof window !== "undefined" && sessionStorage.getItem(viewKey)) return;

    fetch(`/api/chapters/${chapterId}/view`, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok && typeof window !== "undefined") {
          sessionStorage.setItem(viewKey, "1");
        }
      })
      .catch(() => {});
  }, [chapterId]);

  const sortedChaptersAsc = [...chapters].sort((a, b) => a.chapterNum - b.chapterNum);
  const currentIndex = sortedChaptersAsc.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? sortedChaptersAsc[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < sortedChaptersAsc.length - 1
      ? sortedChaptersAsc[currentIndex + 1]
      : null;

  const goToChapter = useCallback(
    (cId: string) => {
      router.push(`/manga/${id}/chapter/${cId}`);
    },
    [id, router]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!chapter) return;

      if (readMode === "page") {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          setCurrentPage((p) => Math.min(chapter.pages.length - 1, p + 1));
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setCurrentPage((p) => Math.max(0, p - 1));
        }
      }

      if (e.key.toLowerCase() === "h") {
        setShowTopBar((v) => !v);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [readMode, chapter]);

  if (loading) {
    return (
      <div style={S.center}>
        <div style={S.spinner} />
        <p style={S.loadingText}>Đang tải chapter...</p>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div style={S.center}>
        <p style={{ ...S.loadingText, color: "#c9a84c" }}>⚠ {error || "Không tìm thấy chapter"}</p>
        <button onClick={() => router.push(`/manga/${id}`)} style={S.backBtn}>
          ← Quay lại manga
        </button>
      </div>
    );
  }

  const pageCount = chapter.pages?.length ?? 0;
  const progressPercent =
    readMode === "page" && pageCount > 0 ? ((currentPage + 1) / pageCount) * 100 : 0;

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .reader-img {
          display: block;
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
          border-radius: 14px;
          background: #0d0f14;
          box-shadow: 0 16px 42px rgba(0,0,0,0.34);
        }

        .reader-link:hover {
          color: #c9a84c !important;
        }

        .reader-btn {
          transition: all 0.22s ease;
          cursor: pointer;
        }

        .reader-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(201,168,76,0.16);
        }

        .reader-select option {
          background: #111318;
          color: #f0e6d0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .reader-top-inner {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .reader-top-right {
            justify-content: flex-start !important;
            flex-wrap: wrap;
          }

          .reader-bottom-inner {
            flex-direction: column;
            align-items: stretch !important;
          }

          .reader-bottom-inner select {
            max-width: 100% !important;
            width: 100%;
          }
        }
      `}</style>

      <div style={S.ambient}>
        <div style={S.ambientGlowA} />
        <div style={S.ambientGlowB} />
        <div style={S.ambientOverlay} />
      </div>

      {showTopBar && (
        <div style={S.topBar}>
          <div className="reader-top-inner" style={S.topBarInner}>
            <div style={S.topLeft}>
              <span className="reader-link" onClick={() => router.push(`/manga/${id}`)} style={S.backLink}>
                ← {manga?.title ?? "Quay lại"}
              </span>

              <div style={S.chapterInfo}>
                <div style={S.chapterEyebrow}>CHAPTER {chapter.chapterNum}</div>
                <h1 style={S.chapterTitle}>{chapter.title || `Chapter ${chapter.chapterNum}`}</h1>
              </div>
            </div>

            <div className="reader-top-right" style={S.topRight}>
              <button
                className="reader-btn"
                onClick={() => setReadMode((m) => (m === "scroll" ? "page" : "scroll"))}
                style={S.modeBtn}
              >
                {readMode === "scroll" ? "📄 Chế độ trang" : "📜 Chế độ cuộn"}
              </button>

              <button className="reader-btn" onClick={() => setShowTopBar(false)} style={S.ghostBtn}>
                Ẩn thanh
              </button>
            </div>
          </div>

          {readMode === "page" && (
            <div style={S.progressWrap}>
              <div style={{ ...S.progressBar, width: `${progressPercent}%` }} />
            </div>
          )}
        </div>
      )}

      {!showTopBar && (
        <button className="reader-btn" onClick={() => setShowTopBar(true)} style={S.floatingShowBtn}>
          Hiện menu
        </button>
      )}

      <div style={S.readArea}>
        {!pageCount ? (
          <div style={S.emptyMsg}>Chapter này chưa có ảnh.</div>
        ) : readMode === "scroll" ? (
          <div style={S.scrollPages}>
            {chapter.pages.map((page, i) => (
              <img
                key={i}
                src={page}
                alt={`Trang ${i + 1}`}
                className="reader-img"
                loading="lazy"
                style={{ marginBottom: 8 }}
              />
            ))}
          </div>
        ) : (
          <div style={S.pageModeWrap}>
            <img
              src={chapter.pages[currentPage]}
              alt={`Trang ${currentPage + 1}`}
              className="reader-img"
              style={{ marginBottom: 16 }}
            />

            <div style={S.pageControls}>
              <button
                className="reader-btn"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                style={{
                  ...S.pageBtn,
                  opacity: currentPage === 0 ? 0.35 : 1,
                  cursor: currentPage === 0 ? "default" : "pointer",
                }}
              >
                ← Trang trước
              </button>

              <div style={S.pageCount}>
                {currentPage + 1} / {pageCount}
              </div>

              <button
                className="reader-btn"
                onClick={() => setCurrentPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={currentPage === pageCount - 1}
                style={{
                  ...S.pageBtn,
                  opacity: currentPage === pageCount - 1 ? 0.35 : 1,
                  cursor: currentPage === pageCount - 1 ? "default" : "pointer",
                }}
              >
                Trang sau →
              </button>
            </div>

            <div style={S.keyboardHint}>Dùng ← → hoặc ↑ ↓ để chuyển trang</div>
          </div>
        )}
      </div>

      <div style={S.bottomBar}>
        <div className="reader-bottom-inner" style={S.bottomBarInner}>
          <button
            className="reader-btn"
            onClick={() => prevChapter && goToChapter(prevChapter.id)}
            disabled={!prevChapter}
            style={{
              ...S.navBtnSecondary,
              opacity: prevChapter ? 1 : 0.35,
              cursor: prevChapter ? "pointer" : "default",
            }}
          >
            ← Chapter trước
          </button>

          {sortedChaptersAsc.length > 0 && (
            <select
              className="reader-select"
              onChange={(e) => goToChapter(e.target.value)}
              value={chapterId as string}
              style={S.chapterSelect}
            >
              {sortedChaptersAsc.map((c) => (
                <option key={c.id} value={c.id}>
                  Chapter {c.chapterNum}: {c.title || `Chapter ${c.chapterNum}`}
                </option>
              ))}
            </select>
          )}

          <button
            className="reader-btn"
            onClick={() => nextChapter && goToChapter(nextChapter.id)}
            disabled={!nextChapter}
            style={{
              ...S.navBtnPrimary,
              opacity: nextChapter ? 1 : 0.35,
              cursor: nextChapter ? "pointer" : "default",
            }}
          >
            Chapter sau →
          </button>
        </div>
      </div>
    </div>
  );
}

const S: Record<string, CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #090a0d 0%, #07080b 52%, #050608 100%)",
    color: "#f0e6d0",
    fontFamily: "'Inter',sans-serif",
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
    height: 320,
    background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 34%, transparent 72%)",
    filter: "blur(18px)",
  },
  ambientGlowB: {
    position: "absolute",
    right: -120,
    top: 200,
    width: 340,
    height: 340,
    background: "radial-gradient(circle, rgba(180,190,220,0.05) 0%, transparent 72%)",
    filter: "blur(22px)",
  },
  ambientOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.16) 40%, rgba(0,0,0,0.28) 100%)",
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
  loadingText: {
    fontFamily: "'Cinzel',serif",
    fontSize: 18,
    color: "#c9a84c",
  },
  backBtn: {
    padding: "10px 20px",
    background: "rgba(201,168,76,0.12)",
    border: "1px solid rgba(201,168,76,0.24)",
    borderRadius: 10,
    color: "#c9a84c",
    cursor: "pointer",
    fontFamily: "'Inter',sans-serif",
    fontSize: 13,
  },

  topBar: {
    position: "sticky",
    top: 0,
    zIndex: 30,
    background: "rgba(8,8,10,0.84)",
    borderBottom: "1px solid rgba(201,168,76,0.10)",
    backdropFilter: "blur(16px)",
  },
  topBarInner: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "16px 24px 14px",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    gap: 18,
  },
  topLeft: {
    minWidth: 0,
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  backLink: {
    display: "inline-block",
    fontSize: 13,
    color: "rgba(240,230,208,0.56)",
    cursor: "pointer",
    marginBottom: 10,
    transition: "color 0.2s",
  },
  chapterInfo: {
    minWidth: 0,
  },
  chapterEyebrow: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "#c9a84c",
    marginBottom: 6,
  },
  chapterTitle: {
    fontFamily: "'Cinzel',serif",
    fontSize: "clamp(20px, 3vw, 30px)",
    fontWeight: 700,
    color: "#f0e6d0",
    lineHeight: 1.2,
  },
  modeBtn: {
    padding: "10px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    color: "#f0e6d0",
    fontSize: 13,
    fontWeight: 600,
  },
  ghostBtn: {
    padding: "10px 14px",
    background: "rgba(201,168,76,0.10)",
    border: "1px solid rgba(201,168,76,0.18)",
    borderRadius: 10,
    color: "#c9a84c",
    fontSize: 13,
    fontWeight: 600,
  },
  progressWrap: {
    height: 3,
    background: "rgba(255,255,255,0.05)",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#c9a84c,#8b6914)",
    transition: "width 0.2s ease",
  },
  floatingShowBtn: {
    position: "fixed",
    right: 18,
    top: 18,
    zIndex: 35,
    padding: "10px 14px",
    background: "rgba(8,8,10,0.82)",
    border: "1px solid rgba(201,168,76,0.20)",
    borderRadius: 999,
    color: "#c9a84c",
    fontSize: 13,
    fontWeight: 700,
  },

  readArea: {
    position: "relative",
    zIndex: 1,
    minHeight: "calc(100vh - 156px)",
    padding: "24px 16px 28px",
  },
  scrollPages: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  pageModeWrap: {
    textAlign: "center",
  },
  emptyMsg: {
    textAlign: "center",
    padding: "90px 0",
    color: "rgba(240,230,208,0.30)",
    fontSize: 15,
  },

  pageControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 12,
    flexWrap: "wrap",
  },
  pageBtn: {
    padding: "10px 18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    color: "#f0e6d0",
    fontSize: 13,
    fontWeight: 600,
  },
  pageCount: {
    minWidth: 74,
    textAlign: "center",
    color: "#c9a84c",
    fontWeight: 700,
    fontSize: 13,
  },
  keyboardHint: {
    marginTop: 10,
    fontSize: 11,
    color: "rgba(240,230,208,0.30)",
  },

  bottomBar: {
    position: "sticky",
    bottom: 0,
    zIndex: 25,
    background: "rgba(8,8,10,0.88)",
    borderTop: "1px solid rgba(201,168,76,0.10)",
    backdropFilter: "blur(16px)",
  },
  bottomBarInner: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  navBtnPrimary: {
    padding: "12px 18px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
    color: "#080808",
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  navBtnSecondary: {
    padding: "12px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    color: "#f0e6d0",
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  chapterSelect: {
    flex: 1,
    maxWidth: 360,
    padding: "11px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    color: "#f0e6d0",
    fontSize: 13,
    outline: "none",
    cursor: "pointer",
  },
};