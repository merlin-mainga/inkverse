import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { mangaId } = await req.json();
  const userId = (session.user as any).id;

  const existing = await prisma.follow.findUnique({
    where: { userId_mangaId: { userId, mangaId } },
  });

  if (existing) {
    await prisma.follow.delete({
      where: { userId_mangaId: { userId, mangaId } },
    });
    return NextResponse.json({ following: false });
  } else {
    await prisma.follow.create({
      data: { userId, mangaId },
    });
    return NextResponse.json({ following: true });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ follows: [] });

  const userId = (session.user as any).id;
  const { searchParams } = new URL(req.url);
  const mangaId = searchParams.get("mangaId");

  if (mangaId) {
    const follow = await prisma.follow.findUnique({
      where: { userId_mangaId: { userId, mangaId } },
    });
    return NextResponse.json({ following: !!follow });
  }

  const follows = await prisma.follow.findMany({
    where: { userId },
    include: {
      manga: {
        include: {
          author: { select: { id: true, name: true } },
          _count: { select: { chapters: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ follows });
}
