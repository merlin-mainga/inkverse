module.exports = {

"[project]/.next-internal/server/app/api/enhance-manga-cf/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/enhance-manga-cf/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const MODEL = "@cf/black-forest-labs/flux-2-klein-4b";
function stripDataUrl(dataUrl) {
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) return null;
    return {
        mimeType: match[1],
        base64: match[2]
    };
}
function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++){
        bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([
        bytes
    ], {
        type: mimeType || "image/png"
    });
}
function buildEnhancePrompt(prompt) {
    return [
        "repair this manga illustration",
        "preserve original composition",
        "preserve original pose",
        "preserve original camera angle",
        "preserve original scene layout",
        "preserve original face",
        "preserve original character identity",
        "do not redesign character",
        "do not change hairstyle",
        "do not change outfit design",
        "do not change color palette",
        "do not change lighting direction",
        "do not change framing",
        "fix anatomy only where broken",
        "fix extra fingers",
        "fix missing fingers",
        "fix fused fingers",
        "fix malformed hands",
        "fix broken wrist structure",
        "fix broken arm anatomy",
        "fix missing limbs if visibly broken",
        "fix extra limbs if visibly broken",
        "preserve all correct body parts unchanged",
        "minimal necessary correction only",
        "preserve original rendering style",
        "preserve original shading style",
        "preserve original lineart style",
        prompt.trim()
    ].join(", ");
}
function buildNegativePrompt() {
    return [
        "extra fingers",
        "missing fingers",
        "fused fingers",
        "deformed hands",
        "bad anatomy",
        "extra limbs",
        "missing limbs",
        "twisted arms",
        "distorted body",
        "redesigned face",
        "changed hairstyle",
        "changed outfit",
        "changed composition",
        "blurry",
        "low quality"
    ].join(", ");
}
function buildStrength() {
    return "0.09";
}
async function callFluxEnhance(form) {
    for(let i = 0; i < 3; i++){
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${MODEL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
            },
            body: form
        });
        const data = await res.json();
        const capacityError = data?.errors?.[0]?.message?.includes("Capacity temporarily exceeded");
        if (!capacityError) {
            return {
                res,
                data
            };
        }
        await new Promise((resolve)=>setTimeout(resolve, 1500));
    }
    throw new Error("Flux enhance capacity exceeded.");
}
async function POST(req) {
    try {
        const { prompt, image } = await req.json();
        if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Prompt không hợp lệ."
            }, {
                status: 400
            });
        }
        if (!image || typeof image !== "string") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Ảnh draft không hợp lệ."
            }, {
                status: 400
            });
        }
        const parsed = stripDataUrl(image);
        if (!parsed) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Không đọc được ảnh draft."
            }, {
                status: 400
            });
        }
        const blob = base64ToBlob(parsed.base64, parsed.mimeType || "image/png");
        const form = new FormData();
        form.append("prompt", buildEnhancePrompt(prompt));
        form.append("negative_prompt", buildNegativePrompt());
        form.append("strength", buildStrength());
        form.append("input_image_0", blob, "draft.png");
        const { res, data } = await callFluxEnhance(form);
        if (!res.ok) {
            console.error("enhance error:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: data?.errors?.[0]?.message || data?.result?.error || "Enhance failed."
            }, {
                status: res.status
            });
        }
        const imageOut = data?.result?.image || data?.image || null;
        if (!imageOut) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Không nhận được ảnh final."
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            image: imageOut
        });
    } catch (err) {
        console.error("enhance route error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err?.message || "Enhance route failed."
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1feaeec2._.js.map