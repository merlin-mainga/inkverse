module.exports = {

"[project]/.next-internal/server/app/api/analyze-scene/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/analyze-scene/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
            subject: {
                type: "string"
            },
            action: {
                type: "string"
            },
            pose: {
                type: "string"
            },
            camera: {
                type: "string"
            },
            background: {
                type: "string"
            },
            mood: {
                type: "string"
            },
            props: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            composition: {
                type: "string"
            },
            output_intent: {
                type: "string",
                enum: [
                    "cover",
                    "illustration",
                    "portrait",
                    "full-body",
                    "action-scene",
                    "dialogue-scene",
                    "environment"
                ]
            },
            scene_prompt: {
                type: "string"
            },
            must_have: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        },
        required: [
            "subject",
            "action",
            "pose",
            "camera",
            "background",
            "mood",
            "props",
            "composition",
            "output_intent",
            "scene_prompt",
            "must_have"
        ]
    }
};
function getErrorMessage(data) {
    return data?.errors?.[0]?.message || data?.result?.error || "";
}
function isTransportError(data) {
    return getErrorMessage(data).toLowerCase().includes("transport error");
}
async function callSceneAnalyzer(prompt, outputIntent) {
    const safeIntent = outputIntent && [
        "cover",
        "illustration",
        "portrait",
        "full-body",
        "action-scene",
        "dialogue-scene",
        "environment"
    ].includes(outputIntent) ? outputIntent : "illustration";
    const instruction = `
You are a scene analyzer for manga image generation.

Extract structured scene information from the user prompt.

Fields:
- subject
- action
- pose
- camera
- background
- mood
- props
- composition
- output_intent

Rules:
- Do NOT describe art style.
- Do NOT invent extra characters.
- Preserve the original scene intent.
- Write everything in English.
- output_intent must follow the requested intent when provided.
- scene_prompt must be a clean scene description suitable for image generation.
- must_have must list critical visual elements that must remain in the scene.

INTENT GUIDANCE:
- cover = poster-like key visual, strong focal point, striking composition
- illustration = general polished standalone image
- portrait = face / upper body priority
- full-body = full character body clearly framed
- action-scene = dynamic motion and readable action
- dialogue-scene = calmer staging, expression and interaction priority
- environment = place / atmosphere priority

Requested output_intent: ${safeIntent}

Return STRICT JSON only.
`.trim();
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${MODEL}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: `${instruction}\n\nUSER PROMPT:\n${prompt.trim()}`,
            response_format: RESPONSE_FORMAT,
            max_tokens: 700,
            temperature: 0.12
        })
    });
    const data = await res.json();
    return {
        res,
        data
    };
}
async function callSceneAnalyzerWithRetry(prompt, outputIntent) {
    let lastData = null;
    let lastStatus = 500;
    for(let attempt = 0; attempt < 3; attempt++){
        const { res, data } = await callSceneAnalyzer(prompt, outputIntent);
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
        const { prompt, output_intent } = await req.json();
        if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Prompt không hợp lệ."
            }, {
                status: 400
            });
        }
        const { res, data } = await callSceneAnalyzerWithRetry(prompt, output_intent);
        if (!res.ok) {
            console.error("analyze-scene error:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: getErrorMessage(data) || "Analyze scene failed."
            }, {
                status: typeof res.status === "number" ? res.status : 500
            });
        }
        const parsed = data?.result?.response || data?.response || null;
        if (!parsed || typeof parsed !== "object" || !parsed.scene_prompt) {
            console.error("Invalid scene output:", data);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Scene analyzer không trả về dữ liệu hợp lệ."
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            scene: parsed
        });
    } catch (error) {
        console.error("analyze-scene route error:", error?.message || error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Analyze scene route failed."
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__f77623e3._.js.map