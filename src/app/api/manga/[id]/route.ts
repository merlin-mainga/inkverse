import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const manga = await prisma.manga.findUnique({
    where: { id: id },
    include: {
      author: { select: { id: true, name: true, image: true, bio: true } },
      chapters: { orderBy: { chapterNum: "asc" } },
      _count: { select: { chapters: true } },
    },
  });

  if (!manga) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  await prisma.manga.update({ where: { id: id }, data: { views: { increment: 1 } } });

  return NextResponse.json(manga);
}

export async function DELETE(
  _: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { id } = await params;
  const manga = await prisma.manga.findUnique({ where: { id: id } });

  if (!manga || manga.authorId !== session.user.id) {
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });
  }

  await prisma.manga.delete({ where: { id: id } });
  return NextResponse.json({ success: true });
}
