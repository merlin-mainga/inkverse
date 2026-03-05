"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "mangas" | "upload">("overview");
  const [session, setSession] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    import("next-auth/react").then(({ getSession }) => {
      getSession().then(s => {
        if (!s) { router.push("/"); return; }
        setSession(s);
        fetchMyMangas();
      });
    });
  }, []);

  async function fetchMyMangas() {
    setLoading(true);
    const res = await fetch("/api/manga?mine=true");
    const data = await res.json();
    setMangas(data.mangas || []);
    setLoading(false);
  }

  async function deleteManga(id: string) {
    await fetch(`/api/manga/${id}`, { method: "DELETE" });
    setMangas(m => m.filter(x => x.id !== id));
    setShowDeleteConfirm(null);
  }

  const totalViews = mangas.reduce((a, m) => a + (m.views || 0), 0);
  const totalChapters = mangas.reduce((a, m) => a + (m._count?.chapters || 0), 0);
  const avgRating = mangas.length > 0 ? (mangas.reduce((a, m) => a + (m.avgRating || 0), 0) / mangas.length).toFixed(1) : "0.0";

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .tab-btn:hover { opacity: 0.8; }
        .manga-row { transition: background 0.2s; }
        .manga-row:hover { background: rgba(201,168,76,0.04) !important; }
        .action-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .action-btn:hover { transform: translateY(-1px); opacity: 0.85; }
        .gold-btn { background: linear-gradient(135deg, #c9a84c, #8b6914); transition: all 0.3s; cursor: pointer; border: none; }
        .gold-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.3); }
        @keyframes fadeUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .fade-up { animation: fadeUp 0.4s ease; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.95)", borderBottom: "1px solid rgba(201,168,76,0.12)", backdropFilter: "blur(20px)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <img src="/logo.png" alt="logo" style={{ width: 34, height: 34, borderRadius: "8px", objectFit: "contain" }} />
          <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em" }}>M<span style={{ color: "#c9a84c" }}>AI</span>NGA</div>
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: "rgba(240,230,208,0.4)", letterSpacing: "0.15em" }}>📊 AUTHOR DASHBOARD</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", padding: "7px 16px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer" }}>← Trang chủ</button>
          <button className="gold-btn" onClick={() => setActiveTab("upload")} style={{ padding: "7px 16px", borderRadius: "6px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600 }}>✦ Đăng Manga Mới</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* WELCOME */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 8 }}>✦ Chào mừng trở lại</div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "0.05em" }}>{session?.user?.name || "Tác Giả"}</h1>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "4px", marginBottom: 40, background: "rgba(255,255,255,0.02)", borderRadius: "10px", padding: "4px", border: "1px solid rgba(201,168,76,0.1)", width: "fit-content" }}>
          {[["overview", "📊 Tổng Quan"], ["mangas", "📚 Manga Của Tôi"], ["upload", "✦ Đăng Mới"]].map(([tab, label]) => (
            <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab as any)} style={{ padding: "9px 20px", borderRadius: "8px", background: activeTab === tab ? "linear-gradient(135deg, #c9a84c, #8b6914)" : "transparent", color: activeTab === tab ? "#080808" : "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: activeTab === tab ? 600 : 400, letterSpacing: "0.05em" }}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="fade-up">
            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: 40 }}>
              {[
                ["📚", mangas.length, "Tổng Manga"],
                ["👁", totalViews.toLocaleString(), "Lượt Xem"],
                ["📖", totalChapters, "Tổng Chapter"],
                ["⭐", avgRating, "Rating TB"],
              ].map(([icon, val, label]) => (
                <div key={label as string} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 30, color: "#c9a84c", fontWeight: 600, marginBottom: 4 }}>{val}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label as string}</div>
                </div>
              ))}
            </div>

            {/* TOP MANGA */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", padding: "28px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#c9a84c", marginBottom: 24, letterSpacing: "0.08em" }}>🔥 Manga Nổi Bật</div>
              {mangas.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div className="float" style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.3)", marginBottom: 20 }}>Bạn chưa có manga nào</div>
                  <button className="gold-btn" onClick={() => setActiveTab("upload")} style={{ padding: "12px 28px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Manga Đầu Tiên</button>
                </div>
              ) : (
                mangas.sort((a, b) => b.views - a.views).slice(0, 5).map((m, i) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: i < 3 ? "#c9a84c" : "rgba(240,230,208,0.2)", minWidth: 36, textAlign: "center" }}>#{i + 1}</div>
                    <div style={{ width: 44, height: 60, borderRadius: "6px", overflow: "hidden", background: "rgba(201,168,76,0.05)", flexShrink: 0 }}>
                      {m.coverImage ? <img src={m.coverImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📖</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#f0e6d0", marginBottom: 4, fontWeight: 500 }}>{m.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>{m._count?.chapters || 0} chapters · ⭐ {m.avgRating?.toFixed(1) || "0.0"}</div>
                    </div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#c9a84c" }}>👁 {m.views}</div>
                    <button className="action-btn" onClick={() => router.push(`/manga/${m.id}`)} style={{ padding: "6px 14px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>Xem</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MY MANGAS */}
        {activeTab === "mangas" && (
          <div className="fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.4)" }}>Tổng: {mangas.length} manga</div>
              <button className="gold-btn" onClick={() => setActiveTab("upload")} style={{ padding: "9px 20px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Mới</button>
            </div>

            {mangas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div className="float" style={{ fontSize: 56, marginBottom: 20 }}>📚</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(240,230,208,0.3)", marginBottom: 24 }}>Chưa có manga nào</div>
                <button className="gold-btn" onClick={() => setActiveTab("upload")} style={{ padding: "12px 28px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Manga Đầu Tiên</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {mangas.map(m => (
                  <div key={m.id} className="manga-row" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ position: "relative", height: 160, background: "rgba(201,168,76,0.03)" }}>
                      {m.coverImage ? <img src={m.coverImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>📖</div>}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(8,8,8,0.95))" }} />
                      <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#f0e6d0", marginBottom: 4 }}>{m.title}</div>
                        <div style={{ display: "flex", gap: "12px" }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#c9a84c" }}>👁 {m.views}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#c9a84c" }}>⭐ {m.avgRating?.toFixed(1) || "0.0"}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.4)" }}>📖 {m._count?.chapters || 0} ch</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "16px", display: "flex", gap: "8px" }}>
                      <button className="action-btn" onClick={() => router.push(`/manga/${m.id}`)} style={{ flex: 1, padding: "8px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "6px", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>👁 Xem</button>
                      <button className="action-btn" onClick={() => router.push(`/manga/${m.id}/edit`)} style={{ flex: 1, padding: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>✏️ Sửa</button>
                      <button className="action-btn" onClick={() => setShowDeleteConfirm(m.id)} style={{ padding: "8px 12px", background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.15)", borderRadius: "6px", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPLOAD TAB */}
        {activeTab === "upload" && (
          <div className="fade-up" style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "40px" }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, marginBottom: 8, letterSpacing: "0.08em" }}>✦ Đăng Manga Mới</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.35)", marginBottom: 32 }}>Chia sẻ tác phẩm của bạn với cộng đồng.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none" }} placeholder="Tên manga *" />
                <textarea rows={4} style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none", resize: "none" }} placeholder="Mô tả câu chuyện..." />
                <div onClick={() => document.getElementById('dash-cover')?.click()} style={{ border: "1px dashed rgba(201,168,76,0.2)", borderRadius: "8px", padding: "32px", textAlign: "center", cursor: "pointer", transition: "all 0.3s" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🖼</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.3)" }}>Tải ảnh bìa lên</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c", marginTop: 6 }}>Click để chọn từ PC</div>
                  <input id="dash-cover" type="file" accept="image/*" style={{ display: "none" }} />
                </div>
              </div>
              <button className="gold-btn" style={{ width: "100%", padding: "14px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, marginTop: 24, letterSpacing: "0.1em" }}>✦ ĐĂNG MANGA</button>
            </div>
          </div>
        )}
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
          <div style={{ background: "#111", border: "1px solid rgba(255,60,60,0.2)", borderRadius: "16px", padding: "40px", maxWidth: 400, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#f0e6d0", marginBottom: 12 }}>Xóa Manga?</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.4)", marginBottom: 32, lineHeight: 1.6 }}>Hành động này không thể hoàn tác. Tất cả chapter và dữ liệu sẽ bị xóa vĩnh viễn.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowDeleteConfirm(null)} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 14, cursor: "pointer" }}>Hủy</button>
              <button onClick={() => deleteManga(showDeleteConfirm)} style={{ flex: 1, padding: "12px", background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.3)", borderRadius: "8px", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Xóa Vĩnh Viễn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}