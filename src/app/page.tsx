"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const GENRES = ["Tất cả", "Action", "Fantasy", "Sci-Fi", "Horror", "Romance", "Cyberpunk"];

export default function Home() {
  const router = useRouter();
  const [mangas, setMangas] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredManga, setHoveredManga] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchMangas(); }, [selectedGenre, searchQuery]);

  async function fetchMangas() {
    const params = new URLSearchParams();
    if (selectedGenre !== "Tất cả") params.set("genre", selectedGenre);
    if (searchQuery) params.set("q", searchQuery);
    const res = await fetch(`/api/manga?${params}`);
    const data = await res.json();
    setMangas(data.mangas || []);
  }

  async function handleAuth() {
    setLoading(true); setMsg("");
    try {
      if (authMode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) { setMsg("✅ Đăng ký thành công! Hãy đăng nhập."); setAuthMode("login"); }
        else setMsg("❌ " + data.error);
      } else {
        const { signIn } = await import("next-auth/react");
        const res = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
        if (res?.ok) { setIsLoggedIn(true); setShowAuth(false); }
        else setMsg("❌ Email hoặc mật khẩu sai!");
      }
    } catch { setMsg("❌ Lỗi kết nối!"); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#c9a84c, #8b6914); border-radius: 2px; }
        body { background: #080808; }

        .manga-card { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); cursor: pointer; position: relative; }
        .manga-card:hover { transform: translateY(-10px); }
        .manga-card::before { content: ''; position: absolute; inset: -1px; background: linear-gradient(135deg, rgba(201,168,76,0.3), transparent, rgba(201,168,76,0.1)); border-radius: 10px; opacity: 0; transition: opacity 0.3s; z-index: 1; pointer-events: none; }
        .manga-card:hover::before { opacity: 1; }

        .gold-btn { background: linear-gradient(135deg, #c9a84c, #8b6914, #c9a84c); background-size: 200% auto; transition: all 0.3s ease; cursor: pointer; border: none; animation: shimmer 3s linear infinite; }
        .gold-btn:hover { background-position: right center; box-shadow: 0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.1); transform: translateY(-2px); }
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }

        .glass-card { background: rgba(255,255,255,0.02); backdrop-filter: blur(20px); border: 1px solid rgba(201,168,76,0.15); }
        .input-luxury { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.2); border-radius: 6px; color: #f0e6d0; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: all 0.3s; }
        .input-luxury:focus { border-color: #c9a84c; background: rgba(201,168,76,0.05); box-shadow: 0 0 20px rgba(201,168,76,0.1); }
        .input-luxury::placeholder { color: rgba(240,230,208,0.25); }

        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
        @keyframes fadeUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-box { animation: fadeUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }

        .genre-pill { transition: all 0.25s ease; cursor: pointer; border: none; position: relative; overflow: hidden; }
        .genre-pill::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.2), transparent); opacity: 0; transition: opacity 0.3s; }
        .genre-pill:hover::after { opacity: 1; }

        .hero-line { height: 1px; background: linear-gradient(90deg, transparent, #c9a84c, transparent); }
        
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .float-anim { animation: float 4s ease-in-out infinite; }

        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #c9a84c; }

        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .title-gradient { background: linear-gradient(135deg, #f0e6d0, #c9a84c, #f0e6d0, #8b6914, #c9a84c); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: gradientMove 5s ease infinite; }
      `}</style>

      {/* AMBIENT BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.92)", borderBottom: "1px solid rgba(201,168,76,0.12)", backdropFilter: "blur(20px)", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #c9a84c, #8b6914)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 18, color: "#080808", boxShadow: "0 4px 15px rgba(201,168,76,0.3)" }}>墨</div>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.12em", color: "#f0e6d0" }}>INKVERSE</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase", marginTop: -2 }}>AI Manga Platform</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Khám Phá", "Bảng Xếp Hạng", "Tác Giả"].map(item => (
            <span key={item} className="nav-link" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)", letterSpacing: "0.05em" }}>{item}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="gold-btn" onClick={() => setShowUpload(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 20px", borderRadius: "6px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>
            ✦ Đăng Mainga
          </button>
          {isLoggedIn ? (
            <div onClick={() => router.push("/profile")} style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #8b6914)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, boxShadow: "0 0 15px rgba(201,168,76,0.3)" }}>👤</div>
          ) : (
            <button onClick={() => setShowAuth(true)} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "6px", padding: "8px 18px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.6)", cursor: "pointer", transition: "all 0.3s", letterSpacing: "0.05em" }}>Đăng nhập</button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", zIndex: 1, padding: "100px 40px 80px", textAlign: "center", overflow: "hidden" }}>
        <div className="hero-line" style={{ maxWidth: 200, margin: "0 auto 24px" }} />
        
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.4em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 24 }}>
          ✦ Nền Tảng Đọc Và Sáng Tác Mainga Hàng Đầu ✦
        </div>

        <h1 style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1.0, marginBottom: 8, letterSpacing: "0.02em" }}>
  <span className="title-gradient">THẾ GIỚI MA</span><span style={{ color: "#c9a84c", textShadow: "0 0 30px rgba(201,168,76,0.8), 0 0 60px rgba(201,168,76,0.4)", WebkitTextFillColor: "#c9a84c" }}>I</span><span className="title-gradient">NGA</span>
</h1>
       <h1 style={{ fontFamily: "'Cinzel', serif", fontWeight: 400, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.2, marginBottom: 32, letterSpacing: "0.15em", color: "rgba(240,230,208,0.4)" }}>
  MA<span style={{ color: "#c9a84c", textShadow: "0 0 20px rgba(201,168,76,0.6)", fontWeight: 700 }}>I</span>NGA · LÀ KHÔNG CÓ GIỚI HẠN
</h1>

        <div className="hero-line" style={{ maxWidth: 300, margin: "0 auto 32px" }} />

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(240,230,208,0.45)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.8, fontWeight: 300, letterSpacing: "0.03em" }}>
          Mainga là sự kết hợp giữa Manga & AI. Nơi mà chính bạn là "main" của câu chuyện của mình.
        </p>

        {/* SEARCH */}
        <div style={{ display: "flex", alignItems: "center", maxWidth: 560, margin: "0 auto 64px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "40px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,168,76,0.1)" }}>
          <div style={{ padding: "0 20px", color: "#c9a84c", fontSize: 16 }}>✦</div>
          <input type="text" placeholder="Tìm kiếm manga, tác giả, thể loại..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: "16px 0", background: "transparent", border: "none", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none" }} />
        </div>

        {/* STATS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "64px", flexWrap: "wrap" }}>
          {[["12,400+", "Bộ Manga", "📚"], ["890K+", "Lượt Đọc", "👁"], ["34K+", "Tác Giả", "✍"]].map(([num, label, icon]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 3vw, 36px)", color: "#c9a84c", fontWeight: 600, letterSpacing: "0.05em" }}>{num}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>{icon} {label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: 40 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3))" }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase" }}>✦ Manga Mới Nhất ✦</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)" }} />
        </div>

        {/* GENRE FILTER */}
        <div style={{ display: "flex", gap: "8px", marginBottom: 40, flexWrap: "wrap", justifyContent: "center" }}>
          {GENRES.map(g => (
            <button key={g} className="genre-pill" onClick={() => setSelectedGenre(g)} style={{ padding: "7px 18px", borderRadius: "30px", background: selectedGenre === g ? "linear-gradient(135deg, #c9a84c, #8b6914)" : "rgba(255,255,255,0.03)", border: selectedGenre === g ? "none" : "1px solid rgba(201,168,76,0.15)", color: selectedGenre === g ? "#080808" : "rgba(240,230,208,0.45)", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: selectedGenre === g ? 600 : 400, letterSpacing: "0.08em", boxShadow: selectedGenre === g ? "0 4px 15px rgba(201,168,76,0.3)" : "none" }}>
              {g}
            </button>
          ))}
        </div>

        {/* MANGA GRID */}
        {mangas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div className="float-anim" style={{ fontSize: 64, marginBottom: 24 }}>📜</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "rgba(240,230,208,0.3)", marginBottom: 8 }}>Chưa có manga nào</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.2)", letterSpacing: "0.1em" }}>HÃY LÀ NGƯỜI ĐẦU TIÊN ĐĂNG TẢI</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "24px", marginBottom: 80 }}>
            {mangas.map((manga: any) => (
              <div key={manga.id} className="manga-card" onMouseEnter={() => setHoveredManga(manga.id)} onMouseLeave={() => setHoveredManga(null)} onClick={() => router.push(`/manga/${manga.id}`)}>
                <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "3/4", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.1)", marginBottom: 12 }}>
                  {manga.coverImage ? (
                    <img src={manga.coverImage} alt={manga.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, background: "linear-gradient(135deg, rgba(201,168,76,0.05), rgba(201,168,76,0.02))" }}>📖</div>
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(transparent, rgba(8,8,8,0.95))" }} />
                  <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#c9a84c", fontSize: 11, fontWeight: 500 }}>⭐ {manga.avgRating?.toFixed(1) || "0.0"}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(240,230,208,0.4)", fontSize: 10 }}>👁 {manga.views}</span>
                  </div>
                  {hoveredManga === manga.id && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(201,168,76,0.08)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
                      <div style={{ padding: "10px 22px", background: "linear-gradient(135deg, #c9a84c, #8b6914)", borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#080808", boxShadow: "0 4px 20px rgba(201,168,76,0.4)" }}>Đọc Ngay</div>
                    </div>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, color: "#f0e6d0", marginBottom: 4, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as any}>{manga.title}</h3>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.05em" }}>@{manga.author?.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAuth(false)}>
          <div className="modal-box glass-card" style={{ borderRadius: "16px", padding: "48px", width: "100%", maxWidth: 420, border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.05)" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #c9a84c, #8b6914)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 22, color: "#080808", margin: "0 auto 20px", boxShadow: "0 8px 25px rgba(201,168,76,0.3)" }}>墨</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: "#f0e6d0", letterSpacing: "0.1em", marginBottom: 6 }}>{authMode === "login" ? "CHÀO MỪNG" : "TẠO TÀI KHOẢN"}</h2>
              <div className="hero-line" style={{ maxWidth: 80, margin: "12px auto 0" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: 24 }}>
              {authMode === "register" && <input className="input-luxury" placeholder="Tên của bạn..." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />}
              <input className="input-luxury" type="email" placeholder="Email..." value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className="input-luxury" type="password" placeholder="Mật khẩu..." value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {msg && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, marginBottom: 16, textAlign: "center", color: msg.includes("✅") ? "#c9a84c" : "#ff6b6b" }}>{msg}</div>}
            <button className="gold-btn" onClick={handleAuth} disabled={loading} style={{ width: "100%", padding: "14px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 20, letterSpacing: "0.1em", opacity: loading ? 0.7 : 1 }}>
              {loading ? "ĐANG XỬ LÝ..." : authMode === "login" ? "ĐĂNG NHẬP" : "TẠO TÀI KHOẢN"}
            </button>
            <div style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.35)" }}>
              {authMode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <span onClick={() => { setAuthMode(m => m === "login" ? "register" : "login"); setMsg(""); }} style={{ color: "#c9a84c", cursor: "pointer", fontWeight: 600 }}>{authMode === "login" ? "Đăng ký ngay" : "Đăng nhập"}</span>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowUpload(false)}>
          <div className="modal-box glass-card" style={{ borderRadius: "16px", padding: "40px", width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: 32 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#f0e6d0", letterSpacing: "0.08em" }}>
                {uploadStep === 1 ? "✦ THÔNG TIN MANGA" : uploadStep === 2 ? "✦ TẢI ẢNH CHAPTER" : "✦ XÁC NHẬN ĐĂNG"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: 32 }}>
              {[1,2,3].map(s => (
                <div key={s} style={{ flex: 1, height: 2, background: s <= uploadStep ? "linear-gradient(90deg, #c9a84c, #8b6914)" : "rgba(255,255,255,0.08)", borderRadius: 1, transition: "all 0.3s" }} />
              ))}
            </div>

            {uploadStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input className="input-luxury" placeholder="Tên manga *" />
                <textarea className="input-luxury" rows={3} placeholder="Mô tả câu chuyện..." style={{ resize: "none" }} />
                <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} style={{ border: `1px dashed ${dragOver ? "#c9a84c" : "rgba(201,168,76,0.2)"}`, borderRadius: "8px", padding: "32px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", background: dragOver ? "rgba(201,168,76,0.05)" : "transparent" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>🖼</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.35)", letterSpacing: "0.05em" }}>KÉO THẢ ẢNH BÌA VÀO ĐÂY</div>
                </div>
              </div>
            )}
            {uploadStep === 2 && (
              <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); }} style={{ border: `1px dashed ${dragOver ? "#c9a84c" : "rgba(201,168,76,0.2)"}`, borderRadius: "8px", padding: "60px 32px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", background: dragOver ? "rgba(201,168,76,0.05)" : "transparent" }}>
                <div className="float-anim" style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "rgba(240,230,208,0.5)", marginBottom: 8 }}>Kéo thả ảnh manga vào đây</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.25)", letterSpacing: "0.1em" }}>JPG · PNG · WEBP — TỐI ĐA 50 TRANG</div>
              </div>
            )}
            {uploadStep === 3 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div className="float-anim" style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(240,230,208,0.6)", lineHeight: 1.7 }}>Manga của bạn sẵn sàng được đăng lên thế giới!</div>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", marginTop: 32 }}>
              {uploadStep > 1 && <button onClick={() => setUploadStep(s => s - 1)} style={{ flex: 1, padding: "13px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer", letterSpacing: "0.08em" }}>← QUAY LẠI</button>}
              <button className="gold-btn" onClick={() => uploadStep < 3 ? setUploadStep(s => s + 1) : setShowUpload(false)} style={{ flex: 2, padding: "13px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
                {uploadStep === 3 ? "✦ ĐĂNG MANGA" : "TIẾP THEO →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(201,168,76,0.1)", padding: "32px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: "#c9a84c", letterSpacing: "0.2em", marginBottom: 8 }}>INKVERSE</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.2)", letterSpacing: "0.15em" }}>© 2025 · NỀN TẢNG MANGA AI · ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}