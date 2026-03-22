import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  // Check if already completed
  const existing = await prisma.userQuest.findUnique({
    where: { userId_questId_periodKey: { userId, questId: quest.id, periodKey: "" } },
  });
  if (existing?.completedAt) {
    return NextResponse.json({ error: "Đã hoàn thành quest này" }, { status: 409 });
  }

  // Create or update startedAt (upsert - don't overwrite if already started)
  const now = new Date();
  const record = await prisma.userQuest.upsert({
    where: { userId_questId_periodKey: { userId, questId: quest.id, periodKey: "" } },
    create: { userId, questId: quest.id, periodKey: "", startedAt: now },
    update: {}, // don't reset startedAt if already started
  });

  return NextResponse.json({ ok: true, startedAt: record.startedAt ?? now });
}
