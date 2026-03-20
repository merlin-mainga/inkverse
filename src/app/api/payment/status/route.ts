import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const orderId = req.nextUrl.searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // Find the order
    const order = await prisma.paymentOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Verify order belongs to this user
    if (order.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      tier: order.tier,
      amount: order.amount,
    });

  } catch (error: any) {
    console.error("Payment status error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to get payment status" },
      { status: 500 }
    );
  }
}
