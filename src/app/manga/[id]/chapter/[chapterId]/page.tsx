"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ChapterReader() {
  const { id, chapterId } = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState<any>(null);
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [readMode, setReadMode] = useState<"scroll" | "page">("scroll");

  useEffect(() => {
    Promise.all([
      fetch(`/api/chapters/${chapterId}`).then(r => r.json()),
      fetch(`/api/manga/${id}`).then(r => r.json()),
    ]).then(([ch, mg]) => {
      setChapter(ch);
      setManga(mg);
      setLoading(false);
    });
  }, [chapterId, id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#c9a84c" }}>Đang tải chapter...</div>
    </div>
  );

  const chapters = manga?.chapters || [];
  const currentIndex = chapters.findIndex((c: any) => c.id === chapterId);
  const prevChapter = chapters[currentIndex - 1];
  const nextChapter = chapters[currentIndex + 1];

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page-img { display: block; max-width: 800px; width: 100%; margin: 0 auto; }
      `}</style>

      {/* TOP NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.97)", borderBottom: "1px solid rgba(201,168,76,0.15)", backdropFilter: "blur(12px)", padding: "12px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span onClick={() => router.push(`/manga/${id}`)} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)", cursor: "pointer" }}>
            ← {manga?.title}
          </span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#c9a84c", fontWeight: 600 }}>
            Chapter {chapter?.chapterNum} — {chapter?.title}
          </span>
          <button onClick={() => setReadMode(m => m === "scroll" ? "page" : "scroll")} style={{ padding: "6px 14px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer" }}>
            {readMode === "scroll" ? "📄 Chế độ trang" : "📜 Chế độ cuộn"}
          </button>
        </div>
      </div>

      {/* PAGES */}
      <div style={{ background: "#0d0d0d", minHeight: "calc(100vh - 120px)", padding: "20px 16px" }}>
        {!chapter?.pages?.length ? (
          <div style={{ textAlign: "center", padding: "80px", color: "rgba(240,230,208,0.3)", fontFamily: "'Inter', sans-serif" }}>
            Chapter này chưa có ảnh
          </div>
        ) : readMode === "scroll" ? (
          <div>
            {chapter.pages.map((page: string, i: number) => (
              <img key={i} src={page} alt={`Trang ${i + 1}`} className="page-img" style={{ marginBottom: 4 }} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img src={chapter.pages[currentPage]} alt={`Trang ${currentPage + 1}`} className="page-img" style={{ marginBottom: 16 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: 16 }}>
              <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} style={{ padding: "8px 20px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: currentPage === 0 ? "rgba(240,230,208,0.2)" : "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: currentPage === 0 ? "default" : "pointer" }}>← Trang trước</button>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)" }}>{currentPage + 1} / {chapter.pages.length}</span>
              <button onClick={() => setCurrentPage(p => Math.min(chapter.pages.length - 1, p + 1))} disabled={currentPage === chapter.pages.length - 1} style={{ padding: "8px 20px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: currentPage === chapter.pages.length - 1 ? "rgba(240,230,208,0.2)" : "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: currentPage === chapter.pages.length - 1 ? "default" : "pointer" }}>Trang sau →</button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ background: "rgba(8,8,8,0.97)", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => prevChapter && router.push(`/manga/${id}/chapter/${prevChapter.id}`)} disabled={!prevChapter} style={{ padding: "10px 20px", background: prevChapter ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: prevChapter ? "#c9a84c" : "rgba(240,230,208,0.2)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: prevChapter ? "pointer" : "default" }}>
            ← Chapter trước
          </button>
          <select onChange={e => router.push(`/manga/${id}/chapter/${e.target.value}`)} value={chapterId as string} style={{ padding: "8px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer", outline: "none" }}>
            {chapters.map((c: any) => (
              <option key={c.id} value={c.id} style={{ background: "#111" }}>Chapter {c.chapterNum}: {c.title}</option>
            ))}
          </select>
          <button onClick={() => nextChapter && router.push(`/manga/${id}/chapter/${nextChapter.id}`)} disabled={!nextChapter} style={{ padding: "10px 20px", background: nextChapter ? "linear-gradient(135deg,#c9a84c,#8b6914)" : "rgba(255,255,255,0.03)", border: "none", borderRadius: "8px", color: nextChapter ? "#080808" : "rgba(240,230,208,0.2)", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: nextChapter ? "pointer" : "default" }}>
            Chapter sau →
          </button>
        </div>
      </div>
    </div>
  );
}