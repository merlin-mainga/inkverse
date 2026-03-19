(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_d765ed13._.js", {

"[project]/src/components/CoverImage.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CoverImage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function CoverImage({ src, alt = "cover", positionX = 50, positionY = 50, aspectRatio = "3 / 4", borderRadius = 14, className, style, fallback }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            width: "100%",
            aspectRatio,
            overflow: "hidden",
            borderRadius,
            background: "rgba(255,255,255,0.03)",
            ...style
        },
        children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: alt,
            draggable: false,
            style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: `${positionX}% ${positionY}%`,
                display: "block",
                userSelect: "none",
                ...{
                    WebkitUserDrag: "none"
                }
            }
        }, void 0, false, {
            fileName: "[project]/src/components/CoverImage.tsx",
            lineNumber: 41,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c9a84c",
                fontFamily: "'Cinzel', serif",
                fontSize: 28,
                background: "rgba(201,168,76,0.04)"
            },
            children: fallback ?? "M"
        }, void 0, false, {
            fileName: "[project]/src/components/CoverImage.tsx",
            lineNumber: 56,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CoverImage.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = CoverImage;
var _c;
__turbopack_context__.k.register(_c, "CoverImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CoverImage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
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
    "Sci-Fi"
];
function MangaSection({ title, mangas, router, hoveredManga, setHoveredManga }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 56
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            height: 1,
                            background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3))"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Cinzel',serif",
                            fontSize: 11,
                            letterSpacing: "0.3em",
                            color: "#c9a84c",
                            textTransform: "uppercase"
                        },
                        children: [
                            "✦ ",
                            title,
                            " ✦"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            height: 1,
                            background: "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                    gap: 24
                },
                children: mangas.map((manga)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "manga-card",
                        onMouseEnter: ()=>setHoveredManga(manga.id),
                        onMouseLeave: ()=>setHoveredManga(null),
                        onClick: ()=>router.push(`/manga/${manga.id}`),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    borderRadius: 10,
                                    overflow: "hidden",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(201,168,76,0.1)",
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: manga.coverImage || "/logo.png",
                                        alt: manga.title,
                                        positionX: manga.coverPositionX ?? 50,
                                        positionY: manga.coverPositionY ?? 50,
                                        aspectRatio: "3 / 4",
                                        borderRadius: 10
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            right: 10,
                                            bottom: 10,
                                            display: "flex",
                                            gap: 6,
                                            flexWrap: "wrap",
                                            justifyContent: "flex-end",
                                            zIndex: 2,
                                            maxWidth: "80%"
                                        },
                                        children: [
                                            (manga.views ?? 0) >= 20 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "4px 8px",
                                                    borderRadius: 999,
                                                    background: "rgba(201,168,76,0.9)",
                                                    color: "#080808",
                                                    fontFamily: "'Inter',sans-serif",
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    letterSpacing: "0.08em"
                                                },
                                                children: "HOT"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this),
                                            manga.coverImage && new Date(manga.createdAt ?? 0).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "4px 8px",
                                                    borderRadius: 999,
                                                    background: "rgba(255,255,255,0.08)",
                                                    border: "1px solid rgba(201,168,76,0.25)",
                                                    color: "#f0e6d0",
                                                    fontFamily: "'Inter',sans-serif",
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    letterSpacing: "0.08em",
                                                    backdropFilter: "blur(6px)"
                                                },
                                                children: "NEW"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 21
                                            }, this),
                                            manga.genre?.[0] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "4px 8px",
                                                    borderRadius: 999,
                                                    background: "rgba(8,8,8,0.78)",
                                                    border: "1px solid rgba(201,168,76,0.22)",
                                                    color: "#f0e6d0",
                                                    fontFamily: "'Inter',sans-serif",
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    backdropFilter: "blur(6px)"
                                                },
                                                children: manga.genre[0]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    hoveredManga === manga.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(201,168,76,0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backdropFilter: "blur(2px)",
                                            zIndex: 3
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: "10px 22px",
                                                background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                                                borderRadius: 6,
                                                fontFamily: "'Inter',sans-serif",
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: "#080808"
                                            },
                                            children: "Đọc ngay"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
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
                                    minHeight: 44
                                },
                                children: manga.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: 12,
                                    color: "#c9a84c",
                                    fontWeight: 700,
                                    letterSpacing: "0.04em"
                                },
                                children: [
                                    "Chương mới nhất: ",
                                    manga._count?.chapters ?? 0
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this)
                        ]
                    }, manga.id, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c = MangaSection;
function HotMangaCarousel({ mangas, router, hoveredManga, setHoveredManga }) {
    _s();
    const displayMangas = mangas.slice(0, 10);
    const hasCarousel = displayMangas.length > 1;
    const carouselMangas = hasCarousel ? [
        ...displayMangas,
        ...displayMangas
    ] : displayMangas;
    const [trackIndex, setTrackIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [withTransition, setWithTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HotMangaCarousel.useEffect": ()=>{
            setTrackIndex(0);
            setWithTransition(true);
        }
    }["HotMangaCarousel.useEffect"], [
        displayMangas.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HotMangaCarousel.useEffect": ()=>{
            if (!hasCarousel || isPaused) return;
            const timer = setInterval({
                "HotMangaCarousel.useEffect.timer": ()=>{
                    setTrackIndex({
                        "HotMangaCarousel.useEffect.timer": (prev)=>prev + 1
                    }["HotMangaCarousel.useEffect.timer"]);
                }
            }["HotMangaCarousel.useEffect.timer"], 5000);
            return ({
                "HotMangaCarousel.useEffect": ()=>clearInterval(timer)
            })["HotMangaCarousel.useEffect"];
        }
    }["HotMangaCarousel.useEffect"], [
        hasCarousel,
        isPaused
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HotMangaCarousel.useEffect": ()=>{
            if (!hasCarousel) return;
            if (trackIndex < displayMangas.length) return;
            const resetTimer = setTimeout({
                "HotMangaCarousel.useEffect.resetTimer": ()=>{
                    setWithTransition(false);
                    setTrackIndex(0);
                }
            }["HotMangaCarousel.useEffect.resetTimer"], 700);
            const restoreTimer = setTimeout({
                "HotMangaCarousel.useEffect.restoreTimer": ()=>{
                    setWithTransition(true);
                }
            }["HotMangaCarousel.useEffect.restoreTimer"], 760);
            return ({
                "HotMangaCarousel.useEffect": ()=>{
                    clearTimeout(resetTimer);
                    clearTimeout(restoreTimer);
                }
            })["HotMangaCarousel.useEffect"];
        }
    }["HotMangaCarousel.useEffect"], [
        trackIndex,
        displayMangas.length,
        hasCarousel
    ]);
    const cardWidth = 220;
    const gap = 24;
    const translateX = hasCarousel ? trackIndex * (cardWidth + gap) : 0;
    const activeIndex = displayMangas.length > 0 ? trackIndex % displayMangas.length : 0;
    const goNext = ()=>{
        if (!hasCarousel) return;
        setTrackIndex((prev)=>prev + 1);
    };
    const goPrev = ()=>{
        if (!hasCarousel) return;
        setWithTransition(false);
        setTrackIndex((prev)=>{
            const next = prev <= 0 ? displayMangas.length - 1 : prev - 1;
            return next;
        });
        setTimeout(()=>setWithTransition(true), 30);
    };
    const goToIndex = (index)=>{
        if (!hasCarousel) return;
        setTrackIndex(index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 56
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            height: 1,
                            background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3))"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "'Cinzel',serif",
                            fontSize: 11,
                            letterSpacing: "0.3em",
                            color: "#c9a84c",
                            textTransform: "uppercase"
                        },
                        children: "✦ HOT NHẤT ✦"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            height: 1,
                            background: "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseEnter: ()=>setIsPaused(true),
                onMouseLeave: ()=>setIsPaused(false),
                style: {
                    position: "relative",
                    marginBottom: 14
                },
                children: [
                    hasCarousel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hot-nav-btn",
                                onClick: goPrev,
                                style: {
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
                                    justifyContent: "center"
                                },
                                "aria-label": "Trượt sang trái",
                                children: "‹"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 375,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hot-nav-btn",
                                onClick: goNext,
                                style: {
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
                                    justifyContent: "center"
                                },
                                "aria-label": "Trượt sang phải",
                                children: "›"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflow: "hidden",
                            width: "100%"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 24,
                                transform: `translateX(-${translateX}px)`,
                                transition: withTransition ? "transform 0.7s ease" : "none",
                                willChange: "transform"
                            },
                            children: carouselMangas.map((manga, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "manga-card",
                                    onMouseEnter: ()=>setHoveredManga(`${manga.id}-${index}`),
                                    onMouseLeave: ()=>setHoveredManga(null),
                                    onClick: ()=>router.push(`/manga/${manga.id}`),
                                    style: {
                                        flex: "0 0 220px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "relative",
                                                borderRadius: 10,
                                                overflow: "hidden",
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(201,168,76,0.1)",
                                                marginBottom: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: manga.coverImage || "/logo.png",
                                                    alt: manga.title,
                                                    positionX: manga.coverPositionX ?? 50,
                                                    positionY: manga.coverPositionY ?? 50,
                                                    aspectRatio: "3 / 4",
                                                    borderRadius: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: "absolute",
                                                        right: 10,
                                                        bottom: 10,
                                                        display: "flex",
                                                        gap: 6,
                                                        flexWrap: "wrap",
                                                        justifyContent: "flex-end",
                                                        zIndex: 2,
                                                        maxWidth: "80%"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                padding: "4px 8px",
                                                                borderRadius: 999,
                                                                background: "rgba(201,168,76,0.9)",
                                                                color: "#080808",
                                                                fontFamily: "'Inter',sans-serif",
                                                                fontSize: 10,
                                                                fontWeight: 700,
                                                                letterSpacing: "0.08em"
                                                            },
                                                            children: "HOT"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 21
                                                        }, this),
                                                        manga.genre?.[0] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                padding: "4px 8px",
                                                                borderRadius: 999,
                                                                background: "rgba(8,8,8,0.78)",
                                                                border: "1px solid rgba(201,168,76,0.22)",
                                                                color: "#f0e6d0",
                                                                fontFamily: "'Inter',sans-serif",
                                                                fontSize: 10,
                                                                fontWeight: 600,
                                                                backdropFilter: "blur(6px)"
                                                            },
                                                            children: manga.genre[0]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 19
                                                }, this),
                                                hoveredManga === `${manga.id}-${index}` && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: "rgba(201,168,76,0.08)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        backdropFilter: "blur(2px)",
                                                        zIndex: 3
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            padding: "10px 22px",
                                                            background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                                                            borderRadius: 6,
                                                            fontFamily: "'Inter',sans-serif",
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: "#080808"
                                                        },
                                                        children: "Đọc ngay"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
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
                                                minHeight: 44
                                            },
                                            children: manga.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 546,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "'Inter',sans-serif",
                                                fontSize: 12,
                                                color: "#c9a84c",
                                                fontWeight: 700,
                                                letterSpacing: "0.04em"
                                            },
                                            children: [
                                                "Chương mới nhất: ",
                                                manga._count?.chapters ?? 0
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 564,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `${manga.id}-${Math.floor(index / displayMangas.length)}-${index % displayMangas.length}`, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            hasCarousel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    gap: 8
                },
                children: displayMangas.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>goToIndex(index),
                        style: {
                            width: index === activeIndex ? 22 : 8,
                            height: 8,
                            borderRadius: 999,
                            border: "none",
                            background: index === activeIndex ? "#c9a84c" : "rgba(240,230,208,0.18)",
                            transition: "all 0.25s ease",
                            cursor: "pointer",
                            padding: 0
                        },
                        "aria-label": `Chuyển tới truyện hot ${index + 1}`
                    }, index, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 584,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 582,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 339,
        columnNumber: 5
    }, this);
}
_s(HotMangaCarousel, "eDLErDAZPYPA2ibKSZbdExj/270=");
_c1 = HotMangaCarousel;
function HomePage() {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedGenre, setSelectedGenre] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Tất cả");
    const [genreOpen, setGenreOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mangas, setMangas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mangasLoading, setMangasLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        mangaCount: 0,
        userCount: 0,
        totalViews: 0
    });
    const [statsLoading, setStatsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hoveredManga, setHoveredManga] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAuth, setShowAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authMsg, setAuthMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        password: ""
    });
    const isLoggedIn = status === "authenticated";
    const handleOpenMangaAI = ()=>{
        if (isLoggedIn) {
            router.push("/dashboard");
            return;
        }
        setAuthMode("login");
        setShowAuth(true);
    };
    const fetchMangas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomePage.useCallback[fetchMangas]": async ()=>{
            setMangasLoading(true);
            try {
                const params = new URLSearchParams();
                params.set("limit", "50");
                if (searchQuery.trim()) params.set("q", searchQuery.trim());
                if (selectedGenre !== "Tất cả") params.set("genre", selectedGenre);
                const res = await fetch(`/api/manga?${params.toString()}`, {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error(`manga ${res.status}`);
                const data = await res.json();
                setMangas(Array.isArray(data.mangas) ? data.mangas : []);
            } catch (error) {
                console.error("Manga error:", error);
                setMangas([]);
            } finally{
                setMangasLoading(false);
            }
        }
    }["HomePage.useCallback[fetchMangas]"], [
        searchQuery,
        selectedGenre
    ]);
    const fetchStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomePage.useCallback[fetchStats]": async ()=>{
            setStatsLoading(true);
            try {
                const res = await fetch("/api/stats", {
                    cache: "no-store"
                });
                if (!res.ok) throw new Error(`stats ${res.status}`);
                const data = await res.json();
                setStats({
                    mangaCount: data.mangaCount ?? 0,
                    userCount: data.userCount ?? 0,
                    totalViews: data.totalViews ?? 0
                });
            } catch (error) {
                console.error("Stats error:", error);
                setStats({
                    mangaCount: 0,
                    userCount: 0,
                    totalViews: 0
                });
            } finally{
                setStatsLoading(false);
            }
        }
    }["HomePage.useCallback[fetchStats]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            fetchStats();
        }
    }["HomePage.useEffect"], [
        fetchStats
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            fetchMangas();
        }
    }["HomePage.useEffect"], [
        fetchMangas
    ]);
    const hotMangas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[hotMangas]": ()=>[
                ...mangas
            ].filter({
                "HomePage.useMemo[hotMangas]": (m)=>m.coverImage
            }["HomePage.useMemo[hotMangas]"]).sort({
                "HomePage.useMemo[hotMangas]": (a, b)=>(b.views ?? 0) - (a.views ?? 0)
            }["HomePage.useMemo[hotMangas]"])
    }["HomePage.useMemo[hotMangas]"], [
        mangas
    ]);
    const latestMangas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[latestMangas]": ()=>[
                ...mangas
            ].filter({
                "HomePage.useMemo[latestMangas]": (m)=>m.coverImage
            }["HomePage.useMemo[latestMangas]"]).sort({
                "HomePage.useMemo[latestMangas]": (a, b)=>{
                    const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return tB - tA;
                }
            }["HomePage.useMemo[latestMangas]"]).slice(0, 6)
    }["HomePage.useMemo[latestMangas]"], [
        mangas
    ]);
    const handleAuth = async ()=>{
        setAuthMsg("");
        if (!form.email || !form.password || authMode === "register" && !form.name) {
            setAuthMsg("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        setAuthLoading(true);
        try {
            if (authMode === "register") {
                const registerRes = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });
                const registerData = await registerRes.json().catch(()=>({}));
                if (!registerRes.ok) {
                    setAuthMsg(registerData?.error || "Đăng ký thất bại.");
                    setAuthLoading(false);
                    return;
                }
            }
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                email: form.email,
                password: form.password,
                redirect: false
            });
            if (result?.error) {
                setAuthMsg("Sai email hoặc mật khẩu.");
            } else {
                setAuthMsg("✅ Thành công");
                setShowAuth(false);
                setForm({
                    name: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.error(error);
            setAuthMsg("Có lỗi xảy ra.");
        } finally{
            setAuthLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0c0d10 0%, #090a0d 32%, #07080a 68%, #050608 100%)",
            color: "#f0e6d0",
            fontFamily: "'Cormorant Garamond', Georgia, serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 777,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: "-12% -14%",
                            transform: "perspective(1600px) rotateX(14deg) rotateY(-7deg) scale(1.04)",
                            transformOrigin: "center top",
                            opacity: 0.34,
                            filter: "blur(0.2px) saturate(0.95) brightness(0.84)"
                        },
                        children: [
                            {
                                src: "/manga-bg/c1.jpg",
                                left: "-4%",
                                top: "1%",
                                width: 170,
                                height: 250,
                                rotate: -7
                            },
                            {
                                src: "/manga-bg/c2.jpg",
                                left: "8%",
                                top: "6%",
                                width: 165,
                                height: 245,
                                rotate: 4
                            },
                            {
                                src: "/manga-bg/c3.jpg",
                                left: "20%",
                                top: "0%",
                                width: 160,
                                height: 238,
                                rotate: -5
                            },
                            {
                                src: "/manga-bg/c4.jpg",
                                left: "31%",
                                top: "5%",
                                width: 172,
                                height: 252,
                                rotate: 6
                            },
                            {
                                src: "/manga-bg/c5.jpg",
                                left: "43%",
                                top: "-1%",
                                width: 168,
                                height: 248,
                                rotate: -4
                            },
                            {
                                src: "/manga-bg/c6.jpg",
                                left: "55%",
                                top: "4%",
                                width: 162,
                                height: 242,
                                rotate: 5
                            },
                            {
                                src: "/manga-bg/c7.jpg",
                                left: "66%",
                                top: "0%",
                                width: 170,
                                height: 250,
                                rotate: -6
                            },
                            {
                                src: "/manga-bg/c8.jpg",
                                left: "78%",
                                top: "5%",
                                width: 164,
                                height: 244,
                                rotate: 4
                            },
                            {
                                src: "/manga-bg/c1.jpg",
                                left: "90%",
                                top: "1%",
                                width: 160,
                                height: 240,
                                rotate: -5
                            },
                            {
                                src: "/manga-bg/c4.jpg",
                                left: "2%",
                                top: "30%",
                                width: 168,
                                height: 248,
                                rotate: 5
                            },
                            {
                                src: "/manga-bg/c6.jpg",
                                left: "14%",
                                top: "35%",
                                width: 162,
                                height: 242,
                                rotate: -6
                            },
                            {
                                src: "/manga-bg/c2.jpg",
                                left: "26%",
                                top: "29%",
                                width: 170,
                                height: 250,
                                rotate: 4
                            },
                            {
                                src: "/manga-bg/c8.jpg",
                                left: "38%",
                                top: "34%",
                                width: 166,
                                height: 246,
                                rotate: -5
                            },
                            {
                                src: "/manga-bg/c3.jpg",
                                left: "50%",
                                top: "30%",
                                width: 160,
                                height: 238,
                                rotate: 6
                            },
                            {
                                src: "/manga-bg/c5.jpg",
                                left: "61%",
                                top: "35%",
                                width: 170,
                                height: 250,
                                rotate: -4
                            },
                            {
                                src: "/manga-bg/c7.jpg",
                                left: "73%",
                                top: "29%",
                                width: 164,
                                height: 244,
                                rotate: 5
                            },
                            {
                                src: "/manga-bg/c1.jpg",
                                left: "85%",
                                top: "34%",
                                width: 168,
                                height: 248,
                                rotate: -6
                            },
                            {
                                src: "/manga-bg/c2.jpg",
                                left: "-2%",
                                top: "58%",
                                width: 165,
                                height: 245,
                                rotate: 4
                            },
                            {
                                src: "/manga-bg/c5.jpg",
                                left: "10%",
                                top: "63%",
                                width: 170,
                                height: 250,
                                rotate: -5
                            },
                            {
                                src: "/manga-bg/c3.jpg",
                                left: "22%",
                                top: "57%",
                                width: 160,
                                height: 238,
                                rotate: 6
                            },
                            {
                                src: "/manga-bg/c6.jpg",
                                left: "34%",
                                top: "62%",
                                width: 162,
                                height: 242,
                                rotate: -4
                            },
                            {
                                src: "/manga-bg/c8.jpg",
                                left: "46%",
                                top: "58%",
                                width: 166,
                                height: 246,
                                rotate: 5
                            },
                            {
                                src: "/manga-bg/c4.jpg",
                                left: "58%",
                                top: "63%",
                                width: 172,
                                height: 252,
                                rotate: -6
                            },
                            {
                                src: "/manga-bg/c1.jpg",
                                left: "70%",
                                top: "57%",
                                width: 168,
                                height: 248,
                                rotate: 4
                            },
                            {
                                src: "/manga-bg/c7.jpg",
                                left: "82%",
                                top: "62%",
                                width: 164,
                                height: 244,
                                rotate: -5
                            },
                            {
                                src: "/manga-bg/c2.jpg",
                                left: "94%",
                                top: "58%",
                                width: 160,
                                height: 240,
                                rotate: 6
                            }
                        ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    left: item.left,
                                    top: item.top,
                                    width: item.width,
                                    height: item.height,
                                    borderRadius: 14,
                                    overflow: "hidden",
                                    background: "#0b0c10",
                                    boxShadow: "0 8px 28px rgba(0,0,0,0.32)",
                                    transform: `rotate(${item.rotate}deg)`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.src,
                                    alt: "",
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1014,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 999,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 959,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.48) 24%, rgba(0,0,0,0.54) 52%, rgba(0,0,0,0.80) 100%)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1028,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.022) 18%, transparent 42%)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1037,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            boxShadow: "inset 0 0 180px rgba(0,0,0,0.68)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1046,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 958,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
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
                    height: 64
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>router.push("/"),
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            cursor: "pointer"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo.png",
                                alt: "logo",
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: 8,
                                    objectFit: "contain"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1071,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Cinzel',serif",
                                            fontWeight: 700,
                                            fontSize: 17,
                                            letterSpacing: "0.1em"
                                        },
                                        children: [
                                            "M",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#c9a84c"
                                                },
                                                children: "AI"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1074,
                                                columnNumber: 16
                                            }, this),
                                            "NGA"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1073,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Inter',sans-serif",
                                            fontSize: 8,
                                            letterSpacing: "0.3em",
                                            color: "#c9a84c",
                                            textTransform: "uppercase"
                                        },
                                        children: "AI Manga Platform"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1076,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1072,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1070,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "desktop-menu",
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setGenreOpen((v)=>!v),
                                        style: {
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
                                            transition: "all 0.25s ease"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedGenre === "Tất cả" ? "Thể loại" : `Thể loại: ${selectedGenre}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#c9a84c",
                                                    fontSize: 11
                                                },
                                                children: genreOpen ? "▲" : "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1114,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1092,
                                        columnNumber: 13
                                    }, this),
                                    genreOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
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
                                            gap: 6
                                        },
                                        children: GENRES.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSelectedGenre(g);
                                                    setGenreOpen(false);
                                                    const section = document.getElementById("manga-list");
                                                    section?.scrollIntoView({
                                                        behavior: "smooth"
                                                    });
                                                },
                                                style: {
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
                                                    cursor: "pointer"
                                                },
                                                children: g
                                            }, g, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1137,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1091,
                                columnNumber: 11
                            }, this),
                            [
                                "Khám Phá",
                                "Bảng Xếp Hạng",
                                "Tác Giả"
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "nav-link",
                                    style: {
                                        fontFamily: "'Inter',sans-serif",
                                        fontSize: 13,
                                        color: "rgba(240,230,208,0.5)",
                                        letterSpacing: "0.05em"
                                    },
                                    children: item
                                }, item, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1167,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1090,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "desktop-menu",
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(201,168,76,0.18)",
                                    borderRadius: 999,
                                    overflow: "hidden",
                                    transition: "all 0.25s ease",
                                    width: searchOpen ? 260 : 42,
                                    height: 42
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSearchOpen((v)=>!v),
                                        style: {
                                            width: 42,
                                            height: 42,
                                            flexShrink: 0,
                                            background: "transparent",
                                            border: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            padding: 0
                                        },
                                        "aria-label": "Mở tìm kiếm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "11",
                                                    cy: "11",
                                                    r: "6.5",
                                                    stroke: "#c9a84c",
                                                    strokeWidth: "1.8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1213,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M16 16L21 21",
                                                    stroke: "#c9a84c",
                                                    strokeWidth: "1.8",
                                                    strokeLinecap: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 1214,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1212,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1196,
                                        columnNumber: 13
                                    }, this),
                                    searchOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Tìm manga...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        style: {
                                            flex: 1,
                                            background: "transparent",
                                            border: "none",
                                            outline: "none",
                                            color: "#f0e6d0",
                                            fontFamily: "'Inter',sans-serif",
                                            fontSize: 13,
                                            paddingRight: 14
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1219,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "gold-btn",
                                        onClick: ()=>isLoggedIn ? router.push("/dashboard") : setShowAuth(true),
                                        style: {
                                            padding: "9px 20px",
                                            borderRadius: 6,
                                            color: "#080808",
                                            fontFamily: "'Inter',sans-serif",
                                            fontSize: 13,
                                            fontWeight: 600
                                        },
                                        children: "✦ Đăng Manga"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1239,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleOpenMangaAI,
                                        style: {
                                            padding: "9px 18px",
                                            borderRadius: 6,
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(201,168,76,0.22)",
                                            color: "#c9a84c",
                                            fontFamily: "'Inter',sans-serif",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            whiteSpace: "nowrap"
                                        },
                                        children: "✦ Tạo Manga"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1254,
                                        columnNumber: 3
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1238,
                                columnNumber: 11
                            }, this),
                            isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>router.push("/profile"),
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: 16,
                                    overflow: "hidden"
                                },
                                children: session?.user?.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: session.user.image,
                                    alt: "avatar",
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1290,
                                    columnNumber: 17
                                }, this) : "👤"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1274,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAuth(true),
                                style: {
                                    background: "transparent",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    borderRadius: 6,
                                    padding: "8px 18px",
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: 13,
                                    color: "rgba(240,230,208,0.6)",
                                    cursor: "pointer"
                                },
                                children: "Đăng nhập"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1296,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "mobile-menu-btn",
                        onClick: ()=>setMenuOpen(!menuOpen),
                        style: {
                            display: "none",
                            flexDirection: "column",
                            gap: 5,
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 24,
                                    height: 2,
                                    background: menuOpen ? "#c9a84c" : "#f0e6d0",
                                    transition: "all 0.3s",
                                    transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 24,
                                    height: 2,
                                    background: "#c9a84c",
                                    transition: "all 0.3s",
                                    opacity: menuOpen ? 0 : 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 24,
                                    height: 2,
                                    background: menuOpen ? "#c9a84c" : "#f0e6d0",
                                    transition: "all 0.3s",
                                    transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1345,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1314,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1055,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-dropdown",
                style: {
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
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setGenreOpen(false);
                            const section = document.getElementById("manga-list");
                            section?.scrollIntoView({
                                behavior: "smooth"
                            });
                            setMenuOpen(false);
                        },
                        style: {
                            background: "transparent",
                            border: "none",
                            color: "#f0e6d0",
                            fontFamily: "'Inter',sans-serif",
                            fontSize: 14,
                            textAlign: "left",
                            cursor: "pointer"
                        },
                        children: [
                            "Thể loại: ",
                            selectedGenre
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1375,
                        columnNumber: 11
                    }, this),
                    [
                        "Khám Phá",
                        "Bảng Xếp Hạng",
                        "Tác Giả"
                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Inter',sans-serif",
                                fontSize: 14,
                                color: "rgba(240,230,208,0.65)"
                            },
                            children: item
                        }, item, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1396,
                            columnNumber: 13
                        }, this)),
                    !isLoggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setShowAuth(true);
                            setMenuOpen(false);
                        },
                        style: {
                            background: "transparent",
                            border: "1px solid rgba(201,168,76,0.3)",
                            borderRadius: 8,
                            padding: "10px 14px",
                            fontFamily: "'Inter',sans-serif",
                            fontSize: 13,
                            color: "#f0e6d0",
                            cursor: "pointer"
                        },
                        children: "Đăng nhập"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1409,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1358,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    padding: "36px 40px 10px",
                    textAlign: "center",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            transform: "translateX(-50%)",
                            width: "min(920px, 92%)",
                            height: 340,
                            background: "radial-gradient(circle at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0.04) 72%, transparent 100%)",
                            filter: "blur(10px)",
                            pointerEvents: "none",
                            zIndex: -1
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-line",
                        style: {
                            maxWidth: 180,
                            margin: "0 auto 12px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1456,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'Inter',sans-serif",
                            fontSize: 10,
                            letterSpacing: "0.32em",
                            color: "#c9a84c",
                            textTransform: "uppercase",
                            marginBottom: 10,
                            textShadow: "0 2px 10px rgba(0,0,0,0.55)"
                        },
                        children: "✦ Nền Tảng Đọc Và Sáng Tác Manga Hàng Đầu ✦"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1458,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "hero-main-title",
                        style: {
                            fontFamily: "'Cinzel',serif",
                            fontWeight: 700,
                            fontSize: "clamp(30px,5.2vw,64px)",
                            lineHeight: 1.02,
                            marginBottom: 2,
                            letterSpacing: "0.02em",
                            textShadow: "0 4px 24px rgba(0,0,0,0.42)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "title-gradient",
                                children: "THẾ GIỚI M"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1484,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#c9a84c",
                                    textShadow: "0 0 24px rgba(201,168,76,0.7),0 0 48px rgba(201,168,76,0.3)",
                                    WebkitTextFillColor: "#c9a84c"
                                },
                                children: "AI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1485,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "title-gradient",
                                children: "NGA"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1494,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1472,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "hero-sub-title",
                        style: {
                            fontFamily: "'Cinzel',serif",
                            fontWeight: 400,
                            fontSize: "clamp(18px,3vw,34px)",
                            lineHeight: 1.1,
                            marginBottom: 12,
                            letterSpacing: "0.12em",
                            color: "rgba(240,230,208,0.42)",
                            textShadow: "0 2px 14px rgba(0,0,0,0.48)"
                        },
                        children: [
                            "M",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#c9a84c",
                                    textShadow: "0 0 14px rgba(201,168,76,0.45)",
                                    fontWeight: 700
                                },
                                children: "AI"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1511,
                                columnNumber: 11
                            }, this),
                            "NGA · KHÔNG CÓ GIỚI HẠN"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1497,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-line",
                        style: {
                            maxWidth: 180,
                            margin: "0 auto 12px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1523,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: "clamp(13px,1.35vw,16px)",
                            color: "rgba(240,230,208,0.56)",
                            maxWidth: 520,
                            margin: "0 auto",
                            lineHeight: 1.5,
                            fontWeight: 400,
                            textShadow: "0 2px 10px rgba(0,0,0,0.52)"
                        },
                        children: 'Mainga là sự kết hợp giữa Manga & AI. Nơi mà chính bạn là "main" trong câu chuyện của mình.'
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 1525,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "manga-list",
                style: {
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 40px"
                },
                children: mangasLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                        gap: 24,
                        marginBottom: 80
                    },
                    children: Array.from({
                        length: 8
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton",
                                    style: {
                                        aspectRatio: "3/4",
                                        borderRadius: 10,
                                        marginBottom: 12
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1562,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton",
                                    style: {
                                        height: 16,
                                        borderRadius: 4,
                                        marginBottom: 6,
                                        width: "80%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1563,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton",
                                    style: {
                                        height: 12,
                                        borderRadius: 4,
                                        width: "50%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1564,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1561,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1552,
                    columnNumber: 11
                }, this) : mangas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: "center",
                        padding: "100px 0"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "float-anim",
                            style: {
                                fontSize: 64,
                                marginBottom: 24
                            },
                            children: "📜"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1570,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 22,
                                color: "rgba(240,230,208,0.3)",
                                marginBottom: 8
                            },
                            children: "Chưa có manga nào"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1571,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Inter',sans-serif",
                                fontSize: 13,
                                color: "rgba(240,230,208,0.2)",
                                letterSpacing: "0.1em"
                            },
                            children: "HÃY LÀ NGƯỜI ĐẦU TIÊN ĐĂNG TẢI"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1581,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1569,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HotMangaCarousel, {
                            mangas: hotMangas,
                            router: router,
                            hoveredManga: hoveredManga,
                            setHoveredManga: setHoveredManga
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1594,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MangaSection, {
                            title: "Mới Cập Nhật",
                            mangas: latestMangas,
                            router: router,
                            hoveredManga: hoveredManga,
                            setHoveredManga: setHoveredManga
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1601,
                            columnNumber: 13
                        }, this),
                        hotMangas.length === 0 && latestMangas.length === 0 && mangas.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MangaSection, {
                            title: "Tất cả Manga",
                            mangas: mangas,
                            router: router,
                            hoveredManga: hoveredManga,
                            setHoveredManga: setHoveredManga
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1612,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1541,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "24px 40px 60px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 20,
                        paddingTop: 22,
                        borderTop: "1px solid rgba(201,168,76,0.10)",
                        display: "flex",
                        justifyContent: "center",
                        gap: 36,
                        flexWrap: "wrap"
                    },
                    children: [
                        [
                            "MANGA",
                            statsLoading ? "..." : stats.mangaCount.toLocaleString()
                        ],
                        [
                            "NGƯỜI DÙNG",
                            statsLoading ? "..." : stats.userCount.toLocaleString()
                        ],
                        [
                            "LƯỢT XEM",
                            statsLoading ? "..." : stats.totalViews.toLocaleString()
                        ]
                    ].map(([label, val])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Cinzel',serif",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: "#c9a84c",
                                        marginBottom: 4
                                    },
                                    children: val
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1642,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Inter',sans-serif",
                                        fontSize: 10,
                                        letterSpacing: "0.16em",
                                        color: "rgba(240,230,208,0.32)"
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1653,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1641,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1625,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1624,
                columnNumber: 7
            }, this),
            showAuth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: (e)=>e.target === e.currentTarget && setShowAuth(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-box glass-card",
                    style: {
                        borderRadius: 16,
                        padding: 48,
                        width: "100%",
                        maxWidth: 420,
                        border: "1px solid rgba(201,168,76,0.2)",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.8)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center",
                                marginBottom: 36
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
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
                                        margin: "0 auto 20px"
                                    },
                                    children: "墨"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1682,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontFamily: "'Cinzel',serif",
                                        fontSize: 22,
                                        color: "#f0e6d0",
                                        letterSpacing: "0.1em",
                                        marginBottom: 6
                                    },
                                    children: authMode === "login" ? "CHÀO MỪNG" : "TẠO TÀI KHOẢN"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1700,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hero-line",
                                    style: {
                                        maxWidth: 80,
                                        margin: "12px auto 0"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1711,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1681,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                marginBottom: 24
                            },
                            children: [
                                authMode === "register" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "input-luxury",
                                    placeholder: "Tên của bạn...",
                                    value: form.name,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1716,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "input-luxury",
                                    type: "email",
                                    placeholder: "Email...",
                                    value: form.email,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            email: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1724,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "input-luxury",
                                    type: "password",
                                    placeholder: "Mật khẩu...",
                                    value: form.password,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            password: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1732,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1714,
                            columnNumber: 13
                        }, this),
                        authMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Inter',sans-serif",
                                fontSize: 13,
                                marginBottom: 16,
                                textAlign: "center",
                                color: authMsg.includes("✅") ? "#c9a84c" : "#ff6b6b"
                            },
                            children: authMsg
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1742,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "gold-btn",
                            onClick: handleAuth,
                            disabled: authLoading,
                            style: {
                                width: "100%",
                                padding: 14,
                                borderRadius: 8,
                                color: "#080808",
                                fontFamily: "'Inter',sans-serif",
                                fontSize: 14,
                                fontWeight: 700,
                                marginBottom: 20,
                                letterSpacing: "0.1em"
                            },
                            children: authLoading ? "ĐANG XỬ LÝ..." : authMode === "login" ? "ĐĂNG NHẬP" : "TẠO TÀI KHOẢN"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1755,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        height: 1,
                                        background: "rgba(201,168,76,0.2)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1775,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Inter',sans-serif",
                                        fontSize: 12,
                                        color: "rgba(240,230,208,0.3)"
                                    },
                                    children: "hoặc"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1776,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        height: 1,
                                        background: "rgba(201,168,76,0.2)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1785,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1774,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("google", {
                                    callbackUrl: "/"
                                }),
                            style: {
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
                                marginBottom: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "https://www.google.com/favicon.ico",
                                    width: 18,
                                    height: 18,
                                    alt: "Google"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1808,
                                    columnNumber: 15
                                }, this),
                                "Đăng nhập với Google"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1788,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center",
                                fontFamily: "'Inter',sans-serif",
                                fontSize: 13,
                                color: "rgba(240,230,208,0.35)"
                            },
                            children: [
                                authMode === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    onClick: ()=>{
                                        setAuthMode((m)=>m === "login" ? "register" : "login");
                                        setAuthMsg("");
                                    },
                                    style: {
                                        color: "#c9a84c",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    },
                                    children: authMode === "login" ? "Đăng ký ngay" : "Đăng nhập"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1821,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1812,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1670,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1669,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 769,
        columnNumber: 5
    }, this);
}
_s1(HomePage, "cCf3+mo1h9Kx/iR4/TakeBBuNgs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c2 = HomePage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MangaSection");
__turbopack_context__.k.register(_c1, "HotMangaCarousel");
__turbopack_context__.k.register(_c2, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_d765ed13._.js.map