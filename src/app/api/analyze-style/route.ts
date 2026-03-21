import { NextRequest, NextResponse } from "next/server";
import fal from "@/lib/fal";

const RESPONSE_FORMAT = {
  type: "json_schema",
  json_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      visual_mode: { type: "string" },
      lineart: { type: "string" },
      shading: { type: "string" },
      palette: { type: "string" },
      lighting: { type: "string" },
      texture: { type: "string" },
      detail: { type: "string" },
      style_prompt: { type: "string" },
      avoid: {
        type: "array",
        items: { type: "string" },
      },
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
      "avoid",
    ],
  },
};

async function callStyleAnalyzer(style: string) {
  const safeStyle =
    typeof style === "string" && style.trim()
      ? style.trim()
      : "anime manga illustration, clean lineart, high detail";

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

  const fullPrompt = `${instruction}\n\nUSER STYLE:\n${safeStyle}`;

  let result: any;
  try {
    result = await fal.subscribe("fal-ai/any-llm", {
      input: {
        model: "google/gemini-flash-1.5",
        prompt: fullPrompt,
      },
    });
  } catch (falErr: any) {
    console.error("[analyze-style] fal.subscribe threw:", falErr?.message, JSON.stringify(falErr));
    throw falErr;
  }

  console.log("[analyze-style] fal raw result:", JSON.stringify(result));

  // @fal-ai/client wraps model output in result.data
  const rawOutput = result?.data?.output ?? result?.output;
  if (!rawOutput || typeof rawOutput !== "string") {
    console.error("[analyze-style] rawOutput invalid:", typeof rawOutput, rawOutput);
    return null;
  }

  const cleaned = rawOutput
    .replace(/^```(?:json)?\s*/im, "")
    .replace(/\s*```\s*$/im, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseErr: any) {
    console.error("[analyze-style] JSON.parse failed:", parseErr?.message, "| cleaned:", cleaned.slice(0, 300));
    return null;
  }
}

async function callStyleAnalyzerWithRetry(style: string) {
  let lastData: any = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const data = await callStyleAnalyzer(style);
      lastData = data;

      if (data && typeof data === "object" && !Array.isArray(data) && data.style_prompt) {
        return { ok: true, data };
      }
    } catch (err) {
      console.error(`analyze-style attempt ${attempt + 1} failed:`, err);
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
    const { style } = await req.json();

    const { ok, data } = await callStyleAnalyzerWithRetry(style);

    if (!ok || !data) {
      console.error("analyze-style error:", data);
      return NextResponse.json(
        { error: "Analyze style failed." },
        { status: 500 }
      );
    }

    const parsed = data;

    if (!parsed || typeof parsed !== "object" || !parsed.style_prompt) {
      console.error("Invalid style output:", data);
      return NextResponse.json(
        { error: "Style analyzer không trả về dữ liệu hợp lệ." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      style: parsed,
    });
  } catch (error: any) {
    console.error("analyze-style route error:", error?.message || error);
    return NextResponse.json(
      { error: "Analyze style route failed." },
      { status: 500 }
    );
  }
}
