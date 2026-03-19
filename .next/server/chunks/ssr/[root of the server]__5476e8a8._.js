module.exports = {

"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/components/CoverImage.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CoverImage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function CoverImage({ src, alt = "cover", positionX = 50, positionY = 50, aspectRatio = "3 / 4", borderRadius = 14, className, style, fallback }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            width: "100%",
            aspectRatio,
            overflow: "hidden",
            borderRadius,
            background: "rgba(255,255,255,0.03)",
            ...style
        },
        children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}}),
"[project]/src/app/manga/[id]/client.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MangaDetailClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CoverImage.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function MangaDetailClient() {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    const [manga, setManga] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chapters, setChapters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userRating, setUserRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [hoveredStar, setHoveredStar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [ratingDone, setRatingDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [following, setFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFullDesc, setShowFullDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLoading(true);
        Promise.all([
            fetch(`/api/manga/${id}`).then((r)=>{
                if (!r.ok) throw new Error("Không tìm thấy manga");
                return r.json();
            }),
            fetch(`/api/manga/${id}/chapters`).then((r)=>r.ok ? r.json() : []),
            fetch(`/api/manga/${id}/comments`).then((r)=>r.ok ? r.json() : []),
            fetch(`/api/manga/${id}/follow`).then((r)=>r.ok ? r.json() : {
                    following: false
                }),
            fetch(`/api/manga/${id}/read-history`).then((r)=>r.ok ? r.json() : {
                    history: null
                })
        ]).then(([mg, chs, cms, flw, hist])=>{
            setManga(mg);
            setChapters(Array.isArray(chs) ? chs : []);
            setComments(Array.isArray(cms) ? cms : []);
            setFollowing(flw.following ?? false);
            setHistory(hist.history ?? null);
            setShowFullDesc(false);
            setLoading(false);
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    }, [
        id
    ]);
    const toggleFollow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!session) {
            router.push("/login");
            return;
        }
        const res = await fetch(`/api/manga/${id}/follow`, {
            method: "POST"
        });
        const data = await res.json();
        setFollowing(data.following);
    }, [
        id,
        session,
        router
    ]);
    const handleComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!comment.trim() || !session) return;
        setSubmitting(true);
        const res = await fetch(`/api/manga/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: comment.trim()
            })
        });
        if (res.ok) {
            const newComment = await res.json();
            setComments((prev)=>[
                    newComment,
                    ...prev
                ]);
            setComment("");
        }
        setSubmitting(false);
    }, [
        comment,
        id,
        session
    ]);
    const handleRating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (score)=>{
        if (!session) {
            router.push("/login");
            return;
        }
        if (ratingDone) return;
        setUserRating(score);
        const res = await fetch(`/api/manga/${id}/ratings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                score
            })
        });
        if (res.ok) setRatingDone(true);
    }, [
        id,
        session,
        ratingDone,
        router
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: S.center,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: S.spinner
                }, void 0, false, {
                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: S.spinnerText,
                    children: "Đang tải manga..."
                }, void 0, false, {
                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/manga/[id]/client.tsx",
            lineNumber: 144,
            columnNumber: 7
        }, this);
    }
    if (error || !manga) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: S.center,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: "#c9a84c",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 18
                    },
                    children: [
                        "⚠ ",
                        error || "Không tìm thấy manga"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/"),
                    style: S.plainBtn,
                    children: "← Quay về trang chủ"
                }, void 0, false, {
                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/manga/[id]/client.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this);
    }
    const sortedChapters = [
        ...chapters
    ].sort((a, b)=>b.chapterNum - a.chapterNum);
    const firstChapter = [
        ...chapters
    ].sort((a, b)=>a.chapterNum - b.chapterNum)[0];
    const latestChapter = [
        ...chapters
    ].sort((a, b)=>b.chapterNum - a.chapterNum)[0];
    const continueChapter = history?.chapter ?? null;
    const cleanDesc = (manga.description || "").trim();
    const hasLongDesc = cleanDesc.length > 220;
    const shortDesc = hasLongDesc ? `${cleanDesc.slice(0, 220).trim()}...` : cleanDesc;
    const displayDesc = showFullDesc ? cleanDesc : shortDesc;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: S.root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .detail-back:hover { color: #c9a84c !important; }
        .detail-btn { transition: all 0.22s ease; cursor: pointer; }
        .detail-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 20px rgba(201,168,76,0.16); }
        .chapter-row { transition: all 0.2s ease; cursor: pointer; }
        .chapter-row:hover { background: rgba(201,168,76,0.08) !important; border-color: rgba(201,168,76,0.26) !important; }
        .star { cursor: pointer; transition: transform 0.12s ease; user-select: none; }
        .star:hover { transform: scale(1.15); }
        textarea:focus { outline: none; border-color: rgba(201,168,76,0.36) !important; box-shadow: 0 0 0 1px rgba(201,168,76,0.14); }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up { animation: fadeUp 0.42s ease both; }

        @media (max-width: 900px) {
          .detail-hero {
            grid-template-columns: 1fr !important;
          }
          .detail-cover-wrap {
            margin: 0 auto;
          }
          .detail-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/manga/[id]/client.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: S.ambient,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: S.ambientGlowA
                    }, void 0, false, {
                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: S.ambientGlowB
                    }, void 0, false, {
                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: S.ambientOverlay
                    }, void 0, false, {
                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manga/[id]/client.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: S.nav,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        minWidth: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>router.push("/"),
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                cursor: "pointer",
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.png",
                                    alt: "logo",
                                    style: {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 8,
                                        objectFit: "contain"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Cinzel', serif",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        letterSpacing: "0.08em",
                                        color: "#f0e6d0"
                                    },
                                    children: [
                                        "M",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#c9a84c"
                                            },
                                            children: "AI"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 227,
                                            columnNumber: 16
                                        }, this),
                                        "NGA"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: S.navDivider
                        }, void 0, false, {
                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "detail-back",
                            onClick: ()=>router.push("/"),
                            style: S.navBack,
                            children: "Trang chủ"
                        }, void 0, false, {
                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: S.navTitle,
                            children: manga.title
                        }, void 0, false, {
                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/manga/[id]/client.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: S.container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "fade-up",
                        style: S.heroShell,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "detail-hero",
                            style: S.heroGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "detail-cover-wrap",
                                    style: S.coverWrap,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: manga.coverImage,
                                        alt: manga.title,
                                        positionX: manga.coverPositionX ?? 50,
                                        positionY: manga.coverPositionY ?? 50,
                                        aspectRatio: "3 / 4",
                                        borderRadius: 18,
                                        style: {
                                            maxWidth: 260,
                                            boxShadow: "0 14px 34px rgba(0,0,0,0.42)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: S.heroInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: S.genreRow,
                                            children: manga.genre?.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: S.genreTag,
                                                    children: g
                                                }, g, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: S.title,
                                            children: manga.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: S.metaLine,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Tác giả: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: S.metaHighlight,
                                                            children: [
                                                                "@",
                                                                manga.author?.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 28
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: S.metaDot,
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: manga.status === "completed" ? "Hoàn thành" : "Đang tiến hành"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: S.infoCardRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: S.infoCard,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.infoCardLabel,
                                                            children: "THỂ LOẠI"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.infoCardValue,
                                                            children: manga.genre?.length ? manga.genre.join(" • ") : "Chưa cập nhật"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...S.infoCard,
                                                        flex: 1.2
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.infoCardLabel,
                                                            children: "MÔ TẢ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.infoCardValueDesc,
                                                            children: displayDesc || "Chưa có mô tả cho manga này."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 19
                                                        }, this),
                                                        hasLongDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "detail-btn",
                                                            onClick: ()=>setShowFullDesc((v)=>!v),
                                                            style: S.readMoreBtn,
                                                            children: showFullDesc ? "Thu gọn" : "Xem thêm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: S.statGrid,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: S.statCard,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statValue,
                                                            children: chapters.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statLabel,
                                                            children: "Chapter"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: S.statCard,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statValue,
                                                            children: manga.avgRating > 0 ? manga.avgRating.toFixed(1) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statLabel,
                                                            children: "Đánh giá"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 309,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: S.statCard,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statValue,
                                                            children: manga.views ?? 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statLabel,
                                                            children: "Lượt xem"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: S.statCard,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statValue,
                                                            children: manga._count?.comments ?? comments.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: S.statLabel,
                                                            children: "Bình luận"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: S.actionRow,
                                            children: [
                                                continueChapter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "detail-btn",
                                                    onClick: ()=>router.push(`/manga/${id}/chapter/${continueChapter.id}`),
                                                    style: S.primaryBtn,
                                                    children: [
                                                        "▶ Đọc tiếp Chapter ",
                                                        continueChapter.chapterNum
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "detail-btn",
                                                    disabled: !firstChapter,
                                                    onClick: ()=>firstChapter && router.push(`/manga/${id}/chapter/${firstChapter.id}`),
                                                    style: {
                                                        ...S.primaryBtn,
                                                        opacity: firstChapter ? 1 : 0.45,
                                                        cursor: firstChapter ? "pointer" : "default"
                                                    },
                                                    children: "📖 Đọc từ đầu"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this),
                                                continueChapter && firstChapter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "detail-btn",
                                                    onClick: ()=>router.push(`/manga/${id}/chapter/${firstChapter.id}`),
                                                    style: S.secondaryBtn,
                                                    children: "Từ đầu"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 19
                                                }, this),
                                                latestChapter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "detail-btn",
                                                    onClick: ()=>router.push(`/manga/${id}/chapter/${latestChapter.id}`),
                                                    style: S.secondaryBtn,
                                                    children: "Mới nhất"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "detail-btn",
                                                    onClick: toggleFollow,
                                                    style: following ? S.followingBtn : S.secondaryBtn,
                                                    children: following ? "🔖 Đang theo dõi" : "🔖 Theo dõi"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                            lineNumber: 321,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "fade-up detail-main-grid",
                        style: S.mainGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: S.leftCol,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: S.panel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.panelHeader,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: S.sectionTitle,
                                                        children: "📚 Danh sách chapter"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: S.sectionMeta,
                                                        children: [
                                                            chapters.length,
                                                            " chapter"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 376,
                                                columnNumber: 15
                                            }, this),
                                            sortedChapters.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.empty,
                                                children: "Chưa có chapter nào."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.chapterList,
                                                children: sortedChapters.map((ch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chapter-row",
                                                        onClick: ()=>router.push(`/manga/${id}/chapter/${ch.id}`),
                                                        style: {
                                                            ...S.chapterRow,
                                                            background: history?.chapterId === ch.id ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
                                                            borderColor: history?.chapterId === ch.id ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.06)"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: S.chapterLeft,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: S.chapterNumber,
                                                                        children: [
                                                                            "Chapter ",
                                                                            ch.chapterNum
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: S.chapterTitleWrap,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: S.chapterTitle,
                                                                                children: ch.title || `Chapter ${ch.chapterNum}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                                lineNumber: 399,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            history?.chapterId === ch.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: S.readingNow,
                                                                                children: "Đang đọc"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                                lineNumber: 400,
                                                                                columnNumber: 60
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                        lineNumber: 398,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: S.chapterRight,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: S.chapterMeta,
                                                                        children: [
                                                                            "👁 ",
                                                                            ch.views ?? 0
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                        lineNumber: 405,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: S.chapterMeta,
                                                                        children: new Date(ch.createdAt).toLocaleDateString("vi-VN")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                        lineNumber: 406,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, ch.id, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                        lineNumber: 375,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: S.panel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.panelHeader,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: S.sectionTitle,
                                                        children: "💬 Bình luận"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: S.sectionMeta,
                                                        children: comments.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 22
                                                },
                                                children: session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            rows: 4,
                                                            placeholder: "Viết bình luận của bạn...",
                                                            value: comment,
                                                            onChange: (e)=>setComment(e.target.value),
                                                            style: S.textarea
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "detail-btn",
                                                            onClick: handleComment,
                                                            disabled: submitting || !comment.trim(),
                                                            style: {
                                                                ...S.primaryBtn,
                                                                marginTop: 12,
                                                                opacity: submitting || !comment.trim() ? 0.45 : 1,
                                                                cursor: submitting || !comment.trim() ? "default" : "pointer"
                                                            },
                                                            children: submitting ? "Đang gửi..." : "Gửi bình luận"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 430,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: S.dimText,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: S.metaHighlight,
                                                            onClick: ()=>router.push("/login"),
                                                            children: "Đăng nhập"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                            lineNumber: 446,
                                                            columnNumber: 21
                                                        }, this),
                                                        " ",
                                                        "để bình luận."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 420,
                                                columnNumber: 15
                                            }, this),
                                            comments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.empty,
                                                children: "Chưa có bình luận nào. Hãy là người đầu tiên!"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 455,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.commentList,
                                                children: comments.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: S.commentCard,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: S.commentHead,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: S.avatar,
                                                                        children: c.user?.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: c.user.image,
                                                                            alt: c.user.name,
                                                                            style: {
                                                                                width: "100%",
                                                                                height: "100%",
                                                                                objectFit: "cover",
                                                                                borderRadius: "50%"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                            lineNumber: 463,
                                                                            columnNumber: 29
                                                                        }, this) : "👤"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                        lineNumber: 461,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: S.commentUser,
                                                                                children: c.user?.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                                lineNumber: 473,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: S.commentDate,
                                                                                children: new Date(c.createdAt).toLocaleDateString("vi-VN")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                                lineNumber: 474,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: S.commentBody,
                                                                children: c.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, c.id, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 457,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: S.rightCol,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: S.sidePanel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: S.sideTitle,
                                                children: "⭐ Đánh giá manga"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 487,
                                                columnNumber: 15
                                            }, this),
                                            !session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: S.dimText,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: S.metaHighlight,
                                                        onClick: ()=>router.push("/login"),
                                                        children: "Đăng nhập"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    "để đánh giá."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 490,
                                                columnNumber: 17
                                            }, this) : ratingDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    ...S.dimText,
                                                    color: "#c9a84c"
                                                },
                                                children: [
                                                    "Bạn đã đánh giá ",
                                                    userRating,
                                                    "/5."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 8,
                                                    alignItems: "center"
                                                },
                                                children: [
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5
                                                ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "star",
                                                        onMouseEnter: ()=>setHoveredStar(star),
                                                        onMouseLeave: ()=>setHoveredStar(0),
                                                        onClick: ()=>handleRating(star),
                                                        style: {
                                                            fontSize: 30,
                                                            color: star <= (hoveredStar || userRating) ? "#c9a84c" : "rgba(240,230,208,0.16)"
                                                        },
                                                        children: "★"
                                                    }, star, false, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                        lineNumber: 486,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: S.sidePanel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: S.sideTitle,
                                                children: "ℹ Thông tin nhanh"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 520,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.quickList,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: S.quickRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickLabel,
                                                                children: "Tác giả"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 523,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickValue,
                                                                children: [
                                                                    "@",
                                                                    manga.author?.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 524,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 522,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: S.quickRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickLabel,
                                                                children: "Trạng thái"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickValue,
                                                                children: manga.status === "completed" ? "Hoàn thành" : "Đang tiến hành"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: S.quickRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickLabel,
                                                                children: "Chapter"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickValue,
                                                                children: chapters.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 532,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: S.quickRow,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickLabel,
                                                                children: "Bình luận"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: S.quickValue,
                                                                children: manga._count?.comments ?? comments.length
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 521,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                        lineNumber: 519,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: S.sidePanel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: S.sideTitle,
                                                children: "🏷 Thể loại"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 542,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: S.sideGenreWrap,
                                                children: manga.genre?.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: S.sideGenreTag,
                                                        children: g
                                                    }, g, false, {
                                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                                lineNumber: 543,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                                        lineNumber: 541,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/manga/[id]/client.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/manga/[id]/client.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/manga/[id]/client.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/manga/[id]/client.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
const S = {
    root: {
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0b0f 0%, #08090c 52%, #06070a 100%)",
        color: "#f0e6d0",
        position: "relative"
    },
    ambient: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
    },
    ambientGlowA: {
        position: "absolute",
        top: -120,
        left: "50%",
        transform: "translateX(-50%)",
        width: 900,
        height: 420,
        background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 32%, transparent 70%)",
        filter: "blur(18px)"
    },
    ambientGlowB: {
        position: "absolute",
        right: -120,
        top: 180,
        width: 380,
        height: 380,
        background: "radial-gradient(circle, rgba(180,190,220,0.06) 0%, transparent 72%)",
        filter: "blur(20px)"
    },
    ambientOverlay: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.36) 100%)"
    },
    center: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        position: "relative",
        zIndex: 1
    },
    spinner: {
        width: 42,
        height: 42,
        border: "3px solid rgba(201,168,76,0.14)",
        borderTop: "3px solid #c9a84c",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
    },
    spinnerText: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 16,
        color: "#c9a84c"
    },
    plainBtn: {
        marginTop: 12,
        padding: "10px 20px",
        background: "rgba(201,168,76,0.12)",
        border: "1px solid rgba(201,168,76,0.22)",
        borderRadius: 10,
        color: "#c9a84c",
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        fontSize: 13
    },
    nav: {
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(8,8,10,0.84)",
        borderBottom: "1px solid rgba(201,168,76,0.10)",
        backdropFilter: "blur(16px)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        height: 64
    },
    navBack: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 13,
        color: "rgba(240,230,208,0.56)",
        cursor: "pointer",
        transition: "color 0.2s",
        whiteSpace: "nowrap",
        flexShrink: 0
    },
    navDivider: {
        width: 1,
        height: 20,
        background: "rgba(255,255,255,0.08)",
        flexShrink: 0
    },
    navTitle: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 13,
        color: "rgba(240,230,208,0.72)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    container: {
        maxWidth: 1180,
        margin: "0 auto",
        padding: "36px 24px 80px",
        position: "relative",
        zIndex: 1
    },
    heroShell: {
        marginBottom: 30,
        borderRadius: 24,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(201,168,76,0.10)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.32)",
        overflow: "hidden"
    },
    heroGrid: {
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 28,
        padding: 28
    },
    coverWrap: {
        width: "100%"
    },
    heroInfo: {
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    genreRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12
    },
    genreTag: {
        padding: "5px 12px",
        borderRadius: 999,
        background: "rgba(201,168,76,0.12)",
        border: "1px solid rgba(201,168,76,0.18)",
        fontFamily: "'Inter',sans-serif",
        fontSize: 11,
        color: "#c9a84c",
        fontWeight: 600,
        letterSpacing: "0.04em"
    },
    title: {
        fontFamily: "'Cinzel',serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 700,
        lineHeight: 1.18,
        marginBottom: 12,
        color: "#f0e6d0"
    },
    metaLine: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
        fontFamily: "'Inter',sans-serif",
        fontSize: 13,
        color: "rgba(240,230,208,0.48)",
        marginBottom: 16
    },
    metaHighlight: {
        color: "#c9a84c",
        cursor: "pointer"
    },
    metaDot: {
        opacity: 0.3
    },
    infoCardRow: {
        display: "grid",
        gridTemplateColumns: "minmax(180px, 0.9fr) minmax(260px, 1.3fr)",
        gap: 12,
        marginBottom: 22
    },
    infoCard: {
        padding: "14px 16px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)"
    },
    infoCardLabel: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 11,
        color: "rgba(240,230,208,0.30)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 8
    },
    infoCardValue: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 15,
        color: "rgba(240,230,208,0.82)",
        lineHeight: 1.6,
        fontWeight: 600
    },
    infoCardValueDesc: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        color: "rgba(240,230,208,0.70)",
        lineHeight: 1.7
    },
    readMoreBtn: {
        marginTop: 10,
        padding: "8px 12px",
        background: "rgba(201,168,76,0.10)",
        border: "1px solid rgba(201,168,76,0.20)",
        borderRadius: 10,
        color: "#c9a84c",
        fontFamily: "'Inter',sans-serif",
        fontSize: 12,
        fontWeight: 700,
        width: "fit-content"
    },
    statGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 12,
        marginBottom: 22
    },
    statCard: {
        padding: "14px 14px 12px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)"
    },
    statValue: {
        fontFamily: "'Cinzel',serif",
        fontSize: 20,
        fontWeight: 700,
        color: "#c9a84c",
        marginBottom: 4
    },
    statLabel: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 11,
        color: "rgba(240,230,208,0.38)",
        letterSpacing: "0.05em",
        textTransform: "uppercase"
    },
    actionRow: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
    },
    primaryBtn: {
        padding: "12px 22px",
        background: "linear-gradient(135deg,#c9a84c,#8b6914)",
        border: "none",
        borderRadius: 10,
        color: "#080808",
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.03em"
    },
    secondaryBtn: {
        padding: "12px 18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 10,
        color: "#f0e6d0",
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        fontWeight: 600
    },
    followingBtn: {
        padding: "12px 18px",
        background: "rgba(201,168,76,0.12)",
        border: "1px solid rgba(201,168,76,0.24)",
        borderRadius: 10,
        color: "#c9a84c",
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        fontWeight: 700
    },
    mainGrid: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 320px",
        gap: 24,
        alignItems: "start"
    },
    leftCol: {
        minWidth: 0
    },
    rightCol: {
        display: "flex",
        flexDirection: "column",
        gap: 18
    },
    panel: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        padding: 22,
        marginBottom: 22
    },
    sidePanel: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 18,
        padding: 20
    },
    panelHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 18
    },
    sectionTitle: {
        fontFamily: "'Cinzel',serif",
        fontSize: 22,
        fontWeight: 700,
        color: "#f0e6d0"
    },
    sectionMeta: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 12,
        color: "rgba(240,230,208,0.38)"
    },
    sideTitle: {
        fontFamily: "'Cinzel',serif",
        fontSize: 16,
        fontWeight: 700,
        color: "#f0e6d0",
        marginBottom: 14
    },
    chapterList: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    chapterRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        padding: "15px 16px",
        border: "1px solid",
        borderRadius: 14
    },
    chapterLeft: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        minWidth: 0
    },
    chapterNumber: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 12,
        color: "#c9a84c",
        fontWeight: 700,
        minWidth: 86,
        letterSpacing: "0.04em"
    },
    chapterTitleWrap: {
        minWidth: 0
    },
    chapterTitle: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        color: "rgba(240,230,208,0.82)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    readingNow: {
        display: "inline-block",
        marginTop: 4,
        fontSize: 10,
        color: "#c9a84c",
        fontFamily: "'Inter',sans-serif",
        fontWeight: 700,
        letterSpacing: "0.04em"
    },
    chapterRight: {
        display: "flex",
        gap: 14,
        alignItems: "center",
        flexShrink: 0
    },
    chapterMeta: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 11,
        color: "rgba(240,230,208,0.34)"
    },
    textarea: {
        width: "100%",
        padding: "14px 16px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 14,
        color: "#f0e6d0",
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        resize: "none",
        lineHeight: 1.6
    },
    commentList: {
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    commentCard: {
        padding: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14
    },
    commentHead: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#c9a84c,#8b6914)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        overflow: "hidden",
        flexShrink: 0
    },
    commentUser: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 13,
        fontWeight: 700,
        color: "#f0e6d0",
        marginBottom: 2
    },
    commentDate: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 11,
        color: "rgba(240,230,208,0.34)"
    },
    commentBody: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 14,
        color: "rgba(240,230,208,0.72)",
        lineHeight: 1.65
    },
    quickList: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    quickRow: {
        display: "flex",
        justifyContent: "space-between",
        gap: 14,
        paddingBottom: 10,
        borderBottom: "1px solid rgba(255,255,255,0.06)"
    },
    quickLabel: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 12,
        color: "rgba(240,230,208,0.40)"
    },
    quickValue: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 12,
        color: "#f0e6d0",
        fontWeight: 600,
        textAlign: "right"
    },
    sideGenreWrap: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
    },
    sideGenreTag: {
        padding: "6px 12px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(201,168,76,0.16)",
        color: "#c9a84c",
        fontFamily: "'Inter',sans-serif",
        fontSize: 11,
        fontWeight: 600
    },
    empty: {
        textAlign: "center",
        padding: "34px 20px",
        color: "rgba(240,230,208,0.30)",
        fontFamily: "'Inter',sans-serif",
        fontSize: 14
    },
    dimText: {
        fontFamily: "'Inter',sans-serif",
        fontSize: 13,
        color: "rgba(240,230,208,0.42)",
        lineHeight: 1.6
    }
};
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__5476e8a8._.js.map