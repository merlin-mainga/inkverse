import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// FLUX.1 Kontext — character-consistent generation from single reference image
const MODEL = "black-forest-labs/flux-kontext-dev";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, characterImageUrl, negativePrompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt khong hop le" }, { status: 400 });
    }

    if (!characterImageUrl || typeof characterImageUrl !== "string") {
      return NextResponse.json(
        { error: "Character reference image URL la bat buoc" },
        { status: 400 }
      );
    }

    // Deduct mana before generation
    const manaRes = await fetch(
      req.url.replace("/api/generate-with-character", "/api/mana/deduct"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.get("cookie") || "",
        },
        body: JSON.stringify({ amount: 1 }),
      }
    );

    if (!manaRes.ok) {
      const manaError = await manaRes.json();
      return NextResponse.json(
        {
          error: manaError.error || "Không đủ Mana",
          code: manaError.code || "INSUFFICIENT_MANA",
          currentMana: manaError.currentMana,
          tier: manaError.tier,
        },
        { status: 403 }
      );
    }

    const manaData = await manaRes.json();

    console.log("[Kontext] Starting generation with character:", characterImageUrl);
    console.log("[Kontext] Prompt:", prompt);

    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        input_image: characterImageUrl,
        aspect_ratio: "3:4",
        output_format: "jpg",
        safety_tolerance: 2,
      },
    });

    console.log("[Kontext] Generation complete:", JSON.stringify(output).slice(0, 200));

    // FLUX Kontext returns array of image URLs
    const images = Array.isArray(output) ? output : [output];

    return NextResponse.json({
      ok: true,
      image: images,
      method: "flux-kontext",
      model: MODEL,
      mana: manaData,
    });
  } catch (error: any) {
    console.error("[Kontext] Full error:", error);
    console.error("[Kontext] Error message:", error?.message);

    if (error?.message?.includes("rate limit")) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (error?.message?.includes("NSFW")) {
      return NextResponse.json(
        { error: "Content filtered. Please try a different prompt or image." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error?.message || "Character reference generation failed" },
      { status: 500 }
    );
  }
}
