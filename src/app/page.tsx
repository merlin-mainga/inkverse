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
const [session, setSession] = useState<any>(null);
const [uploadedPages, setUploadedPages] = useState<File[]>([]);
const [uploadingPages, setUploadingPages] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
const [coverPreview, setCoverPreview] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", genre: [] as string[] });
const [uploading, setUploading] = useState(false);
const [chapterNum, setChapterNum] = useState(1);
const [chapterTitle, setChapterTitle] = useState("");

  useEffect(() => {
  import("next-auth/react").then(({ getSession }) => {
    getSession().then(s => {
      if (s) { setIsLoggedIn(true); setSession(s); }
    });
  });
}, []);

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
      if (!res.ok) { setMsg("❌ " + data.error); setLoading(false); return; }
      setMsg("✅ Đăng ký thành công!");
// Auto login sau khi đăng ký
const { signIn } = await import("next-auth/react");
const loginRes = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
if (loginRes?.ok) { setIsLoggedIn(true); setShowAuth(false); setMsg(""); }
setLoading(false);
return;
    } else {
      const { signIn } = await import("next-auth/react");
      const res = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      if (res?.ok) { setIsLoggedIn(true); setShowAuth(false); }
      else setMsg("❌ Email hoặc mật khẩu sai!");
    }
  } catch { setMsg("❌ Lỗi kết nối!"); }
  setLoading(false);
}
async function handleUploadManga() {
  setUploading(true);
  console.log("uploadForm:", uploadForm);
  console.log("coverImage:", coverImage);
  console.log("uploadedPages:", uploadedPages.length);
  try {
    // Upload ảnh bìa lên Cloudinary
    let coverUrl = "";
    if (coverImage) {
      const formData = new FormData();
      formData.append("file", coverImage);
      formData.append("upload_preset", "unsigned_preset");
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      coverUrl = data.secure_url;
    }

    // Upload các trang manga
    const pageUrls: string[] = [];
    for (const file of uploadedPages) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      pageUrls.push(data.secure_url);
    }

    // Tạo manga trong database
    const mangaRes = await fetch("/api/manga", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: uploadForm.title,
        description: uploadForm.description,
        coverImage: coverUrl,
        genre: uploadForm.genre,
      }),
    });

    if (!mangaRes.ok) { alert("Lỗi tạo manga!"); setUploading(false); return; }
    const manga = await mangaRes.json();

    // Tạo chapter với ảnh
    const chapterRes = await fetch(`/api/manga/${manga.id}/chapters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chapterNum,
        title: chapterTitle || `Chapter ${chapterNum}`,
        pages: pageUrls,
      }),
    });

    if (chapterRes.ok) {
      setShowUpload(false);
      router.push("/dashboard");
    } else {
      alert("Lỗi tạo chapter!");
    }
  } catch (e) {
    alert("Lỗi kết nối!");
  }
  setUploading(false);
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
        @media (max-width: 768px) {
  .desktop-menu { display: none !important; }
  .mobile-menu-btn { display: flex !important; }
  .mobile-menu-dropdown { display: flex !important; }
}
      `}</style>

      {/* AMBIENT BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      {/* NAVBAR */}
<nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.92)", borderBottom: "1px solid rgba(201,168,76,0.12)", backdropFilter: "blur(20px)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
  <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
    <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "8px", objectFit: "contain" }} />
    <div>
      <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em" }}>M<span style={{ color: "#c9a84c" }}>AI</span>NGA</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase" }}>AI Manga Platform</div>
    </div>
  </div>

  {/* DESKTOP MENU */}
  <div className="desktop-menu" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
    {["Khám Phá", "Bảng Xếp Hạng", "Tác Giả"].map(item => (
      <span key={item} className="nav-link" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)", letterSpacing: "0.05em", cursor: "pointer" }}>{item}</span>
    ))}
  </div>

  {/* DESKTOP BUTTONS */}
  <div className="desktop-menu" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <button className="gold-btn" onClick={() => isLoggedIn ? setShowUpload(true) : setShowAuth(true)} style={{ padding: "9px 20px", borderRadius: "6px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Manga</button>
    {isLoggedIn ? (
      <div onClick={() => router.push("/profile")} style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #8b6914)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>👤</div>
    ) : (
      <button onClick={() => setShowAuth(true)} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "6px", padding: "8px 18px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.6)", cursor: "pointer" }}>Đăng nhập</button>
    )}
  </div>

  {/* HAMBURGER */}
  <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: "5px", background: "transparent", border: "none", cursor: "pointer", padding: "8px" }}>
    <div style={{ width: 24, height: 2, background: menuOpen ? "#c9a84c" : "#f0e6d0", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
    <div style={{ width: 24, height: 2, background: "#c9a84c", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
    <div style={{ width: 24, height: 2, background: menuOpen ? "#c9a84c" : "#f0e6d0", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
  </button>
</nav>

{/* MOBILE DROPDOWN MENU */}
{menuOpen && (
  <div className="mobile-menu-dropdown" style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 49, background: "rgba(8,8,8,0.98)", borderBottom: "1px solid rgba(201,168,76,0.15)", backdropFilter: "blur(20px)", padding: "20px 24px", display: "none", flexDirection: "column", gap: "4px" }}>
    {["Khám Phá", "Bảng Xếp Hạng", "Tác Giả"].map(item => (
      <div key={item} onClick={() => setMenuOpen(false)} style={{ padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(240,230,208,0.6)", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", letterSpacing: "0.05em" }}>{item}</div>
    ))}
    <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: "10px" }}>
      <button className="gold-btn" onClick={() => { setMenuOpen(false); isLoggedIn ? setShowUpload(true) : setShowAuth(true); }} style={{ width: "100%", padding: "13px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>✦ Đăng Manga</button>
      {isLoggedIn ? (
        <button onClick={() => { setMenuOpen(false); router.push("/profile"); }} style={{ width: "100%", padding: "13px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 14, cursor: "pointer" }}>👤 Trang Cá Nhân</button>
      ) : (
        <button onClick={() => { setMenuOpen(false); setShowAuth(true); }} style={{ width: "100%", padding: "13px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "rgba(240,230,208,0.6)", fontFamily: "'Inter', sans-serif", fontSize: 14, cursor: "pointer" }}>Đăng nhập</button>
      )}
    </div>
  </div>
)}

      {/* HERO */}
      <div style={{ position: "relative", zIndex: 1, padding: "100px 40px 80px", textAlign: "center", overflow: "hidden" }}>
        <div className="hero-line" style={{ maxWidth: 200, margin: "0 auto 24px" }} />
        
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.4em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 24 }}>
          ✦ Nền Tảng Đọc Và Sáng Tác Mainga Hàng Đầu ✦
        </div>

        <h1 style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1.0, marginBottom: 8, letterSpacing: "0.02em" }}>
  <span className="title-gradient">THẾ GIỚI M</span><span style={{ color: "#c9a84c", textShadow: "0 0 30px rgba(201,168,76,0.8), 0 0 60px rgba(201,168,76,0.4)", WebkitTextFillColor: "#c9a84c" }}>AI</span><span className="title-gradient">NGA</span>
</h1>
       <h1 style={{ fontFamily: "'Cinzel', serif", fontWeight: 400, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.2, marginBottom: 32, letterSpacing: "0.15em", color: "rgba(240,230,208,0.4)" }}>
  M<span style={{ color: "#c9a84c", textShadow: "0 0 20px rgba(201,168,76,0.6)", fontWeight: 700 }}>AI</span>NGA · KHÔNG CÓ GIỚI HẠN
</h1>

        <div className="hero-line" style={{ maxWidth: 300, margin: "0 auto 32px" }} />

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(240,230,208,0.45)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.8, fontWeight: 300, letterSpacing: "0.03em" }}>
          Mainga là sự kết hợp giữa Manga & AI. Nơi mà chính bạn là "main" trong câu chuyện của mình.
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: 20 }}>
  <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>hoặc</span>
  <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
</div>
<button onClick={async () => { const { signIn } = await import("next-auth/react"); signIn("google"); }} style={{ width: "100%", padding: "13px", background: "white", border: "none", borderRadius: "8px", color: "#333", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: 20 }}>
  <img src="https://www.google.com/favicon.ico" width={18} height={18} />
  Đăng nhập với Google
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
              <input className="input-luxury" placeholder="Tên manga *" onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))} value={uploadForm.title} />
                <textarea className="input-luxury" placeholder="Mô tả câu chuyện..." rows={3} onChange={e => setUploadForm(f => ({ ...f, description: e.target.value }))} value={uploadForm.description} style={{ resize: "none" }} />
                <div
  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
  onDragLeave={() => setDragOver(false)}
  onDrop={e => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  }}
  onClick={() => document.getElementById('cover-upload')?.click()}
  style={{ border: `1px dashed ${dragOver ? "#c9a84c" : coverPreview ? "#c9a84c" : "rgba(201,168,76,0.2)"}`, borderRadius: "8px", padding: coverPreview ? "8px" : "32px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", background: dragOver ? "rgba(201,168,76,0.05)" : "transparent", position: "relative" }}
>
  {coverPreview ? (
    <div style={{ position: "relative" }}>
      <img src={coverPreview} style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: "6px" }} />
      <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }} onClick={e => { e.stopPropagation(); setCoverImage(null); setCoverPreview(""); }}>✕</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c", marginTop: 8 }}>✓ Đã chọn ảnh bìa</div>
    </div>
  ) : (
    <>
      <div style={{ fontSize: 28, marginBottom: 10 }}>🖼</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.35)", letterSpacing: "0.05em" }}>KÉO THẢ ẢNH BÌA VÀO ĐÂY</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c", marginTop: 8 }}>hoặc Click để tải lên từ PC</div>
    </>
  )}
  <input id="cover-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
    const file = e.target.files?.[0];
    if (file) { setCoverImage(file); setCoverPreview(URL.createObjectURL(file)); }
  }} />
</div>
              </div>
            )}
            {uploadStep === 2 && (
               <div>
    <div style={{ display: "flex", gap: "12px", marginBottom: 16 }}>
      <input
        style={{ flex: 1, padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none" }}
        placeholder="Số chapter *"
        type="number"
        min={1}
        value={chapterNum}
        onChange={e => setChapterNum(parseInt(e.target.value) || 1)}
      />
      <input
        style={{ flex: 2, padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none" }}
        placeholder="Tên chapter (VD: Khởi Đầu)"
        value={chapterTitle}
        onChange={e => setChapterTitle(e.target.value)}
      />
    </div>
  <div>
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={e => {
        e.preventDefault(); setDragOver(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
        setUploadedPages(prev => [...prev, ...files].slice(0, 50));
      }}
      onClick={() => document.getElementById('pages-upload')?.click()}
      style={{ border: `1px dashed ${dragOver ? "#c9a84c" : uploadedPages.length > 0 ? "#c9a84c" : "rgba(201,168,76,0.2)"}`, borderRadius: "8px", padding: uploadedPages.length > 0 ? "20px" : "60px 32px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", background: dragOver ? "rgba(201,168,76,0.05)" : "transparent" }}
    >
      {uploadedPages.length > 0 ? (
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#c9a84c", marginBottom: 12 }}>✓ Đã chọn {uploadedPages.length} trang</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {uploadedPages.slice(0, 6).map((f, i) => (
              <div key={i} style={{ width: 60, height: 80, borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.2)" }}>
                <img src={URL.createObjectURL(f)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
            {uploadedPages.length > 6 && <div style={{ width: 60, height: 80, borderRadius: "4px", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a84c", fontSize: 13 }}>+{uploadedPages.length - 6}</div>}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)", marginTop: 10 }}>Click để thêm ảnh</div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "rgba(240,230,208,0.5)", marginBottom: 8 }}>Kéo thả ảnh manga vào đây</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.25)", letterSpacing: "0.1em" }}>JPG · PNG · WEBP — TỐI ĐA 50 TRANG</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c", marginTop: 12 }}>hoặc Click để tải lên từ PC</div>
        </>
      )}
      <input id="pages-upload" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => {
        const files = Array.from(e.target.files || []).filter(f => f.type.startsWith("image/"));
        setUploadedPages(prev => [...prev, ...files].slice(0, 50));
      }} />
    </div>
    {uploadedPages.length > 0 && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.4)" }}>{uploadedPages.length} trang đã chọn</div>
        <button onClick={() => setUploadedPages([])} style={{ background: "transparent", border: "none", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer" }}>✕ Xóa tất cả</button>
      </div>
    </div>
</div>
)}

            {uploadStep === 3 && (

            {uploadStep === 3 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div className="float-anim" style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(240,230,208,0.6)", lineHeight: 1.7 }}>Manga của bạn sẵn sàng được đăng lên thế giới!</div>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", marginTop: 32 }}>
              {uploadStep > 1 && <button onClick={() => setUploadStep(s => s - 1)} style={{ flex: 1, padding: "13px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer", letterSpacing: "0.08em" }}>← QUAY LẠI</button>}
              <button className="gold-btn" onClick={() => {
                if (uploadStep === 1 && !coverPreview) { alert("Vui lòng tải ảnh bìa!"); return; }
                if (uploadStep === 2 && uploadedPages.length === 0) { alert("Vui lòng tải ít nhất 1 trang manga!"); return; }
                if (uploadStep === 3) { handleUploadManga(); return; }
                setUploadStep(s => s + 1);
              }} style={{ flex: 2, padding: "13px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
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