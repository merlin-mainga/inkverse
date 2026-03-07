"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "mangas">("overview");
  const [session, setSession] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Add chapter modal state
  const [showAddChapter, setShowAddChapter] = useState<any | null>(null); // manga object
  const [chapterNum, setChapterNum] = useState(1);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterPages, setChapterPages] = useState<File[]>([]);
  const [chapterDragOver, setChapterDragOver] = useState(false);
  const [uploadingChapter, setUploadingChapter] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    import("next-auth/react").then(({ getSession }) => {
      getSession().then(s => {
        if (!s) { router.push("/"); return; }
        setSession(s);
        fetchMyMangas();
      });
    });
  }, []);

  async function fetchMyMangas() {
    setLoading(true);
    const res = await fetch("/api/manga?mine=true");
    const data = await res.json();
    setMangas(data.mangas || []);
    setLoading(false);
  }

  async function deleteManga(id: string) {
    await fetch(`/api/manga/${id}`, { method: "DELETE" });
    setMangas(m => m.filter(x => x.id !== id));
    setShowDeleteConfirm(null);
  }

  function openAddChapter(manga: any) {
    // Auto-suggest next chapter number
    const nextNum = (manga._count?.chapters || 0) + 1;
    setChapterNum(nextNum);
    setChapterTitle("");
    setChapterPages([]);
    setUploadProgress(0);
    setShowAddChapter(manga);
  }

  async function handleAddChapter() {
    if (chapterPages.length === 0) { alert("Vui lòng tải ít nhất 1 trang!"); return; }
    setUploadingChapter(true);
    setUploadProgress(0);

    try {
      // Upload pages to Cloudinary
      const pageUrls: string[] = [];
      for (let i = 0; i < chapterPages.length; i++) {
        const formData = new FormData();
        formData.append("file", chapterPages[i]);
        formData.append("upload_preset", "unsigned_preset");
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST", body: formData,
        });
        const data = await res.json();
        pageUrls.push(data.secure_url);
        setUploadProgress(Math.round(((i + 1) / chapterPages.length) * 100));
      }

      // Create chapter
      const res = await fetch(`/api/manga/${showAddChapter.id}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterNum,
          title: chapterTitle || `Chapter ${chapterNum}`,
          pages: pageUrls,
        }),
      });

      if (res.ok) {
        setShowAddChapter(null);
        fetchMyMangas(); // Refresh data
        alert(`✅ Đã thêm Chapter ${chapterNum} thành công!`);
      } else {
        alert("Lỗi tạo chapter!");
      }
    } catch {
      alert("Lỗi kết nối!");
    }
    setUploadingChapter(false);
  }

  const totalViews = mangas.reduce((a, m) => a + (m.views || 0), 0);
  const totalChapters = mangas.reduce((a, m) => a + (m._count?.chapters || 0), 0);
  const avgRating = mangas.length > 0
    ? (mangas.reduce((a, m) => a + (m.avgRating || 0), 0) / mangas.length).toFixed(1)
    : "0.0";

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .manga-card { transition: all 0.3s; }
        .manga-card:hover { transform: translateY(-2px); }
        .action-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .action-btn:hover { transform: translateY(-1px); opacity: 0.85; }
        .gold-btn { background: linear-gradient(135deg, #c9a84c, #8b6914); transition: all 0.3s; cursor: pointer; border: none; }
        .gold-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.3); }
        .gold-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        @keyframes fadeUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .fade-up { animation: fadeUp 0.4s ease; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .float { animation: float 3s ease-in-out infinite; }
        .input-field { width: 100%; padding: 11px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; color: #f0e6d0; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #c9a84c; }
        .input-field::placeholder { color: rgba(240,230,208,0.25); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,8,0.95)", borderBottom: "1px solid rgba(201,168,76,0.12)", backdropFilter: "blur(20px)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <img src="/logo.png" alt="logo" style={{ width: 34, height: 34, borderRadius: "8px", objectFit: "contain" }} />
          <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em" }}>M<span style={{ color: "#c9a84c" }}>AI</span>NGA</div>
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: "rgba(240,230,208,0.4)", letterSpacing: "0.15em" }}>📊 AUTHOR DASHBOARD</div>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", padding: "7px 16px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer" }}>← Trang chủ</button>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* WELCOME */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 8 }}>✦ Chào mừng trở lại</div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(22px, 4vw, 32px)", letterSpacing: "0.05em" }}>{session?.user?.name || "Tác Giả"}</h1>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "4px", marginBottom: 40, background: "rgba(255,255,255,0.02)", borderRadius: "10px", padding: "4px", border: "1px solid rgba(201,168,76,0.1)", width: "fit-content" }}>
          {[["overview", "📊 Tổng Quan"], ["mangas", "📚 Manga Của Tôi"]].map(([tab, label]) => (
            <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab as any)} style={{ padding: "9px 22px", borderRadius: "8px", background: activeTab === tab ? "linear-gradient(135deg, #c9a84c, #8b6914)" : "transparent", color: activeTab === tab ? "#080808" : "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: activeTab === tab ? 600 : 400 }}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="fade-up">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: 40 }}>
              {[
                ["📚", mangas.length, "Tổng Manga"],
                ["👁", totalViews.toLocaleString(), "Lượt Xem"],
                ["📖", totalChapters, "Tổng Chapter"],
                ["⭐", avgRating, "Rating TB"],
              ].map(([icon, val, label]) => (
                <div key={label as string} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
                  <div style={{ fontSize: 30, marginBottom: 12 }}>{icon}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: "#c9a84c", fontWeight: 600, marginBottom: 4 }}>{val}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label as string}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", padding: "28px" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: "#c9a84c", marginBottom: 24, letterSpacing: "0.08em" }}>🔥 Manga Nổi Bật</div>
              {mangas.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div className="float" style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.3)", marginBottom: 20 }}>Bạn chưa có manga nào</div>
                  <button className="gold-btn" onClick={() => router.push("/")} style={{ padding: "12px 28px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Manga Đầu Tiên</button>
                </div>
              ) : (
                mangas.sort((a, b) => b.views - a.views).slice(0, 5).map((m, i) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: i < 3 ? "#c9a84c" : "rgba(240,230,208,0.2)", minWidth: 32, textAlign: "center" }}>#{i + 1}</div>
                    <div style={{ width: 44, height: 60, borderRadius: "6px", overflow: "hidden", background: "rgba(201,168,76,0.05)", flexShrink: 0 }}>
                      {m.coverImage ? <img src={m.coverImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📖</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#f0e6d0", marginBottom: 4, fontWeight: 500 }}>{m.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.3)" }}>{m._count?.chapters || 0} chapters · ⭐ {m.avgRating?.toFixed(1) || "0.0"}</div>
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c9a84c" }}>👁 {m.views}</div>
                    <button className="action-btn" onClick={() => openAddChapter(m)} style={{ padding: "6px 14px", background: "linear-gradient(135deg,#c9a84c,#8b6914)", border: "none", borderRadius: "6px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600 }}>+ Chapter</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* MANGAS TAB */}
        {activeTab === "mangas" && (
          <div className="fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.4)" }}>{mangas.length} manga</div>
              <button className="gold-btn" onClick={() => router.push("/")} style={{ padding: "9px 20px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Manga Mới</button>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(240,230,208,0.3)", fontFamily: "'Inter', sans-serif" }}>Đang tải...</div>
            ) : mangas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div className="float" style={{ fontSize: 56, marginBottom: 20 }}>📚</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(240,230,208,0.3)", marginBottom: 24 }}>Chưa có manga nào</div>
                <button className="gold-btn" onClick={() => router.push("/")} style={{ padding: "12px 28px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>✦ Đăng Manga Đầu Tiên</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {mangas.map(m => (
                  <div key={m.id} className="manga-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "12px", overflow: "hidden", display: "flex", gap: "0" }}>
                    {/* COVER */}
                    <div style={{ width: 90, minHeight: 120, flexShrink: 0, position: "relative", background: "rgba(201,168,76,0.03)" }}>
                      {m.coverImage ? <img src={m.coverImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📖</div>}
                    </div>

                    {/* INFO */}
                    <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#f0e6d0", marginBottom: 8, fontWeight: 600 }}>{m.title}</div>
                        <div style={{ display: "flex", gap: "16px", marginBottom: 8 }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.4)" }}>📖 {m._count?.chapters || 0} chapters</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.4)" }}>👁 {m.views} lượt xem</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.4)" }}>⭐ {m.avgRating?.toFixed(1) || "0.0"}</span>
                        </div>
                        {m.description && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.25)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as any}>{m.description}</div>}
                      </div>

                      {/* ACTIONS */}
                      <div style={{ display: "flex", gap: "8px", marginTop: 12, flexWrap: "wrap" }}>
                        <button className="action-btn gold-btn" onClick={() => openAddChapter(m)} style={{ padding: "8px 18px", borderRadius: "7px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700 }}>+ Thêm Chapter</button>
                        <button className="action-btn" onClick={() => router.push(`/manga/${m.id}`)} style={{ padding: "8px 16px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "7px", color: "#c9a84c", fontFamily: "'Inter', sans-serif", fontSize: 13 }}>👁 Xem</button>
                        <button className="action-btn" onClick={() => setShowDeleteConfirm(m.id)} style={{ padding: "8px 12px", background: "rgba(255,60,60,0.06)", border: "1px solid rgba(255,60,60,0.15)", borderRadius: "7px", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 13 }}>🗑 Xóa</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADD CHAPTER MODAL */}
      {showAddChapter && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget && !uploadingChapter) setShowAddChapter(null); }}>
          <div style={{ background: "#111", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "36px", width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", animation: "fadeUp 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "#f0e6d0", letterSpacing: "0.08em" }}>✦ THÊM CHAPTER MỚI</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c", marginTop: 4 }}>{showAddChapter.title}</div>
              </div>
              {!uploadingChapter && <button onClick={() => setShowAddChapter(null)} style={{ background: "transparent", border: "none", color: "rgba(240,230,208,0.3)", fontSize: 20, cursor: "pointer" }}>✕</button>}
            </div>

            {/* CHAPTER INFO */}
            <div style={{ display: "flex", gap: "12px", marginBottom: 16 }}>
              <input className="input-field" style={{ flex: 1 }} type="number" min={1} placeholder="Số chapter *" value={chapterNum} onChange={e => setChapterNum(parseInt(e.target.value) || 1)} disabled={uploadingChapter} />
              <input className="input-field" style={{ flex: 2 }} placeholder="Tên chapter (tùy chọn)" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} disabled={uploadingChapter} />
            </div>

            {/* PAGES UPLOAD */}
            <div
              onDragOver={e => { e.preventDefault(); setChapterDragOver(true); }}
              onDragLeave={() => setChapterDragOver(false)}
              onDrop={e => {
                e.preventDefault(); setChapterDragOver(false);
                const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
                setChapterPages(prev => [...prev, ...files].slice(0, 50));
              }}
              onClick={() => !uploadingChapter && document.getElementById('chapter-pages-input')?.click()}
              style={{ border: `1px dashed ${chapterDragOver ? "#c9a84c" : chapterPages.length > 0 ? "#c9a84c" : "rgba(201,168,76,0.2)"}`, borderRadius: "10px", padding: chapterPages.length > 0 ? "16px" : "40px 20px", textAlign: "center", cursor: uploadingChapter ? "not-allowed" : "pointer", transition: "all 0.3s", background: chapterDragOver ? "rgba(201,168,76,0.04)" : "transparent", marginBottom: 16 }}
            >
              {chapterPages.length > 0 ? (
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#c9a84c", marginBottom: 10 }}>✓ {chapterPages.length} trang đã chọn</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginBottom: 8 }}>
                    {chapterPages.slice(0, 8).map((f, i) => (
                      <div key={i} style={{ width: 52, height: 70, borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.2)" }}>
                        <img src={URL.createObjectURL(f)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                    {chapterPages.length > 8 && <div style={{ width: 52, height: 70, borderRadius: "4px", background: "rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a84c", fontSize: 12 }}>+{chapterPages.length - 8}</div>}
                  </div>
                  {!uploadingChapter && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)" }}>Click để thêm ảnh</div>}
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📂</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(240,230,208,0.4)", marginBottom: 6 }}>Kéo thả ảnh manga vào đây</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c" }}>hoặc Click để chọn từ PC</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.2)", marginTop: 6 }}>JPG · PNG · WEBP — tối đa 50 trang</div>
                </>
              )}
              <input id="chapter-pages-input" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => {
                const files = Array.from(e.target.files || []).filter(f => f.type.startsWith("image/"));
                setChapterPages(prev => [...prev, ...files].slice(0, 50));
              }} />
            </div>

            {/* PAGE COUNT + CLEAR */}
            {chapterPages.length > 0 && !uploadingChapter && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.4)" }}>{chapterPages.length} trang</span>
                <button onClick={() => setChapterPages([])} style={{ background: "transparent", border: "none", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: "pointer" }}>✕ Xóa tất cả</button>
              </div>
            )}

            {/* UPLOAD PROGRESS */}
            {uploadingChapter && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)" }}>Đang tải lên...</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c9a84c", fontWeight: 600 }}>{uploadProgress}%</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${uploadProgress}%`, background: "linear-gradient(90deg,#c9a84c,#8b6914)", borderRadius: 4, transition: "width 0.3s" }} />
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)", marginTop: 6 }}>Đang tải {uploadProgress < 100 ? `ảnh ${Math.ceil(uploadProgress * chapterPages.length / 100)}/${chapterPages.length}` : "xong!"}</div>
              </div>
            )}

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "10px" }}>
              {!uploadingChapter && (
                <button onClick={() => setShowAddChapter(null)} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>Hủy</button>
              )}
              <button className="gold-btn" onClick={handleAddChapter} disabled={uploadingChapter || chapterPages.length === 0} style={{ flex: 2, padding: "12px", borderRadius: "8px", color: "#080808", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.05em" }}>
                {uploadingChapter ? `Đang tải... ${uploadProgress}%` : `✦ ĐĂNG CHAPTER ${chapterNum}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div style={{ background: "#111", border: "1px solid rgba(255,60,60,0.2)", borderRadius: "16px", padding: "40px", maxWidth: 400, textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "#f0e6d0", marginBottom: 12 }}>Xóa Manga?</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.4)", marginBottom: 28, lineHeight: 1.6 }}>Hành động này không thể hoàn tác. Tất cả chapter và dữ liệu sẽ bị xóa vĩnh viễn.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowDeleteConfirm(null)} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer" }}>Hủy</button>
              <button onClick={() => deleteManga(showDeleteConfirm)} style={{ flex: 1, padding: "12px", background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.3)", borderRadius: "8px", color: "#ff5050", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Xóa Vĩnh Viễn</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
