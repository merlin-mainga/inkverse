module.exports = {

"[project]/.next-internal/server/app/api/analyze-style/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/analyze-style/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const RESPONSE_FORMAT = {
    type: "json_schema",
    json_schema: {
        type: "object",
        additionalProperties: false,
        properties: {
            visual_mode: {
                type: "string"
            },
            lineart: {
                type: "string"
            },
            shading: {
                type: "string"
            },
            palette: {
                type: "string"
            },
            lighting: {
                type: "string"
            },
            texture: {
                type: "string"
            },
            detail: {
                type: "string"
            },
            style_prompt: {
                type: "string"
            },
            avoid: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        },
        required: [
            "visual_mode",
            "lineart",
            "shading",
            "palette",
            "lighting",
            "texture",
            "detail",
            "style_prompt",
            "avoid"
        ]
    }
};
function getErrorMessage(data) {
    return data?.errors?.[0]?.message || data?.result?.error || "";
}
function isTransportError(data) {
    return getErrorMessage(data).toLowerCase().includes("transport error");
}
async function callStyleAnalyzer(style) {
    const safeStyle = typeof style === "string" && style.trim() ? style.trim() : "anime manga illustration, clean lineart, high detail";
    const instruction = `
You are a style analyzer for manga image generation.

The user style describes HOW TO DRAW.

Extract only visual rendering attributes:
- visual_mode
- lineart
- shading
- palette
- lighting
- texture
- detail

Rules:
- Do NOT change scene content.
- Do NOT invent characters or objects.
- Focus only on rendering style and visual treatment.
- Write everything in English.
- style_prompt must preserve whether the intended look is monochrome or full color.
- avoid must list unwanted rendering artifacts and visual defects.
- Return STRICT JSON only.
`.trim();
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${MODEL}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: `${instruction}\n\nUSER STYLE:\n${safeStyle}`,
            response_format: RESPONSE_FORMAT,
            max_tokens: 600,
            temperature: 0.15
        })
    });
    const data = await res.json();
    return {
        res,
        data
    };
}
async function callStyleAnalyzerWithRetry(style) {
    let lastData = null;
    let lastStatus = 500;
    for(let attempt = 0; attempt < 3; attempt++){
        const { res, data } = await callStyleAnalyzer(style);
        lastData = data;
        lastStatus = res.status;
        if (res.ok) {
            return {
                res,
                data
            };
        }
        if (!isTransportError(data)) {
            return {
                res,
                data
            };
        }
        await new Promise((resolve)=>setTimeout(resolve, 1200));
    }
    return {
        res: {
            ok: false,
            status: lastStatus
        },
        data: lastData
    };
}
async function POST(req) {
    try {
        const { style } = await req.json();
        const { res, data } = await callStyleAnalyzerWithRetry(style);
        if (!res.ok) {
            console.error("analyze-style error:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: getErrorMessage(data) || "Analyze style failed."
            }, {
                status: typeof res.status === "number" ? res.status : 500
            });
        }
        const parsed = data?.result?.response || data?.response || null;
        if (!parsed || typeof parsed !== "object" || !parsed.style_prompt) {
            console.error("Invalid style output:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Style analyzer không trả về dữ liệu hợp lệ."
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            style: parsed
        });
    } catch (error) {
        console.error("analyze-style route error:", error?.message || error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Analyze style route failed."
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__bdcc5954._.js.map