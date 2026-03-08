import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ mangas: [] });

  const userId = (session.user as any).id;

  const mangas = await prisma.manga.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { chapters: true, comments: true } },
      ratings: { select: { score: true } },
    },
  });

  const result = mangas.map(m => ({
    ...m,
    avgRating: m.ratings.length > 0
      ? Math.round((m.ratings.reduce((a, b) => a + b.score, 0) / m.ratings.length) * 10) / 10
      : 0,
    ratings: undefined,
  }));

  return NextResponse.json({ mangas: result });
}