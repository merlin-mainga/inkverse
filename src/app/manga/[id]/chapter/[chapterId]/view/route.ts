import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const { chapterId } = await params;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { id: true, mangaId: true },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Không tìm thấy chapter" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.chapter.update({
        where: { id: chapterId },
        data: { views: { increment: 1 } },
      }),
      prisma.manga.update({
        where: { id: chapter.mangaId },
        data: { views: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("view route error:", error);
    return NextResponse.json({ error: "Không thể tăng view" }, { status: 500 });
  }
}