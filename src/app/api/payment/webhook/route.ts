import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { 
  verifySePayWebhookSignature, 
  parsePaymentDescription 
} from "@/lib/sepay";

const prisma = new PrismaClient();

// Mana amounts for each tier
const MANA_BY_TIER: Record<string, number> = {
  STARTER: 500,
  PRO: 1500,
  MAX: 3500,
};

/**
 * SePay Webhook Handler
 * 
 * IMPORTANT SECURITY NOTES (from CFO.md):
 * - Webhook must be idempotent — handle duplicate payment (using DB)
 * - Verify webhook signature — DO NOT activate subscription if not verified
 * - Bank transfers in Vietnam have no chargeback — safer than card payments
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Read raw body for signature verification
    const rawBody = await req.text();

    // 2. Get signature from headers
    const signature = req.headers.get("x-sepay-signature") || 
                      req.headers.get("x-signature") ||
                      "";

    if (!signature) {
      console.error("SePay webhook: Missing signature header");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // 3. Verify webhook signature
    // CRITICAL: Do not process payment without verified signature
    if (!verifySePayWebhookSignature(rawBody, signature)) {
      console.error("SePay webhook: Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // 4. Parse webhook payload
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 5. Validate payload structure
    if (!payload.order_id || !payload.amount || !payload.transaction_id) {
      console.error("SePay webhook: Invalid payload structure", payload);
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    // 6. Parse order ID from payment description
    const internalOrderId = parsePaymentDescription(payload.description);
    
    if (!internalOrderId) {
      console.error("SePay webhook: Invalid payment description format", payload.description);
      return NextResponse.json(
        { error: "Invalid payment description" },
        { status: 400 }
      );
    }

    // 7. Check for duplicate transaction using DB (idempotency)
    // CRITICAL: Prevent processing the same transaction twice
    const existingTransaction = await prisma.paymentTransaction.findUnique({
      where: { transactionId: payload.transaction_id },
    });
    
    if (existingTransaction) {
      console.log(`SePay webhook: Duplicate transaction ${payload.transaction_id} ignored`);
      return NextResponse.json({ 
        success: true, 
        message: "Transaction already processed" 
      });
    }

    // 8. Find the order in database
    const order = await prisma.paymentOrder.findUnique({
      where: { id: internalOrderId },
    });

    if (!order) {
      console.error("SePay webhook: Order not found", internalOrderId);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 9. Verify order is still pending
    if (order.status !== "pending") {
      console.log(`SePay webhook: Order ${order.id} already ${order.status}`);
      return NextResponse.json({ 
        success: true, 
        message: "Order already processed" 
      });
    }

    // 10. Verify amount matches
    if (order.amount !== payload.amount) {
      console.error("SePay webhook: Amount mismatch", { 
        expected: order.amount, 
        received: payload.amount 
      });
      return NextResponse.json(
        { error: "Amount mismatch" },
        { status: 400 }
      );
    }

    // 11. Calculate subscription expiry (1 month)
    const subscriptionExpiry = new Date();
    subscriptionExpiry.setMonth(subscriptionExpiry.getMonth() + 1);

    // 12. Get mana amount for tier
    const manaAmount = MANA_BY_TIER[order.tier] || 500;

    // 13. Execute atomic transaction to:
    // - Update user's subscription tier and mana
    // - Mark order as completed
    // - Record the transaction
    await prisma.$transaction([
      // Update user subscription
      prisma.user.update({
        where: { id: order.userId },
        data: {
          subscriptionTier: order.tier,
          subscriptionExpiry: subscriptionExpiry,
          mana: manaAmount,
        },
      }),
      // Mark order as completed
      prisma.paymentOrder.update({
        where: { id: order.id },
        data: { status: "completed" },
      }),
      // Record transaction for idempotency
      prisma.paymentTransaction.create({
        data: { transactionId: payload.transaction_id },
      }),
    ]);

    console.log("SePay webhook: Payment processed successfully", {
      transaction_id: payload.transaction_id,
      order_id: order.id,
      user_id: order.userId,
      tier: order.tier,
      amount: order.amount,
      expires: subscriptionExpiry.toISOString(),
    });

    // 14. Return success
    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
    });

  } catch (error: any) {
    console.error("SePay webhook error:", error);
    
    return NextResponse.json(
      { error: error?.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification)
export async function GET(req: NextRequest) {
  // SePay might send a GET request to verify the webhook endpoint
  const secret = req.nextUrl.searchParams.get("secret");
  
  if (secret === process.env.SEPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ 
      success: true, 
      message: "Webhook endpoint is active" 
    });
  }
  
  return NextResponse.json(
    { error: "Invalid verification" },
    { status: 401 }
  );
}
