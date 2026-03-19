import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function detectColorMode(input?: string) {
  if (input === "monochrome" || input === "color") return input;
  return "unspecified";
}

function buildCanonFromImage({
  name,
  imageUrl,
  colorMode,
}: {
  name: string;
  imageUrl: string;
  colorMode: "monochrome" | "color" | "unspecified";
}) {
  const safeName = name?.trim() || "Unnamed Character";

  const canonSummary =
    `${safeName} is a reference-derived character created from an uploaded image. ` +
    `Preserve the overall face identity, hairstyle silhouette, outfit impression, and core visual vibe from the source image.`;

  const appearanceNotes =
    `Use the uploaded image as the main visual anchor. Keep the same overall face shape, hairstyle flow, expression direction, outfit structure, proportions, and visual identity. ` +
    `Do not redesign the character into a different person.`;

  const mustPreserve =
    `Face identity, hairstyle shape, hair color impression, outfit silhouette, age impression, body proportions, and overall visual vibe from the uploaded image must remain stable.`;

  const avoidDrift =
    `Do not change hairstyle drastically. Do not alter age impression. Do not replace outfit design. Do not shift to a different character identity. Avoid facial drift and costume drift.`;

  return {
    name: safeName,
    primaryImageUrl: imageUrl,
    canonSummary,
    appearanceNotes,
    mustPreserve,
    avoidDrift,
    colorMode,
    sourceType: "image-upload",
  };
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const imageUrl = String(body?.imageUrl || "").trim();
    const rawName = String(body?.name || "").trim();
    const colorMode = detectColorMode(body?.colorMode) as
      | "monochrome"
      | "color"
      | "unspecified";

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Thiếu imageUrl." },
        { status: 400 }
      );
    }

    const name = rawName || "Unnamed Character";

    const canon = buildCanonFromImage({
      name,
      imageUrl,
      colorMode,
    });

    const created = await prisma.characterProfile.create({
      data: {
        user: {
          connect: {
            email: session.user.email,
          },
        },
        name: canon.name,
        sourceType: canon.sourceType,
        primaryImageUrl: canon.primaryImageUrl,
        canonSummary: canon.canonSummary,
        appearanceNotes: canon.appearanceNotes,
        mustPreserve: canon.mustPreserve,
        avoidDrift: canon.avoidDrift,
        colorMode: canon.colorMode,
      },
    });

    return NextResponse.json({
      ok: true,
      character: created,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Không thể tạo character từ image.",
      },
      { status: 500 }
    );
  }
}