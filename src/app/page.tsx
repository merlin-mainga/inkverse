"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const GENRES = ["Tất cả", "Action", "Fantasy", "Sci-Fi", "Horror", "Romance", "Cyberpunk"];

export default function Home() {
  const [mangas, setMangas] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredManga, setHoveredManga] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchMangas();
  }, [selectedGenre, searchQuery]);

  async function fetchMangas() {
    const params = new URLSearchParams();
    if (selectedGenre !== "Tất cả") params.set("genre", selectedGenre);
    if (searchQuery) params.set("q", searchQuery);
    const res = await fetch(`/api/manga?${params}`);
    const data = await res.json();
    setMangas(data.mangas || []);
  }

  async function handleAuth() {
    setLoading(true);
    setMsg("");
    try {
      if (authMode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          setMsg("✅ Đăng ký thành công! Đăng nhập nhé!");
          setAuthMode("login");
        } else {
          setMsg("❌ " + data.error);
        }
      } else {
        const { signIn } = await import("next-auth/react");
        const res = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        if (res?.ok) {
          setIsLoggedIn(true);
          setShowAuth(false);
          setMsg("");
        } else {
          setMsg("❌ Email hoặc mật khẩu sai!");
        }
      }
    } catch (e) {
      setMsg("❌ Lỗi kết nối!");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e0d4", fontFamily: "'Noto Serif', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Oswald:wght@400;600;700&family=Noto+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #c9411e; border-radius: 2px; }
        .manga-card { transition: transform 0.3s ease; cursor: pointer; }
        .manga-card:hover { transform: translateY(-6px) scale(1.02); }
        .glow-btn { transition: all 0.25s ease; cursor: pointer; border: none; }
        .glow-btn:hover { box-shadow: 0 0 20px rgba(201,65,30,0.5) !important; transform: translateY(-1px); }
        .input-field { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e8e0d4; font-family: 'Noto Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #c9411e; }
        .input-field::placeholder { color: rgba(232,224,212,0.3); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-box { animation: slideUp 0.3s ease; }
        .genre-btn { transition: all 0.2s ease; cursor: pointer; border: none; }
        .upload-zone { transition: all 0.2s ease; }
        .upload-zone:hover { border-color: #c9411e !important; }
        .chip-new { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #c9411e, #8b1a0a)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>墨</div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "0.05em" }}>INKVERSE</span>
          <span style={{ fontSize: 10, color: "#c9411e", fontFamily: "'Noto Sans', sans-serif", letterSpacing: "0.1em" }}>AI MANGA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="glow-btn" onClick={() => setShowUpload(true)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#c9411e", borderRadius: "6px", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>
            ⬆ Đăng Manga
          </button>
          {isLoggedIn ? (
            <div onClick={() => router.push("/profile")} style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c9411e, #6a1a8a)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 16 }}>👤</div>
          ) : (
            <button onClick={() => setShowAuth(true)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "7px 14px", fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.7)", cursor: "pointer" }}>Đăng nhập</button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(180deg, rgba(201,65,30,0.08) 0%, transparent 100%)", padding: "60px 24px 48px", textAlign: "center" }}>
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ height: 1, width: 40, background: "rgba(201,65,30,0.5)" }} />
          <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#c9411e", textTransform: "uppercase" }}>Nền tảng manga AI hàng đầu</span>
          <div style={{ height: 1, width: 40, background: "rgba(201,65,30,0.5)" }} />
        </div>
        <h1 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.05, marginBottom: 16 }}>
          Thế Giới Manga<br /><span style={{ color: "#c9411e" }}>Do AI Sáng Tạo</span>
        </h1>
        <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 15, color: "rgba(232,224,212,0.5)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Khám phá hàng nghìn bộ manga được tạo bởi AI. Tự do đăng tải, chia sẻ và đọc manga của bạn.
        </p>
        <div style={{ display: "flex", alignItems: "center", maxWidth: 500, margin: "0 auto", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ padding: "0 16px", color: "rgba(232,224,212,0.3)" }}>🔍</div>
          <input type="text" placeholder="Tìm kiếm manga, tác giả..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="input-field" style={{ border: "none", borderRadius: 0, background: "transparent", flex: 1, padding: "14px 0" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: 48 }}>
          {[["12,400+", "Bộ Manga"], ["890K+", "Lượt Đọc"], ["34K+", "Tác Giả"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, color: "#c9411e", fontWeight: 700 }}>{num}</div>
              <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "rgba(232,224,212,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MANGA GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600 }}>🔥 Manga Mới Nhất</h2>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {GENRES.map(g => (
              <button key={g} className="genre-btn" onClick={() => setSelectedGenre(g)} style={{ padding: "5px 12px", borderRadius: "20px", background: selectedGenre === g ? "#c9411e" : "rgba(255,255,255,0.05)", color: selectedGenre === g ? "#fff" : "rgba(232,224,212,0.5)", fontFamily: "'Noto Sans', sans-serif", fontSize: 12, fontWeight: 500 }}>{g}</button>
            ))}
          </div>
        </div>

        {mangas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(232,224,212,0.3)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
            <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 16 }}>Chưa có manga nào. Hãy là người đầu tiên đăng!</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "20px" }}>
            {mangas.map((manga: any) => (
              <div key={manga.id} className="manga-card" onMouseEnter={() => setHoveredManga(manga.id)} onMouseLeave={() => setHoveredManga(null)}>
                <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", aspectRatio: "3/4", marginBottom: 10, background: "rgba(255,255,255,0.05)" }}>
                  {manga.coverImage ? (
                    <img src={manga.coverImage} alt={manga.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>📖</div>
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }} />
                  <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#f5a623", fontSize: 11, fontFamily: "'Noto Sans', sans-serif" }}>⭐ {manga.avgRating?.toFixed(1) || "0.0"}</span>
                    <span style={{ color: "rgba(232,224,212,0.5)", fontSize: 10, fontFamily: "'Noto Sans', sans-serif" }}>👁 {manga.views}</span>
                  </div>
                  {hoveredManga === manga.id && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(201,65,30,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <button onClick={() => router.push(`/manga/${manga.id}`)} style={{ background: "#c9411e", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "6px", fontFamily: "'Noto Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Đọc Ngay</button>
                    </div>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: 14, fontWeight: 600, color: "#e8e0d4", marginBottom: 4, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as any}>{manga.title}</h3>
                <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 11, color: "rgba(232,224,212,0.4)" }}>@{manga.author?.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAuth(false)}>
          <div className="modal-box" style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "36px", width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #c9411e, #8b1a0a)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 auto 16px" }}>墨</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, marginBottom: 4 }}>{authMode === "login" ? "Chào Mừng Trở Lại" : "Tạo Tài Khoản"}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: 20 }}>
              {authMode === "register" && <input className="input-field" placeholder="Tên của bạn..." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />}
              <input className="input-field" type="email" placeholder="Email..." value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className="input-field" type="password" placeholder="Mật khẩu..." value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {msg && <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{msg}</div>}
            <button className="glow-btn" onClick={handleAuth} disabled={loading} style={{ width: "100%", padding: "13px", borderRadius: "8px", background: "#c9411e", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 16, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Đang xử lý..." : authMode === "login" ? "Đăng Nhập" : "Tạo Tài Khoản"}
            </button>
            <div style={{ textAlign: "center", fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.4)" }}>
              {authMode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <span onClick={() => { setAuthMode(m => m === "login" ? "register" : "login"); setMsg(""); }} style={{ color: "#c9411e", cursor: "pointer", fontWeight: 600 }}>{authMode === "login" ? "Đăng ký" : "Đăng nhập"}</span>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowUpload(false)}>
          <div className="modal-box" style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "32px", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 24 }}>
              {uploadStep === 1 ? "📝 Thông Tin Manga" : uploadStep === 2 ? "📂 Tải Ảnh Chapter" : "🚀 Xác Nhận Đăng"}
            </h2>
            {uploadStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input className="input-field" placeholder="Tên manga *" />
                <textarea className="input-field" rows={3} placeholder="Mô tả..." style={{ resize: "none" }} />
                <div className="upload-zone" style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "8px", padding: "24px", textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🖼</div>
                  <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.4)" }}>Kéo thả ảnh bìa vào đây</div>
                </div>
              </div>
            )}
            {uploadStep === 2 && (
              <div className="upload-zone" onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); }} style={{ border: `2px dashed ${dragOver ? "#c9411e" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", padding: "48px 24px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
                <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 15, color: "rgba(232,224,212,0.6)", marginBottom: 6 }}>Kéo thả ảnh manga vào đây</div>
                <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "rgba(232,224,212,0.3)" }}>JPG, PNG, WEBP — Tối đa 50 trang</div>
              </div>
            )}
            {uploadStep === 3 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 14, color: "rgba(232,224,212,0.5)", lineHeight: 1.7 }}>Manga của bạn sẵn sàng được đăng lên!</p>
              </div>
            )}
            <div style={{ display: "flex", gap: "10px", marginTop: 28 }}>
              {uploadStep > 1 && <button onClick={() => setUploadStep(s => s - 1)} style={{ flex: 1, padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,224,212,0.6)", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>← Quay lại</button>}
              <button className="glow-btn" onClick={() => uploadStep < 3 ? setUploadStep(s => s + 1) : setShowUpload(false)} style={{ flex: 2, padding: "12px", borderRadius: "8px", background: "#c9411e", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
                {uploadStep === 3 ? "🚀 Đăng Manga" : "Tiếp theo →"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px", textAlign: "center", fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "rgba(232,224,212,0.25)" }}>
        © 2025 INKVERSE — Nền tảng Manga AI
      </footer>
    </div>
  );
}