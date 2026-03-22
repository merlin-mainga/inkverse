import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VERIFY_DELAY_MS = 60_000; // 60 seconds

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!session || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { questKey } = await req.json().catch(() => ({}));
  if (!questKey) {
    return NextResponse.json({ error: "Thiếu questKey" }, { status: 400 });
  }

  const quest = await prisma.quest.findUnique({ where: { key: questKey } });
  if (!quest || !quest.isActive || quest.type !== "bonus") {
    return NextResponse.json({ error: "Quest không hợp lệ" }, { status: 400 });
  }

  const record = await prisma.userQuest.findUnique({
    where: { userId_questId_periodKey: { userId, questId: quest.id, periodKey: "" } },
  });

  if (record?.completedAt) {
    return NextResponse.json({ error: "Đã hoàn thành quest này" }, { status: 409 });
  }

  if (!record?.startedAt) {
    return NextResponse.json({ error: "Chưa bắt đầu quest" }, { status: 400 });
  }

  const elapsed = Date.now() - record.startedAt.getTime();
  if (elapsed < VERIFY_DELAY_MS) {
    return NextResponse.json({ error: "Chưa đủ thời gian xác minh" }, { status: 400 });
  }

  // Mark complete + add mana
  await prisma.$transaction([
    prisma.userQuest.update({
      where: { userId_questId_periodKey: { userId, questId: quest.id, periodKey: "" } },
      data: { completedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { mana: { increment: quest.mana } },
    }),
  ]);

  return NextResponse.json({ ok: true, manaEarned: quest.mana });
}
