import { prisma } from "@/lib/prisma";

/** Get period key based on resetPeriod field */
export function getPeriodKey(resetPeriod: string | null): string {
  if (!resetPeriod) return "";
  const now = new Date();
  if (resetPeriod === "daily") {
    return now.toISOString().slice(0, 10); // "2024-03-22"
  }
  if (resetPeriod === "weekly") {
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${weekNo}`;
  }
  return "";
}

/**
 * Complete a quest for a user. Returns mana earned (0 if already done).
 * Safe to call fire-and-forget: completeQuest(userId, key).catch(() => {})
 */
export async function completeQuest(userId: string, questKey: string): Promise<number> {
  try {
    const quest = await prisma.quest.findUnique({ where: { key: questKey } });
    if (!quest || !quest.isActive) return 0;

    const periodKey = getPeriodKey(quest.resetPeriod);

    // Check if already completed for this period
    const existing = await prisma.userQuest.findUnique({
      where: { userId_questId_periodKey: { userId, questId: quest.id, periodKey } },
    });
    if (existing?.completedAt) return 0;

    // Create completion + add mana atomically
    await prisma.$transaction([
      prisma.userQuest.upsert({
        where: { userId_questId_periodKey: { userId, questId: quest.id, periodKey } },
        create: { userId, questId: quest.id, periodKey, completedAt: new Date(), startedAt: new Date() },
        update: { completedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { mana: { increment: quest.mana } },
      }),
    ]);

    return quest.mana;
  } catch {
    return 0;
  }
}
