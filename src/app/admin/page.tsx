"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "manga" | "users" | "comments">("dashboard");
  const [stats, setStats] = useState({ mangas: 0, users: 0, comments: 0, views: 0 });
  const [mangas, setMangas] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const ADMIN_PASSWORD = "mainga-admin-2025";

  useEffect(() => {
    if (isAuthed) fetchData();
  }, [isAuthed, activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (activeTab === "dashboard" || activeTab === "manga") {
        const res = await fetch("/api/manga?limit=100");
        const data = await res.json();
        setMangas(data.mangas || []);
        setStats(s => ({ ...s, mangas: data.total || 0 }));
      }
      if (activeTab === "users" || activeTab === "dashboard") {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data.users || []);
        setStats(s => ({ ...s, users: data.total || 0 }));
      }
    } catch (e) {}
    setLoading(false);
  }

  async function deleteManga(id: string) {
    if (!confirm("Xóa manga này?")) return;
    await fetch(`/api/manga/${id}`, { method: "DELETE" });
    setMangas(m => m.filter(x => x.id !== id));
  }

  if (!isAuthed) return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');`}</style>
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: "#c9a84c", marginBottom: 8, letterSpacing: "0.1em" }}>👑 ADMIN</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.3)", marginBottom: 32, letterSpacing: "0.1em" }}>MAINGA CONTROL PANEL</div>
        <input type="password" placeholder="Nhập mật khẩu admin..." value={adminPassword} onChange={e => setAdminPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && adminPassword === ADMIN_PASSWORD && setIsAuthed(true)} style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", color: "#f0e6d0", fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none", marginBottom: 16 }} />
        <button onClick={() => adminPassword === ADMIN_PASSWORD ? setIsAuthed(true) : alert("Sai mật khẩu!")} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg, #c9a84c, #8b6914)", border: "none", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.1em" }}>ĐĂNG NHẬP</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-item { transition: all 0.2s; cursor: pointer; }
        .tab-item:hover { background: rgba(201,168,76,0.08) !important; color: #c9a84c !important; }
        .action-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .action-btn:hover { opacity: 0.8; transform: translateY(-1px); }
        .table-row { transition: background 0.2s; }
        .table-row:hover { background: rgba(201,168,76,0.04) !important; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: 240, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(201,168,76,0.1)", padding: "32px 0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#c9a84c", letterSpacing: "0.1em" }}>👑 ADMIN</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(240,230,208,0.3)", marginTop: 4, letterSpacing: "0.2em" }}>MAINGA PANEL</div>
        </div>

        <div style={{ padding: "24px 0", flex: 1 }}>
          {[
            ["dashboard", "📊", "Dashboard"],
            ["manga", "📚", "Quản lý Manga"],
            ["users", "👥", "Người dùng"],
            ["comments", "💬", "Bình luận"],
          ].map(([tab, icon, label]) => (
            <div key={tab} className="tab-item" onClick={() => setActiveTab(tab as any)} style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: "12px", background: activeTab === tab ? "rgba(201,168,76,0.1)" : "transparent", borderLeft: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent", color: activeTab === tab ? "#c9a84c" : "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "24px" }}>
          <button onClick={() => router.push("/")} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em" }}>← VỀ TRANG CHỦ</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* TOP BAR */}
        <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(201,168,76,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, letterSpacing: "0.08em" }}>
            {activeTab === "dashboard" ? "📊 Dashboard" : activeTab === "manga" ? "📚 Quản lý Manga" : activeTab === "users" ? "👥 Người dùng" : "💬 Bình luận"}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>{new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </div>

        <div style={{ padding: "32px" }}>
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginBottom: 40 }}>
                {[
                  ["📚", mangas.length, "Tổng Manga", "#c9a84c"],
                  ["👥", users.length, "Người Dùng", "#8b6914"],
                  ["👁", mangas.reduce((a, m) => a + (m.views || 0), 0).toLocaleString(), "Lượt Xem", "#c9a84c"],
                  ["⭐", mangas.filter(m => m.avgRating > 4).length, "Manga Hot", "#8b6914"],
                ].map(([icon, val, label, color]) => (
                  <div key={label as string} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "12px", padding: "24px" }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: color as string, fontWeight: 600, marginBottom: 4 }}>{val}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label as string}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, marginBottom: 20, color: "#c9a84c" }}>🔥 Manga Nhiều View Nhất</div>
                {mangas.sort((a, b) => b.views - a.views).slice(0, 5).map((m, i) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: i < 3 ? "#c9a84c" : "rgba(240,230,208,0.3)", minWidth: 32 }}>#{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#f0e6d0", marginBottom: 2 }}>{m.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)" }}>@{m.author?.name}</div>
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c9a84c" }}>👁 {m.views}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MANGA MANAGEMENT */}
          {activeTab === "manga" && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(201,168,76,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.5)" }}>Tổng: {mangas.length} manga</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    {["Tên Manga", "Tác Giả", "Views", "Rating", "Thao Tác"].map(h => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mangas.map(m => (
                    <tr key={m.id} className="table-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#f0e6d0", marginBottom: 2 }}>{m.title}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)" }}>{m.genre?.join(", ")}</div>
                      </td>
                      <td style={{ padding: "14px 20px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)" }}>@{m.author?.name}</td>
                      <td style={{ padding: "14px 20px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c9a84c" }}>{m.views}</td>
                      <td style={{ padding: "14px 20px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c9a84c" }}>⭐ {m.avgRating?.toFixed(1) || "0.0"}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button className="action-btn" onClick={() => router.push(`/manga/${m.id}`)} style={{ padding: "6px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>Xem</button>
                          <button className="action-btn" onClick={() => deleteManga(m.id)} style={{ padding: "6px 12px", background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: "6px", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    {["Tên", "Email", "Vai Trò", "Ngày Tham Gia"].map(h => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u.id} className="table-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "14px 20px", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#f0e6d0" }}>{u.name}</td>
                      <td style={{ padding: "14px 20px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)" }}>{u.email}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ padding: "3px 10px", background: u.role === "admin" ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${u.role === "admin" ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: "20px", fontFamily: "'Inter', sans-serif", fontSize: 11, color: u.role === "admin" ? "#c9a84c" : "rgba(240,230,208,0.4)" }}>{u.role || "user"}</span>
                      </td>
                      <td style={{ padding: "14px 20px", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>{new Date(u.createdAt).toLocaleDateString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* COMMENTS */}
          {activeTab === "comments" && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.3)" }}>Tính năng quản lý bình luận sẽ sớm có!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}