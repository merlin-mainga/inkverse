import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Retry helper for DB connection issues (cold start, connection pool)
// Increased retries for Vercel serverless cold start issues
async function fetchStatsWithRetry(retries = 3, delayMs = 800): Promise<{
  mangaCount: number;
  userCount: number;
  totalViews: number;
}> {
  let lastError: Error | null = null;

  for (let i = 0; i <= retries; i++) {
    try {
      const [mangaCount, userCount, viewsResult] = await Promise.all([
        prisma.manga.count(),
        prisma.user.count(),
        prisma.manga.aggregate({
          _sum: { views: true },
        }),
      ]);

      return {
        mangaCount,
        userCount,
        totalViews: viewsResult._sum.views ?? 0,
      };
    } catch (error) {
      lastError = error as Error;
      console.error(`GET /api/stats attempt ${i + 1}/${retries + 1} failed:`, error);

      if (i < retries) {
        // Wait before retry (exponential backoff for cold start)
        await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, i)));
      }
    }
  }

  // All retries failed
  throw lastError;
}

export async function GET() {
  try {
    const stats = await fetchStatsWithRetry();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET /api/stats failed after retries:", error);

    // Return 503 Service Unavailable so client knows to retry
    return NextResponse.json(
      { error: "Database temporarily unavailable", mangaCount: -1, userCount: -1, totalViews: -1 },
      { status: 503 }
    );
  }
}