import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const manga = await prisma.manga.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: { id: true, name: true, image: true, bio: true },
      },
      chapters: {
        orderBy: { chapterNum: "asc" },
        select: {
          id: true,
          title: true,
          chapterNum: true,
          views: true,
          createdAt: true,
        },
      },
      comments: {
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      ratings: { select: { score: true } },
      _count: { select: { chapters: true } },
    },
  });

  if (!manga)
    return NextResponse.json(
      { error: "Không tìm thấy" },
      { status: 404 }
    );

  await prisma.manga.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  });

  const avgRating =
    manga.ratings.length > 0
      ? manga.ratings.reduce((a, b) => a + b.score, 0) /
        manga.ratings.length
      : 0;

  return NextResponse.json({
    ...manga,
    avgRating,
    ratingCount: manga.ratings.length,
    ratings: undefined,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );

  const manga = await prisma.manga.findUnique({
    where: { id: params.id },
  });
  if (!manga || manga.authorId !== (session.user as any).id)
    return NextResponse.json(
      { error: "Không có quyền" },
      { status: 403 }
    );

  const data = await req.json();
  const updated = await prisma.manga.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );

  const manga = await prisma.manga.findUnique({
    where: { id: params.id },
  });
  if (!manga || manga.authorId !== (session.user as any).id)
    return NextResponse.json(
      { error: "Không có quyền" },
      { status: 403 }
    );

  await prisma.manga.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}