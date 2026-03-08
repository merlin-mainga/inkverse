import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
}