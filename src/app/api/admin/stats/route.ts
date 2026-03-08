import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "admin")
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });

  const [mangaCount, userCount, commentCount, chapterCount, ratingCount, totalViews] =
    await Promise.all([
      prisma.manga.count(),
      prisma.user.count(),
      prisma.comment.count(),
      prisma.chapter.count(),
      prisma.rating.count(),
      prisma.manga.aggregate({ _sum: { views: true } }),
    ]);

  return NextResponse.json({
    mangaCount,
    userCount,
    commentCount,
    chapterCount,
    ratingCount,
    totalViews: totalViews._sum.views ?? 0,
  });
}