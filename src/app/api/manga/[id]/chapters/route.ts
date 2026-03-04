import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadMangaPages } from "@/lib/cloudinary";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );

  const manga = await prisma.manga.findUnique({
    where: { id: params.id },
  });
  if (!manga || manga.authorId !== (session.user as any).id)
    return NextResponse.json(
      { error: "Không có quyền" },
      { status: 403 }
    );

  const { title, chapterNum, pages } = await req.json();

  let pageUrls: string[] = pages;
  if (pages[0]?.startsWith("data:")) {
    pageUrls = await uploadMangaPages(pages, params.id, chapterNum);
  }

  const chapter = await prisma.chapter.create({
    data: {
      title,
      chapterNum,
      pages: pageUrls,
      mangaId: params.id,
    },
  });

  return NextResponse.json(chapter, { status: 201 });
}

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const chapters = await prisma.chapter.findMany({
    where: { mangaId: params.id },
    orderBy: { chapterNum: "asc" },
    select: {
      id: true,
      title: true,
      chapterNum: true,
      views: true,
      createdAt: true,
    },
  });

  return NextResponse.json(chapters);
}
