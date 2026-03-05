"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BecomeAuthor() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", penName: "", bio: "", genre: [] as string[], experience: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const GENRES = ["Action", "Fantasy", "Sci-Fi", "Horror", "Romance", "Cyberpunk", "Slice of Life", "Adventure", "Comedy", "Drama"];

  function toggleGenre(g: string) {
    setForm(f => ({ ...f, genre: f.genre.includes(g) ? f.genre.filter(x => x !== g) : [...f.genre, g] }));
  }

  async function handleSubmit() {
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.penName || form.name, email: form.email, password: form.password, role: "author" }),
      });
      const data = await res.json();
      if (res.ok) setStep(4);
      else setMsg("❌ " + data.error);
    } catch { setMsg("❌ Lỗi kết nối!"); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } .input-luxury { width: 100%; padding: 13px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; color: #f0e6d0; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: all 0.3s; } .input-luxury:focus { border-color: #c9a84c; } .input-luxury::placeholder { color: rgba(240,230,208,0.2); } .gold-btn { background: linear-gradient(135deg, #c9a84c, #8b6914); transition: all 0.3s; cursor: pointer; border: none; } .gold-btn:hover { opacity: 0.9; transform: translateY(-1px); } .genre-tag { transition: all 0.2s; cursor: pointer; border: none; } @keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .fade-up { animation: fadeUp 0.5s ease; } @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } } .float { animation: float 3s ease-in-out infinite; }`}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.95)", borderBottom: "1px solid rgba(201,168,76,0.1)", backdropFilter: "blur(20px)", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "8px", objectFit: "contain" }} />
          <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.1em" }}>M<span style={{ color: "#c9a84c" }}>AI</span>NGA</div>
        </div>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", padding: "8px 18px", color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>← Trang chủ</button>
      </nav>

      {step < 4 && (
        <div style={{ textAlign: "center", padding: "60px 24px 48px", background: "linear-gradient(180deg, rgba(201,168,76,0.04) 0%, transparent 100%)" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.4em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 20 }}>✦ Dành Cho Người Sáng Tạo ✦</div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, marginBottom: 16 }}>Trở Thành<br /><span style={{ background: "linear-gradient(135deg, #c9a84c, #8b6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tác Giả MAINGA</span></h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(240,230,208,0.4)", maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>Chia sẻ câu chuyện của bạn với hàng nghìn độc giả.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: 48, flexWrap: "wrap" }}>
            {[["🎨", "Đăng Manga Miễn Phí"], ["💰", "Kiếm Thu Nhập"], ["👥", "Xây Dựng Fanbase"], ["📊", "Thống Kê Chi Tiết"]].map(([icon, title]) => (
              <div key={title} style={{ textAlign: "center" }}><div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div><div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: "#c9a84c", letterSpacing: "0.05em" }}>{title}</div></div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 80px" }}>
        {step < 4 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              {["Tài Khoản", "Hồ Sơ", "Thể Loại"].map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: i + 1 <= step ? "linear-gradient(135deg, #c9a84c, #8b6914)" : "rgba(255,255,255,0.05)", border: i + 1 <= step ? "none" : "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: i + 1 <= step ? "#080808" : "rgba(240,230,208,0.3)" }}>{i + 1}</div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: i + 1 <= step ? "#c9a84c" : "rgba(240,230,208,0.3)" }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1 }}><div style={{ height: "100%", width: `${((step - 1) / 2) * 100}%`, background: "linear-gradient(90deg, #c9a84c, #8b6914)", transition: "width 0.4s ease" }} /></div>
          </div>
        )}

        {step === 1 && (
          <div className="fade-up" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "40px" }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, marginBottom: 24, letterSpacing: "0.08em" }}>Thông Tin Tài Khoản</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input className="input-luxury" placeholder="Tên thật *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="input-luxury" type="email" placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input className="input-luxury" type="password" placeholder="Mật khẩu *" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {msg && <div style={{ color: "#ff6b6b", fontFamily: "'Inter', sans-serif", fontSize: 13, marginTop: 12 }}>{msg}</div>}
            <button className="gold-btn" onClick={() => { if (!form.name || !form.email || !form.password) { setMsg("❌ Vui lòng điền đầy đủ!"); return; } setMsg(""); setStep(2); }} style={{ width: "100%", padding: "14px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, marginTop: 24, letterSpacing: "0.1em" }}>TIẾP THEO →</button>
          </div>
        )}

        {step === 2 && (
          <div className="fade-up" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "40px" }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, marginBottom: 24, letterSpacing: "0.08em" }}>Hồ Sơ Tác Giả</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input className="input-luxury" placeholder="Bút danh..." value={form.penName} onChange={e => setForm({ ...form, penName: e.target.value })} />
              <textarea className="input-luxury" rows={4} placeholder="Giới thiệu bản thân..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ resize: "none" }} />
              <select className="input-luxury" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} style={{ cursor: "pointer" }}>
                <option value="" style={{ background: "#111" }}>Kinh nghiệm sáng tác...</option>
                <option value="beginner" style={{ background: "#111" }}>🌱 Mới bắt đầu</option>
                <option value="intermediate" style={{ background: "#111" }}>⚡ Có kinh nghiệm</option>
                <option value="advanced" style={{ background: "#111" }}>🔥 Chuyên nghiệp</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: 24 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>← QUAY LẠI</button>
              <button className="gold-btn" onClick={() => setStep(3)} style={{ flex: 2, padding: "13px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em" }}>TIẾP THEO →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-up" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "40px" }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, marginBottom: 24, letterSpacing: "0.08em" }}>Thể Loại Yêu Thích</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: 32 }}>
              {GENRES.map(g => (
                <button key={g} className="genre-tag" onClick={() => toggleGenre(g)} style={{ padding: "10px 18px", borderRadius: "30px", background: form.genre.includes(g) ? "linear-gradient(135deg, #c9a84c, #8b6914)" : "rgba(255,255,255,0.03)", border: form.genre.includes(g) ? "none" : "1px solid rgba(201,168,76,0.15)", color: form.genre.includes(g) ? "#080808" : "rgba(240,230,208,0.45)", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: form.genre.includes(g) ? 600 : 400 }}>{g}</button>
              ))}
            </div>
            {msg && <div style={{ color: "#ff6b6b", fontFamily: "'Inter', sans-serif", fontSize: 13, marginBottom: 16 }}>{msg}</div>}
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>← QUAY LẠI</button>
              <button className="gold-btn" onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: "13px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", opacity: loading ? 0.7 : 1 }}>{loading ? "ĐANG TẠO..." : "✦ ĐĂNG KÝ TÁC GIẢ"}</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-up" style={{ textAlign: "center", padding: "60px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px" }}>
            <div className="float" style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: "#c9a84c", marginBottom: 16, letterSpacing: "0.08em" }}>CHÀO MỪNG TÁC GIẢ!</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(240,230,208,0.5)", lineHeight: 1.8, marginBottom: 40 }}>Tài khoản tác giả đã được tạo! Hãy đăng nhập và bắt đầu đăng manga đầu tiên.</p>
            <button className="gold-btn" onClick={() => router.push("/")} style={{ padding: "14px 32px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em" }}>✦ BẮT ĐẦU NGAY</button>
          </div>
        )}
      </div>
    </div>
  );
}