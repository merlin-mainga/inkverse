import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const chapters = await prisma.chapter.findMany({
    where: { mangaId: id },
    orderBy: { chapterNum: "asc" },
    select: {
      id: true,
      title: true,
      chapterNum: true,
      views: true,
      createdAt: true,
    },
  });
  return NextResponse.json(chapters);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const manga = await prisma.manga.findUnique({ where: { id } });
  if (!manga)
    return NextResponse.json({ error: "Không tìm thấy manga" }, { status: 404 });

  const { title, chapterNum, pages } = await req.json();

  const chapter = await prisma.chapter.create({
    data: { title, chapterNum, pages, mangaId: id },
  });

  return NextResponse.json(chapter, { status: 201 });
}
