import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );

  const { content, mangaId, chapterId } = await req.json();
  if (!content?.trim())
    return NextResponse.json(
      { error: "Nội dung trống" },
      { status: 400 }
    );

  const comment = await prisma.comment.create({
    data: {
      content,
      userId: (session.user as any).id,
      mangaId,
      chapterId,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(comment, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mangaId = searchParams.get("mangaId");
  const chapterId = searchParams.get("chapterId");

  const comments = await prisma.comment.findMany({
    where: {
      ...(mangaId ? { mangaId } : {}),
      ...(chapterId ? { chapterId } : {}),
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(comments);
}
