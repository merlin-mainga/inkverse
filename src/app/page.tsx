"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import CoverImage from "@/components/CoverImage";

type Manga = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  coverPositionX?: number;
  coverPositionY?: number;
  genre?: string[];
  status?: string;
  views?: number;
  createdAt?: string;
  avgRating?: number;
  ratingCount?: number;
  author?: {
    id: string;
    name: string;
    image?: string;
  };
  _count?: {
    chapters?: number;
    comments?: number;
  };
};

const GENRES = [
  "Tất cả",
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

function MangaSection({
  title,
  mangas,
  router,
  hoveredManga,
  setHoveredManga,
}: {
  title: string;
  mangas: Manga[];
  router: any;
  hoveredManga: string | null;
  setHoveredManga: (id: string | null) => void;
}) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3))",
          }}
        />
        <span
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#c9a84c",
            textTransform: "uppercase",
          }}
        >
          ✦ {title} ✦
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
          gap: 24,
        }}
      >
        {mangas.map((manga) => (
          <div
            key={manga.id}
            className="manga-card"
            onMouseEnter={() => setHoveredManga(manga.id)}
            onMouseLeave={() => setHoveredManga(null)}
            onClick={() => router.push(`/manga/${manga.id}`)}
          >
            <div
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.1)",
                marginBottom: 12,
              }}
            >
              <CoverImage
                src={manga.coverImage || "/logo.png"}
                alt={manga.title}
                positionX={manga.coverPositionX ?? 50}
                positionY={manga.coverPositionY ?? 50}
                aspectRatio="3 / 4"
                borderRadius={10}
              />

              <div
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  zIndex: 2,
                  maxWidth: "80%",
                }}
              >
                {(manga.views ?? 0) >= 20 && (
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: 999,
                      background: "rgba(201,168,76,0.9)",
                      color: "#080808",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    HOT
                  </span>
                )}

                {manga.coverImage &&
                  new Date(manga.createdAt ?? 0).getTime() >
                    Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        color: "#f0e6d0",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      NEW
                    </span>
                  )}

                {manga.genre?.[0] && (
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: 999,
                      background: "rgba(8,8,8,0.78)",
                      border: "1px solid rgba(201,168,76,0.22)",
                      color: "#f0e6d0",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {manga.genre[0]}
                  </span>
                )}
              </div>

              {hoveredManga === manga.id && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(201,168,76,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(2px)",
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 22px",
                      background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                      borderRadius: 6,
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#080808",
                    }}
                  >
                    Đọc ngay
                  </div>
                </div>
              )}
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#f0e6d0",
                marginBottom: 6,
                lineHeight: 1.25,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: 44,
              } as any}
            >
              {manga.title}
            </h3>

            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 12,
                color: "#c9a84c",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Chương mới nhất: {manga._count?.chapters ?? 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotMangaCarousel({
  mangas,
  router,
  hoveredManga,
  setHoveredManga,
}: {
  mangas: Manga[];
  router: any;
  hoveredManga: string | null;
  setHoveredManga: (id: string | null) => void;
}) {
  const displayMangas = mangas.slice(0, 10);
  const hasCarousel = displayMangas.length > 1;
  const carouselMangas = hasCarousel ? [...displayMangas, ...displayMangas] : displayMangas;

  const [trackIndex, setTrackIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTrackIndex(0);
    setWithTransition(true);
  }, [displayMangas.length]);

  useEffect(() => {
    if (!hasCarousel || isPaused) return;

    const timer = setInterval(() => {
      setTrackIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [hasCarousel, isPaused]);

  useEffect(() => {
    if (!hasCarousel) return;
    if (trackIndex < displayMangas.length) return;

    const resetTimer = setTimeout(() => {
      setWithTransition(false);
      setTrackIndex(0);
    }, 700);

    const restoreTimer = setTimeout(() => {
      setWithTransition(true);
    }, 760);

    return () => {
      clearTimeout(resetTimer);
      clearTimeout(restoreTimer);
    };
  }, [trackIndex, displayMangas.length, hasCarousel]);

  const cardWidth = 220;
  const gap = 24;
  const translateX = hasCarousel ? trackIndex * (cardWidth + gap) : 0;
  const activeIndex = displayMangas.length > 0 ? trackIndex % displayMangas.length : 0;

  const goNext = () => {
    if (!hasCarousel) return;
    setTrackIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (!hasCarousel) return;
    setWithTransition(false);
    setTrackIndex((prev) => {
      const next = prev <= 0 ? displayMangas.length - 1 : prev - 1;
      return next;
    });
    setTimeout(() => setWithTransition(true), 30);
  };

  const goToIndex = (index: number) => {
    if (!hasCarousel) return;
    setTrackIndex(index);
  };

  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3))",
          }}
        />
        <span
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#c9a84c",
            textTransform: "uppercase",
          }}
        >
          ✦ HOT NHẤT ✦
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)",
          }}
        />
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: "relative", marginBottom: 14 }}
      >
        {hasCarousel && (
          <>
            <button
              className="hot-nav-btn"
              onClick={goPrev}
              style={{
                position: "absolute",
                left: -8,
                top: "34%",
                transform: "translateY(-50%)",
                zIndex: 3,
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.28)",
                background: "rgba(8,8,8,0.88)",
                color: "#c9a84c",
                cursor: "pointer",
                fontSize: 26,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Trượt sang trái"
            >
              ‹
            </button>

            <button
              className="hot-nav-btn"
              onClick={goNext}
              style={{
                position: "absolute",
                right: -8,
                top: "34%",
                transform: "translateY(-50%)",
                zIndex: 3,
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.28)",
                background: "rgba(8,8,8,0.88)",
                color: "#c9a84c",
                cursor: "pointer",
                fontSize: 26,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Trượt sang phải"
            >
              ›
            </button>
          </>
        )}

        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            style={{
              display: "flex",
              gap: 24,
              transform: `translateX(-${translateX}px)`,
              transition: withTransition ? "transform 0.7s ease" : "none",
              willChange: "transform",
            }}
          >
            {carouselMangas.map((manga, index) => (
              <div
                key={`${manga.id}-${Math.floor(index / displayMangas.length)}-${index % displayMangas.length}`}
                className="manga-card"
                onMouseEnter={() => setHoveredManga(`${manga.id}-${index}`)}
                onMouseLeave={() => setHoveredManga(null)}
                onClick={() => router.push(`/manga/${manga.id}`)}
                style={{ flex: "0 0 220px" }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    marginBottom: 12,
                  }}
                >
                  <CoverImage
                    src={manga.coverImage || "/logo.png"}
                    alt={manga.title}
                    positionX={manga.coverPositionX ?? 50}
                    positionY={manga.coverPositionY ?? 50}
                    aspectRatio="3 / 4"
                    borderRadius={10}
                  />

                  <div
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                      zIndex: 2,
                      maxWidth: "80%",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "rgba(201,168,76,0.9)",
                        color: "#080808",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      HOT
                    </span>

                    {manga.genre?.[0] && (
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: 999,
                          background: "rgba(8,8,8,0.78)",
                          border: "1px solid rgba(201,168,76,0.22)",
                          color: "#f0e6d0",
                          fontFamily: "'Inter',sans-serif",
                          fontSize: 10,
                          fontWeight: 600,
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {manga.genre[0]}
                      </span>
                    )}
                  </div>

                  {hoveredManga === `${manga.id}-${index}` && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(201,168,76,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(2px)",
                        zIndex: 3,
                      }}
                    >
                      <div
                        style={{
                          padding: "10px 22px",
                          background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                          borderRadius: 6,
                          fontFamily: "'Inter',sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#080808",
                        }}
                      >
                        Đọc ngay
                      </div>
                    </div>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#f0e6d0",
                    marginBottom: 6,
                    lineHeight: 1.25,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 44,
                  } as any}
                >
                  {manga.title}
                </h3>

                <div
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 12,
                    color: "#c9a84c",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  Chương mới nhất: {manga._count?.chapters ?? 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {hasCarousel && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {displayMangas.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              style={{
                width: index === activeIndex ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                background: index === activeIndex ? "#c9a84c" : "rgba(240,230,208,0.18)",
                transition: "all 0.25s ease",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Chuyển tới truyện hot ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");
  const [genreOpen, setGenreOpen] = useState(false);

  const [mangas, setMangas] = useState<Manga[]>([]);
  const [mangasLoading, setMangasLoading] = useState(true);
  const [stats, setStats] = useState({
    mangaCount: 0,
    userCount: 0,
    totalViews: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [hoveredManga, setHoveredManga] = useState<string | null>(null);

  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isLoggedIn = status === "authenticated";
  const handleOpenMangaAI = () => {
  if (isLoggedIn) {
    router.push("/dashboard");
    return;
  }

  setAuthMode("login");
  setShowAuth(true);
};

  const fetchMangas = useCallback(async () => {
    setMangasLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", "50");
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      if (selectedGenre !== "Tất cả") params.set("genre", selectedGenre);

      const res = await fetch(`/api/manga?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`manga ${res.status}`);

      const data = await res.json();
      setMangas(Array.isArray(data.mangas) ? data.mangas : []);
    } catch (error) {
      console.error("Manga error:", error);
      setMangas([]);
    } finally {
      setMangasLoading(false);
    }
  }, [searchQuery, selectedGenre]);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });

      // 503 = DB temporarily unavailable, trigger retry
      if (res.status === 503) {
        console.log("Stats API 503, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const retryRes = await fetch("/api/stats", { cache: "no-store" });
        if (!retryRes.ok) throw new Error(`stats retry ${retryRes.status}`);
        const retryData = await retryRes.json();
        setStats({
          mangaCount: retryData.mangaCount ?? 0,
          userCount: retryData.userCount ?? 0,
          totalViews: retryData.totalViews ?? 0,
        });
        return;
      }

      if (!res.ok) throw new Error(`stats ${res.status}`);

      const data = await res.json();
      setStats({
        mangaCount: data.mangaCount ?? 0,
        userCount: data.userCount ?? 0,
        totalViews: data.totalViews ?? 0,
      });
    } catch (error) {
      console.error("Stats error:", error);
      // Don't silently set to 0 - keep previous state or show loading
      setStats({
        mangaCount: 0,
        userCount: 0,
        totalViews: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchMangas();
  }, [fetchMangas]);

  const hotMangas = useMemo(
    () =>
      [...mangas]
        .filter((m) => m.coverImage)
        .sort((a, b) => (b.views ?? 0) - (a.views ?? 0)),
    [mangas]
  );

  const latestMangas = useMemo(
    () =>
      [...mangas]
        .sort((a, b) => {
          const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tB - tA;
        })
        .slice(0, 6),
    [mangas]
  );

  const handleAuth = async () => {
    setAuthMsg("");

    if (!form.email || !form.password || (authMode === "register" && !form.name)) {
      setAuthMsg("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === "register") {
        const registerRes = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const registerData = await registerRes.json().catch(() => ({}));

        if (!registerRes.ok) {
          setAuthMsg(registerData?.error || "Đăng ký thất bại.");
          setAuthLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthMsg("Sai email hoặc mật khẩu.");
      } else {
        setAuthMsg("✅ Thành công");
        setShowAuth(false);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      setAuthMsg("Có lỗi xảy ra.");
    } finally {
      setAuthLoading(false);
    }
  };
    return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0c0d10 0%, #090a0d 32%, #07080a 68%, #050608 100%)",
        color: "#f0e6d0",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#c9a84c, #8b6914); border-radius: 2px; }
        body { background: #080808; }

        .manga-card { transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94); cursor: pointer; position: relative; }
        .manga-card:hover { transform: translateY(-10px); }
        .manga-card::before {
          content:'';
          position:absolute;
          inset:-1px;
          background:linear-gradient(135deg,rgba(201,168,76,0.3),transparent,rgba(201,168,76,0.1));
          border-radius:10px;
          opacity:0;
          transition:opacity 0.3s;
          z-index:1;
          pointer-events:none;
        }
        .manga-card:hover::before { opacity:1; }

        .gold-btn {
          background:linear-gradient(135deg,#c9a84c,#8b6914,#c9a84c);
          background-size:200% auto;
          transition:all 0.3s ease;
          cursor:pointer;
          border:none;
          animation:shimmer 3s linear infinite;
        }
        .gold-btn:hover {
          background-position:right center;
          box-shadow:0 0 30px rgba(201,168,76,0.4);
          transform:translateY(-2px);
        }
        .gold-btn:disabled {
          opacity:0.5;
          cursor:not-allowed;
          transform:none;
          box-shadow:none;
        }

        @keyframes shimmer {
          0% { background-position:0% center }
          100% { background-position:200% center }
        }

        .glass-card {
          background:rgba(255,255,255,0.02);
          backdrop-filter:blur(20px);
          border:1px solid rgba(201,168,76,0.15);
        }

        .input-luxury {
          width:100%;
          padding:12px 16px;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(201,168,76,0.2);
          border-radius:6px;
          color:#f0e6d0;
          font-family:'Inter',sans-serif;
          font-size:14px;
          outline:none;
          transition:all 0.3s;
        }
        .input-luxury:focus {
          border-color:#c9a84c;
          background:rgba(201,168,76,0.05);
          box-shadow:0 0 20px rgba(201,168,76,0.1);
        }
        .input-luxury::placeholder { color:rgba(240,230,208,0.25); }

        .modal-overlay {
          position:fixed;
          top:0; left:0; right:0; bottom:0;
          background:rgba(0,0,0,0.9);
          z-index:100;
          display:flex;
          align-items:center;
          justify-content:center;
          backdrop-filter:blur(8px);
        }
        @keyframes fadeUp {
          from { transform:translateY(40px); opacity:0 }
          to { transform:translateY(0); opacity:1 }
        }
        .modal-box { animation:fadeUp 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }

        .hero-line { height:1px; background:linear-gradient(90deg,transparent,#c9a84c,transparent); }

        @keyframes float {
          0%,100% { transform:translateY(0) }
          50% { transform:translateY(-8px) }
        }
        .float-anim { animation:float 4s ease-in-out infinite; }

        .nav-link { transition:color 0.2s; cursor:pointer; }
        .nav-link:hover { color:#c9a84c; }

        @keyframes gradientMove {
          0% { background-position:0% 50% }
          50% { background-position:100% 50% }
          100% { background-position:0% 50% }
        }
        .title-gradient {
          background:linear-gradient(135deg,#f0e6d0,#c9a84c,#f0e6d0,#8b6914,#c9a84c);
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:gradientMove 5s ease infinite;
        }

        @keyframes pulse {
          0%,100% { opacity:0.4 }
          50% { opacity:0.8 }
        }
        .skeleton {
          background:rgba(201,168,76,0.06);
          border-radius:8px;
          animation:pulse 1.5s ease-in-out infinite;
        }

        .hero-main-title {
          position: relative;
          display: inline-block;
          transition: filter 0.35s ease, transform 0.35s ease;
        }
        .hero-main-title:hover {
          filter: drop-shadow(0 0 10px rgba(201,168,76,0.18)) drop-shadow(0 0 22px rgba(201,168,76,0.12));
        }
        .hero-main-title::after {
          content: "";
          position: absolute;
          top: -8%;
          left: -18%;
          width: 22%;
          height: 116%;
          pointer-events: none;
          background: linear-gradient(
            100deg,
            rgba(255,255,255,0) 0%,
            rgba(255,245,210,0.10) 35%,
            rgba(255,230,150,0.34) 50%,
            rgba(255,245,210,0.12) 65%,
            rgba(255,255,255,0) 100%
          );
          filter: blur(8px);
          opacity: 0;
          transform: skewX(-18deg);
        }
        .hero-main-title:hover::after {
          opacity: 1;
          animation: heroShimmerSweep 1.15s ease forwards;
        }
        @keyframes heroShimmerSweep {
          0% { left: -18%; }
          100% { left: 108%; }
        }

        .hero-sub-title {
          transition: color 0.28s ease, text-shadow 0.28s ease, opacity 0.28s ease;
        }
        .hero-sub-title:hover {
          color: rgba(240,230,208,0.56) !important;
          text-shadow: 0 0 10px rgba(201,168,76,0.18), 0 0 18px rgba(201,168,76,0.08);
        }

        .hot-nav-btn:hover {
          box-shadow: 0 0 24px rgba(201,168,76,0.22);
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-50%) scale(1.04);
        }

        @media (max-width: 768px) {
          .desktop-menu { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
          .mobile-menu-dropdown { display:flex !important; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: "-12% -14%",
            transform: "perspective(1600px) rotateX(14deg) rotateY(-7deg) scale(1.04)",
            transformOrigin: "center top",
            opacity: 0.34,
            filter: "blur(0.2px) saturate(0.95) brightness(0.84)",
          }}
        >
          {[
            { src: "/manga-bg/c1.jpg", left: "-4%", top: "1%", width: 170, height: 250, rotate: -7 },
            { src: "/manga-bg/c2.jpg", left: "8%", top: "6%", width: 165, height: 245, rotate: 4 },
            { src: "/manga-bg/c3.jpg", left: "20%", top: "0%", width: 160, height: 238, rotate: -5 },
            { src: "/manga-bg/c4.jpg", left: "31%", top: "5%", width: 172, height: 252, rotate: 6 },
            { src: "/manga-bg/c5.jpg", left: "43%", top: "-1%", width: 168, height: 248, rotate: -4 },
            { src: "/manga-bg/c6.jpg", left: "55%", top: "4%", width: 162, height: 242, rotate: 5 },
            { src: "/manga-bg/c7.jpg", left: "66%", top: "0%", width: 170, height: 250, rotate: -6 },
            { src: "/manga-bg/c8.jpg", left: "78%", top: "5%", width: 164, height: 244, rotate: 4 },
            { src: "/manga-bg/c1.jpg", left: "90%", top: "1%", width: 160, height: 240, rotate: -5 },

            { src: "/manga-bg/c4.jpg", left: "2%", top: "30%", width: 168, height: 248, rotate: 5 },
            { src: "/manga-bg/c6.jpg", left: "14%", top: "35%", width: 162, height: 242, rotate: -6 },
            { src: "/manga-bg/c2.jpg", left: "26%", top: "29%", width: 170, height: 250, rotate: 4 },
            { src: "/manga-bg/c8.jpg", left: "38%", top: "34%", width: 166, height: 246, rotate: -5 },
            { src: "/manga-bg/c3.jpg", left: "50%", top: "30%", width: 160, height: 238, rotate: 6 },
            { src: "/manga-bg/c5.jpg", left: "61%", top: "35%", width: 170, height: 250, rotate: -4 },
            { src: "/manga-bg/c7.jpg", left: "73%", top: "29%", width: 164, height: 244, rotate: 5 },
            { src: "/manga-bg/c1.jpg", left: "85%", top: "34%", width: 168, height: 248, rotate: -6 },

            { src: "/manga-bg/c2.jpg", left: "-2%", top: "58%", width: 165, height: 245, rotate: 4 },
            { src: "/manga-bg/c5.jpg", left: "10%", top: "63%", width: 170, height: 250, rotate: -5 },
            { src: "/manga-bg/c3.jpg", left: "22%", top: "57%", width: 160, height: 238, rotate: 6 },
            { src: "/manga-bg/c6.jpg", left: "34%", top: "62%", width: 162, height: 242, rotate: -4 },
            { src: "/manga-bg/c8.jpg", left: "46%", top: "58%", width: 166, height: 246, rotate: 5 },
            { src: "/manga-bg/c4.jpg", left: "58%", top: "63%", width: 172, height: 252, rotate: -6 },
            { src: "/manga-bg/c1.jpg", left: "70%", top: "57%", width: 168, height: 248, rotate: 4 },
            { src: "/manga-bg/c7.jpg", left: "82%", top: "62%", width: 164, height: 244, rotate: -5 },
            { src: "/manga-bg/c2.jpg", left: "94%", top: "58%", width: 160, height: 240, rotate: 6 },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: item.left,
                top: item.top,
                width: item.width,
                height: item.height,
                borderRadius: 14,
                overflow: "hidden",
                background: "#0b0c10",
                boxShadow: "0 8px 28px rgba(0,0,0,0.32)",
                transform: `rotate(${item.rotate}deg)`,
              }}
            >
              <img
                src={item.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.48) 24%, rgba(0,0,0,0.54) 52%, rgba(0,0,0,0.80) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.022) 18%, transparent 42%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 180px rgba(0,0,0,0.68)",
          }}
        />
      </div>

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,8,8,0.92)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          backdropFilter: "blur(20px)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em" }}>
              M<span style={{ color: "#c9a84c" }}>AI</span>NGA
            </div>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 8,
                letterSpacing: "0.3em",
                color: "#c9a84c",
                textTransform: "uppercase",
              }}
            >
              AI Manga Platform
            </div>
          </div>
        </div>

        <div className="desktop-menu" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setGenreOpen((v) => !v)}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                background: selectedGenre !== "Tất cả" ? "rgba(201,168,76,0.14)" : "rgba(255,255,255,0.03)",
                border: selectedGenre !== "Tất cả" ? "1px solid rgba(201,168,76,0.32)" : "1px solid rgba(201,168,76,0.14)",
                color: selectedGenre !== "Tất cả" ? "#f0e6d0" : "rgba(240,230,208,0.72)",
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.03em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                minWidth: 150,
                justifyContent: "space-between",
                transition: "all 0.25s ease",
              }}
            >
              <span>{selectedGenre === "Tất cả" ? "Thể loại" : `Thể loại: ${selectedGenre}`}</span>
              <span style={{ color: "#c9a84c", fontSize: 11 }}>{genreOpen ? "▲" : "▼"}</span>
            </button>

            {genreOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  minWidth: 240,
                  padding: 10,
                  borderRadius: 14,
                  background: "rgba(12,12,14,0.96)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  boxShadow: "0 18px 48px rgba(0,0,0,0.42)",
                  backdropFilter: "blur(14px)",
                  zIndex: 60,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setSelectedGenre(g);
                      setGenreOpen(false);
                      const section = document.getElementById("manga-list");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: selectedGenre === g ? "linear-gradient(135deg,#c9a84c,#8b6914)" : "rgba(255,255,255,0.03)",
                      border: selectedGenre === g ? "none" : "1px solid rgba(201,168,76,0.10)",
                      color: selectedGenre === g ? "#080808" : "rgba(240,230,208,0.78)",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 13,
                      fontWeight: selectedGenre === g ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {["Khám Phá", "Bảng Xếp Hạng", "Tác Giả"].map((item) => (
            <span
              key={item}
              className="nav-link"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="desktop-menu" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,76,0.18)",
              borderRadius: 999,
              overflow: "hidden",
              transition: "all 0.25s ease",
              width: searchOpen ? 260 : 42,
              height: 42,
            }}
          >
            <button
              onClick={() => setSearchOpen((v) => !v)}
              style={{
                width: 42,
                height: 42,
                flexShrink: 0,
                background: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Mở tìm kiếm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="6.5" stroke="#c9a84c" strokeWidth="1.8" />
                <path d="M16 16L21 21" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {searchOpen && (
              <input
                type="text"
                placeholder="Tìm manga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f0e6d0",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 13,
                  paddingRight: 14,
                }}
              />
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <button
    className="gold-btn"
    onClick={() => (isLoggedIn ? router.push("/dashboard") : setShowAuth(true))}
    style={{
      padding: "9px 20px",
      borderRadius: 6,
      color: "#080808",
      fontFamily: "'Inter',sans-serif",
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    ✦ Đăng Manga
  </button>

  <button
    onClick={handleOpenMangaAI}
    style={{
      padding: "9px 18px",
      borderRadius: 6,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(201,168,76,0.22)",
      color: "#c9a84c",
      fontFamily: "'Inter',sans-serif",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
    }}
  >
    ✦ Tạo Manga
  </button>
</div>

          {isLoggedIn ? (
            <div
              onClick={() => router.push("/profile")}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 16,
                overflow: "hidden",
              }}
            >
              {session?.user?.image ? (
                <img src={session.user.image} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                "👤"
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              style={{
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 6,
                padding: "8px 18px",
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.6)",
                cursor: "pointer",
              }}
            >
              Đăng nhập
            </button>
          )}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 2,
              background: menuOpen ? "#c9a84c" : "#f0e6d0",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "#c9a84c",
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: menuOpen ? "#c9a84c" : "#f0e6d0",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
            }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="mobile-menu-dropdown"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(8,8,8,0.98)",
            borderBottom: "1px solid rgba(201,168,76,0.15)",
            backdropFilter: "blur(20px)",
            padding: "20px 24px",
            display: "none",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            onClick={() => {
              setGenreOpen(false);
              const section = document.getElementById("manga-list");
              section?.scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#f0e6d0",
              fontFamily: "'Inter',sans-serif",
              fontSize: 14,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Thể loại: {selectedGenre}
          </button>

          {["Khám Phá", "Bảng Xếp Hạng", "Tác Giả"].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 14,
                color: "rgba(240,230,208,0.65)",
              }}
            >
              {item}
            </span>
          ))}

          {!isLoggedIn && (
            <button
              onClick={() => {
                setShowAuth(true);
                setMenuOpen(false);
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 8,
                padding: "10px 14px",
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: "#f0e6d0",
                cursor: "pointer",
              }}
            >
              Đăng nhập
            </button>
          )}
        </div>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "36px 40px 10px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            width: "min(920px, 92%)",
            height: 340,
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0.04) 72%, transparent 100%)",
            filter: "blur(10px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div className="hero-line" style={{ maxWidth: 180, margin: "0 auto 12px" }} />

        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 10,
            letterSpacing: "0.32em",
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 10,
            textShadow: "0 2px 10px rgba(0,0,0,0.55)",
          }}
        >
          ✦ Nền Tảng Đọc Và Sáng Tác Manga Hàng Đầu ✦
        </div>

        <h1
          className="hero-main-title"
          style={{
            fontFamily: "'Cinzel',serif",
            fontWeight: 700,
            fontSize: "clamp(30px,5.2vw,64px)",
            lineHeight: 1.02,
            marginBottom: 2,
            letterSpacing: "0.02em",
            textShadow: "0 4px 24px rgba(0,0,0,0.42)",
          }}
        >
          <span className="title-gradient">THẾ GIỚI M</span>
          <span
            style={{
              color: "#c9a84c",
              textShadow: "0 0 24px rgba(201,168,76,0.7),0 0 48px rgba(201,168,76,0.3)",
              WebkitTextFillColor: "#c9a84c",
            }}
          >
            AI
          </span>
          <span className="title-gradient">NGA</span>
        </h1>

        <h2
          className="hero-sub-title"
          style={{
            fontFamily: "'Cinzel',serif",
            fontWeight: 400,
            fontSize: "clamp(18px,3vw,34px)",
            lineHeight: 1.1,
            marginBottom: 12,
            letterSpacing: "0.12em",
            color: "rgba(240,230,208,0.42)",
            textShadow: "0 2px 14px rgba(0,0,0,0.48)",
          }}
        >
          M
          <span
            style={{
              color: "#c9a84c",
              textShadow: "0 0 14px rgba(201,168,76,0.45)",
              fontWeight: 700,
            }}
          >
            AI
          </span>
          NGA · KHÔNG CÓ GIỚI HẠN
        </h2>

        <div className="hero-line" style={{ maxWidth: 180, margin: "0 auto 12px" }} />

        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(13px,1.35vw,16px)",
            color: "rgba(240,230,208,0.56)",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.5,
            fontWeight: 400,
            textShadow: "0 2px 10px rgba(0,0,0,0.52)",
          }}
        >
          Mainga là sự kết hợp giữa Manga & AI. Nơi mà chính bạn là "main" trong câu chuyện của mình.
        </p>
      </div>

      <div
        id="manga-list"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {mangasLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
              gap: 24,
              marginBottom: 80,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ aspectRatio: "3/4", borderRadius: 10, marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 16, borderRadius: 4, marginBottom: 6, width: "80%" }} />
                <div className="skeleton" style={{ height: 12, borderRadius: 4, width: "50%" }} />
              </div>
            ))}
          </div>
        ) : mangas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div className="float-anim" style={{ fontSize: 64, marginBottom: 24 }}>📜</div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 22,
                color: "rgba(240,230,208,0.3)",
                marginBottom: 8,
              }}
            >
              Chưa có manga nào
            </div>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.2)",
                letterSpacing: "0.1em",
              }}
            >
              HÃY LÀ NGƯỜI ĐẦU TIÊN ĐĂNG TẢI
            </div>
          </div>
        ) : (
                    <>
            <HotMangaCarousel
              mangas={hotMangas}
              router={router}
              hoveredManga={hoveredManga}
              setHoveredManga={setHoveredManga}
            />

            <MangaSection
              title="Mới Cập Nhật"
              mangas={latestMangas}
              router={router}
              hoveredManga={hoveredManga}
              setHoveredManga={setHoveredManga}
            />

            {hotMangas.length === 0 &&
              latestMangas.length === 0 &&
              mangas.length > 0 && (
                <MangaSection
                  title="Tất cả Manga"
                  mangas={mangas}
                  router={router}
                  hoveredManga={hoveredManga}
                  setHoveredManga={setHoveredManga}
                />
              )}
          </>
        )}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "24px 40px 60px" }}>
        <div
          style={{
            marginTop: 20,
            paddingTop: 22,
            borderTop: "1px solid rgba(201,168,76,0.10)",
            display: "flex",
            justifyContent: "center",
            gap: 36,
            flexWrap: "wrap",
          }}
        >
          {[
            ["MANGA", statsLoading ? "..." : stats.mangaCount.toLocaleString()],
            ["NGƯỜI DÙNG", statsLoading ? "..." : stats.userCount.toLocaleString()],
            ["LƯỢT XEM", statsLoading ? "..." : stats.totalViews.toLocaleString()],
          ].map(([label, val]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#c9a84c",
                  marginBottom: 4,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  color: "rgba(240,230,208,0.32)",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAuth && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAuth(false)}>
          <div
            className="modal-box glass-card"
            style={{
              borderRadius: 16,
              padding: 48,
              width: "100%",
              maxWidth: 420,
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cinzel',serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#080808",
                  margin: "0 auto 20px",
                }}
              >
                墨
              </div>
              <h2
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 22,
                  color: "#f0e6d0",
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}
              >
                {authMode === "login" ? "CHÀO MỪNG" : "TẠO TÀI KHOẢN"}
              </h2>
              <div className="hero-line" style={{ maxWidth: 80, margin: "12px auto 0" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {authMode === "register" && (
                <input
                  className="input-luxury"
                  placeholder="Tên của bạn..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              )}

              <input
                className="input-luxury"
                type="email"
                placeholder="Email..."
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="input-luxury"
                type="password"
                placeholder="Mật khẩu..."
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {authMsg && (
              <div
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 13,
                  marginBottom: 16,
                  textAlign: "center",
                  color: authMsg.includes("✅") ? "#c9a84c" : "#ff6b6b",
                }}
              >
                {authMsg}
              </div>
            )}

            <button
              className="gold-btn"
              onClick={handleAuth}
              disabled={authLoading}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 8,
                color: "#080808",
                fontFamily: "'Inter',sans-serif",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: "0.1em",
              }}
            >
              {authLoading ? "ĐANG XỬ LÝ..." : authMode === "login" ? "ĐĂNG NHẬP" : "TẠO TÀI KHOẢN"}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.3)",
                }}
              >
                hoặc
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              style={{
                width: "100%",
                padding: 13,
                background: "white",
                border: "none",
                borderRadius: 8,
                color: "#333",
                fontFamily: "'Inter',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="Google" />
              Đăng nhập với Google
            </button>

            <div
              style={{
                textAlign: "center",
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.35)",
              }}
            >
              {authMode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <span
                onClick={() => {
                  setAuthMode((m) => (m === "login" ? "register" : "login"));
                  setAuthMsg("");
                }}
                style={{ color: "#c9a84c", cursor: "pointer", fontWeight: 600 }}
              >
                {authMode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}