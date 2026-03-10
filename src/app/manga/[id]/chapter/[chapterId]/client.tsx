"use client";
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

  const [chapter, setChapter]   = useState<Chapter | null>(null);
  const [manga, setManga]       = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [readMode, setReadMode] = useState<"scroll" | "page">("scroll");

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentPage(0);

    Promise.all([
      fetch(`/api/chapters/${chapterId}`).then(r => { if (!r.ok) throw new Error("Không tìm thấy chapter"); return r.json(); }),
      fetch(`/api/manga/${id}`).then(r => { if (!r.ok) throw new Error("Không tìm thấy manga"); return r.json(); }),
      fetch(`/api/manga/${id}/chapters`).then(r => r.ok ? r.json() : []),
    ])
      .then(([ch, mg, chs]) => {
        setChapter(ch);
        setManga(mg);
        setChapters(Array.isArray(chs) ? chs : []);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [chapterId, id]);

  // ── Ghi read history khi đã load xong ──
  useEffect(() => {
    if (!chapter || !session?.user) return;
    fetch(`/api/manga/${id}/read-history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId }),
    }).catch(() => {}); // silent fail — không block UX
  }, [chapter, id, chapterId, session]);

  const currentIndex = chapters.findIndex(c => c.id === chapterId);
  const prevChapter  = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter  = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const goToChapter = useCallback(
    (cId: string) => router.push(`/manga/${id}/chapter/${cId}`),
    [id, router]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (readMode === "page") {
        if (e.key === "ArrowRight" || e.key === "ArrowDown")
          setCurrentPage(p => Math.min((chapter?.pages.length ?? 1) - 1, p + 1));
        if (e.key === "ArrowLeft" || e.key === "ArrowUp")
          setCurrentPage(p => Math.max(0, p - 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [readMode, chapter]);

  if (loading) return (
    <div style={S.loadingWrap}>
      <div style={S.spinner} />
      <p style={S.loadingText}>Đang tải chapter...</p>
    </div>
  );

  if (error) return (
    <div style={S.loadingWrap}>
      <p style={{ ...S.loadingText, color: "#e05c5c" }}>⚠ {error}</p>
      <button onClick={() => router.push(`/manga/${id}`)} style={S.backBtn}>← Quay lại manga</button>
    </div>
  );

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .page-img { display: block; max-width: 800px; width: 100%; margin: 0 auto; image-rendering: auto; }
        .nav-btn { transition: background 0.2s, transform 0.1s; }
        .nav-btn:hover:not(:disabled) { transform: scale(1.03); }
        .mode-btn:hover { background: rgba(201,168,76,0.2) !important; }
        .back-link:hover { color: #c9a84c !important; }
        select option { background: #111; color: #f0e6d0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* TOP NAV */}
      <div style={S.topNav}>
        <div style={S.topNavInner}>
          <span className="back-link" onClick={() => router.push(`/manga/${id}`)} style={S.backLink}>
            ← {manga?.title ?? "Quay lại"}
          </span>
          <span style={S.chapterTitle}>
            Chapter {chapter?.chapterNum} — {chapter?.title}
          </span>
          <button className="mode-btn nav-btn" onClick={() => setReadMode(m => m === "scroll" ? "page" : "scroll")} style={S.modeBtn}>
            {readMode === "scroll" ? "📄 Chế độ trang" : "📜 Chế độ cuộn"}
          </button>
        </div>
      </div>

      {/* PAGES */}
      <div style={S.pageArea}>
        {!chapter?.pages?.length ? (
          <div style={S.emptyMsg}>Chapter này chưa có ảnh</div>
        ) : readMode === "scroll" ? (
          <div>
            {chapter.pages.map((page, i) => (
              <img key={i} src={page} alt={`Trang ${i + 1}`} className="page-img" loading="lazy" style={{ marginBottom: 4 }} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img src={chapter.pages[currentPage]} alt={`Trang ${currentPage + 1}`} className="page-img" style={{ marginBottom: 16 }} />
            <div style={S.pageControls}>
              <button className="nav-btn" onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
                style={{ ...S.pageBtn, color: currentPage === 0 ? "rgba(240,230,208,0.2)" : "#c9a84c", cursor: currentPage === 0 ? "default" : "pointer" }}>
                ← Trang trước
              </button>
              <span style={S.pageCount}>{currentPage + 1} / {chapter.pages.length}</span>
              <button className="nav-btn" onClick={() => setCurrentPage(p => Math.min(chapter.pages.length - 1, p + 1))} disabled={currentPage === chapter.pages.length - 1}
                style={{ ...S.pageBtn, color: currentPage === chapter.pages.length - 1 ? "rgba(240,230,208,0.2)" : "#c9a84c", cursor: currentPage === chapter.pages.length - 1 ? "default" : "pointer" }}>
                Trang sau →
              </button>
            </div>
            <p style={S.keyboardHint}>Dùng ← → để chuyển trang</p>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={S.bottomNav}>
        <div style={S.bottomNavInner}>
          <button className="nav-btn" onClick={() => prevChapter && goToChapter(prevChapter.id)} disabled={!prevChapter}
            style={{ ...S.chapterBtn, background: prevChapter ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)", color: prevChapter ? "#c9a84c" : "rgba(240,230,208,0.2)", border: "1px solid rgba(201,168,76,0.2)", cursor: prevChapter ? "pointer" : "default" }}>
            ← Chapter trước
          </button>

          {chapters.length > 0 && (
            <select onChange={e => goToChapter(e.target.value)} value={chapterId as string} style={S.chapterSelect}>
              {chapters.map(c => (
                <option key={c.id} value={c.id}>Chapter {c.chapterNum}: {c.title}</option>
              ))}
            </select>
          )}

          <button className="nav-btn" onClick={() => nextChapter && goToChapter(nextChapter.id)} disabled={!nextChapter}
            style={{ ...S.chapterBtn, background: nextChapter ? "linear-gradient(135deg,#c9a84c,#8b6914)" : "rgba(255,255,255,0.03)", color: nextChapter ? "#080808" : "rgba(240,230,208,0.2)", fontWeight: 600, border: "none", cursor: nextChapter ? "pointer" : "default" }}>
            Chapter sau →
          </button>
        </div>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root:         { minHeight: "100vh", background: "#080808", color: "#f0e6d0", fontFamily: "'Inter',sans-serif" },
  loadingWrap:  { minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 },
  spinner:      { width: 40, height: 40, border: "3px solid rgba(201,168,76,0.2)", borderTop: "3px solid #c9a84c", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  loadingText:  { fontFamily: "'Cinzel',serif", fontSize: 18, color: "#c9a84c" },
  backBtn:      { padding: "8px 20px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, color: "#c9a84c", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 13 },
  topNav:       { position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.97)", borderBottom: "1px solid rgba(201,168,76,0.15)", backdropFilter: "blur(12px)", padding: "12px 24px" },
  topNavInner:  { maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 },
  backLink:     { fontSize: 13, color: "rgba(240,230,208,0.5)", cursor: "pointer", transition: "color 0.2s" },
  chapterTitle: { fontFamily: "'Cinzel',serif", fontSize: 16, color: "#c9a84c", fontWeight: 600, textAlign: "center", flex: 1 },
  modeBtn:      { padding: "6px 14px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "#c9a84c", fontSize: 12, cursor: "pointer" },
  pageArea:     { background: "#0d0d0d", minHeight: "calc(100vh - 120px)", padding: "20px 16px" },
  emptyMsg:     { textAlign: "center", padding: "80px 0", color: "rgba(240,230,208,0.3)", fontSize: 15 },
  pageControls: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16 },
  pageBtn:      { padding: "8px 20px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, fontSize: 13 },
  pageCount:    { fontSize: 13, color: "rgba(240,230,208,0.5)", minWidth: 60, textAlign: "center" },
  keyboardHint: { marginTop: 10, fontSize: 11, color: "rgba(240,230,208,0.25)" },
  bottomNav:    { background: "rgba(8,8,8,0.97)", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "16px 24px" },
  bottomNavInner:{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  chapterBtn:   { padding: "10px 20px", borderRadius: 8, fontSize: 13, flexShrink: 0 },
  chapterSelect:{ flex: 1, padding: "8px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "#f0e6d0", fontSize: 13, cursor: "pointer", outline: "none", maxWidth: 280 },
};