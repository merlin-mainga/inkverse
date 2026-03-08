import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "admin")
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: { select: { name: true, email: true } },
      manga: { select: { title: true } },
    },
  });

  return NextResponse.json({ comments, total: comments.length });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "admin")
    return NextResponse.json({ error: "Không có quyền" }, { status: 403 });

  const { commentId } = await req.json();
  await prisma.comment.delete({ where: { id: commentId } });
  return NextResponse.json({ success: true });
}