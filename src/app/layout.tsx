import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://mainga.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MAINGA - Nền Tảng Đọc Manga AI Hàng Đầu",
    template: "%s | MAINGA",
  },
  description: "MAINGA là nền tảng đọc và sáng tác manga kết hợp AI. Khám phá hàng nghìn bộ manga độc đáo, đọc miễn phí và chia sẻ câu chuyện của bạn.",
  keywords: ["manga", "đọc manga", "manga việt", "AI manga", "mainga", "truyện tranh", "manga online"],
  authors: [{ name: "MAINGA", url: BASE_URL }],
  creator: "MAINGA",
  publisher: "MAINGA",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: "MAINGA",
    title: "MAINGA - Nền Tảng Đọc Manga AI Hàng Đầu",
    description: "Khám phá, đọc và sáng tác manga kết hợp AI. Nơi chính bạn là 'main' trong câu chuyện của mình.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "MAINGA Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MAINGA - Nền Tảng Đọc Manga AI",
    description: "Khám phá, đọc và sáng tác manga AI.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}