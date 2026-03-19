module.exports = {

"[project]/.next-internal/server/app/api/analyze-manga-prompt/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/analyze-manga-prompt/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const ANALYZE_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const RESPONSE_FORMAT = {
    type: "json_schema",
    json_schema: {
        type: "object",
        additionalProperties: false,
        properties: {
            subject: {
                type: "string"
            },
            appearance: {
                type: "string"
            },
            outfit: {
                type: "string"
            },
            pose: {
                type: "string"
            },
            action: {
                type: "string"
            },
            camera: {
                type: "string"
            },
            background: {
                type: "string"
            },
            lighting: {
                type: "string"
            },
            mood: {
                type: "string"
            },
            style: {
                type: "string"
            },
            must_have: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            avoid: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            final_prompt: {
                type: "string"
            },
            negative_prompt: {
                type: "string"
            }
        },
        required: [
            "subject",
            "appearance",
            "outfit",
            "pose",
            "action",
            "camera",
            "background",
            "lighting",
            "mood",
            "style",
            "must_have",
            "avoid",
            "final_prompt",
            "negative_prompt"
        ]
    }
};
async function POST(req) {
    try {
        const { prompt } = await req.json();
        if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Prompt không hợp lệ."
            }, {
                status: 400
            });
        }
        const analysisInstruction = `
You are an expert anime and manga image prompt architect.

Your task:
- Convert the user's idea into a highly optimized image-generation specification.
- Return STRICT JSON only.
- Write all fields in English.
- Keep the scene focused, visually coherent, and model-friendly.
- Make the image prompt more accurate, more specific, and less error-prone.

Rules:
- final_prompt must be excellent for anime/manga generation.
- Include character, clothing, pose, action, camera, background, lighting, mood, and style.
- Favor clean composition, strong silhouette, expressive face, clear anatomy, sharp details.
- avoid should include visual failure patterns.
- negative_prompt must be concise and effective.
`.trim();
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${ANALYZE_MODEL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: `${analysisInstruction}\n\nUser idea: ${prompt.trim()}`,
                response_format: RESPONSE_FORMAT,
                max_tokens: 700,
                temperature: 0.2
            })
        });
        const data = await res.json();
        if (!res.ok) {
            console.error("analyze prompt error:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: data?.errors?.[0]?.message || "Analyze prompt failed."
            }, {
                status: res.status
            });
        }
        // In Workers AI JSON Mode, the structured object is typically returned in result.response
        const parsed = data?.result?.response || data?.response || null;
        if (!parsed || typeof parsed !== "object" || !parsed.final_prompt) {
            console.error("Invalid structured output:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "LLM không trả về prompt hợp lệ."
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            analysis: parsed
        });
    } catch (error) {
        console.error("analyze-manga-prompt error:", error?.message || error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Analyze route failed."
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__df7747b2._.js.map