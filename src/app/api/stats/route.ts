import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [mangaCount, userCount, totalViews] = await Promise.all([
      prisma.manga.count(),
      prisma.user.count(),
      prisma.manga.aggregate({ _sum: { views: true } }),
    ]);

    return NextResponse.json({
      mangaCount,
      userCount,
      totalViews: totalViews._sum.views ?? 0,
    });
  } catch (error) {
    console.error("API /api/stats error:", error);
    return NextResponse.json(
      { mangaCount: 0, userCount: 0, totalViews: 0 },
      { status: 200 }
    );
  }
}