import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { score } = await req.json();
  if (!score || score < 1 || score > 5)
    return NextResponse.json({ error: "Score phải từ 1-5" }, { status: 400 });

  const userId = (session.user as any).id;

  const rating = await prisma.rating.upsert({
    where: { userId_mangaId: { userId, mangaId: id } },
    update: { score },
    create: { score, userId, mangaId: id },
  });

  return NextResponse.json(rating);
}
