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
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { chapters: true, comments: true } },
      ratings: { select: { score: true } },
    },
  });

  if (!manga)
    return NextResponse.json({ error: "Không tìm thấy manga" }, { status: 404 });

  const avgRating =
    manga.ratings.length > 0
      ? manga.ratings.reduce((a, b) => a + b.score, 0) / manga.ratings.length
      : 0;

  return NextResponse.json({
    ...manga,
    avgRating: Math.round(avgRating * 10) / 10,
    ratingCount: manga.ratings.length,
    ratings: undefined,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const user = session.user as any;
  const manga = await prisma.manga.findUnique({ where: { id } });
  if (!manga)
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  // Chỉ admin hoặc tác giả mới được xóa
  if (user.role !== "admin" && manga.authorId !== user.id)
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });

  await prisma.manga.delete({ where: { id } });
  return NextResponse.json({ success: true });
}