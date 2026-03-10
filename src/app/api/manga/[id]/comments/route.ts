import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const comments = await prisma.comment.findMany({
    where: { mangaId: id },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, image: true } } },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { content } = await req.json();
  if (!content?.trim())
    return NextResponse.json({ error: "Nội dung trống" }, { status: 400 });

  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      mangaId: id,
      userId: (session.user as any).id,
    },
    include: { user: { select: { name: true, image: true } } },
  });

  return NextResponse.json(comment, { status: 201 });
}
