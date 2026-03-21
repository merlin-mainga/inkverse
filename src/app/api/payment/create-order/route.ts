import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generatePaymentDescription } from "@/lib/sepay";
import { randomUUID } from "crypto";

// Valid subscription tiers and their prices in VND
const TIER_PRICES: Record<string, number> = {
  STARTER: 39000,
  PRO: 99000,
  MAX: 199000,
};

export async function POST(req: NextRequest) {
  try {
    // 1. Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    // 2. Parse and validate request
    const { tier } = await req.json();
    if (!tier || !TIER_PRICES[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    const amount = TIER_PRICES[tier];

    // 3. Check for existing pending order (unique constraint: userId + tier + status)
    const existingOrder = await prisma.paymentOrder.findFirst({
      where: { userId, tier, status: "pending" },
    });

    if (existingOrder) {
      const paymentDescription = generatePaymentDescription(existingOrder.id);
      const qrUrl = `https://qr.sepay.vn/img?acc=96247MAINGA&bank=BIDV&amount=${amount}&des=${encodeURIComponent(paymentDescription)}`;

      return NextResponse.json({
        success: true,
        order: {
          id: existingOrder.id,
          tier,
          amount,
          description: paymentDescription,
          qr_url: qrUrl,
          status: "pending",
        },
      });
    }

    // 4. Generate internal order ID and payment description
    const internalOrderId = randomUUID();
    const paymentDescription = generatePaymentDescription(internalOrderId);

    // 5. Save order to DB
    await prisma.paymentOrder.create({
      data: {
        id: internalOrderId,
        userId,
        tier,
        amount,
        status: "pending",
        sepayOrderId: null,
      },
    });

    // 6. Generate QR code URL via SePay's public QR API (no auth required)
    const qrUrl = `https://qr.sepay.vn/img?acc=96247MAINGA&bank=BIDV&amount=${amount}&des=${encodeURIComponent(paymentDescription)}`;

    return NextResponse.json({
      success: true,
      order: {
        id: internalOrderId,
        tier,
        amount,
        description: paymentDescription,
        qr_url: qrUrl,
        status: "pending",
      },
    });
  } catch (error: any) {
    console.error("Create payment order error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
