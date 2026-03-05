import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { score } = await req.json();
  if (score < 1 || score > 5)
    return NextResponse.json({ error: "Score phải từ 1-5" }, { status: 400 });

  const rating = await prisma.rating.upsert({
    where: {
      userId_mangaId: {
        userId: (session.user as any).id,
        mangaId: id,
      },
    },
    update: { score },
    create: { score, userId: (session.user as any).id, mangaId: id },
  });

  return NextResponse.json(rating);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const ratings = await prisma.rating.findMany({
    where: { mangaId: id },
    select: { score: true },
  });

  const avgRating =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b.score, 0) / ratings.length
      : 0;

  let userRating = null;
  if (session?.user) {
    userRating = await prisma.rating.findUnique({
      where: {
        userId_mangaId: {
          userId: (session.user as any).id,
          mangaId: id,
        },
      },
    });
  }

  return NextResponse.json({
    avgRating,
    ratingCount: ratings.length,
    userRating: userRating?.score || null,
  });
}