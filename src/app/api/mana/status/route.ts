import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Mana allocation by tier
const MANA_BY_TIER: Record<string, number> = {
  FREE: 50,
  STARTER: 500,
  PRO: 1500,
  MAX: 3500,
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!session || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        mana: true,
        manaResetDate: true,
        subscriptionTier: true,
        subscriptionExpiry: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if should reset mana
    const now = new Date();
    const lastReset = new Date(user.manaResetDate);
    const shouldReset =
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear();

    let currentMana = user.mana;
    let justReset = false;

    if (shouldReset) {
      const tierMana = MANA_BY_TIER[user.subscriptionTier] || 10;

      await prisma.user.update({
        where: { id: userId },
        data: {
          mana: tierMana,
          manaResetDate: now,
        },
      });

      currentMana = tierMana;
      justReset = true;
    }

    const hasMaingaLab =
      user.subscriptionTier === "PRO" || user.subscriptionTier === "MAX";

    const isExpired =
      user.subscriptionExpiry && user.subscriptionExpiry < now;

    return NextResponse.json({
      ok: true,
      mana: currentMana,
      tier: user.subscriptionTier,
      tierMana: MANA_BY_TIER[user.subscriptionTier] || 10,
      hasMaingaLab,
      subscriptionExpiry: user.subscriptionExpiry,
      isExpired,
      resetDate: user.manaResetDate,
      justReset,
    });
  } catch (error: any) {
    console.error("GET /api/mana/status error:", error?.message || error);
    return NextResponse.json(
      { error: "Không thể lấy trạng thái Mana" },
      { status: 500 }
    );
  }
}
