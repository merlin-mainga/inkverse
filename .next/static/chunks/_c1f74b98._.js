(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_c1f74b98._.js", {

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
"[project]/src/components/CoverEditor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CoverEditor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CoverImage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function CoverEditor({ value, positionX, positionY, onPositionChange, onFileChange, disabled = false, label = "Ảnh bìa", hint = "Kéo trực tiếp ảnh trong khung để căn cho đẹp như card ngoài Trang chủ." }) {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function openPicker() {
        if (disabled) return;
        fileInputRef.current?.click();
    }
    function handleFileChange(file) {
        if (!file) {
            onFileChange(null, "");
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        onFileChange(file, previewUrl);
    }
    function handlePointerDown(e) {
        if (disabled || !value) return;
        const rect = e.currentTarget.getBoundingClientRect();
        dragState.current = {
            startX: e.clientX,
            startY: e.clientY,
            startPosX: positionX,
            startPosY: positionY,
            frameWidth: rect.width,
            frameHeight: rect.height
        };
        setDragging(true);
        e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    function handlePointerMove(e) {
        if (!dragState.current || disabled || !value) return;
        const dx = e.clientX - dragState.current.startX;
        const dy = e.clientY - dragState.current.startY;
        const nextX = clamp(dragState.current.startPosX + dx / dragState.current.frameWidth * 100, 0, 100);
        const nextY = clamp(dragState.current.startPosY + dy / dragState.current.frameHeight * 100, 0, 100);
        onPositionChange(Math.round(nextX), Math.round(nextY));
    }
    function handlePointerEnd() {
        dragState.current = null;
        setDragging(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .cover-editor-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .cover-editor-btn:hover:not(:disabled) {
          opacity: 0.95;
          transform: translateY(-1px);
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/CoverEditor.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.45)",
                    marginBottom: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/CoverEditor.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    border: "1px dashed rgba(201,168,76,0.28)",
                    borderRadius: 16,
                    padding: 18,
                    background: "rgba(255,255,255,0.015)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onPointerDown: handlePointerDown,
                        onPointerMove: handlePointerMove,
                        onPointerUp: handlePointerEnd,
                        onPointerCancel: handlePointerEnd,
                        style: {
                            width: 230,
                            maxWidth: "100%",
                            margin: "0 auto 14px",
                            touchAction: "none",
                            cursor: disabled ? "not-allowed" : value ? dragging ? "grabbing" : "grab" : "default",
                            userSelect: "none"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CoverImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: value,
                            alt: "cover preview",
                            positionX: positionX,
                            positionY: positionY,
                            aspectRatio: "3 / 4",
                            borderRadius: 16,
                            style: {
                                border: "1px solid rgba(201,168,76,0.18)",
                                boxShadow: dragging ? "0 0 0 1px rgba(201,168,76,0.28)" : "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/CoverEditor.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CoverEditor.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            color: "#c9a84c",
                            marginBottom: 8,
                            fontWeight: 600
                        },
                        children: "Preview đúng khung card ngoài Trang chủ"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CoverEditor.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            color: "rgba(240,230,208,0.36)",
                            lineHeight: 1.55,
                            marginBottom: 14
                        },
                        children: hint
                    }, void 0, false, {
                        fileName: "[project]/src/components/CoverEditor.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 10,
                            justifyContent: "center",
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "cover-editor-btn",
                                onClick: openPicker,
                                disabled: disabled,
                                style: {
                                    padding: "10px 14px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(201,168,76,0.22)",
                                    background: "rgba(201,168,76,0.08)",
                                    color: "#c9a84c",
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 13,
                                    fontWeight: 700
                                },
                                children: "Chọn ảnh bìa"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CoverEditor.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "cover-editor-btn",
                                onClick: ()=>onPositionChange(50, 50),
                                disabled: disabled || !value,
                                style: {
                                    padding: "10px 14px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: "rgba(255,255,255,0.03)",
                                    color: "rgba(240,230,208,0.75)",
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 13,
                                    fontWeight: 600
                                },
                                children: "Căn giữa lại"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CoverEditor.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CoverEditor.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/*",
                        style: {
                            display: "none"
                        },
                        onChange: (e)=>handleFileChange(e.target.files?.[0] || null)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CoverEditor.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CoverEditor.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CoverEditor.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(CoverEditor, "AdlXigc7tx+uuMJr+3272AoOF2k=");
_c = CoverEditor;
var _c;
__turbopack_context__.k.register(_c, "CoverEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports } = __turbopack_context__;
{
const e = new Error(`Could not parse module '[project]/src/app/dashboard/page.tsx'

Unexpected token `div`. Expected jsx identifier`);
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_c1f74b98._.js.map