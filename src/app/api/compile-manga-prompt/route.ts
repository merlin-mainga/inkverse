import { NextRequest, NextResponse } from "next/server";
import fal from "@/lib/fal";

const RESPONSE_FORMAT = {
  type: "json_schema",
  json_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      scene_prompt: { type: "string" },
      style_prompt: { type: "string" },
      final_prompt: { type: "string" },
      negative_prompt: { type: "string" },
      variation_base_prompt: { type: "string" },
      polish_prompt: { type: "string" },
      hand_fix_prompt: { type: "string" },
      grip_fix_prompt: { type: "string" },
    },
    required: [
      "scene_prompt",
      "style_prompt",
      "final_prompt",
      "negative_prompt",
      "variation_base_prompt",
      "polish_prompt",
      "hand_fix_prompt",
      "grip_fix_prompt",
    ],
  },
};

type OutputIntent =
  | "cover"
  | "illustration"
  | "portrait"
  | "full-body"
  | "action-scene"
  | "dialogue-scene"
  | "environment";

function normalizeOutputIntent(value: unknown): OutputIntent | null {
  if (
    value === "cover" ||
    value === "illustration" ||
    value === "portrait" ||
    value === "full-body" ||
    value === "action-scene" ||
    value === "dialogue-scene" ||
    value === "environment"
  ) {
    return value;
  }
  return null;
}

function resolveOutputIntent(scene: any, fallback?: unknown): OutputIntent {
  return (
    normalizeOutputIntent(scene?.output_intent) ||
    normalizeOutputIntent(fallback) ||
    "illustration"
  );
}

function getIntentDirection(outputIntent: OutputIntent) {
  if (outputIntent === "cover") {
    return "poster-like focal point, striking composition, strong visual hierarchy, premium cover-art feel";
  }
  if (outputIntent === "portrait") {
    return "face and upper-body priority, expressive facial focus, reduced background competition";
  }
  if (outputIntent === "full-body") {
    return "full character body clearly framed, readable stance, clean silhouette, visible costume structure";
  }
  if (outputIntent === "action-scene") {
    return "dynamic motion, readable action flow, clear anatomy, clear limb separation, impactful staging, avoid chaotic framing, avoid style drift";
  }
  if (outputIntent === "dialogue-scene") {
    return "calmer staging, expression and interaction priority, readable emotional body language";
  }
  if (outputIntent === "environment") {
    return "environment and atmosphere priority, location readability, strong spatial depth";
  }
  return "balanced standalone illustration, clear focal subject, polished composition";
}

function stringifySafe(value: unknown) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value ?? "");
  } catch {
    return "";
  }
}

function detectMonochromeIntent(scene: any, style: any) {
  const combined = `${stringifySafe(scene)}\n${stringifySafe(style)}`.toLowerCase();

  return (
    combined.includes("black and white") ||
    combined.includes("black-and-white") ||
    combined.includes("monochrome") ||
    combined.includes("grayscale") ||
    combined.includes("manga ink") ||
    combined.includes("inked manga") ||
    combined.includes("ink only") ||
    combined.includes("trắng đen")
  );
}

function getColorDirection(wantsMonochrome: boolean) {
  if (wantsMonochrome) {
    return {
      colorDirection:
        "Strict black-and-white manga rendering only. Monochrome ink only, grayscale allowed, no color accents, no painterly color lighting, no colored highlights, no mixed color treatment.",
      negativeColor:
        "color, full color, colored lighting, colored highlights, painterly color, watercolor color, vibrant palette, soft color wash, cinematic color grading",
    };
  }

  return {
    colorDirection:
      "Preserve the intended color treatment from the style. Do not drift into monochrome unless the style clearly asks for it.",
    negativeColor: "",
  };
}

async function callCompiler(scene: any, style: any, outputIntentFromBody?: unknown, characterCanon?: any) {
  const outputIntent = resolveOutputIntent(scene, outputIntentFromBody);
  const intentDirection = getIntentDirection(outputIntent);
  const wantsMonochrome = detectMonochromeIntent(scene, style);
  const { colorDirection, negativeColor } = getColorDirection(wantsMonochrome);

  // Build character canon instructions
  const charCanonInstruction = characterCanon
    ? `\n\nCHARACTER IDENTITY PRESERVATION (CRITICAL):\n` +
      `A character from Mainga Lab has been selected. You MUST preserve this character's identity in ALL generated prompts.\n` +
      `Character: ${characterCanon.name || "Unknown"}\n` +
      `Canon: ${characterCanon.canonSummary || ""}\n` +
      `Appearance: ${characterCanon.appearanceNotes || ""}\n` +
      `Must Preserve: ${characterCanon.mustPreserve || ""}\n` +
      (characterCanon.avoidDrift ? `Avoid Drift: ${characterCanon.avoidDrift}\n` : "") +
      (characterCanon.colorMode && characterCanon.colorMode !== "unspecified" ? `Color Mode: ${characterCanon.colorMode}\n` : "") +
      `\nRules for character preservation:\n` +
      `- In scene_prompt: Describe the character using canonSummary and appearanceNotes. Do NOT describe a generic character.\n` +
      `- In final_prompt: Inject character identity at the start of the prompt. Reference canon traits.\n` +
      `- In all prompts: Never invent different hair color, eye color, outfit, or identity.\n` +
      `- If output_intent is portrait/full-body/action: emphasize the character's distinctive traits.\n`
    : "";

  const instruction = `
You are a prompt compiler specialized for FLUX.2-dev HQ manga generation.

You receive:
1. scene analysis = what to draw
2. style analysis = how to draw${charCanonInstruction ? "\n3. character canon = whose identity to preserve" : ""}

Your job:
- Merge scene and style into prompts for HQ manga generation and HQ regeneration flows.
- Preserve the user's original scene intent.
- Preserve whether the intended rendering is monochrome or full color.
- Respect output_intent exactly.
- Keep the result visually clear, grounded, and easy for the model to follow.
- Return strict JSON only.${charCanonInstruction || "\n- Do not invent unrelated characters."}

GENERAL RULES:
- Write everything in English.
- Do not invent unrelated characters, props, or background elements.
- Prefer natural descriptive phrasing over keyword spam.
- Put scene content first, then style rendering, then quality guidance.
- Avoid unnecessary repetition and prompt overload.

OUTPUT INTENT:
Current output_intent = ${outputIntent}
Direction = ${intentDirection}

COLOR RULES:
- ${colorDirection}
- If the style clearly indicates black and white, monochrome, manga ink, ink only, grayscale, or similar, preserve monochrome rendering.
- If the style clearly indicates full color, cinematic color, painted color, vivid palette, soft color grading, or similar, preserve full color rendering.
- Never mix monochrome ink treatment with color rendering.
- Never force black and white unless the style clearly asks for monochrome.

MODERATION SAFETY:
- Preserve scene meaning, but soften wording that may increase output flagging.
- Avoid gore wording.
- Avoid explicit injury wording.

OUTPUT REQUIREMENTS:

scene_prompt:
- Concise scene-only description.
- No rendering style language.

style_prompt:
- Concise style-only description.
- No scene content.
- Must preserve palette/render treatment.
- If monochrome is intended, explicitly keep black-and-white / monochrome ink treatment.

final_prompt:
- One polished FLUX.2-dev prompt for first-pass HQ generation.
- Must read naturally.
- Scene first.
- Style second.
- Quality guidance last.
- Must follow the current output_intent.
- If output_intent is cover, prioritize focal impact and poster composition.
- If portrait, prioritize face and upper body.
- If full-body, clearly frame the full body.
- If action-scene, prioritize readable motion and anatomy without visual chaos.
- If dialogue-scene, prioritize expression and staging.
- If environment, prioritize place and atmosphere.
- Support:
  - readable anatomy
  - correct hand anatomy
  - clear limb separation
  - stable object interaction
  - balanced composition
  - strong silhouette
  - clean lineart
  - sharp focus
- If monochrome is intended, explicitly keep strict black-and-white manga rendering.

negative_prompt:
- Very concise only.
- Focus on common visual failures.
- ${negativeColor ? `Include these color failures if relevant: ${negativeColor}` : "Do not add unrelated palette negatives."}

variation_base_prompt:
- Stable HQ regeneration base prompt.
- Must preserve original scene intent, output_intent, character identity, camera intent, mood, composition direction, and color treatment.

polish_prompt:
- Polish-only refinement prompt.
- Preserve original composition, output_intent, pose, camera angle, character identity, scene layout, and color treatment.

hand_fix_prompt:
- Regenerate-focused correction prompt for bad hand anatomy.
- Preserve original scene intent, output_intent, style, character identity, camera intent, mood, composition direction, and color treatment.

grip_fix_prompt:
- Regenerate-focused correction prompt for bad weapon or object grip.
- Preserve original scene intent, output_intent, style, character identity, camera intent, mood, and composition direction.
`.trim();

  const payload = `
SCENE ANALYSIS:
${JSON.stringify(scene, null, 2)}

STYLE ANALYSIS:
${JSON.stringify(style, null, 2)}

OUTPUT INTENT:
${JSON.stringify(outputIntent, null, 2)}

MONOCHROME REQUIRED:
${JSON.stringify(wantsMonochrome, null, 2)}

FORCED COLOR NEGATIVE HINT:
${JSON.stringify(negativeColor, null, 2)}${characterCanon ? `

CHARACTER CANON (MUST USE):
${JSON.stringify(characterCanon, null, 2)}` : ""}
`.trim();

  const fullPrompt = `${instruction}\n\n${payload}`;

  const result: any = await fal.subscribe("fal-ai/any-llm", {
    input: {
      model: "google/gemini-flash-1.5",
      prompt: fullPrompt,
    },
  });

  return { data: result?.output, outputIntent, wantsMonochrome, negativeColor };
}

async function callCompilerWithRetry(
  scene: any,
  style: any,
  outputIntentFromBody?: unknown,
  characterCanon?: any
) {
  let lastData: any = null;
  let lastMeta: {
    outputIntent?: OutputIntent;
    wantsMonochrome?: boolean;
    negativeColor?: string;
  } = {};

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { data, outputIntent, wantsMonochrome, negativeColor } =
        await callCompiler(scene, style, outputIntentFromBody, characterCanon);

      lastData = data;
      lastMeta = { outputIntent, wantsMonochrome, negativeColor };

      if (data && typeof data === "object" && data.scene_prompt) {
        return { ok: true, data, ...lastMeta };
      }
    } catch (err) {
      console.error(`compile attempt ${attempt + 1} failed:`, err);
      lastData = { error: err };
    }

    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  return { ok: false, data: lastData, ...lastMeta };
}

function isValidCompiledOutput(parsed: any) {
  return !!(
    parsed &&
    typeof parsed === "object" &&
    typeof parsed.scene_prompt === "string" &&
    parsed.scene_prompt.trim() &&
    typeof parsed.style_prompt === "string" &&
    parsed.style_prompt.trim() &&
    typeof parsed.final_prompt === "string" &&
    parsed.final_prompt.trim() &&
    typeof parsed.negative_prompt === "string" &&
    parsed.negative_prompt.trim() &&
    typeof parsed.variation_base_prompt === "string" &&
    parsed.variation_base_prompt.trim() &&
    typeof parsed.polish_prompt === "string" &&
    parsed.polish_prompt.trim() &&
    typeof parsed.hand_fix_prompt === "string" &&
    parsed.hand_fix_prompt.trim() &&
    typeof parsed.grip_fix_prompt === "string" &&
    parsed.grip_fix_prompt.trim()
  );
}

function appendNegative(base: string, extra: string) {
  const parts = [base?.trim(), extra?.trim()].filter(Boolean);
  return parts.join(", ");
}

export async function POST(req: NextRequest) {
  try {
    const { scene, style, output_intent, character_canon } = await req.json();

    if (!scene || typeof scene !== "object" || !scene.scene_prompt) {
      return NextResponse.json(
        { error: "Scene data không hợp lệ." },
        { status: 400 }
      );
    }

    if (!style || typeof style !== "object" || !style.style_prompt) {
      return NextResponse.json(
        { error: "Style data không hợp lệ." },
        { status: 400 }
      );
    }

    const { ok, data, outputIntent, wantsMonochrome, negativeColor } =
      await callCompilerWithRetry(scene, style, output_intent, character_canon);

    if (!ok || !data) {
      console.error("compile-prompt error:", data);
      return NextResponse.json(
        { error: "Compile prompt failed." },
        { status: 500 }
      );
    }

    const parsed = data;

    if (!isValidCompiledOutput(parsed)) {
      console.error("Invalid compiler output:", data);
      return NextResponse.json(
        { error: "Prompt compiler không trả về dữ liệu hợp lệ." },
        { status: 500 }
      );
    }

    const compiled = {
      ...parsed,
      negative_prompt: appendNegative(parsed.negative_prompt, negativeColor || ""),
      output_intent: outputIntent,
      monochrome_locked: wantsMonochrome,
    };

    return NextResponse.json({
      ok: true,
      compiled,
    });
  } catch (error: any) {
    console.error("compile-manga-prompt route error:", error?.message || error);

    return NextResponse.json(
      { error: "Compile prompt route failed." },
      { status: 500 }
    );
  }
}
