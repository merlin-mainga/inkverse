import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { createSePayOrder, generatePaymentDescription } from "@/lib/sepay";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = (session.user as { id: string }).id;

    // 2. Parse request body
    const { tier } = await req.json();

    // 3. Validate tier
    if (!tier || !TIER_PRICES[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    const amount = TIER_PRICES[tier];

    // 4. Get user info for the order
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 5. Generate internal order ID
    const internalOrderId = randomUUID();

    // 6. Create payment description (this is what user enters when transferring)
    const paymentDescription = generatePaymentDescription(internalOrderId);

    // 7. Get webhook URL from request or use default
    const webhookUrl = `${req.nextUrl.origin}/api/payment/webhook`;

    // 8. Create order with SePay
    // Note: SePay account_number should be configured in env or retrieved from API
    const sepayAccountNumber = process.env.SEPAY_ACCOUNT_NUMBER || "";
    
    console.log("[create-order] SEPAY_ACCOUNT_NUMBER:", sepayAccountNumber ? "***" : "MISSING");
    console.log("[create-order] SEPAY_API_KEY:", process.env.SEPAY_API_KEY ? "***" : "MISSING");
    
    if (!sepayAccountNumber) {
      console.error("[create-order] SEPAY_ACCOUNT_NUMBER is empty");
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 }
      );
    }

    const sepayOrder = await createSePayOrder({
      account_number: sepayAccountNumber,
      amount: amount,
      description: paymentDescription,
      customer_name: user.name || "Unknown",
      customer_email: user.email,
      order_id: internalOrderId,
      webhook_url: webhookUrl,
    });

    // 9. Store order in database for tracking
    await prisma.paymentOrder.create({
      data: {
        id: internalOrderId,
        userId: userId,
        tier: tier,
        amount: amount,
        status: "pending",
        sepayOrderId: sepayOrder.id,
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: internalOrderId,
        sepay_order_id: sepayOrder.id,
        tier: tier,
        amount: amount,
        description: paymentDescription,
        qr_url: sepayOrder.qr_url,
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
