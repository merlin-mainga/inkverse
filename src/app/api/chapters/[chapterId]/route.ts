import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const { chapterId } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
  });

  if (!chapter)
    return NextResponse.json({ error: "Không tìm thấy chapter" }, { status: 404 });

  // Increment view count
  await prisma.chapter.update({
    where: { id: chapterId },
    data: { views: { increment: 1 } },
  });

  return NextResponse.json(chapter);
}
