"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoverImage from "@/components/CoverImage";
import CoverEditor from "@/components/CoverEditor";

const GENRES = [
  "Action",
  "Adventure",
  "Drama",
  "Fantasy",
  "Romance",
  "School Life",
  "Slice of Life",
  "Comedy",
  "Mystery",
  "Horror",
  "Sci-Fi",
];

type MangaItem = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  coverPositionX?: number;
  coverPositionY?: number;
  genre?: string[];
  status?: string;
  views?: number;
  avgRating?: number;
  _count?: {
    chapters?: number;
  };
};

export default function DashboardPage() {
  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [mangas, setMangas] = useState<MangaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "mangas">("overview");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [showCreateManga, setShowCreateManga] = useState(false);
  const [creatingManga, setCreatingManga] = useState(false);
  const [createProgress, setCreateProgress] = useState(0);
  const [createMsg, setCreateMsg] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    status: "ongoing",
    genre: [] as string[],
    coverPositionX: 50,
    coverPositionY: 50,
  });

  const [showEditManga, setShowEditManga] = useState<MangaItem | null>(null);
  const [editingManga, setEditingManga] = useState(false);
  const [editProgress, setEditProgress] = useState(0);
  const [editMsg, setEditMsg] = useState("");
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editCoverPreview, setEditCoverPreview] = useState("");
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    description: "",
    status: "ongoing",
    genre: [] as string[],
    coverImage: "",
    coverPositionX: 50,
    coverPositionY: 50,
  });

  const [showAddChapter, setShowAddChapter] = useState<MangaItem | null>(null);
  const [chapterNum, setChapterNum] = useState(1);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterPages, setChapterPages] = useState<File[]>([]);
  const [chapterDragOver, setChapterDragOver] = useState(false);
  const [uploadingChapter, setUploadingChapter] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    import("next-auth/react").then(({ getSession }) => {
      getSession().then((s) => {
        if (!s) {
          router.push("/");
          return;
        }
        setSession(s);
        fetchMyMangas();
      });
    });
  }, [router]);

  async function fetchMyMangas() {
    setLoading(true);
    try {
      const res = await fetch("/api/manga?mine=true", { cache: "no-store" });
      const data = await res.json();
      setMangas(Array.isArray(data.mangas) ? data.mangas : []);
    } catch {
      setMangas([]);
    }
    setLoading(false);
  }

  async function uploadImageToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();
    if (!uploadRes.ok || !uploadData.secure_url) {
      throw new Error("Upload ảnh thất bại");
    }

    return uploadData.secure_url as string;
  }

  function resetCreateForm() {
    setCreateForm({
      title: "",
      description: "",
      status: "ongoing",
      genre: [],
      coverPositionX: 50,
      coverPositionY: 50,
    });
    setCoverFile(null);
    setCoverPreview("");
    setCreateProgress(0);
    setCreateMsg("");
  }

  function openCreateManga() {
    resetCreateForm();
    setShowCreateManga(true);
  }

  function toggleCreateGenre(genre: string) {
    setCreateForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  }

  function toggleEditGenre(genre: string) {
    setEditForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  }

  async function handleCreateManga() {
    if (!createForm.title.trim()) {
      setCreateMsg("Vui lòng nhập tên manga.");
      return;
    }

    setCreatingManga(true);
    setCreateMsg("");
    setCreateProgress(10);

    try {
      let coverImage = "";

      if (coverFile) {
        coverImage = await uploadImageToCloudinary(coverFile);
        setCreateProgress(65);
      }

      const res = await fetch("/api/manga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: createForm.title.trim(),
          description: createForm.description.trim(),
          status: createForm.status,
          genre: createForm.genre,
          coverImage,
          coverPositionX: createForm.coverPositionX,
          coverPositionY: createForm.coverPositionY,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setCreateMsg(data.error || "Tạo manga thất bại.");
        setCreatingManga(false);
        return;
      }

      setCreateProgress(100);
      setShowCreateManga(false);
      resetCreateForm();
      await fetchMyMangas();
      alert("Đã tạo manga thành công.");
    } catch {
      setCreateMsg("Lỗi kết nối hoặc upload ảnh bìa.");
    }

    setCreatingManga(false);
  }

  function openEditManga(manga: MangaItem) {
    setEditForm({
      id: manga.id,
      title: manga.title || "",
      description: manga.description || "",
      status: manga.status || "ongoing",
      genre: Array.isArray(manga.genre) ? manga.genre : [],
      coverImage: manga.coverImage || "",
      coverPositionX: manga.coverPositionX ?? 50,
      coverPositionY: manga.coverPositionY ?? 50,
    });
    setEditCoverFile(null);
    setEditCoverPreview(manga.coverImage || "");
    setEditProgress(0);
    setEditMsg("");
    setShowEditManga(manga);
  }

  async function handleEditManga() {
    if (!editForm.title.trim()) {
      setEditMsg("Vui lòng nhập tên manga.");
      return;
    }

    setEditingManga(true);
    setEditMsg("");
    setEditProgress(10);

    try {
      let nextCover = editForm.coverImage || "";

      if (editCoverFile) {
        nextCover = await uploadImageToCloudinary(editCoverFile);
        setEditProgress(64);
      }

      const res = await fetch(`/api/manga/${editForm.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          status: editForm.status,
          genre: editForm.genre,
          coverImage: nextCover,
          coverPositionX: editForm.coverPositionX,
          coverPositionY: editForm.coverPositionY,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setEditMsg(data.error || data.message || "Cập nhật manga thất bại.");
        setEditingManga(false);
        return;
      }

      setEditProgress(100);
      setShowEditManga(null);
      await fetchMyMangas();
      alert("Đã cập nhật manga thành công.");
    } catch {
      setEditMsg("Cập nhật manga thất bại.");
    }

    setEditingManga(false);
  }

  async function deleteManga(id: string) {
    await fetch(`/api/manga/${id}`, { method: "DELETE" });
    setMangas((prev) => prev.filter((m) => m.id !== id));
    setShowDeleteConfirm(null);
  }

  function openAddChapter(manga: MangaItem) {
    const nextNum = (manga._count?.chapters || 0) + 1;
    setChapterNum(nextNum);
    setChapterTitle("");
    setChapterPages([]);
    setUploadProgress(0);
    setShowAddChapter(manga);
  }

  async function handleAddChapter() {
    if (chapterPages.length === 0) {
      alert("Vui lòng tải ít nhất 1 trang.");
      return;
    }

    setUploadingChapter(true);
    setUploadProgress(0);

    try {
      const pageUrls: string[] = [];

      for (let i = 0; i < chapterPages.length; i++) {
        const url = await uploadImageToCloudinary(chapterPages[i]);
        pageUrls.push(url);
        setUploadProgress(Math.round(((i + 1) / chapterPages.length) * 100));
      }

      const res = await fetch(`/api/manga/${showAddChapter?.id}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterNum,
          title: chapterTitle || `Chapter ${chapterNum}`,
          pages: pageUrls,
        }),
      });

      if (!res.ok) {
        alert("Lỗi tạo chapter.");
        setUploadingChapter(false);
        return;
      }

      setShowAddChapter(null);
      await fetchMyMangas();
      alert(`Đã thêm Chapter ${chapterNum} thành công.`);
    } catch {
      alert("Lỗi kết nối.");
    }

    setUploadingChapter(false);
  }

  const totalViews = mangas.reduce((sum, m) => sum + (m.views || 0), 0);
  const totalChapters = mangas.reduce((sum, m) => sum + (m._count?.chapters || 0), 0);
  const avgRating =
    mangas.length > 0
      ? (mangas.reduce((sum, m) => sum + (m.avgRating || 0), 0) / mangas.length).toFixed(1)
      : "0.0";

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .tab-btn:hover { opacity: 0.96; }

        .manga-card { transition: all 0.25s ease; }
        .manga-card:hover { transform: translateY(-2px); }

        .action-btn { transition: all 0.2s ease; cursor: pointer; border: none; }
        .action-btn:hover { transform: translateY(-1px); opacity: 0.96; }

        .gold-btn {
          background: linear-gradient(135deg, #c9a84c, #8b6914);
          transition: all 0.25s ease;
          cursor: pointer;
          border: none;
        }
        .gold-btn:hover {
          opacity: 0.96;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(201,168,76,0.28);
        }
        .gold-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @keyframes fadeUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.35s ease; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .float { animation: float 3s ease-in-out infinite; }

        .input-field {
          width: 100%;
          padding: 11px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 8px;
          color: #f0e6d0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border 0.2s;
        }
        .input-field:focus {
          border-color: #c9a84c;
        }
        .input-field::placeholder {
          color: rgba(240,230,208,0.25);
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.88);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
        }
      `}</style>

      <nav
        style={{
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
        }}
      >
        <div
          onClick={() => router.push("/")}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 34, height: 34, borderRadius: 8, objectFit: "contain" }}
          />
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "0.1em",
            }}
          >
            M<span style={{ color: "#c9a84c" }}>AI</span>NGA
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            color: "rgba(240,230,208,0.5)",
            letterSpacing: "0.12em",
          }}
        >
          AUTHOR DASHBOARD
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 6,
            padding: "7px 16px",
            color: "rgba(240,230,208,0.5)",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Trang chủ
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              letterSpacing: "0.28em",
              color: "#c9a84c",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Chào mừng trở lại
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(24px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#f5eedf",
              lineHeight: 1.1,
            }}
          >
            {session?.user?.name || "Tác Giả"}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 40,
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            padding: 4,
            border: "1px solid rgba(201,168,76,0.1)",
            width: "fit-content",
          }}
        >
          {[["overview", "Tổng Quan"], ["mangas", "Manga Của Tôi"]].map(([tab, label]) => (
            <button
              key={tab}
              className="tab-btn"
              onClick={() => setActiveTab(tab as "overview" | "mangas")}
              style={{
                padding: "9px 22px",
                borderRadius: 8,
                background:
                  activeTab === tab
                    ? "linear-gradient(135deg, #c9a84c, #8b6914)"
                    : "transparent",
                color: activeTab === tab ? "#080808" : "rgba(240,230,208,0.45)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 500,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="fade-up">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 40,
              }}
            >
              {[
                ["Tổng Manga", mangas.length],
                ["Lượt Xem", totalViews.toLocaleString()],
                ["Tổng Chapter", totalChapters],
                ["Rating TB", avgRating],
              ].map(([label, val]) => (
                <div
                  key={label as string}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: 12,
                    padding: 24,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 28,
                      color: "#c9a84c",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "rgba(240,230,208,0.3)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label as string}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(201,168,76,0.1)",
                borderRadius: 12,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 15,
                    color: "#c9a84c",
                    letterSpacing: "0.08em",
                  }}
                >
                  Manga Nổi Bật
                </div>

                <button
                  className="gold-btn"
                  onClick={openCreateManga}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Đăng Manga Mới
                </button>
              </div>

              {mangas.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    className="float"
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 999,
                      margin: "0 auto 16px",
                      border: "1px solid rgba(201,168,76,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      fontFamily: "'Cinzel', serif",
                      fontSize: 22,
                    }}
                  >
                    M
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "rgba(240,230,208,0.3)",
                      marginBottom: 20,
                    }}
                  >
                    Bạn chưa có manga nào
                  </div>

                  <button
                    className="gold-btn"
                    onClick={openCreateManga}
                    style={{
                      padding: "12px 28px",
                      borderRadius: 8,
                      color: "#080808",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Đăng Manga Đầu Tiên
                  </button>
                </div>
              ) : (
                [...mangas]
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 5)
                  .map((m, i) => (
                    <div
                      key={m.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: 18,
                          color: i < 3 ? "#c9a84c" : "rgba(240,230,208,0.2)",
                          minWidth: 32,
                          textAlign: "center",
                        }}
                      >
                        #{i + 1}
                      </div>

                      <div style={{ width: 44, flexShrink: 0 }}>
                        <CoverImage
                          src={m.coverImage}
                          alt={m.title}
                          positionX={m.coverPositionX ?? 50}
                          positionY={m.coverPositionY ?? 50}
                          aspectRatio="3 / 4"
                          borderRadius={8}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 15,
                            color: "#f5eedf",
                            marginBottom: 4,
                            fontWeight: 800,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {m.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            color: "rgba(240,230,208,0.3)",
                          }}
                        >
                          {m._count?.chapters || 0} chapters · Rating {m.avgRating?.toFixed(1) || "0.0"}
                        </div>
                      </div>

                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          color: "#c9a84c",
                        }}
                      >
                        {m.views || 0}
                      </div>

                      <button
                        className="action-btn"
                        onClick={() => openAddChapter(m)}
                        style={{
                          padding: "6px 14px",
                          background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                          borderRadius: 6,
                          color: "#080808",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Thêm Chapter
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {activeTab === "mangas" && (
          <div className="fade-up">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(240,230,208,0.4)",
                }}
              >
                {mangas.length} manga
              </div>

              <button
                className="gold-btn"
                onClick={openCreateManga}
                style={{
                  padding: "9px 20px",
                  borderRadius: 8,
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Đăng Manga Mới
              </button>
            </div>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 0",
                  color: "rgba(240,230,208,0.3)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Đang tải...
              </div>
            ) : mangas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div
                  className="float"
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 999,
                    margin: "0 auto 20px",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c9a84c",
                    fontFamily: "'Cinzel', serif",
                    fontSize: 24,
                  }}
                >
                  M
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "rgba(240,230,208,0.3)",
                    marginBottom: 24,
                  }}
                >
                  Chưa có manga nào
                </div>

                <button
                  className="gold-btn"
                  onClick={openCreateManga}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Đăng Manga Đầu Tiên
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {mangas.map((m) => (
                  <div
                    key={m.id}
                    className="manga-card"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(201,168,76,0.1)",
                      borderRadius: 12,
                      overflow: "hidden",
                      display: "flex",
                      gap: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 116,
                        minHeight: 156,
                        flexShrink: 0,
                        background: "rgba(201,168,76,0.03)",
                        padding: 10,
                      }}
                    >
                      <CoverImage
                        src={m.coverImage}
                        alt={m.title}
                        positionX={m.coverPositionX ?? 50}
                        positionY={m.coverPositionY ?? 50}
                        aspectRatio="3 / 4"
                        borderRadius={12}
                      />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        padding: "18px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            color: "#f5eedf",
                            marginBottom: 8,
                            fontWeight: 800,
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {m.title}
                        </div>

                        {Array.isArray(m.genre) && m.genre.length > 0 && (
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                            {m.genre.slice(0, 6).map((g: string) => (
                              <span
                                key={g}
                                style={{
                                  padding: "5px 10px",
                                  borderRadius: 999,
                                  border: "1px solid rgba(201,168,76,0.18)",
                                  background: "rgba(201,168,76,0.08)",
                                  color: "#c9a84c",
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: 11,
                                  fontWeight: 600,
                                }}
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "rgba(240,230,208,0.4)",
                            }}
                          >
                            {m._count?.chapters || 0} chapters
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "rgba(240,230,208,0.4)",
                            }}
                          >
                            {m.views || 0} lượt xem
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "rgba(240,230,208,0.4)",
                            }}
                          >
                            Rating {m.avgRating?.toFixed(1) || "0.0"}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "#c9a84c",
                            }}
                          >
                            {m.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}
                          </span>
                        </div>

                        {m.description && (
                          <div
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 13,
                              color: "rgba(240,230,208,0.34)",
                              lineHeight: 1.55,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              maxWidth: 840,
                            } as any}
                          >
                            {m.description}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                        <button
                          className="action-btn gold-btn"
                          onClick={() => openAddChapter(m)}
                          style={{
                            padding: "8px 18px",
                            borderRadius: 7,
                            color: "#080808",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          Thêm Chapter
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => openEditManga(m)}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(201,168,76,0.08)",
                            border: "1px solid rgba(201,168,76,0.2)",
                            borderRadius: 7,
                            color: "#c9a84c",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          Sửa Manga
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => router.push(`/manga/${m.id}`)}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            borderRadius: 7,
                            color: "#f0e6d0",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                          }}
                        >
                          Xem
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => setShowDeleteConfirm(m.id)}
                          style={{
                            padding: "8px 12px",
                            background: "rgba(255,60,60,0.06)",
                            border: "1px solid rgba(255,60,60,0.15)",
                            borderRadius: 7,
                            color: "#ff5050",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showCreateManga && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget && !creatingManga) setShowCreateManga(false);
          }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 16,
              padding: 36,
              width: "100%",
              maxWidth: 620,
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "fadeUp 0.3s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 18,
                    color: "#f0e6d0",
                    letterSpacing: "0.08em",
                  }}
                >
                  ĐĂNG MANGA MỚI
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#c9a84c",
                    marginTop: 4,
                  }}
                >
                  Tạo manga mới ngay trong dashboard
                </div>
              </div>

              {!creatingManga && (
                <button
                  onClick={() => setShowCreateManga(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(240,230,208,0.3)",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
              <input
                className="input-field"
                placeholder="Tên manga *"
                value={createForm.title}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, title: e.target.value }))}
                disabled={creatingManga}
              />

              <textarea
                className="input-field"
                rows={5}
                placeholder="Mô tả ngắn về manga..."
                value={createForm.description}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
                disabled={creatingManga}
                style={{ resize: "vertical", minHeight: 120 }}
              />

              <select
                className="input-field"
                value={createForm.status}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, status: e.target.value }))}
                disabled={creatingManga}
                style={{ cursor: "pointer" }}
              >
                <option value="ongoing" style={{ background: "#111" }}>
                  Đang tiến hành
                </option>
                <option value="completed" style={{ background: "#111" }}>
                  Hoàn thành
                </option>
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.45)",
                  marginBottom: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Thể loại
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {GENRES.map((genre) => {
                  const selected = createForm.genre.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => !creatingManga && toggleCreateGenre(genre)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: selected ? "none" : "1px solid rgba(201,168,76,0.16)",
                        background: selected
                          ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                          : "rgba(255,255,255,0.03)",
                        color: selected ? "#080808" : "#f0e6d0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: selected ? 700 : 500,
                        cursor: creatingManga ? "not-allowed" : "pointer",
                      }}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <CoverEditor
              value={coverPreview}
              positionX={createForm.coverPositionX}
              positionY={createForm.coverPositionY}
              onPositionChange={(x, y) =>
                setCreateForm((prev) => ({
                  ...prev,
                  coverPositionX: x,
                  coverPositionY: y,
                }))
              }
              onFileChange={(file, previewUrl) => {
                setCoverFile(file);
                setCoverPreview(previewUrl);
              }}
              disabled={creatingManga}
              label="Ảnh bìa manga"
            />

            {createMsg && (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  marginTop: 16,
                  color: "#ff6b6b",
                }}
              >
                {createMsg}
              </div>
            )}

            {creatingManga && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(240,230,208,0.5)",
                    }}
                  >
                    Đang tạo manga...
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#c9a84c",
                      fontWeight: 600,
                    }}
                  >
                    {createProgress}%
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${createProgress}%`,
                      background: "linear-gradient(90deg,#c9a84c,#8b6914)",
                      borderRadius: 4,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {!creatingManga && (
                <button
                  onClick={() => setShowCreateManga(false)}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    color: "rgba(240,230,208,0.4)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              )}

              <button
                className="gold-btn"
                onClick={handleCreateManga}
                disabled={creatingManga}
                style={{
                  flex: 2,
                  padding: 12,
                  borderRadius: 8,
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {creatingManga ? `Đang tạo... ${createProgress}%` : "TẠO MANGA"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditManga && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget && !editingManga) setShowEditManga(null);
          }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 16,
              padding: 36,
              width: "100%",
              maxWidth: 620,
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "fadeUp 0.3s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 18,
                    color: "#f0e6d0",
                    letterSpacing: "0.08em",
                  }}
                >
                  SỬA MANGA
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#c9a84c",
                    marginTop: 4,
                  }}
                >
                  Cập nhật ảnh bìa, mô tả, thể loại, trạng thái
                </div>
              </div>

              {!editingManga && (
                <button
                  onClick={() => setShowEditManga(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(240,230,208,0.3)",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
              <input
                className="input-field"
                placeholder="Tên manga *"
                value={editForm.title}
                onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                disabled={editingManga}
              />

              <textarea
                className="input-field"
                rows={5}
                placeholder="Mô tả ngắn về manga..."
                value={editForm.description}
                onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                disabled={editingManga}
                style={{ resize: "vertical", minHeight: 120 }}
              />

              <select
                className="input-field"
                value={editForm.status}
                onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                disabled={editingManga}
                style={{ cursor: "pointer" }}
              >
                <option value="ongoing" style={{ background: "#111" }}>
                  Đang tiến hành
                </option>
                <option value="completed" style={{ background: "#111" }}>
                  Hoàn thành
                </option>
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.45)",
                  marginBottom: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Thể loại
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {GENRES.map((genre) => {
                  const selected = editForm.genre.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => !editingManga && toggleEditGenre(genre)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: selected ? "none" : "1px solid rgba(201,168,76,0.16)",
                        background: selected
                          ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                          : "rgba(255,255,255,0.03)",
                        color: selected ? "#080808" : "#f0e6d0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: selected ? 700 : 500,
                        cursor: editingManga ? "not-allowed" : "pointer",
                      }}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <CoverEditor
              value={editCoverPreview}
              positionX={editForm.coverPositionX}
              positionY={editForm.coverPositionY}
              onPositionChange={(x, y) =>
                setEditForm((prev) => ({
                  ...prev,
                  coverPositionX: x,
                  coverPositionY: y,
                }))
              }
              onFileChange={(file, previewUrl) => {
                setEditCoverFile(file);
                setEditCoverPreview(previewUrl);
              }}
              disabled={editingManga}
              label="Ảnh bìa manga"
            />

            {editMsg && (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  marginTop: 16,
                  color: "#ff6b6b",
                }}
              >
                {editMsg}
              </div>
            )}

            {editingManga && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(240,230,208,0.5)",
                    }}
                  >
                    Đang cập nhật manga...
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#c9a84c",
                      fontWeight: 600,
                    }}
                  >
                    {editProgress}%
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${editProgress}%`,
                      background: "linear-gradient(90deg,#c9a84c,#8b6914)",
                      borderRadius: 4,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {!editingManga && (
                <button
                  onClick={() => setShowEditManga(null)}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    color: "rgba(240,230,208,0.4)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              )}

              <button
                className="gold-btn"
                onClick={handleEditManga}
                disabled={editingManga}
                style={{
                  flex: 2,
                  padding: 12,
                  borderRadius: 8,
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {editingManga ? `Đang cập nhật... ${editProgress}%` : "LƯU THAY ĐỔI"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddChapter && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget && !uploadingChapter) setShowAddChapter(null);
          }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 16,
              padding: 36,
              width: "100%",
              maxWidth: 500,
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "fadeUp 0.3s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 18,
                    color: "#f0e6d0",
                    letterSpacing: "0.08em",
                  }}
                >
                  THÊM CHAPTER MỚI
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#c9a84c",
                    marginTop: 4,
                  }}
                >
                  {showAddChapter.title}
                </div>
              </div>

              {!uploadingChapter && (
                <button
                  onClick={() => setShowAddChapter(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(240,230,208,0.3)",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <input
                className="input-field"
                style={{ flex: 1 }}
                type="number"
                min={1}
                placeholder="Số chapter *"
                value={chapterNum}
                onChange={(e) => setChapterNum(parseInt(e.target.value) || 1)}
                disabled={uploadingChapter}
              />

              <input
                className="input-field"
                style={{ flex: 2 }}
                placeholder="Tên chapter (tùy chọn)"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                disabled={uploadingChapter}
              />
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setChapterDragOver(true);
              }}
              onDragLeave={() => setChapterDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setChapterDragOver(false);
                const files = Array.from(e.dataTransfer.files).filter((f) =>
                  f.type.startsWith("image/")
                );
                setChapterPages((prev) => [...prev, ...files].slice(0, 50));
              }}
              onClick={() => !uploadingChapter && document.getElementById("chapter-pages-input")?.click()}
              style={{
                border: `1px dashed ${
                  chapterDragOver
                    ? "#c9a84c"
                    : chapterPages.length > 0
                    ? "#c9a84c"
                    : "rgba(201,168,76,0.2)"
                }`,
                borderRadius: 10,
                padding: chapterPages.length > 0 ? "16px" : "40px 20px",
                textAlign: "center",
                cursor: uploadingChapter ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                background: chapterDragOver ? "rgba(201,168,76,0.04)" : "transparent",
                marginBottom: 16,
              }}
            >
              {chapterPages.length > 0 ? (
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "#c9a84c",
                      marginBottom: 10,
                    }}
                  >
                    {chapterPages.length} trang đã chọn
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    {chapterPages.slice(0, 8).map((f, i) => (
                      <div
                        key={i}
                        style={{
                          width: 52,
                          height: 70,
                          borderRadius: 4,
                          overflow: "hidden",
                          border: "1px solid rgba(201,168,76,0.2)",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(f)}
                          alt={`page-${i + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ))}

                    {chapterPages.length > 8 && (
                      <div
                        style={{
                          width: 52,
                          height: 70,
                          borderRadius: 4,
                          background: "rgba(201,168,76,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c9a84c",
                          fontSize: 12,
                        }}
                      >
                        +{chapterPages.length - 8}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      margin: "0 auto 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(201,168,76,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      fontFamily: "'Cinzel', serif",
                      fontSize: 24,
                    }}
                  >
                    C
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "rgba(240,230,208,0.4)",
                      marginBottom: 6,
                    }}
                  >
                    Kéo thả hoặc chọn ảnh chapter
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "#c9a84c",
                    }}
                  >
                    JPG · PNG · WEBP — tối đa 50 trang
                  </div>
                </>
              )}

              <input
                id="chapter-pages-input"
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []).filter((f) =>
                    f.type.startsWith("image/")
                  );
                  setChapterPages((prev) => [...prev, ...files].slice(0, 50));
                }}
              />
            </div>

            {chapterPages.length > 0 && !uploadingChapter && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.4)",
                  }}
                >
                  {chapterPages.length} trang
                </span>

                <button
                  onClick={() => setChapterPages([])}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ff5050",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Xóa tất cả
                </button>
              </div>
            )}

            {uploadingChapter && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(240,230,208,0.5)",
                    }}
                  >
                    Đang tải lên...
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#c9a84c",
                      fontWeight: 600,
                    }}
                  >
                    {uploadProgress}%
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${uploadProgress}%`,
                      background: "linear-gradient(90deg,#c9a84c,#8b6914)",
                      borderRadius: 4,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              {!uploadingChapter && (
                <button
                  onClick={() => setShowAddChapter(null)}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    color: "rgba(240,230,208,0.4)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>
              )}

              <button
                className="gold-btn"
                onClick={handleAddChapter}
                disabled={uploadingChapter || chapterPages.length === 0}
                style={{
                  flex: 2,
                  padding: 12,
                  borderRadius: 8,
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {uploadingChapter ? `Đang tải... ${uploadProgress}%` : `ĐĂNG CHAPTER ${chapterNum}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(255,60,60,0.2)",
              borderRadius: 16,
              padding: 40,
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                margin: "0 auto 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,60,60,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff5050",
                fontFamily: "'Cinzel', serif",
                fontSize: 24,
              }}
            >
              !
            </div>

            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 18,
                color: "#f0e6d0",
                marginBottom: 12,
              }}
            >
              Xóa Manga?
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.4)",
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              Hành động này không thể hoàn tác. Tất cả chapter và dữ liệu sẽ bị xóa vĩnh viễn.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "rgba(240,230,208,0.5)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>

              <button
                onClick={() => deleteManga(showDeleteConfirm)}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "rgba(255,60,60,0.15)",
                  border: "1px solid rgba(255,60,60,0.3)",
                  borderRadius: 8,
                  color: "#ff5050",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Xóa Vĩnh Viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}