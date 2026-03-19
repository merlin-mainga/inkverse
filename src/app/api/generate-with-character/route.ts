import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Using SDXL img2img for character-consistent generation
// Model: stability-ai/sdxl with image-to-image mode
const MODEL = "stability-ai/sdxl:392573f9ac8c7f6153001c5ef00fc9fd6611ad361e3ead07160116747895d7ad";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      characterImageUrl,
      negativePrompt,
      width = 768,
      height = 1024,
      steps = 30,
      cfgScale = 7.5,
      seed = -1,
      promptStrength = 0.45, // Lower = more character preservation, higher = more prompt adherence
    } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt khong hop le" },
        { status: 400 }
      );
    }

    if (!characterImageUrl || typeof characterImageUrl !== "string") {
      return NextResponse.json(
        { error: "Character reference image URL la bat buoc" },
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

    console.log("[Character Ref] Starting img2img with character:", characterImageUrl);
    console.log("[Character Ref] Prompt:", prompt);
    console.log("[Character Ref] Prompt strength:", promptStrength);

    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        negative_prompt: finalNegative,
        image: characterImageUrl,
        prompt_strength: promptStrength, // Controls how much the image is transformed
        width: width,
        height: height,
        num_inference_steps: steps,
        guidance_scale: cfgScale,
        num_outputs: 1,
        scheduler: "K_EULER",
        seed: seed === -1 ? Math.floor(Math.random() * 999999999) : seed,
      },
    });

    console.log("[Character Ref] Generation complete");

    // SDXL returns array of image URLs
    const images = Array.isArray(output) ? output : [output];

    return NextResponse.json({
      ok: true,
      image: images,
      method: "sdxl-img2img",
      model: MODEL,
    });
  } catch (error: any) {
    console.error("[Character Ref] Full error:", error);
    console.error("[Character Ref] Error message:", error?.message);
    console.error("[Character Ref] Error response:", error?.response?.data);

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
      { error: error?.message || "Character reference generation failed" },
      { status: 500 }
    );
  }
}
