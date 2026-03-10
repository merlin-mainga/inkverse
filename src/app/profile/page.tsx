"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"history" | "following">("history");
  const [history, setHistory] = useState<any[]>([]);
  const [follows, setFollows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("next-auth/react").then(({ getSession }) => {
      getSession().then(async (s) => {
        if (!s) {
          router.push("/");
          return;
        }

        const meRes = await fetch("/api/me");
        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }

        const [h, f] = await Promise.all([
          fetch("/api/history").then((r) => (r.ok ? r.json() : { history: [] })),
          fetch("/api/follow").then((r) => (r.ok ? r.json() : { follows: [] })),
        ]);

        setHistory(h.history || []);
        setFollows(f.follows || []);
        setLoading(false);
      });
    });
  }, [router]);

  const isAuthor = user?.role === "author" || user?.role === "admin";

  async function handleLogout() {
    const { signOut } = await import("next-auth/react");
    await signOut({ redirect: false });
    router.push("/");
  }

  if (loading) {
    return (
      <div style={S.center}>
        <style>{FONTS + CSS}</style>
        <div style={S.spinner} />
      </div>
    );
  }

  return (
    <div style={S.root}>
      <style>{FONTS + CSS}</style>

      <nav style={S.nav}>
        <div onClick={() => router.push("/")} style={S.navLogo}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 34, height: 34, borderRadius: 8, objectFit: "contain" }}
          />
          <div style={S.navBrand}>
            M<span style={{ color: "#c9a84c" }}>AI</span>NGA
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {isAuthor && (
            <button
              className="gold-btn"
              onClick={() => router.push("/dashboard")}
              style={S.goldBtn}
            >
              📊 Dashboard
            </button>
          )}
          <button onClick={() => router.push("/")} style={S.ghostBtn}>
            ← Trang chủ
          </button>
        </div>
      </nav>

      <div style={S.container}>
        <div className="fade-up" style={S.headerCard}>
          <div style={S.avatarWrap}>
            {user?.image ? (
              <img
                src={user.image}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "👤"
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={S.userName}>{user?.name || "..."}</div>
            <div style={S.userEmail}>{user?.email}</div>
            <div
              style={{
                ...S.roleBadge,
                background: isAuthor ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  isAuthor ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.08)"
                }`,
              }}
            >
              <span style={{ fontSize: 13 }}>{isAuthor ? "✍️" : "📖"}</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: isAuthor ? "#c9a84c" : "rgba(240,230,208,0.4)",
                  fontWeight: 600,
                }}
              >
                {isAuthor ? "Tác Giả" : "Độc Giả"}
              </span>
            </div>
          </div>

          <div style={S.statsRow}>
            {[
              ["THEO DÕI", follows.length],
              ["ĐÃ ĐỌC", history.length],
            ].map(([label, val]) => (
              <div key={label as string} style={S.stat}>
                <div style={S.statVal}>{val}</div>
                <div style={S.statLabel}>{label as string}</div>
              </div>
            ))}
          </div>
        </div>

        {isAuthor ? (
          <div className="fade-up" style={S.banner}>
            <div>
              <div style={S.bannerTitle}>✦ Dành Cho Tác Giả</div>
              <div style={S.bannerSub}>
                Quản lý manga, thêm chapter mới, xem thống kê lượt đọc.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                className="gold-btn"
                onClick={() => router.push("/dashboard")}
                style={S.goldBtnLarge}
              >
                📊 Vào Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="fade-up" style={{ ...S.banner, background: "rgba(255,255,255,0.01)" }}>
            <div>
              <div style={S.bannerTitle}>✦ Bạn muốn chia sẻ câu chuyện của mình?</div>
              <div style={S.bannerSub}>
                Đăng ký trở thành tác giả — miễn phí, không giới hạn sáng tác.
              </div>
            </div>
            <button
              className="gold-btn"
              onClick={() => router.push("/become-author")}
              style={S.goldBtnLarge}
            >
              ✦ Trở Thành Tác Giả
            </button>
          </div>
        )}

        <div style={S.tabBar}>
          {[
            ["history", "📜 Lịch Sử Đọc", history.length],
            ["following", "🔖 Đang Theo Dõi", follows.length],
          ].map(([tab, label, count]) => (
            <button
              key={tab as string}
              className="tab-btn"
              onClick={() => setActiveTab(tab as "history" | "following")}
              style={{
                ...S.tabBtn,
                color: activeTab === tab ? "#c9a84c" : "rgba(240,230,208,0.4)",
                borderBottom:
                  activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              }}
            >
              {label as string}
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  background:
                    activeTab === tab
                      ? "rgba(201,168,76,0.15)"
                      : "rgba(255,255,255,0.04)",
                  fontSize: 11,
                  color:
                    activeTab === tab ? "#c9a84c" : "rgba(240,230,208,0.3)",
                }}
              >
                {count as number}
              </span>
            </button>
          ))}
        </div>

        <div className="fade-up">
          {activeTab === "history" &&
            (history.length === 0 ? (
              <Empty
                icon="📖"
                text="Chưa có manga nào đã đọc"
                onAction={() => router.push("/")}
                actionLabel="Khám phá manga"
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(148px,1fr))",
                  gap: 16,
                }}
              >
                {history.map((h: any) => (
                  <div
                    key={h.id}
                    className="card-hover"
                    onClick={() => router.push(`/manga/${h.mangaId}`)}
                  >
                    <div style={S.posterWrap}>
                      {h.manga?.coverImage ? (
                        <img
                          src={h.manga.coverImage}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={S.posterFallback}>📖</div>
                      )}
                    </div>

                    <div style={S.posterTitle as any}>{h.manga?.title}</div>
                    <div style={S.posterSub}>
                      {h.manga?._count?.chapters ?? 0} chapters
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {activeTab === "following" &&
            (follows.length === 0 ? (
              <Empty
                icon="🔖"
                text="Chưa theo dõi manga nào"
                onAction={() => router.push("/")}
                actionLabel="Khám phá manga"
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(148px,1fr))",
                  gap: 16,
                }}
              >
                {follows.map((f: any) => (
                  <div
                    key={f.id}
                    className="card-hover"
                    onClick={() => router.push(`/manga/${f.mangaId}`)}
                  >
                    <div style={S.posterWrap}>
                      {f.manga?.coverImage ? (
                        <img
                          src={f.manga.coverImage}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={S.posterFallback}>📖</div>
                      )}
                    </div>

                    <div style={S.posterTitle as any}>{f.manga?.title}</div>
                    <div style={S.posterSub}>
                      {f.manga?._count?.chapters ?? 0} chapters
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div
          style={{
            marginTop: 60,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center",
          }}
        >
          <button onClick={handleLogout} style={S.logoutBtn}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

function Empty({
  icon,
  text,
  onAction,
  actionLabel,
}: {
  icon: string;
  text: string;
  onAction: () => void;
  actionLabel: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div
        className="float"
        style={{ fontSize: 52, marginBottom: 16, display: "inline-block" }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 20,
          color: "rgba(240,230,208,0.3)",
          marginBottom: 20,
        }}
      >
        {text}
      </div>
      <button className="gold-btn" onClick={onAction} style={S.goldBtnLarge}>
        {actionLabel}
      </button>
    </div>
  );
}

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
`;

const CSS = `
.tab-btn { transition: all 0.2s; cursor: pointer; border: none; background: transparent; }
.card-hover { transition: all 0.25s; cursor: pointer; }
.card-hover:hover { transform: translateY(-3px); }
.gold-btn { background: linear-gradient(135deg, #c9a84c, #8b6914); transition: all 0.3s; cursor: pointer; border: none; }
.gold-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.3); }
@keyframes fadeUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.fade-up { animation: fadeUp 0.4s ease; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes spin { to { transform: rotate(360deg); } }
`;

const S: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#080808",
    color: "#f0e6d0",
  },
  center: {
    minHeight: "100vh",
    background: "#080808",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid rgba(201,168,76,0.2)",
    borderTop: "3px solid #c9a84c",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(8,8,8,0.95)",
    borderBottom: "1px solid rgba(201,168,76,0.12)",
    backdropFilter: "blur(20px)",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
  },
  navBrand: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: "0.1em",
  },

  goldBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
    color: "#080808",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 700,
  },
  goldBtnLarge: {
    padding: "11px 24px",
    borderRadius: 8,
    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
    border: "none",
    color: "#080808",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  ghostBtn: {
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 6,
    padding: "7px 16px",
    color: "rgba(240,230,208,0.4)",
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    cursor: "pointer",
  },

  container: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "48px 24px",
  },

  headerCard: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginBottom: 32,
    padding: 32,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: 16,
    flexWrap: "wrap",
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #c9a84c, #8b6914)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    flexShrink: 0,
    overflow: "hidden",
  },
  userName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#f0e6d0",
    marginBottom: 6,
  },
  userEmail: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: "rgba(240,230,208,0.4)",
    marginBottom: 12,
  },
  roleBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 14px",
    borderRadius: 20,
  },
  statsRow: {
    display: "flex",
    gap: 24,
  },
  stat: {
    textAlign: "center",
  },
  statVal: {
    fontFamily: "'Cinzel', serif",
    fontSize: 24,
    color: "#c9a84c",
    fontWeight: 600,
  },
  statLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    color: "rgba(240,230,208,0.3)",
    letterSpacing: "0.15em",
    marginTop: 4,
  },

  banner: {
    marginBottom: 32,
    padding: "24px 28px",
    background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(139,105,20,0.04))",
    border: "1px solid rgba(201,168,76,0.25)",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
  },
  bannerTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 15,
    color: "#c9a84c",
    marginBottom: 6,
    letterSpacing: "0.05em",
  },
  bannerSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: "rgba(240,230,208,0.45)",
    lineHeight: 1.6,
  },

  tabBar: {
    display: "flex",
    gap: 0,
    marginBottom: 28,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  tabBtn: {
    padding: "12px 24px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: -1,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  posterWrap: {
    borderRadius: 8,
    overflow: "hidden",
    aspectRatio: "3/4",
    background: "rgba(201,168,76,0.05)",
    marginBottom: 8,
    border: "1px solid rgba(201,168,76,0.08)",
  },
  posterFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
  },
  posterTitle: {
    fontFamily: "'Cinzel',serif",
    fontSize: 13,
    color: "#f0e6d0",
    marginBottom: 4,
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  posterSub: {
    fontFamily: "'Inter',sans-serif",
    fontSize: 11,
    color: "rgba(240,230,208,0.35)",
  },

  logoutBtn: {
    background: "transparent",
    border: "1px solid rgba(255,60,60,0.2)",
    borderRadius: 8,
    padding: "10px 28px",
    color: "rgba(255,80,80,0.6)",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    cursor: "pointer",
  },
};