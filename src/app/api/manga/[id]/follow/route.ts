import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ following: false });

  const userId = (session.user as any).id;
  const follow = await prisma.follow.findUnique({
    where: { userId_mangaId: { userId, mangaId: id } },
  });

  return NextResponse.json({ following: !!follow });
}

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const userId = (session.user as any).id;

  const existing = await prisma.follow.findUnique({
    where: { userId_mangaId: { userId, mangaId: id } },
  });

  if (existing) {
    await prisma.follow.delete({
      where: { userId_mangaId: { userId, mangaId: id } },
    });
    return NextResponse.json({ following: false });
  } else {
    await prisma.follow.create({ data: { userId, mangaId: id } });
    return NextResponse.json({ following: true });
  }
}
