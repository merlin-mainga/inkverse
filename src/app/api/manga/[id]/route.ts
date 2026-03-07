import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const manga = await prisma.manga.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { chapters: true, comments: true } },
      ratings: { select: { score: true } },
    },
  });

  if (!manga)
    return NextResponse.json({ error: "Không tìm thấy manga" }, { status: 404 });

  const avgRating =
    manga.ratings.length > 0
      ? manga.ratings.reduce((a, b) => a + b.score, 0) / manga.ratings.length
      : 0;

  return NextResponse.json({
    ...manga,
    avgRating: Math.round(avgRating * 10) / 10,
    ratingCount: manga.ratings.length,
    ratings: undefined,
  });
}
