"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MangaDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetch(`/api/manga/${id}`)
      .then(r => r.json())
      .then(data => { setManga(data); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, color: "#c9411e" }}>Đang tải...</div>
    </div>
  );

  if (!manga || manga.error) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Noto Sans', sans-serif", color: "rgba(232,224,212,0.5)" }}>Không tìm thấy manga</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e0d4", fontFamily: "'Noto Serif', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Oswald:wght@400;600;700&family=Noto+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .back-btn { cursor: pointer; transition: color 0.2s; }
        .back-btn:hover { color: #c9411e; }
        .chapter-item { transition: all 0.2s; cursor: pointer; }
        .chapter-item:hover { background: rgba(201,65,30,0.1) !important; border-color: rgba(201,65,30,0.3) !important; }
        .star { cursor: pointer; transition: transform 0.1s; }
        .star:hover { transform: scale(1.2); }
        .glow-btn { transition: all 0.25s ease; cursor: pointer; border: none; }
        .glow-btn:hover { box-shadow: 0 0 20px rgba(201,65,30,0.5) !important; transform: translateY(-1px); }
        .input-field { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e8e0d4; font-family: 'Noto Sans', sans-serif; font-size: 14px; outline: none; }
        .input-field:focus { border-color: #c9411e; }
        .input-field::placeholder { color: rgba(232,224,212,0.3); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", padding: "0 24px", display: "flex", alignItems: "center", gap: "16px", height: "60px" }}>
        <span className="back-btn" onClick={() => router.push("/")} style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.5)", display: "flex", alignItems: "center", gap: "6px" }}>
          ← Trang chủ
        </span>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />
        <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.7)" }}>{manga.title}</span>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>

        {/* MANGA INFO */}
        <div style={{ display: "flex", gap: "32px", marginBottom: 48, flexWrap: "wrap" }}>
          {/* Cover */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 200, height: 280, borderRadius: "10px", overflow: "hidden", background: "rgba(255,255,255,0.05)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              {manga.coverImage ? (
                <img src={manga.coverImage} alt={manga.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>📖</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ marginBottom: 8 }}>
              {manga.genre?.map((g: string) => (
                <span key={g} style={{ display: "inline-block", padding: "3px 10px", background: "rgba(201,65,30,0.15)", border: "1px solid rgba(201,65,30,0.3)", borderRadius: "20px", fontFamily: "'Noto Sans', sans-serif", fontSize: 11, color: "#c9411e", marginRight: 6, marginBottom: 6 }}>{g}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>{manga.title}</h1>
            <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, color: "rgba(232,224,212,0.5)", marginBottom: 16 }}>
              Tác giả: <span style={{ color: "#c9411e" }}>@{manga.author?.name}</span>
            </div>
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 14, color: "rgba(232,224,212,0.6)", lineHeight: 1.7, marginBottom: 20 }}>
              {manga.description || "Chưa có mô tả."}
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "24px", marginBottom: 20 }}>
              {[["👁", manga.views, "Lượt xem"], ["📚", manga._count?.chapters, "Chapter"], ["⭐", manga.avgRating?.toFixed(1), "Đánh giá"], ["💬", manga.comments?.length, "Bình luận"]].map(([icon, val, label]) => (
                <div key={label as string} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#c9411e" }}>{icon} {val || 0}</div>
                  <div style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 11, color: "rgba(232,224,212,0.4)", marginTop: 2 }}>{label as string}</div>
                </div>
              ))}
            </div>

            {/* Status */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ padding: "4px 12px", borderRadius: "20px", background: manga.status === "completed" ? "rgba(34,197,94,0.15)" : "rgba(201,65,30,0.15)", border: `1px solid ${manga.status === "completed" ? "rgba(34,197,94,0.3)" : "rgba(201,65,30,0.3)"}`, fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: manga.status === "completed" ? "#22c55e" : "#c9411e" }}>
                {manga.status === "completed" ? "✅ Hoàn thành" : "🔄 Đang tiến hành"}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {manga.chapters?.length > 0 && (
                <button className="glow-btn" onClick={() => router.push(`/manga/${id}/chapter/${manga.chapters[0].id}`)} style={{ padding: "10px 24px", background: "#c9411e", borderRadius: "8px", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, fontWeight: 600, boxShadow: "0 4px 15px rgba(201,65,30,0.3)" }}>
                  📖 Đọc từ đầu
                </button>
              )}
              {manga.chapters?.length > 1 && (
                <button className="glow-btn" onClick={() => router.push(`/manga/${id}/chapter/${manga.chapters[manga.chapters.length - 1].id}`)} style={{ padding: "10px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#e8e0d4", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
                  ⏩ Chapter mới nhất
                </button>
              )}
              <button onClick={() => setFollowing(f => !f)} style={{ padding: "10px 20px", background: following ? "rgba(201,65,30,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${following ? "rgba(201,65,30,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", color: following ? "#c9411e" : "rgba(232,224,212,0.6)", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>
                {following ? "🔖 Đang theo dõi" : "🔖 Theo dõi"}
              </button>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "24px", marginBottom: 32 }}>
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, marginBottom: 16 }}>⭐ Đánh giá manga này</h3>
          <div style={{ display: "flex", gap: "8px" }}>
            {[1,2,3,4,5].map(star => (
              <span key={star} className="star" onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setUserRating(star)} style={{ fontSize: 32, color: star <= (hoveredStar || userRating) ? "#f5a623" : "rgba(232,224,212,0.2)" }}>★</span>
            ))}
            {userRating > 0 && <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 14, color: "rgba(232,224,212,0.5)", alignSelf: "center", marginLeft: 8 }}>Bạn đã đánh giá {userRating}/5</span>}
          </div>
        </div>

        {/* CHAPTERS */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 20 }}>
            📚 Danh sách chapter ({manga.chapters?.length || 0})
          </h2>
          {manga.chapters?.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "rgba(232,224,212,0.3)", fontFamily: "'Noto Sans', sans-serif" }}>Chưa có chapter nào</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {manga.chapters?.map((ch: any) => (
                <div key={ch.id} className="chapter-item" onClick={() => router.push(`/manga/${id}/chapter/${ch.id}`)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: "#c9411e", minWidth: 80 }}>Chapter {ch.chapterNum}</span>
                    <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 14, color: "rgba(232,224,212,0.8)" }}>{ch.title}</span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "rgba(232,224,212,0.3)" }}>👁 {ch.views}</span>
                    <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: "rgba(232,224,212,0.3)" }}>{new Date(ch.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COMMENTS */}
        <div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 20 }}>
            💬 Bình luận ({manga.comments?.length || 0})
          </h2>
          <div style={{ marginBottom: 20 }}>
            <textarea className="input-field" rows={3} placeholder="Viết bình luận của bạn..." value={comment} onChange={e => setComment(e.target.value)} style={{ resize: "none", marginBottom: 10 }} />
            <button className="glow-btn" style={{ padding: "10px 24px", background: "#c9411e", borderRadius: "8px", color: "#fff", fontFamily: "'Noto Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
              Gửi bình luận
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {manga.comments?.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "rgba(232,224,212,0.3)", fontFamily: "'Noto Sans', sans-serif" }}>Chưa có bình luận nào. Hãy là người đầu tiên!</div>
            ) : (
              manga.comments?.map((c: any) => (
                <div key={c.id} style={{ padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c9411e, #6a1a8a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                      {c.user?.image ? <img src={c.user.image} style={{ width: "100%", height: "100%", borderRadius: "50%" }} /> : "👤"}
                    </div>
                    <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#c9411e" }}>{c.user?.name}</span>
                    <span style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 11, color: "rgba(232,224,212,0.3)" }}>{new Date(c.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: 14, color: "rgba(232,224,212,0.7)", lineHeight: 1.6 }}>{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}