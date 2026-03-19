import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// IP-Adapter SDXL Face model for character-consistent generation
const IP_ADAPTER_MODEL = "lucataco/ip_adapter-sdxl-face:226c6bf6";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      characterImageUrl,
      negativePrompt,
      width = 768,
      height = 1024,
      steps = 25,
      cfgScale = 5,
      seed = -1,
    } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt khong hop le" },
        { status: 400 }
      );
    }

    if (!characterImageUrl || typeof characterImageUrl !== "string") {
      return NextResponse.json(
        { error: "Character reference image URL la bat buoc cho IP-Adapter generation" },
        { status: 400 }
      );
    }

    // Build anime-optimized negative prompt
    const defaultNegative =
      "low quality, blurry, bad anatomy, extra fingers, watermark, text, " +
      "photorealistic, photograph, 3d render, deformed face, deformed hands, " +
      "fused fingers, ugly, duplicate, morbid, mutilated, poorly drawn face, " +
      "poorly drawn hands, poorly drawn feet, out of frame, extra limbs";

    const finalNegative = negativePrompt || defaultNegative;

    console.log("[IP-Adapter] Starting generation with character:", characterImageUrl);
    console.log("[IP-Adapter] Prompt:", prompt);

    const output = await replicate.run(IP_ADAPTER_MODEL, {
      input: {
        seed: seed === -1 ? Math.floor(Math.random() * 999999999) : seed,
        image: characterImageUrl,
        prompt: prompt,
        negative_prompt: finalNegative,
        width: width,
        height: height,
        num_inference_steps: steps,
        guidance_scale: cfgScale,
        num_outputs: 1,
        scheduler: "Euler a",
      },
    });

    console.log("[IP-Adapter] Generation complete");

    return NextResponse.json({
      ok: true,
      image: output,
      method: "ip-adapter",
      model: IP_ADAPTER_MODEL,
    });
  } catch (error: any) {
    console.error("[IP-Adapter] Full error:", error);
    console.error("[IP-Adapter] Error message:", error?.message);
    console.error("[IP-Adapter] Error response:", error?.response?.data);

    // Handle specific error types
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
      { error: error?.message || "IP-Adapter generation failed" },
      { status: 500 }
    );
  }
}
