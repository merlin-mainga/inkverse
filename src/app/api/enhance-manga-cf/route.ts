import { NextRequest, NextResponse } from "next/server";
import fal from "@/lib/fal";

function buildEnhancePrompt(prompt: string) {
  return [
    "repair this manga illustration",
    "preserve original composition",
    "preserve original pose",
    "preserve original camera angle",
    "preserve original scene layout",
    "preserve original face",
    "preserve original character identity",
    "do not redesign character",
    "do not change hairstyle",
    "do not change outfit design",
    "do not change color palette",
    "do not change lighting direction",
    "do not change framing",

    "fix anatomy only where broken",
    "fix extra fingers",
    "fix missing fingers",
    "fix fused fingers",
    "fix malformed hands",
    "fix broken wrist structure",
    "fix broken arm anatomy",
    "fix missing limbs if visibly broken",
    "fix extra limbs if visibly broken",
    "preserve all correct body parts unchanged",
    "minimal necessary correction only",

    "preserve original rendering style",
    "preserve original shading style",
    "preserve original lineart style",

    prompt.trim(),
  ].join(", ");
}

function buildNegativePrompt() {
  return [
    "extra fingers",
    "missing fingers",
    "fused fingers",
    "deformed hands",
    "bad anatomy",
    "extra limbs",
    "missing limbs",
    "twisted arms",
    "distorted body",
    "redesigned face",
    "changed hairstyle",
    "changed outfit",
    "changed composition",
    "blurry",
    "low quality",
  ].join(", ");
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, image } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt không hợp lệ." },
        { status: 400 }
      );
    }

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Ảnh draft không hợp lệ." },
        { status: 400 }
      );
    }

    // For Fal.ai image-to-image, use the image URL directly
    // If image is a data URL, we need to upload it first or use it as-is
    const imageUrl = image;

    const result: any = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
      input: {
        prompt: buildEnhancePrompt(prompt),
        image_url: imageUrl,
        strength: 0.75,
      },
      logs: true,
    });

    // @fal-ai/client wraps output in result.data
    const imageOut = result?.data?.images?.[0]?.url || result?.images?.[0]?.url || result?.data?.image?.url || result?.image?.url;

    if (!imageOut) {
      console.error("Fal enhance response:", JSON.stringify(result).substring(0, 500));
      return NextResponse.json(
        { error: "Không nhận được ảnh final." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imageOut,
    });
  } catch (err: any) {
    console.error("enhance route error:", err);

    return NextResponse.json(
      { error: err?.message || "Enhance route failed." },
      { status: 500 }
    );
  }
}
