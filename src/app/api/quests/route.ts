import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { completeQuest, getPeriodKey } from "@/lib/questHelper";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!session || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Auto-complete daily_login on each visit to quests page
  completeQuest(userId, "daily_login").catch(() => {});

  // Fetch all active quests
  const allQuests = await prisma.quest.findMany({
    where: { isActive: true },
    orderBy: [{ type: "asc" }, { mana: "asc" }],
  });

  // Fetch user's completions
  const userQuests = await prisma.userQuest.findMany({
    where: { userId },
  });

  // Build completion map: questId+periodKey → record
  const completionMap = new Map<string, { completedAt: Date | null; startedAt: Date | null }>();
  for (const uq of userQuests) {
    completionMap.set(`${uq.questId}:${uq.periodKey}`, {
      completedAt: uq.completedAt,
      startedAt: uq.startedAt,
    });
  }

  // Merge quests with completion status
  const quests = allQuests.map((q) => {
    const periodKey = getPeriodKey(q.resetPeriod);
    const record = completionMap.get(`${q.id}:${periodKey}`);
    return {
      id: q.id,
      type: q.type,
      key: q.key,
      title: q.title,
      description: q.description,
      mana: q.mana,
      resetPeriod: q.resetPeriod,
      bonusUrl: q.bonusUrl,
      completed: !!record?.completedAt,
      startedAt: record?.startedAt ?? null,
      periodKey,
    };
  });

  // Sum mana earned today from quest completions
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const todayQuests = await prisma.userQuest.findMany({
    where: { userId, completedAt: { gte: todayStart } },
    include: { quest: { select: { mana: true } } },
  });
  const todayMana = todayQuests.reduce((sum, uq) => sum + (uq.quest?.mana ?? 0), 0);

  return NextResponse.json({ quests, todayMana });
}
