import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fal from "@/lib/fal";

export const dynamic = "force-dynamic";

function buildCharacterPrompt(data: {
  name: string;
  canonSummary: string;
  appearanceNotes: string;
  mustPreserve: string;
  colorMode: string;
}): string {
  const parts = [
    `character portrait of ${data.name}`,
    data.appearanceNotes,
    data.canonSummary,
    data.mustPreserve,
    "manga art style",
    "upper body portrait",
    "clean lineart",
    "sharp focus",
    "highly detailed",
    "professional illustration",
    data.colorMode === "monochrome"
      ? "black and white, monochrome, ink style"
      : data.colorMode === "color"
      ? "vibrant colors, full color illustration"
      : "",
  ];

  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .join(", ");
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const tier = user.subscriptionTier || "FREE";
    if (tier === "FREE") {
      return NextResponse.json(
        { error: "Tính năng này yêu cầu gói PRO hoặc MAX." },
        { status: 402 }
      );
    }

    const body = await req.json();
    const { name, canonSummary, appearanceNotes, mustPreserve, colorMode } = body;

    if (!name || !appearanceNotes) {
      return NextResponse.json(
        { error: "Cần nhập tên và appearance notes để generate preview." },
        { status: 400 }
      );
    }

    const prompt = buildCharacterPrompt({
      name,
      canonSummary: canonSummary || "",
      appearanceNotes,
      mustPreserve: mustPreserve || "",
      colorMode: colorMode || "unspecified",
    });

    console.log("[preview-character] Generating for:", name, "| Prompt:", prompt);

    const result: any = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
        image_size: "portrait_4_3",
        seed: Math.floor(Math.random() * 1_000_000_000) + 1,
      },
      logs: false,
    });

    const imageUrl =
      result?.images?.[0]?.url ||
      result?.data?.images?.[0]?.url ||
      null;

    if (!imageUrl) {
      console.error("[preview-character] No image URL in result:", JSON.stringify(result));
      return NextResponse.json(
        { error: "Không nhận được ảnh từ AI. Thử lại sau." },
        { status: 500 }
      );
    }

    console.log("[preview-character] Success:", imageUrl);
    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error("[preview-character] Error:", error?.message);
    return NextResponse.json(
      { error: error?.message || "Lỗi generate preview." },
      { status: 500 }
    );
  }
}
