import { NextRequest, NextResponse } from "next/server";

const ANALYZE_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

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

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${ANALYZE_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: `${instruction}\n\nUser prompt: ${prompt}`,
          response_format: RESPONSE_FORMAT,
          max_tokens: 400,
          temperature: 0.2
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("analyze error:", data);
      return NextResponse.json(
        { error: data?.errors?.[0]?.message || "Analyze failed." },
        { status: res.status }
      );
    }

    const parsed =
      data?.result?.response ||
      data?.response ||
      null;

    if (!parsed || !parsed.scene_prompt) {
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