import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre");
  const search = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: any = {};
  if (genre) where.genre = { has: genre };
  if (search)
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { name: { contains: search, mode: "insensitive" } } },
    ];

  const [mangas, total] = await Promise.all([
    prisma.manga.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, image: true } },
        _count: { select: { chapters: true, comments: true } },
        ratings: { select: { score: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.manga.count({ where }),
  ]);

  const result = mangas.map((m) => ({
    ...m,
    avgRating:
      m.ratings.length > 0
        ? m.ratings.reduce((a, b) => a + b.score, 0) / m.ratings.length
        : 0,
    ratingCount: m.ratings.length,
    ratings: undefined,
  }));

  return NextResponse.json({ mangas: result, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

  const { title, description, coverImage, genre, status } = await req.json();
  if (!title)
    return NextResponse.json({ error: "Thiếu tên manga" }, { status: 400 });

  const manga = await prisma.manga.create({
    data: {
      title,
      description,
      coverImage,
      genre: genre || [],
      status: status || "ongoing",
      authorId: (session.user as any).id,
    },
    include: { author: { select: { id: true, name: true } } },
  });

  return NextResponse.json(manga, { status: 201 });
}
