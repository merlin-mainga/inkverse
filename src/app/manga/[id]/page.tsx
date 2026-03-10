import type { Metadata } from "next";
import MangaDetailClient from "./client";

const BASE_URL = "https://mainga.vercel.app";

// ── generateMetadata — chạy server side ──
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${BASE_URL}/api/manga/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error();
    const manga = await res.json();

    const title = manga.title ?? "Manga";
    const description = manga.description
      ? manga.description.slice(0, 160)
      : `Đọc manga ${title} trên MAINGA — nền tảng manga AI hàng đầu Việt Nam.`;
    const image = manga.coverImage || "/logo.png";
    const author = manga.author?.name ?? "MAINGA";
    const genres = manga.genre?.join(", ") ?? "";

    return {
      title,
      description,
      keywords: [title, author, "manga", "đọc manga online", genres].filter(Boolean),
      openGraph: {
        type: "article",
        url: `${BASE_URL}/manga/${id}`,
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
      title: "Manga | MAINGA",
      description: "Đọc manga trên MAINGA.",
    };
  }
}

// ── Page component — chỉ render client component ──
export default function MangaDetailPage() {
  return <MangaDetailClient />;
}