import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUser() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!session || !userId) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { userId };
}

// TODO: thay bằng check Pro thật của mày
async function requirePro(userId: string) {
  void userId;
  return true;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireUser();
    if ("error" in auth) return auth.error;

    const isPro = await requirePro(auth.userId);
    if (!isPro) {
      return NextResponse.json(
        { error: "Mainga Lab chỉ dành cho gói Pro." },
        { status: 403 }
      );
    }

    const existing = await prisma.characterProfile.findFirst({
      where: {
        id: params.id,
        userId: auth.userId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy nhân vật." },
        { status: 404 }
      );
    }

    const body = await req.json();

    const data: any = {};

    if (typeof body?.name === "string") data.name = body.name.trim();
    if (typeof body?.description === "string") data.description = body.description.trim() || null;
    if (typeof body?.primaryImageUrl === "string") data.primaryImageUrl = body.primaryImageUrl.trim();
    if (typeof body?.canonSummary === "string") data.canonSummary = body.canonSummary.trim();
    if (typeof body?.appearanceNotes === "string") data.appearanceNotes = body.appearanceNotes.trim();
    if (typeof body?.mustPreserve === "string") data.mustPreserve = body.mustPreserve.trim();
    if (typeof body?.avoidDrift === "string") data.avoidDrift = body.avoidDrift.trim() || null;
    if (typeof body?.styleAffinity === "string") data.styleAffinity = body.styleAffinity.trim() || null;
    if (
      body?.colorMode === "monochrome" ||
      body?.colorMode === "color" ||
      body?.colorMode === "unspecified"
    ) {
      data.colorMode = body.colorMode;
    }
    if (Array.isArray(body?.galleryJson)) {
      data.galleryJson = body.galleryJson;
    }

    const character = await prisma.characterProfile.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({
      ok: true,
      character,
    });
  } catch (error: any) {
    console.error("PATCH /api/mainga-lab/characters/[id] error:", error?.message || error);
    return NextResponse.json(
      { error: "Không thể cập nhật nhân vật." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireUser();
    if ("error" in auth) return auth.error;

    const isPro = await requirePro(auth.userId);
    if (!isPro) {
      return NextResponse.json(
        { error: "Mainga Lab chỉ dành cho gói Pro." },
        { status: 403 }
      );
    }

    const existing = await prisma.characterProfile.findFirst({
      where: {
        id: params.id,
        userId: auth.userId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy nhân vật." },
        { status: 404 }
      );
    }

    await prisma.characterProfile.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    console.error("DELETE /api/mainga-lab/characters/[id] error:", error?.message || error);
    return NextResponse.json(
      { error: "Không thể xóa nhân vật." },
      { status: 500 }
    );
  }
}