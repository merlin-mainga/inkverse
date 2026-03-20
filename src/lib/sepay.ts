/**
 * SePay SDK Wrapper
 * Vietnamese bank transfer payment gateway
 * 
 * Docs: https://docs.sepay.vn/
 */

const SEPAY_API_URL = "https://api.sepay.vn";
const SEPAY_API_VERSION = "v1";

export interface SePayCreateOrderParams {
  account_number: string;      // SePay account number
  amount: number;               // Amount in VND
  description: string;         // Payment description (transfer content)
  customer_name?: string;       // Customer name
  customer_email?: string;      // Customer email
  customer_phone?: string;      // Customer phone
  order_id: string;             // Your internal order ID
  webhook_url?: string;         // Webhook URL for payment notifications
}

export interface SePayOrderResponse {
  id: string;
  order_id: string;
  amount: number;
  description: string;
  status: "pending" | "paid" | "expired" | "cancelled";
  qr_url?: string;              // QR code URL for payment
  qr_content?: string;          // Raw QR content for custom QR display
  bank_account?: string;        // Bank account number
  bank_name?: string;           // Bank name
  created_at: string;
  updated_at: string;
  expired_at?: string;          // When the order expires
}

export interface SePayWebhookPayload {
  id: string;
  order_id: string;
  amount: number;
  description: string;
  status: "paid";
  transaction_id: string;
  payment_time: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  bank_account?: string;
  bank_name?: string;
  bank_code?: string;
  gateway?: string;
}

export interface SePayError {
  code: string;
  message: string;
}

/**
 * Create a payment order with SePay
 */
export async function createSePayOrder(
  params: SePayCreateOrderParams
): Promise<SePayOrderResponse> {
  const apiKey = process.env.SEPAY_API_KEY;
  
  if (!apiKey) {
    throw new Error("SEPAY_API_KEY is not configured");
  }

  const url = `${SEPAY_API_URL}/${SEPAY_API_VERSION}/orders`;
  console.log("[SePay] Creating order:", {
    url,
    account_number: params.account_number,
    amount: params.amount,
    hasApiKey: !!apiKey,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    console.log("[SePay] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[SePay] Error response:", errorText);
      const error: SePayError = JSON.parse(errorText);
      throw new Error(`SePay API Error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("[SePay] Success:", data);

    return data;
  } catch (err: any) {
    console.error("[SePay] Fetch failed:", err.message);
    throw err;
  }
}

/**
 * Get order status from SePay
 */
export async function getSePayOrder(orderId: string): Promise<SePayOrderResponse> {
  const apiKey = process.env.SEPAY_API_KEY;
  
  if (!apiKey) {
    throw new Error("SEPAY_API_KEY is not configured");
  }

  const response = await fetch(
    `${SEPAY_API_URL}/${SEPAY_API_VERSION}/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error: SePayError = await response.json();
    throw new Error(`SePay API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Verify webhook signature from SePay
 * 
 * IMPORTANT: Must verify signature before activating any subscription
 * Reference: CFO.md - "Fake webhook: Verify webhook signature — KHÔNG activate subscription nếu chưa verify"
 */
export function verifySePayWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const webhookSecret = process.env.SEPAY_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error("SEPAY_WEBHOOK_SECRET is not configured");
    return false;
  }

  // Import crypto for HMAC verification
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(payload)
    .digest("hex");

  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * Generate payment description for bank transfer
 * This is what user will enter when transferring money
 */
export function generatePaymentDescription(orderId: string): string {
  // SePay uses the description as the transfer content
  // Format: MAINGA-{order_id}
  return `MAINGA-${orderId}`;
}

/**
 * Parse payment description to extract order ID
 */
export function parsePaymentDescription(description: string): string | null {
  // Expected format: MAINGA-{order_id}
  const match = description.match(/^MAINGA-(.+)$/);
  return match ? match[1] : null;
}

/**
 * Calculate subscription tier from amount (VND)
 */
export function getTierFromAmount(amount: number): string | null {
  const tiers: Record<string, number> = {
    STARTER: 39000,   // 39,000 VND
    PRO: 99000,       // 99,000 VND
    MAX: 199000,      // 199,000 VND
  };

  // Find matching tier (allow small variance for yearly payments)
  for (const [tier, price] of Object.entries(tiers)) {
    if (Math.abs(amount - price) < 1000) {  // Allow 1000 VND variance
      return tier;
    }
  }

  return null;
}

/**
 * Get subscription duration in days from amount
 * Monthly by default, yearly if amount >= 10x monthly
 */
export function getSubscriptionDurationDays(amount: number): number {
  const monthlyPrice = 39000;
  const yearlyPrice = 39000 * 12 * 0.8;  // 20% discount for yearly

  if (amount >= yearlyPrice * 0.9) {
    return 365;  // Yearly subscription
  }
  
  return 30;  // Monthly subscription
}
