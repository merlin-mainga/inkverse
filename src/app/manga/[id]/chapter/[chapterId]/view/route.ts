import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const { chapterId } = await params;
  await prisma.chapter.update({
    where: { id: chapterId },
    data: { views: { increment: 1 } },
  });
  return NextResponse.json({ ok: true });
}