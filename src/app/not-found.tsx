import Link from "next/link";

export default function NotFound() {
  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .float { animation: float 3s ease-in-out infinite; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .fade { animation: fadeUp 0.6s ease both; }
        .home-btn:hover { box-shadow: 0 0 30px rgba(201,168,76,0.4) !important; transform: translateY(-2px); }
        .home-btn { transition: all 0.25s; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={S.content} className="fade">
        <div className="float" style={{ fontSize: 80, marginBottom: 32 }}>📜</div>

        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#c9a84c,transparent)", maxWidth: 120, margin: "0 auto 28px" }} />

        <p style={S.code}>404</p>
        <h1 style={S.title}>Trang Không Tồn Tại</h1>
        <p style={S.desc}>
          Trang bạn tìm kiếm đã biến mất vào màn đêm,<br />
          hoặc chưa bao giờ tồn tại trong thế giới Mainga.
        </p>

        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)", maxWidth: 200, margin: "32px auto" }} />

        <Link href="/" style={{ textDecoration: "none" }}>
          <button className="home-btn" style={S.btn}>
            ← Về Trang Chủ
          </button>
        </Link>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh", background: "#080808", color: "#f0e6d0",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "40px 20px", position: "relative",
    fontFamily: "'Inter', sans-serif",
  },
  content: { textAlign: "center", position: "relative", zIndex: 1 },
  code: {
    fontFamily: "'Cinzel', serif", fontSize: "clamp(80px,15vw,140px)",
    fontWeight: 700, color: "transparent",
    WebkitTextStroke: "1px rgba(201,168,76,0.3)",
    lineHeight: 1, marginBottom: 8,
  },
  title: {
    fontFamily: "'Cinzel', serif", fontSize: "clamp(20px,4vw,32px)",
    fontWeight: 600, color: "#c9a84c", marginBottom: 16, letterSpacing: "0.05em",
  },
  desc: {
    fontFamily: "'Inter', sans-serif", fontSize: 15,
    color: "rgba(240,230,208,0.4)", lineHeight: 1.8,
  },
  btn: {
    padding: "14px 36px",
    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
    border: "none", borderRadius: 8,
    color: "#080808", fontFamily: "'Cinzel', serif",
    fontSize: 14, fontWeight: 600, letterSpacing: "0.08em",
    cursor: "pointer",
  },
};