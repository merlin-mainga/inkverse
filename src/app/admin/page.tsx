"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Stats = {
  mangaCount: number; userCount: number; commentCount: number;
  chapterCount: number; ratingCount: number; totalViews: number;
};
type Tab = "dashboard" | "manga" | "users" | "comments";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [stats, setStats]       = useState<Stats | null>(null);
  const [mangas, setMangas]     = useState<any[]>([]);
  const [users, setUsers]       = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);

  const isAdmin = status === "authenticated" && (session?.user as any)?.role === "admin";

  // ── Fetch theo tab ──
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "dashboard") {
        const [sRes, mRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/manga?limit=100"),
        ]);
        if (sRes.ok) setStats(await sRes.json());
        if (mRes.ok) { const d = await mRes.json(); setMangas(d.mangas || []); }
      }
      if (activeTab === "manga") {
        const res = await fetch("/api/manga?limit=100");
        if (res.ok) { const d = await res.json(); setMangas(d.mangas || []); }
      }
      if (activeTab === "users") {
        const res = await fetch("/api/admin/users");
        if (res.ok) { const d = await res.json(); setUsers(d.users || []); }
      }
      if (activeTab === "comments") {
        const res = await fetch("/api/admin/comments");
        if (res.ok) { const d = await res.json(); setComments(d.comments || []); }
      }
    } catch {}
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  async function deleteManga(id: string) {
    if (!confirm("Xóa manga này? Hành động không thể hoàn tác!")) return;
    const res = await fetch(`/api/manga/${id}`, { method: "DELETE" });
    if (res.ok) setMangas(m => m.filter(x => x.id !== id));
    else alert("Lỗi xóa manga!");
  }

  async function deleteComment(id: string) {
    if (!confirm("Xóa bình luận này?")) return;
    const res = await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId: id }),
    });
    if (res.ok) setComments(c => c.filter(x => x.id !== id));
  }

  async function changeRole(userId: string, role: string) {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) setUsers(u => u.map(x => x.id === userId ? { ...x, role } : x));
  }

  // ── Loading session ──
  if (status === "loading") return (
    <div style={S.center}>
      <div style={S.spinner} />
    </div>
  );

  // ── Không phải admin ──
  if (!isAdmin) return (
    <div style={S.center}>
      <style>{FONTS}</style>
      <div style={S.authCard}>
        <div style={S.authIcon}>👑</div>
        <h2 style={S.authTitle}>ADMIN PANEL</h2>
        <p style={S.authSub}>MAINGA CONTROL CENTER</p>
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#c9a84c,transparent)", margin: "20px 0" }} />
        {status === "unauthenticated" ? (
          <button onClick={() => router.push("/login")} style={S.goldBtn}>Đăng nhập</button>
        ) : (
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#ff5050" }}>
            ⚠ Tài khoản của bạn không có quyền admin
          </p>
        )}
        <button onClick={() => router.push("/")} style={{ ...S.ghostBtn, marginTop: 12 }}>← Trang chủ</button>
      </div>
    </div>
  );

  const TABS: [Tab, string, string][] = [
    ["dashboard", "📊", "Dashboard"],
    ["manga",     "📚", "Manga"],
    ["users",     "👥", "Người Dùng"],
    ["comments",  "💬", "Bình Luận"],
  ];

  return (
    <div style={S.root}>
      <style>{FONTS + `
        .tab-item { transition: all 0.2s; cursor: pointer; }
        .tab-item:hover { background: rgba(201,168,76,0.08) !important; color: #c9a84c !important; }
        .trow { transition: background 0.15s; }
        .trow:hover { background: rgba(201,168,76,0.03) !important; }
        .abtn { transition: all 0.15s; cursor: pointer; border: none; }
        .abtn:hover { opacity: 0.75; transform: translateY(-1px); }
        select { outline: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        .sk { background: rgba(201,168,76,0.06); border-radius: 6px; animation: pulse 1.5s ease-in-out infinite; }
      `}</style>

      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.sidebarHead}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 20, color: "#c9a84c", letterSpacing: "0.1em" }}>👑 ADMIN</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(240,230,208,0.3)", marginTop: 3, letterSpacing: "0.25em" }}>MAINGA CONTROL CENTER</div>
        </div>

        <nav style={{ flex: 1, padding: "16px 0" }}>
          {TABS.map(([tab, icon, label]) => (
            <div key={tab} className="tab-item" onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 24px", display: "flex", alignItems: "center", gap: 12,
                background: activeTab === tab ? "rgba(201,168,76,0.1)" : "transparent",
                borderLeft: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
                color: activeTab === tab ? "#c9a84c" : "rgba(240,230,208,0.4)",
                fontFamily: "'Inter',sans-serif", fontSize: 13,
              }}
            >
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: 20 }}>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(240,230,208,0.25)", marginBottom: 8, textAlign: "center" }}>
            Đăng nhập: {(session?.user as any)?.email}
          </div>
          <button onClick={() => router.push("/")} style={{ ...S.ghostBtn, width: "100%" }}>← Trang chủ</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={S.main}>
        {/* TOP BAR */}
        <div style={S.topBar}>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, letterSpacing: "0.06em" }}>
            {TABS.find(t => t[0] === activeTab)?.[1]} {TABS.find(t => t[0] === activeTab)?.[2]}
          </h1>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>
            {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>

        <div style={{ padding: 32 }}>

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 20, marginBottom: 32 }}>
                {[
                  ["📚", stats?.mangaCount,    "Tổng Manga",    "#c9a84c"],
                  ["👥", stats?.userCount,     "Người Dùng",    "#c9a84c"],
                  ["💬", stats?.commentCount,  "Bình Luận",     "#8b9dc3"],
                  ["📖", stats?.chapterCount,  "Chapters",      "#8b9dc3"],
                  ["⭐", stats?.ratingCount,   "Đánh Giá",      "#c9a84c"],
                  ["👁", stats?.totalViews,    "Lượt Xem",      "#c9a84c"],
                ].map(([icon, val, label, color]) => (
                  <div key={label as string} style={S.statCard}>
                    <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                    {stats === null ? (
                      <div className="sk" style={{ height: 32, width: 80, marginBottom: 6 }} />
                    ) : (
                      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 26, color: color as string, fontWeight: 600, marginBottom: 4 }}>
                        {typeof val === "number" ? val.toLocaleString() : "0"}
                      </div>
                    )}
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label as string}</div>
                  </div>
                ))}
              </div>

              {/* Top manga */}
              <div style={S.card}>
                <div style={S.cardTitle}>🔥 Top Manga Nhiều View</div>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="sk" style={{ width: 32, height: 20 }} />
                      <div className="sk" style={{ flex: 1, height: 20 }} />
                      <div className="sk" style={{ width: 60, height: 20 }} />
                    </div>
                  ))
                ) : mangas.sort((a, b) => b.views - a.views).slice(0, 5).map((m, i) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontFamily: "'Cinzel',serif", fontSize: 16, color: i < 3 ? "#c9a84c" : "rgba(240,230,208,0.25)", minWidth: 28 }}>#{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#f0e6d0" }}>{m.title}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)" }}>@{m.author?.name} · ⭐ {m.avgRating?.toFixed(1) || "0.0"}</div>
                    </div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#c9a84c" }}>👁 {m.views}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MANGA ── */}
          {activeTab === "manga" && (
            <div style={S.tableWrap}>
              <div style={S.tableHead}>
                <span style={S.tableHeadText}>Tổng: {mangas.length} manga</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    {["Tên Manga", "Tác Giả", "Thể Loại", "Views", "Rating", "Chapters", "Thao Tác"].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i}><td colSpan={7} style={{ padding: "12px 20px" }}><div className="sk" style={{ height: 20 }} /></td></tr>
                    ))
                  ) : mangas.map(m => (
                    <tr key={m.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={S.td}>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#f0e6d0" }}>{m.title}</div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(240,230,208,0.25)", marginTop: 2 }}>{m.status}</div>
                      </td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.5)" }}>@{m.author?.name}</td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.4)", fontSize: 11 }}>{m.genre?.slice(0,2).join(", ") || "—"}</td>
                      <td style={{ ...S.td, color: "#c9a84c" }}>{m.views ?? 0}</td>
                      <td style={{ ...S.td, color: "#c9a84c" }}>⭐ {m.avgRating?.toFixed(1) || "0.0"}</td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.5)" }}>{m._count?.chapters ?? 0}</td>
                      <td style={S.td}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="abtn" onClick={() => router.push(`/manga/${m.id}`)} style={S.viewBtn}>Xem</button>
                          <button className="abtn" onClick={() => deleteManga(m.id)} style={S.delBtn}>Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── USERS ── */}
          {activeTab === "users" && (
            <div style={S.tableWrap}>
              <div style={S.tableHead}>
                <span style={S.tableHeadText}>Tổng: {users.length} người dùng</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    {["Người Dùng", "Email", "Manga", "Comments", "Follows", "Vai Trò", "Ngày Tham Gia"].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i}><td colSpan={7} style={{ padding: "12px 20px" }}><div className="sk" style={{ height: 20 }} /></td></tr>
                    ))
                  ) : users.map((u: any) => (
                    <tr key={u.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={S.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#c9a84c,#8b6914)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, overflow: "hidden", flexShrink: 0 }}>
                            {u.image ? <img src={u.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
                          </div>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#f0e6d0" }}>{u.name || "—"}</span>
                        </div>
                      </td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.4)", fontSize: 12 }}>{u.email}</td>
                      <td style={{ ...S.td, color: "#c9a84c", textAlign: "center" }}>{u._count?.mangas ?? 0}</td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.5)", textAlign: "center" }}>{u._count?.comments ?? 0}</td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.5)", textAlign: "center" }}>{u._count?.follows ?? 0}</td>
                      <td style={S.td}>
                        <select
                          value={u.role || "user"}
                          onChange={e => changeRole(u.id, e.target.value)}
                          style={{
                            padding: "4px 8px", borderRadius: 6, fontSize: 11,
                            fontFamily: "'Inter',sans-serif", cursor: "pointer",
                            background: u.role === "admin" ? "rgba(201,168,76,0.15)" : u.role === "author" ? "rgba(100,180,100,0.15)" : "rgba(255,255,255,0.05)",
                            border: `1px solid ${u.role === "admin" ? "rgba(201,168,76,0.3)" : u.role === "author" ? "rgba(100,180,100,0.3)" : "rgba(255,255,255,0.1)"}`,
                            color: u.role === "admin" ? "#c9a84c" : u.role === "author" ? "#6db86d" : "rgba(240,230,208,0.4)",
                          }}
                        >
                          <option value="user">user</option>
                          <option value="author">author</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.3)", fontSize: 11 }}>
                        {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── COMMENTS ── */}
          {activeTab === "comments" && (
            <div style={S.tableWrap}>
              <div style={S.tableHead}>
                <span style={S.tableHeadText}>Tổng: {comments.length} bình luận</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    {["Người Dùng", "Nội Dung", "Manga", "Ngày", "Thao Tác"].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i}><td colSpan={5} style={{ padding: "12px 20px" }}><div className="sk" style={{ height: 20 }} /></td></tr>
                    ))
                  ) : comments.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: "60px 20px", textAlign: "center", color: "rgba(240,230,208,0.3)", fontFamily: "'Inter',sans-serif", fontSize: 13 }}>Chưa có bình luận nào</td></tr>
                  ) : comments.map((c: any) => (
                    <tr key={c.id} className="trow" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ ...S.td, color: "#c9a84c", fontSize: 12 }}>{c.user?.name}</td>
                      <td style={{ ...S.td, maxWidth: 320 }}>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(240,230,208,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.content}</p>
                      </td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.4)", fontSize: 12 }}>{c.manga?.title || "—"}</td>
                      <td style={{ ...S.td, color: "rgba(240,230,208,0.3)", fontSize: 11 }}>{new Date(c.createdAt).toLocaleDateString("vi-VN")}</td>
                      <td style={S.td}>
                        <button className="abtn" onClick={() => deleteComment(c.id)} style={S.delBtn}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`;

const S: Record<string, React.CSSProperties> = {
  root:         { minHeight: "100vh", background: "#080808", color: "#f0e6d0", display: "flex" },
  center:       { minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" },
  spinner:      { width: 40, height: 40, border: "3px solid rgba(201,168,76,0.2)", borderTop: "3px solid #c9a84c", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  authCard:     { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: "48px 40px", width: "100%", maxWidth: 380, textAlign: "center" },
  authIcon:     { fontSize: 40, marginBottom: 12 },
  authTitle:    { fontFamily: "'Cinzel',serif", fontSize: 26, color: "#c9a84c", letterSpacing: "0.1em", marginBottom: 6 },
  authSub:      { fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.2em" },
  goldBtn:      { width: "100%", padding: 13, background: "linear-gradient(135deg,#c9a84c,#8b6914)", border: "none", borderRadius: 8, color: "#080808", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  ghostBtn:     { padding: "9px 16px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "rgba(240,230,208,0.4)", fontFamily: "'Inter',sans-serif", fontSize: 12, cursor: "pointer" },
  sidebar:      { width: 220, background: "rgba(255,255,255,0.015)", borderRight: "1px solid rgba(201,168,76,0.08)", display: "flex", flexDirection: "column", flexShrink: 0 },
  sidebarHead:  { padding: "28px 24px 24px", borderBottom: "1px solid rgba(201,168,76,0.08)" },
  main:         { flex: 1, overflow: "auto" },
  topBar:       { padding: "20px 32px", borderBottom: "1px solid rgba(201,168,76,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" },
  statCard:     { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 12, padding: "22px 20px" },
  card:         { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 12, padding: 24 },
  cardTitle:    { fontFamily: "'Cinzel',serif", fontSize: 15, color: "#c9a84c", marginBottom: 16 },
  tableWrap:    { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 12, overflow: "hidden" },
  tableHead:    { padding: "16px 20px", borderBottom: "1px solid rgba(201,168,76,0.06)" },
  tableHeadText:{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(240,230,208,0.4)" },
  th:           { padding: "12px 16px", textAlign: "left" as const, fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" as const },
  td:           { padding: "12px 16px", fontFamily: "'Inter',sans-serif", fontSize: 13 },
  viewBtn:      { padding: "5px 10px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 5, color: "#c9a84c", fontFamily: "'Inter',sans-serif", fontSize: 11 },
  delBtn:       { padding: "5px 10px", background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 5, color: "#ff5050", fontFamily: "'Inter',sans-serif", fontSize: 11 },
};