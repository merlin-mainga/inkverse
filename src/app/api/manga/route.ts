import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function fetchMangasWithRetry(
  where: any,
  page: number,
  limit: number,
  retries = 3,
  delayMs = 800
) {
  let lastError: Error | null = null;

  for (let i = 0; i <= retries; i++) {
    try {
      const [mangas, total] = await Promise.all([
        prisma.manga.findMany({
          where,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            _count: {
              select: {
                chapters: true,
                comments: true,
                follows: true,
                ratings: true,
              },
            },
            ratings: {
              select: {
                score: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.manga.count({ where }),
      ]);
      return { mangas, total };
    } catch (error) {
      lastError = error as Error;
      console.error(`GET /api/manga attempt ${i + 1}/${retries + 1} failed:`, error);
      if (i < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayMs * Math.pow(2, i))
        );
      }
    }
  }

  throw lastError;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.trim() || "";
    const genre = searchParams.get("genre")?.trim() || "";
    const mine = searchParams.get("mine") === "true";
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "12");

    const where: any = {};

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (genre && genre !== "Tất cả") {
      where.genre = {
        has: genre,
      };
    }

    if (mine) {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json({ mangas: [], total: 0 });
      }

      where.authorId = (session.user as any).id;
    }

    const { mangas, total } = await fetchMangasWithRetry(where, page, limit);

    const result = mangas.map((m) => {
      const avgRating =
        m.ratings.length > 0
          ? m.ratings.reduce((sum, r) => sum + r.score, 0) / m.ratings.length
          : 0;

      return {
        id: m.id,
        title: m.title,
        description: m.description,
        coverImage: m.coverImage,
        coverPositionX: m.coverPositionX ?? 50,
        coverPositionY: m.coverPositionY ?? 50,
        genre: m.genre,
        status: m.status,
        views: m.views,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        authorId: m.authorId,
        author: m.author,
        _count: m._count,
        avgRating,
        ratingCount: m.ratings.length,
      };
    });

    return NextResponse.json({
      mangas: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET /api/manga failed after retries:", error);
    return NextResponse.json(
      { error: "Database temporarily unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    if (userRole !== "author" && userRole !== "admin") {
      return NextResponse.json(
        { error: "Bạn không có quyền đăng manga" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      title,
      description,
      coverImage,
      coverPositionX,
      coverPositionY,
      genre,
      status,
    } = body;

    if (!title || !String(title).trim()) {
      return NextResponse.json(
        { error: "Tên manga là bắt buộc" },
        { status: 400 }
      );
    }

    const created = await prisma.manga.create({
      data: {
        title: String(title).trim(),
        description: description ? String(description).trim() : "",
        coverImage: coverImage || null,
        coverPositionX:
          coverPositionX !== undefined ? Number(coverPositionX) : 50,
        coverPositionY:
          coverPositionY !== undefined ? Number(coverPositionY) : 50,
        genre: Array.isArray(genre) ? genre : [],
        status: status || "ongoing",
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            chapters: true,
            comments: true,
            follows: true,
            ratings: true,
          },
        },
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/manga error:", error);
    return NextResponse.json(
      { error: "Tạo manga thất bại" },
      { status: 500 }
    );
  }
}