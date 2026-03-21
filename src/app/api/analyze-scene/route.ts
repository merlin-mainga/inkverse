import { NextRequest, NextResponse } from "next/server";
import fal from "@/lib/fal";

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

  const fullPrompt = `${instruction}\n\nUSER PROMPT:\n${prompt.trim()}`;

  let result: any;
  try {
    result = await fal.subscribe("fal-ai/any-llm", {
      input: {
        model: "google/gemini-flash-1.5",
        prompt: fullPrompt,
      },
    });
  } catch (falErr: any) {
    console.error("[analyze-scene] fal.subscribe threw:", falErr?.message, JSON.stringify(falErr));
    throw falErr;
  }

  console.log("[analyze-scene] fal raw result:", JSON.stringify(result));

  const rawOutput = result?.output;
  if (!rawOutput || typeof rawOutput !== "string") {
    console.error("[analyze-scene] rawOutput invalid:", typeof rawOutput, rawOutput);
    return null;
  }

  console.log("[analyze-scene] rawOutput string:", rawOutput.slice(0, 500));

  // Strip markdown code fences the LLM sometimes wraps around JSON
  const cleaned = rawOutput
    .replace(/^```(?:json)?\s*/im, "")
    .replace(/\s*```\s*$/im, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseErr: any) {
    console.error("[analyze-scene] JSON.parse failed:", parseErr?.message, "| cleaned:", cleaned.slice(0, 300));
    return null;
  }
}

async function callSceneAnalyzerWithRetry(prompt: string, outputIntent?: string, characterCanon?: any) {
  let lastData: any = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const data = await callSceneAnalyzer(prompt, outputIntent, characterCanon);
      lastData = data;

      if (data && typeof data === "object" && data.scene_prompt) {
        return { ok: true, data };
      }
    } catch (err) {
      console.error(`analyze-scene attempt ${attempt + 1} failed:`, err);
      lastData = { error: err };
    }

    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  return { ok: false, data: lastData };
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

    const { ok, data } = await callSceneAnalyzerWithRetry(prompt, output_intent, character_canon);

    if (!ok || !data) {
      console.error("analyze-scene error:", data);
      return NextResponse.json(
        { error: "Analyze scene failed." },
        { status: 500 }
      );
    }

    const parsed = data;

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
