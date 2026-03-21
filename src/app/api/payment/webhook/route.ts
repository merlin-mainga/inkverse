import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parsePaymentDescription } from "@/lib/sepay";

export const dynamic = "force-dynamic";

// Mana amounts for each tier
const MANA_BY_TIER: Record<string, number> = {
  STARTER: 500,
  PRO: 1500,
  MAX: 3500,
};

/**
 * SePay Webhook Handler
 *
 * SePay IPN payload format (actual):
 * {
 *   id: number,                  // transaction ID
 *   gateway: string,             // e.g. "BIDV"
 *   transactionDate: string,     // "2023-01-01 00:00:00"
 *   accountNumber: string,       // e.g. "96247MAINGA"
 *   code: string | null,         // transfer content matched by SePay
 *   content: string,             // raw transfer content from bank
 *   transferType: "in" | "out",
 *   transferAmount: number,      // amount in VND
 *   accumulated: number,
 *   referenceCode: string,
 *   description: string,
 *   subAccount: string | null,
 * }
 */
export async function POST(req: NextRequest) {
  // Log IMMEDIATELY — before any async ops that could throw
  console.log("[webhook] POST received at", new Date().toISOString());
  console.log("[webhook] Headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));

  let rawBody = "";
  try {
    rawBody = await req.text();
    console.log("[webhook] Body:", rawBody);

    // Parse payload
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.error("[webhook] Invalid JSON:", rawBody);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Only process incoming transfers
    if (payload.transferType !== "in") {
      console.log("[webhook] Skipping transferType:", payload.transferType);
      return NextResponse.json({ success: true, message: "Skipped" });
    }

    const transactionId = String(payload.id);
    const transferAmount = payload.transferAmount;
    // SePay puts matched content in `code`, fallback to `content`
    const transferContent = payload.code || payload.content || "";

    console.log("[webhook] Parsed:", { transactionId, transferAmount, transferContent });

    if (!transactionId || !transferAmount || !transferContent) {
      console.error("SePay webhook: Missing required fields", payload);
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Parse internal order ID from transfer content
    const internalOrderId = parsePaymentDescription(transferContent);

    if (!internalOrderId) {
      console.error("SePay webhook: Could not parse order ID from content:", transferContent);
      // Return 200 so SePay doesn't retry — this is just an unrelated transfer
      return NextResponse.json({ success: true, message: "Not a MAINGA payment" });
    }

    // Idempotency: skip if already processed
    const existingTransaction = await prisma.paymentTransaction.findUnique({
      where: { transactionId },
    });

    if (existingTransaction) {
      console.log("SePay webhook: Duplicate transaction", transactionId);
      return NextResponse.json({ success: true, message: "Already processed" });
    }

    // Find the order
    const order = await prisma.paymentOrder.findUnique({
      where: { id: internalOrderId },
    });

    if (!order) {
      console.error("SePay webhook: Order not found:", internalOrderId);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      console.log("SePay webhook: Order already", order.status);
      return NextResponse.json({ success: true, message: "Order already processed" });
    }

    // Verify amount matches
    if (order.amount !== transferAmount) {
      console.error("SePay webhook: Amount mismatch", { expected: order.amount, received: transferAmount });
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    // Calculate subscription expiry (1 month)
    const subscriptionExpiry = new Date();
    subscriptionExpiry.setMonth(subscriptionExpiry.getMonth() + 1);

    const manaAmount = MANA_BY_TIER[order.tier] || 500;

    // Atomic transaction: update user + mark order completed + record tx
    await prisma.$transaction([
      prisma.user.update({
        where: { id: order.userId },
        data: {
          subscriptionTier: order.tier,
          subscriptionExpiry,
          mana: { increment: manaAmount },
        },
      }),
      prisma.paymentOrder.update({
        where: { id: order.id },
        data: { status: "completed" },
      }),
      prisma.paymentTransaction.create({
        data: { transactionId },
      }),
    ]);

    console.log("SePay webhook: Payment processed successfully", {
      transactionId,
      orderId: order.id,
      userId: order.userId,
      tier: order.tier,
      amount: order.amount,
    });

    return NextResponse.json({ success: true, message: "Payment processed" });

  } catch (error: any) {
    console.error("[webhook] Unhandled error:", error?.message, "body:", rawBody);
    // Return 200 so SePay doesn't retry endlessly on our internal errors
    return NextResponse.json({ success: false, error: error?.message || "Internal error" });
  }
}

// SePay may GET the endpoint to verify it's reachable
export async function GET() {
  return NextResponse.json({ success: true, message: "SePay webhook endpoint active" });
}
