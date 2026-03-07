"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); // từ DB — có role chính xác
  const [activeTab, setActiveTab] = useState<"history" | "following">("history");
  const [history, setHistory] = useState<any[]>([]);
  const [follows, setFollows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy session để check đăng nhập, nhưng lấy role từ /api/me (DB)
    import("next-auth/react").then(({ getSession }) => {
      getSession().then(async s => {
        if (!s) { router.push("/"); return; }

        // Fetch role thực từ DB
        const meRes = await fetch("/api/me");
        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }

        // Fetch history + follows song song
        const [h, f] = await Promise.all([
          fetch("/api/history").then(r => r.json()),
          fetch("/api/follow").then(r => r.json()),
        ]);
        setHistory(h.history || []);
        setFollows(f.follows || []);
        setLoading(false);
      });
    });
  }, []);

  const isAuthor = user?.role === "author" || user?.role === "admin";

  async function handleLogout() {
    const { signOut } = await import("next-auth/react");
    await signOut({ redirect: false });
    router.push("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; background: transparent; }
        .card-hover { transition: all 0.25s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-3px); background: rgba(201,168,76,0.04) !important; }
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
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isAuthor && (
            <button className="gold-btn" onClick={() => router.push("/dashboard")} style={{ padding: "8px 18px", borderRadius: "7px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700 }}>📊 Dashboard</button>
          )}
          <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", padding: "7px 16px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer" }}>← Trang chủ</button>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

        {/* PROFILE HEADER */}
        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: 32, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "16px" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #8b6914)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0, overflow: "hidden" }}>
            {user?.image ? <img src={user.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#f0e6d0", marginBottom: 6 }}>{user?.name || "..."}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.4)", marginBottom: 12 }}>{user?.email}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "20px", background: isAuthor ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${isAuthor ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.08)"}` }}>
              <span style={{ fontSize: 13 }}>{isAuthor ? "✍️" : "📖"}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: isAuthor ? "#c9a84c" : "rgba(240,230,208,0.4)", fontWeight: 600 }}>{isAuthor ? "Tác Giả" : "Độc Giả"}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {[["THEO DÕI", follows.length], ["ĐÃ ĐỌC", history.length]].map(([label, val]) => (
              <div key={label as string} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: "#c9a84c", fontWeight: 600 }}>{val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", marginTop: 4 }}>{label as string}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTHOR BANNER */}
        {isAuthor ? (
          <div className="fade-up" style={{ marginBottom: 32, padding: "24px 28px", background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(139,105,20,0.04))", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: "#c9a84c", marginBottom: 6, letterSpacing: "0.05em" }}>✦ Dành Cho Tác Giả</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.45)", lineHeight: 1.6 }}>Quản lý manga, thêm chapter mới, xem thống kê lượt đọc.</div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button className="gold-btn" onClick={() => router.push("/dashboard")} style={{ padding: "11px 24px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700 }}>📊 Vào Dashboard</button>
              <button onClick={() => router.push("/")} style={{ padding: "11px 20px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>+ Đăng Manga</button>
            </div>
          </div>
        ) : (
          <div className="fade-up" style={{ marginBottom: 32, padding: "24px 28px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: "#c9a84c", marginBottom: 6, letterSpacing: "0.05em" }}>✦ Bạn muốn chia sẻ câu chuyện của mình?</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.4)", lineHeight: 1.6 }}>Đăng ký trở thành tác giả — miễn phí, không giới hạn sáng tác.</div>
            </div>
            <button className="gold-btn" onClick={() => router.push("/become-author")} style={{ padding: "11px 24px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>✦ Trở Thành Tác Giả</button>
          </div>
        )}

        {/* TABS */}
        <div style={{ display: "flex", gap: "0", marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {[["history", "📜 Lịch Sử Đọc", history.length], ["following", "🔖 Đang Theo Dõi", follows.length]].map(([tab, label, count]) => (
            <button key={tab as string} className="tab-btn" onClick={() => setActiveTab(tab as any)} style={{ padding: "12px 24px", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: activeTab === tab ? "#c9a84c" : "rgba(240,230,208,0.4)", borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent", marginBottom: "-1px", display: "flex", alignItems: "center", gap: "8px" }}>
              {label as string}
              <span style={{ padding: "2px 8px", borderRadius: "10px", background: activeTab === tab ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)", fontSize: 11, color: activeTab === tab ? "#c9a84c" : "rgba(240,230,208,0.3)" }}>{count as number}</span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(240,230,208,0.3)", fontFamily: "'Inter', sans-serif" }}>Đang tải...</div>
        ) : activeTab === "history" ? (
          <div className="fade-up">
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div className="float" style={{ fontSize: 52, marginBottom: 16 }}>📖</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(240,230,208,0.3)", marginBottom: 20 }}>Chưa có lịch sử đọc</div>
                <button className="gold-btn" onClick={() => router.push("/")} style={{ padding: "11px 28px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>Khám phá manga</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {history.map((h: any) => (
                  <div key={h.id} className="card-hover" onClick={() => router.push(`/manga/${h.mangaId}/chapter/${h.chapterId}`)} style={{ display: "flex", gap: "16px", padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <div style={{ width: 60, height: 80, borderRadius: "6px", overflow: "hidden", background: "rgba(201,168,76,0.05)", flexShrink: 0 }}>
                      {h.manga?.coverImage ? <img src={h.manga.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📖</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#f0e6d0", marginBottom: 6 }}>{h.manga?.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.35)", marginBottom: 10 }}>@{h.manga?.author?.name} · {h.manga?._count?.chapters} chapters</div>
                      <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "20px", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c" }}>
                        Chapter {h.chapter?.chapterNum} — {h.chapter?.title}
                      </div>
                    </div>
                    <div style={{ alignSelf: "center", color: "#c9a84c", fontSize: 18 }}>→</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="fade-up">
            {follows.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div className="float" style={{ fontSize: 52, marginBottom: 16 }}>🔖</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(240,230,208,0.3)", marginBottom: 20 }}>Chưa theo dõi manga nào</div>
                <button className="gold-btn" onClick={() => router.push("/")} style={{ padding: "11px 28px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>Khám phá manga</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px" }}>
                {follows.map((f: any) => (
                  <div key={f.id} className="card-hover" onClick={() => router.push(`/manga/${f.mangaId}`)}>
                    <div style={{ borderRadius: "8px", overflow: "hidden", aspectRatio: "3/4", background: "rgba(201,168,76,0.05)", marginBottom: 8, border: "1px solid rgba(201,168,76,0.08)" }}>
                      {f.manga?.coverImage ? <img src={f.manga.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>📖</div>}
                    </div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: "#f0e6d0", marginBottom: 4, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as any}>{f.manga?.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.35)" }}>{f.manga?._count?.chapters} chapters</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LOGOUT */}
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid rgba(255,60,60,0.2)", borderRadius: "8px", padding: "10px 28px", color: "rgba(255,80,80,0.6)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}
