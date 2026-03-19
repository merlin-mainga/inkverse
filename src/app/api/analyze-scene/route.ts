import { NextRequest, NextResponse } from "next/server";

const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

const RESPONSE_FORMAT = {
  type: "json_schema",
  json_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      subject: { type: "string" },
      action: { type: "string" },
      pose: { type: "string" },
      camera: { type: "string" },
      background: { type: "string" },
      mood: { type: "string" },
      props: {
        type: "array",
        items: { type: "string" },
      },
      composition: { type: "string" },
      output_intent: {
        type: "string",
        enum: [
          "cover",
          "illustration",
          "portrait",
          "full-body",
          "action-scene",
          "dialogue-scene",
          "environment",
        ],
      },
      scene_prompt: { type: "string" },
      must_have: {
        type: "array",
        items: { type: "string" },
      },
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
      "must_have",
    ],
  },
};

function getErrorMessage(data: any) {
  return data?.errors?.[0]?.message || data?.result?.error || "";
}

function isTransportError(data: any) {
  return getErrorMessage(data).toLowerCase().includes("transport error");
}

async function callSceneAnalyzer(prompt: string, outputIntent?: string, characterCanon?: any) {
  const safeIntent =
    outputIntent &&
    [
      "cover",
      "illustration",
      "portrait",
      "full-body",
      "action-scene",
      "dialogue-scene",
      "environment",
    ].includes(outputIntent)
      ? outputIntent
      : "illustration";

  // Build character canon section for the instruction
  const charCanonSection = characterCanon
    ? `\n\n[CRITICAL: CHARACTER IDENTITY PRESERVATION]\n` +
      `The user has selected a character from Mainga Lab. You MUST preserve this character's identity in the scene.\n` +
      `Character Name: ${characterCanon.name || "Unknown"}\n` +
      `Canon Summary: ${characterCanon.canonSummary || ""}\n` +
      `Appearance Notes: ${characterCanon.appearanceNotes || ""}\n` +
      `Must Preserve Traits: ${characterCanon.mustPreserve || ""}\n` +
      (characterCanon.avoidDrift ? `Known Failure Modes to AVOID: ${characterCanon.avoidDrift}\n` : "") +
      (characterCanon.colorMode && characterCanon.colorMode !== "unspecified"
        ? `Color Mode: ${characterCanon.colorMode}\n`
        : "") +
      `\nWhen building the scene_prompt, you MUST inject this character's identity. ` +
      `Use the canon summary to describe the character. Use appearance notes for visual details. ` +
      `Do NOT invent a different character. ` +
      (characterCanon.primaryImageUrl ? `Reference image: ${characterCanon.primaryImageUrl}\n` : "")
    : "";

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

${characterCanon ? `- subject MUST be the character from the canon - do not replace with a generic character` : ""}

INTENT GUIDANCE:
- cover = poster-like key visual, strong focal point, striking composition
- illustration = general polished standalone image
- portrait = face / upper body priority
- full-body = full character body clearly framed
- action-scene = dynamic motion and readable action
- dialogue-scene = calmer staging, expression and interaction priority
- environment = place / atmosphere priority

Requested output_intent: ${safeIntent}

${characterCanon ? "\nIMPORTANT: The scene MUST feature the provided character with their canonical identity." : ""}

Return STRICT JSON only.
`.trim();

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${instruction}\n\nUSER PROMPT:\n${prompt.trim()}`,
        response_format: RESPONSE_FORMAT,
        max_tokens: 700,
        temperature: 0.12,
      }),
    }
  );

  const data = await res.json();
  return { res, data };
}

async function callSceneAnalyzerWithRetry(prompt: string, outputIntent?: string, characterCanon?: any) {
  let lastData: any = null;
  let lastStatus = 500;

  for (let attempt = 0; attempt < 3; attempt++) {
    const { res, data } = await callSceneAnalyzer(prompt, outputIntent, characterCanon);
    lastData = data;
    lastStatus = res.status;

    if (res.ok) {
      return { res, data };
    }

    if (!isTransportError(data)) {
      return { res, data };
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  return {
    res: { ok: false, status: lastStatus },
    data: lastData,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, output_intent, character_canon } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt không hợp lệ." },
        { status: 400 }
      );
    }

    const { res, data } = await callSceneAnalyzerWithRetry(prompt, output_intent, character_canon);

    if (!res.ok) {
      console.error("analyze-scene error:", data);
      return NextResponse.json(
        { error: getErrorMessage(data) || "Analyze scene failed." },
        { status: typeof res.status === "number" ? res.status : 500 }
      );
    }

    const parsed = data?.result?.response || data?.response || null;

    if (!parsed || typeof parsed !== "object" || !parsed.scene_prompt) {
      console.error("Invalid scene output:", data);
      return NextResponse.json(
        { error: "Scene analyzer không trả về dữ liệu hợp lệ." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      scene: parsed,
      character_canon: character_canon,
    });
  } catch (error: any) {
    console.error("analyze-scene route error:", error?.message || error);
    return NextResponse.json(
      { error: "Analyze scene route failed." },
      { status: 500 }
    );
  }
}