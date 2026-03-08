"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

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
        if (!res.ok) {
          setMsg("❌ " + data.error);
          setLoading(false);
          return;
        }
        const loginRes = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        if (loginRes?.ok) router.push("/");
        else setMsg("✅ Đăng ký thành công! Hãy đăng nhập.");
      } else {
        const res = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        if (res?.ok) router.push("/");
        else setMsg("❌ Email hoặc mật khẩu sai!");
      }
    } catch {
      setMsg("❌ Lỗi kết nối!");
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      color: "#f0e6d0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lux-input {
          width: 100%; padding: 13px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 8px; color: #f0e6d0;
          font-family: 'Inter', sans-serif; font-size: 14px; outline: none;
          transition: all 0.3s;
        }
        .lux-input:focus { border-color: #c9a84c; background: rgba(201,168,76,0.05); }
        .lux-input::placeholder { color: rgba(240,230,208,0.25); }
        .gold-btn {
          width: 100%; padding: 14px; border-radius: 8px; border: none;
          background: linear-gradient(135deg, #c9a84c, #8b6914, #c9a84c);
          background-size: 200% auto;
          color: #080808; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.3s;
          animation: shimmer 3s linear infinite;
        }
        .gold-btn:hover:not(:disabled) { background-position: right center; box-shadow: 0 0 30px rgba(201,168,76,0.3); transform: translateY(-1px); }
        .gold-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .google-btn {
          width: 100%; padding: 13px; background: white; border: none;
          border-radius: 8px; color: #333; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s;
        }
        .google-btn:hover { background: #f5f5f5; }
        .tab-btn {
          flex: 1; padding: 10px 0; background: transparent; border: none;
          border-bottom: 2px solid transparent; color: rgba(240,230,208,0.4);
          font-family: 'Inter', sans-serif; font-size: 14px;
          cursor: pointer; transition: all 0.2s; margin-bottom: -1px;
        }
        .tab-btn.active { color: #c9a84c; border-bottom-color: #c9a84c; }
        .back-link { color: rgba(240,230,208,0.4); cursor: pointer; font-size: 13px; transition: color 0.2s; display: inline-block; margin-bottom: 24px; }
        .back-link:hover { color: #c9a84c; }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        .card { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* BG glow */}
        <div style={{ position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <span className="back-link" onClick={() => router.push("/")}>← Trang chủ</span>

        <div className="card" style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: 16, padding: "40px 36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 52, height: 52,
              background: "linear-gradient(135deg,#c9a84c,#8b6914)",
              borderRadius: 12, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: "'Cinzel',serif",
              fontWeight: 700, fontSize: 22, color: "#080808",
              margin: "0 auto 16px",
            }}>墨</div>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 24, fontWeight: 700, letterSpacing: "0.1em" }}>
              M<span style={{ color: "#c9a84c" }}>AI</span>NGA
            </h1>
            <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#c9a84c,transparent)", maxWidth: 60, margin: "12px auto 0" }} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(201,168,76,0.1)", marginBottom: 24 }}>
            <button className={`tab-btn${authMode === "login" ? " active" : ""}`} onClick={() => { setAuthMode("login"); setMsg(""); }}>
              Đăng nhập
            </button>
            <button className={`tab-btn${authMode === "register" ? " active" : ""}`} onClick={() => { setAuthMode("register"); setMsg(""); }}>
              Đăng ký
            </button>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {authMode === "register" && (
              <input className="lux-input" placeholder="Tên của bạn..." value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            )}
            <input className="lux-input" type="email" placeholder="Email..."
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleAuth()} />
            <input className="lux-input" type="password" placeholder="Mật khẩu..."
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleAuth()} />
          </div>

          {msg && (
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, marginBottom: 14, textAlign: "center", color: msg.includes("✅") ? "#c9a84c" : "#ff6b6b" }}>
              {msg}
            </p>
          )}

          <button className="gold-btn" onClick={handleAuth} disabled={loading}>
            {loading ? "ĐANG XỬ LÝ..." : authMode === "login" ? "ĐĂNG NHẬP" : "TẠO TÀI KHOẢN"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>hoặc</span>
            <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
          </div>

          <button className="google-btn" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="Google" />
            Tiếp tục với Google
          </button>
        </div>
      </div>
    </div>
  );
}