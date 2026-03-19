import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Vercel cron job to keep Supabase connection warm
// Runs every 5 minutes to prevent cold start issues
export async function GET() {
  try {
    // Simple query to keep connection alive
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { status: "ok", timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cron ping failed:", error);
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 500 }
    );
  }
}
