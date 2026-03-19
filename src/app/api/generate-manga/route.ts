import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt không hợp lệ" },
        { status: 400 }
      );
    }

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