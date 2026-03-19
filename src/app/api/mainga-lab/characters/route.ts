import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUser() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!session || !userId) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { userId };
}

// Mainga Lab chỉ dành cho PRO và MAX
async function requirePro(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscriptionTier: true, subscriptionExpiry: true },
  });

  if (!user) return false;

  const isProOrMax =
    user.subscriptionTier === "PRO" || user.subscriptionTier === "MAX";

  if (!isProOrMax) return false;

  // Check expiry nếu có
  if (
    user.subscriptionExpiry &&
    user.subscriptionExpiry < new Date()
  ) {
    return false;
  }

  return true;
}

export async function GET() {
  try {
    const auth = await requireUser();
    if ("error" in auth) return auth.error;

    const isPro = await requirePro(auth.userId);
    if (!isPro) {
      return NextResponse.json(
        { 
          error: "Mainga Lab chỉ dành cho gói Pro.",
          code: "SUBSCRIPTION_REQUIRED",
          tierRequired: "PRO"
        },
        { status: 402 }
      );
    }

    const characters = await prisma.characterProfile.findMany({
      where: { userId: auth.userId },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      ok: true,
      characters,
    });
  } catch (error: any) {
    console.error("GET /api/mainga-lab/characters error:", error?.message || error);
    return NextResponse.json(
      { error: "Không thể tải danh sách nhân vật." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireUser();
    if ("error" in auth) return auth.error;

    const isPro = await requirePro(auth.userId);
    if (!isPro) {
      return NextResponse.json(
        { 
          error: "Mainga Lab chỉ dành cho gói Pro.",
          code: "SUBSCRIPTION_REQUIRED",
          tierRequired: "PRO"
        },
        { status: 402 }
      );
    }

    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";

    const requestedSourceType =
      body?.sourceType === "generated" || body?.sourceType === "uploaded"
        ? body.sourceType
        : null;

    const primaryImageUrl =
      typeof body?.primaryImageUrl === "string" ? body.primaryImageUrl.trim() : "";

    const canonSummary =
      typeof body?.canonSummary === "string" ? body.canonSummary.trim() : "";

    const appearanceNotes =
      typeof body?.appearanceNotes === "string" ? body.appearanceNotes.trim() : "";

    const mustPreserve =
      typeof body?.mustPreserve === "string" ? body.mustPreserve.trim() : "";

    const avoidDrift =
      typeof body?.avoidDrift === "string" ? body.avoidDrift.trim() : "";

    const styleAffinity =
      typeof body?.styleAffinity === "string" ? body.styleAffinity.trim() : "";

    const colorMode =
      body?.colorMode === "monochrome" ||
      body?.colorMode === "color" ||
      body?.colorMode === "unspecified"
        ? body.colorMode
        : "unspecified";

    const galleryJson = Array.isArray(body?.galleryJson) ? body.galleryJson : null;

    if (!name) {
      return NextResponse.json(
        { error: "Tên nhân vật là bắt buộc." },
        { status: 400 }
      );
    }

    if (!canonSummary) {
      return NextResponse.json(
        { error: "canonSummary là bắt buộc." },
        { status: 400 }
      );
    }

    if (!appearanceNotes) {
      return NextResponse.json(
        { error: "appearanceNotes là bắt buộc." },
        { status: 400 }
      );
    }

    if (!mustPreserve) {
      return NextResponse.json(
        { error: "mustPreserve là bắt buộc." },
        { status: 400 }
      );
    }

    // Phase 1:
    // - text flow: chưa bắt buộc primary image
    // - image flow: có thể truyền uploaded
    // - nếu client chưa gửi sourceType thì tự suy ra
    const sourceType =
      requestedSourceType ||
      (primaryImageUrl ? "uploaded" : "generated");

    const character = await prisma.characterProfile.create({
      data: {
        userId: auth.userId,
        name,
        description: description || null,
        sourceType,
        primaryImageUrl: primaryImageUrl || "",
        galleryJson,
        canonSummary,
        appearanceNotes,
        mustPreserve,
        avoidDrift: avoidDrift || null,
        styleAffinity: styleAffinity || null,
        colorMode,
      },
    });

    return NextResponse.json({
      ok: true,
      character,
    });
  } catch (error: any) {
    console.error("POST /api/mainga-lab/characters error:", error?.message || error);
    return NextResponse.json(
      { error: "Không thể tạo nhân vật." },
      { status: 500 }
    );
  }
}