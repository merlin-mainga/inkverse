"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"history" | "following">("history");
  const [history, setHistory] = useState<any[]>([]);
  const [follows, setFollows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/history").then(r => r.json()),
      fetch("/api/follow").then(r => r.json()),
    ]).then(([h, f]) => {
      setHistory(h.history || []);
      setFollows(f.follows || []);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e0d4", fontFamily: "'Noto Serif', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Oswald:wght@400;600;700&family=Noto+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .manga-card { transition: transform 0.2s; cursor: pointer; }
        .manga-card:hover { transform: translateY(-4px); }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #c9411e, #8b1a0a)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>墨</div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 20 }}>INKVERSE</span>
        </div>
        <span onClick={() => router.push("/")} style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.5)", cursor: "pointer" }}>← Trang chủ</span>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #c9411e, #6a1a8a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>👤</div>
          <div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Trang Cá Nhân</h1>
            <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.4)" }}>
              {follows.length} đang theo dõi · {history.length} đã đọc
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "4px", marginBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
          {[["history", "📜 Lịch sử đọc"], ["following", "🔖 Đang theo dõi"]].map(([tab, label]) => (
            <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab as any)} style={{ padding: "12px 24px", background: "transparent", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, fontWeight: 500, color: activeTab === tab ? "#c9411e" : "rgba(232,224,212,0.5)", borderBottom: activeTab === tab ? "2px solid #c9411e" : "2px solid transparent", marginBottom: "-1px" }}>
              {label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "rgba(232,224,212,0.3)", fontFamily: "'Noto Sans', sans-serif" }}>Đang tải...</div>
        ) : activeTab === "history" ? (
          <div>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📖</div>
                <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 15, color: "rgba(232,224,212,0.3)" }}>Chưa có lịch sử đọc</div>
                <button onClick={() => router.push("/")} style={{ marginTop: 20, padding: "10px 24px", background: "#c9411e", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>Khám phá manga</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {history.map((h: any) => (
                  <div key={h.id} className="manga-card" onClick={() => router.push(`/manga/${h.mangaId}/chapter/${h.chapterId}`)} style={{ display: "flex", gap: "16px", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
                    <div style={{ width: 60, height: 80, borderRadius: "6px", overflow: "hidden", background: "rgba(255,255,255,0.05)", flexShrink: 0 }}>
                      {h.manga?.coverImage ? <img src={h.manga.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📖</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{h.manga?.title}</h3>
                      <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "rgba(232,224,212,0.4)", marginBottom: 8 }}>@{h.manga?.author?.name} · {h.manga?._count?.chapters} chapters</div>
                      <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(201,65,30,0.15)", border: "1px solid rgba(201,65,30,0.3)", borderRadius: "20px", fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "#c9411e" }}>
                        Đang đọc: Chapter {h.chapter?.chapterNum} — {h.chapter?.title}
                      </div>
                    </div>
                    <div style={{ alignSelf: "center", color: "rgba(232,224,212,0.3)", fontSize: 18 }}>→</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {follows.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔖</div>
                <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 15, color: "rgba(232,224,212,0.3)" }}>Chưa theo dõi manga nào</div>
                <button onClick={() => router.push("/")} style={{ marginTop: 20, padding: "10px 24px", background: "#c9411e", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>Khám phá manga</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
                {follows.map((f: any) => (
                  <div key={f.id} className="manga-card" onClick={() => router.push(`/manga/${f.mangaId}`)}>
                    <div style={{ borderRadius: "8px", overflow: "hidden", aspectRatio: "3/4", background: "rgba(255,255,255,0.05)", marginBottom: 8 }}>
                      {f.manga?.coverImage ? <img src={f.manga.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>📖</div>}
                    </div>
                    <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as any}>{f.manga?.title}</h3>
                    <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 11, color: "rgba(232,224,212,0.4)" }}>{f.manga?._count?.chapters} chapters</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}