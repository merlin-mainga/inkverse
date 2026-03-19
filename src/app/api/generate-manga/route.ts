import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt không hợp lệ" },
        { status: 400 }
      );
    }

    // Deduct mana before generation
    const manaRes = await fetch(req.url.replace("/api/generate-manga", "/api/mana/deduct"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({ amount: 1 }),
    });

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

    const output = await replicate.run(
      "aisha-ai-official/animagine-xl-v4-opt:cfd0f86fbcd03df45fca7ce83af9bb9c07850a3317303fe8dcf677038541db8a",
      {
        input: {
          prompt,
          negative_prompt:
            "low quality, blurry, bad anatomy, extra fingers, watermark, text",
          width: 768,
          height: 1024,
          steps: 20,
          cfg_scale: 5,
          scheduler: "Euler a",
          clip_skip: 1,
          batch_size: 1,
          pag_scale: 1,
          seed: -1,
          vae: "default",
        },
      }
    );

    return NextResponse.json({
      ok: true,
      image: output,
      mana: manaData,
    });
  } catch (error: any) {
    console.error("generate-manga error full:", error);
    console.error("generate-manga error message:", error?.message);
    console.error("generate-manga error stack:", error?.stack);
    console.error("generate-manga error response:", error?.response?.data);

    return NextResponse.json(
      { error: "generation failed" },
      { status: 500 }
    );
  }
}
