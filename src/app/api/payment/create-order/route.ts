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
      const sepayAccountNumber = process.env.SEPAY_ACCOUNT_NUMBER || "";
      const qrUrl = `https://qr.sepay.vn/img?acc=${sepayAccountNumber}&bank=SEPAY&amount=${amount}&des=${encodeURIComponent(paymentDescription)}&template=compact2`;

      return NextResponse.json({
        success: true,
        order: {
          id: existingOrder.id,
          tier,
          amount,
          description: paymentDescription,
          qr_url: qrUrl,
          bank_account: sepayAccountNumber,
          status: "pending",
        },
      });
    }

    // 4. Check SePay account is configured
    const sepayAccountNumber = process.env.SEPAY_ACCOUNT_NUMBER || "";
    if (!sepayAccountNumber) {
      console.error("[create-order] SEPAY_ACCOUNT_NUMBER is not configured");
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 }
      );
    }

    // 5. Generate internal order ID and payment description
    const internalOrderId = randomUUID();
    const paymentDescription = generatePaymentDescription(internalOrderId);

    // 6. Save order to DB
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

    // 7. Generate QR code URL via SePay's public QR API (no auth required)
    // User scans this QR in their banking app to transfer
    const qrUrl = `https://qr.sepay.vn/img?acc=${sepayAccountNumber}&bank=SEPAY&amount=${amount}&des=${encodeURIComponent(paymentDescription)}&template=compact2`;

    return NextResponse.json({
      success: true,
      order: {
        id: internalOrderId,
        tier,
        amount,
        description: paymentDescription,
        qr_url: qrUrl,
        bank_account: sepayAccountNumber,
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
