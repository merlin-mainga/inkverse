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
  if (!session?.user) return NextResponse.json({ history: null });

  const history = await prisma.readHistory.findUnique({
    where: {
      userId_mangaId: {
        userId: (session.user as any).id,
        mangaId: id,
      },
    },
    include: {
      chapter: {
        select: { id: true, chapterNum: true, title: true },
      },
    },
  });

  return NextResponse.json({ history });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
}