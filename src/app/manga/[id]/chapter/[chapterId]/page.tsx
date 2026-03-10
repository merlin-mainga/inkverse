import type { Metadata } from "next";
import ChapterReaderClient from "./client";

const BASE_URL = "https://mainga.vercel.app";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string; chapterId: string }> }
): Promise<Metadata> {
  const { id, chapterId } = await params;

  try {
    const [mangaRes, chapterRes] = await Promise.all([
      fetch(`${BASE_URL}/api/manga/${id}`, { cache: "no-store" }),
      fetch(`${BASE_URL}/api/chapters/${chapterId}`, { cache: "no-store" }),
    ]);

    if (!mangaRes.ok || !chapterRes.ok) throw new Error();

    const manga   = await mangaRes.json();
    const chapter = await chapterRes.json();

    const title       = `${manga.title} - Chapter ${chapter.chapterNum}`;
    const description = `Đọc ${manga.title} Chapter ${chapter.chapterNum}: ${chapter.title || ""} trên MAINGA.`;
    const image       = manga.coverImage || "/logo.png";

    return {
      title,
      description,
      openGraph: {
        type: "article",
        url: `${BASE_URL}/manga/${id}/chapter/${chapterId}`,
        title: `${title} | MAINGA`,
        description,
        images: [{ url: image, width: 800, height: 600, alt: title }],
        siteName: "MAINGA",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | MAINGA`,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Đọc Manga | MAINGA",
      description: "Đọc manga trên MAINGA.",
    };
  }
}

export default function ChapterPage() {
  return <ChapterReaderClient />;
}