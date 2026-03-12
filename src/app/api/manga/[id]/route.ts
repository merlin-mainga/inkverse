import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const manga = await prisma.manga.findUnique({
      where: { id },
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
    });

    if (!manga) {
      return NextResponse.json(
        { error: "Không tìm thấy manga" },
        { status: 404 }
      );
    }

    const avgRating =
      manga.ratings.length > 0
        ? manga.ratings.reduce((sum, r) => sum + r.score, 0) /
          manga.ratings.length
        : 0;

    const result = {
      id: manga.id,
      title: manga.title,
      description: manga.description,
      coverImage: manga.coverImage,
      coverPositionX: manga.coverPositionX ?? 50,
      coverPositionY: manga.coverPositionY ?? 50,
      genre: manga.genre,
      status: manga.status,
      views: manga.views,
      createdAt: manga.createdAt,
      updatedAt: manga.updatedAt,
      authorId: manga.authorId,
      author: manga.author,
      _count: manga._count,
      avgRating,
      ratingCount: manga.ratings.length,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/manga/[id] error:", error);
    return NextResponse.json(
      { error: "Lỗi tải dữ liệu manga" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const { id } = await params;
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

    const existing = await prisma.manga.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy manga" },
        { status: 404 }
      );
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    if (existing.authorId !== userId && userRole !== "admin") {
      return NextResponse.json(
        { error: "Bạn không có quyền sửa manga này" },
        { status: 403 }
      );
    }

    const updated = await prisma.manga.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: String(title).trim() } : {}),
        ...(description !== undefined
          ? { description: String(description).trim() }
          : {}),
        ...(coverImage !== undefined ? { coverImage } : {}),
        ...(coverPositionX !== undefined
          ? { coverPositionX: Number(coverPositionX) }
          : {}),
        ...(coverPositionY !== undefined
          ? { coverPositionY: Number(coverPositionY) }
          : {}),
        ...(genre !== undefined ? { genre: Array.isArray(genre) ? genre : [] } : {}),
        ...(status !== undefined ? { status } : {}),
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
        ratings: {
          select: {
            score: true,
          },
        },
      },
    });

    const avgRating =
      updated.ratings.length > 0
        ? updated.ratings.reduce((sum, r) => sum + r.score, 0) /
          updated.ratings.length
        : 0;

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      coverImage: updated.coverImage,
      coverPositionX: updated.coverPositionX ?? 50,
      coverPositionY: updated.coverPositionY ?? 50,
      genre: updated.genre,
      status: updated.status,
      views: updated.views,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      authorId: updated.authorId,
      author: updated.author,
      _count: updated._count,
      avgRating,
      ratingCount: updated.ratings.length,
    });
  } catch (error) {
    console.error("PATCH /api/manga/[id] error:", error);
    return NextResponse.json(
      { error: "Cập nhật manga thất bại" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.manga.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy manga" },
        { status: 404 }
      );
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    if (existing.authorId !== userId && userRole !== "admin") {
      return NextResponse.json(
        { error: "Bạn không có quyền xóa manga này" },
        { status: 403 }
      );
    }

    await prisma.manga.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/manga/[id] error:", error);
    return NextResponse.json(
      { error: "Xóa manga thất bại" },
      { status: 500 }
    );
  }
}