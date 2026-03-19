(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_3cae7951._.js", {

"[project]/src/app/login/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LoginPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function LoginPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleAuth() {
        setLoading(true);
        setMsg("");
        try {
            if (authMode === "register") {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });
                const data = await res.json();
                if (!res.ok) {
                    setMsg("❌ " + data.error);
                    setLoading(false);
                    return;
                }
                const loginRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                    email: form.email,
                    password: form.password,
                    redirect: false
                });
                if (loginRes?.ok) router.push("/");
                else setMsg("✅ Đăng ký thành công! Hãy đăng nhập.");
            } else {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
                    email: form.email,
                    password: form.password,
                    redirect: false
                });
                if (res?.ok) router.push("/");
                else setMsg("❌ Email hoặc mật khẩu sai!");
            }
        } catch  {
            setMsg("❌ Lỗi kết nối!");
        }
        setLoading(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "#080808",
            color: "#f0e6d0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            fontFamily: "'Inter', sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lux-input {
          width: 100%; padding: 13px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 8px; color: #f0e6d0;
          font-family: 'Inter', sans-serif; font-size: 14px; outline: none;
          transition: all 0.3s;
        }
        .lux-input:focus { border-color: #c9a84c; background: rgba(201,168,76,0.05); }
        .lux-input::placeholder { color: rgba(240,230,208,0.25); }
        .gold-btn {
          width: 100%; padding: 14px; border-radius: 8px; border: none;
          background: linear-gradient(135deg, #c9a84c, #8b6914, #c9a84c);
          background-size: 200% auto;
          color: #080808; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 700; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.3s;
          animation: shimmer 3s linear infinite;
        }
        .gold-btn:hover:not(:disabled) { background-position: right center; box-shadow: 0 0 30px rgba(201,168,76,0.3); transform: translateY(-1px); }
        .gold-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .google-btn {
          width: 100%; padding: 13px; background: white; border: none;
          border-radius: 8px; color: #333; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s;
        }
        .google-btn:hover { background: #f5f5f5; }
        .tab-btn {
          flex: 1; padding: 10px 0; background: transparent; border: none;
          border-bottom: 2px solid transparent; color: rgba(240,230,208,0.4);
          font-family: 'Inter', sans-serif; font-size: 14px;
          cursor: pointer; transition: all 0.2s; margin-bottom: -1px;
        }
        .tab-btn.active { color: #c9a84c; border-bottom-color: #c9a84c; }
        .back-link { color: rgba(240,230,208,0.4); cursor: pointer; font-size: 13px; transition: color 0.2s; display: inline-block; margin-bottom: 24px; }
        .back-link:hover { color: #c9a84c; }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        .card { animation: fadeUp 0.45s ease both; }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/login/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: 420,
                    position: "relative",
                    zIndex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "fixed",
                            top: "30%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 500,
                            height: 500,
                            background: "radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)",
                            borderRadius: "50%",
                            pointerEvents: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "back-link",
                        onClick: ()=>router.push("/"),
                        children: "← Trang chủ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(201,168,76,0.15)",
                            borderRadius: 16,
                            padding: "40px 36px",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.6)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    marginBottom: 32
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
                                            margin: "0 auto 16px"
                                        },
                                        children: "墨"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "'Cinzel',serif",
                                            fontSize: 24,
                                            fontWeight: 700,
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
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 135,
                                                columnNumber: 16
                                            }, this),
                                            "NGA"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: 1,
                                            background: "linear-gradient(90deg,transparent,#c9a84c,transparent)",
                                            maxWidth: 60,
                                            margin: "12px auto 0"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    borderBottom: "1px solid rgba(201,168,76,0.1)",
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `tab-btn${authMode === "login" ? " active" : ""}`,
                                        onClick: ()=>{
                                            setAuthMode("login");
                                            setMsg("");
                                        },
                                        children: "Đăng nhập"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `tab-btn${authMode === "register" ? " active" : ""}`,
                                        onClick: ()=>{
                                            setAuthMode("register");
                                            setMsg("");
                                        },
                                        children: "Đăng ký"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    marginBottom: 16
                                },
                                children: [
                                    authMode === "register" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "lux-input",
                                        placeholder: "Tên của bạn...",
                                        value: form.name,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                name: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "lux-input",
                                        type: "email",
                                        placeholder: "Email...",
                                        value: form.email,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                email: e.target.value
                                            }),
                                        onKeyDown: (e)=>e.key === "Enter" && handleAuth()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "lux-input",
                                        type: "password",
                                        placeholder: "Mật khẩu...",
                                        value: form.password,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                password: e.target.value
                                            }),
                                        onKeyDown: (e)=>e.key === "Enter" && handleAuth()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: 13,
                                    marginBottom: 14,
                                    textAlign: "center",
                                    color: msg.includes("✅") ? "#c9a84c" : "#ff6b6b"
                                },
                                children: msg
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "gold-btn",
                                onClick: handleAuth,
                                disabled: loading,
                                children: loading ? "ĐANG XỬ LÝ..." : authMode === "login" ? "ĐĂNG NHẬP" : "TẠO TÀI KHOẢN"
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    margin: "20px 0"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            height: 1,
                                            background: "rgba(201,168,76,0.15)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Inter',sans-serif",
                                            fontSize: 12,
                                            color: "rgba(240,230,208,0.3)"
                                        },
                                        children: "hoặc"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            height: 1,
                                            background: "rgba(201,168,76,0.15)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "google-btn",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signIn"])("google", {
                                        callbackUrl: "/"
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "https://www.google.com/favicon.ico",
                                        width: 18,
                                        height: 18,
                                        alt: "Google"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    "Tiếp tục với Google"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/login/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/login/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "Db38gjZn1yLoLf03PvzkUtqqx+o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_3cae7951._.js.map