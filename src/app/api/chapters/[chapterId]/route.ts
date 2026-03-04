import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: params.chapterId },
  });

  if (!chapter)
    return NextResponse.json(
      { error: "Không tìm thấy chapter" },
      { status: 404 }
    );

  // Tăng view
  await prisma.chapter.update({
    where: { id: params.chapterId },
    data: { views: { increment: 1 } },
  });

  return NextResponse.json(chapter);
}