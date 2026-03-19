import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Cost per generation
const GENERATION_COST = 1; // 1 Mana per image

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!session || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const amount = typeof body?.amount === "number" ? body.amount : GENERATION_COST;

    // Get user
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

    // Check mana reset - reset monthly
    const now = new Date();
    const lastReset = new Date(user.manaResetDate);
    const shouldReset =
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear();

    let currentMana = user.mana;

    if (shouldReset) {
      // Reset mana based on tier
      const manaByTier: Record<string, number> = {
        FREE: 10,
        STARTER: 100,
        PRO: 300,
        MAX: 800,
      };

      const tierMana = manaByTier[user.subscriptionTier] || 10;

      await prisma.user.update({
        where: { id: userId },
        data: {
          mana: tierMana,
          manaResetDate: now,
        },
      });

      currentMana = tierMana;
    }

    // Check if user has enough mana
    if (currentMana < amount) {
      return NextResponse.json(
        {
          error: "Không đủ Mana",
          code: "INSUFFICIENT_MANA",
          currentMana,
          required: amount,
          tier: user.subscriptionTier,
        },
        { status: 403 }
      );
    }

    // Deduct mana
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        mana: {
          decrement: amount,
        },
      },
      select: {
        mana: true,
        subscriptionTier: true,
      },
    });

    return NextResponse.json({
      ok: true,
      deducted: amount,
      remainingMana: updatedUser.mana,
      tier: updatedUser.subscriptionTier,
    });
  } catch (error: any) {
    console.error("POST /api/mana/deduct error:", error?.message || error);
    return NextResponse.json(
      { error: "Không thể trừ Mana" },
      { status: 500 }
    );
  }
}
