import { NextRequest, NextResponse } from "next/server";
import fal from "@/lib/fal";

const RESPONSE_FORMAT = {
  type: "json_schema",
  json_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      scene_prompt: { type: "string" },
      style_prompt: { type: "string" }
    },
    required: ["scene_prompt", "style_prompt"]
  }
};

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt không hợp lệ." },
        { status: 400 }
      );
    }

    const instruction = `
You are a manga scene analyzer.

Your job is to convert a user idea into two prompts:

scene_prompt:
Describe the actual scene clearly.
Include character, pose, action, environment and composition.

style_prompt:
Describe the visual style of the image.
Focus on manga rendering style, ink quality, shading and mood.

Return STRICT JSON only.
`.trim();

    const fullPrompt = `${instruction}\n\nUser prompt: ${prompt}`;

    const result: any = await fal.subscribe("fal-ai/any-llm", {
      input: {
        model: "google/gemini-flash-1-5",
        prompt: [fullPrompt],
        response_format: RESPONSE_FORMAT,
        max_tokens: 400,
        temperature: 0.2
      },
    });

    const parsed = result?.data?.output;

    if (!parsed || !parsed.scene_prompt) {
      console.error("Invalid analyze output:", result);
      return NextResponse.json(
        { error: "Invalid analyze output." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      scene: {
        scene_prompt: parsed.scene_prompt
      },
      style: {
        style_prompt: parsed.style_prompt
      }
    });

  } catch (err: any) {
    console.error("analyze route error:", err);
    return NextResponse.json(
      { error: "Analyze route failed." },
      { status: 500 }
    );
  }
}
