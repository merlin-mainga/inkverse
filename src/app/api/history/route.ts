import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { mangaId, chapterId } = await req.json();
  const userId = (session.user as any).id;

  const history = await prisma.readHistory.upsert({
    where: { userId_mangaId: { userId, mangaId } },
    update: { chapterId },
    create: { userId, mangaId, chapterId },
  });

  return NextResponse.json(history);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ history: [] });

  const userId = (session.user as any).id;

  const history = await prisma.readHistory.findMany({
    where: { userId },
    include: {
      manga: {
        include: {
          author: { select: { id: true, name: true } },
          _count: { select: { chapters: true } },
        },
      },
      chapter: {
        select: { id: true, title: true, chapterNum: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ history });
}
