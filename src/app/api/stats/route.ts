import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [mangaCount, userCount, viewsResult] = await Promise.all([
      prisma.manga.count(),
      prisma.user.count(),
      prisma.manga.aggregate({
        _sum: { views: true },
      }),
    ]);

    return NextResponse.json({
      mangaCount,
      userCount,
      totalViews: viewsResult._sum.views ?? 0,
    });
  } catch (error) {
    console.error("GET /api/stats failed:", error);

    return NextResponse.json(
      {
        mangaCount: 0,
        userCount: 0,
        totalViews: 0,
      },
      { status: 200 }
    );
  }
}