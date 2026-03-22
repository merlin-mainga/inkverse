import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const QUESTS = [
  // Onboarding (1 lần)
  { type: "onboarding", key: "first_read",       title: "Đọc manga đầu tiên",         description: "Đọc ít nhất 1 chapter bất kỳ",               mana: 5,  resetPeriod: null, bonusUrl: null },
  { type: "onboarding", key: "first_follow",     title: "Follow tác giả đầu tiên",    description: "Follow 1 bộ manga bất kỳ",                   mana: 5,  resetPeriod: null, bonusUrl: null },
  { type: "onboarding", key: "become_author",    title: "Đăng ký làm tác giả",        description: "Kích hoạt tài khoản tác giả MAINGA",          mana: 20, resetPeriod: null, bonusUrl: null },
  { type: "onboarding", key: "first_character",  title: "Tạo nhân vật Mainga Lab",    description: "Tạo character profile đầu tiên trong Mainga Lab", mana: 50, resetPeriod: null, bonusUrl: null },

  // Daily (reset mỗi ngày)
  { type: "daily", key: "daily_login",   title: "Đăng nhập hôm nay",              description: "Mở dashboard mỗi ngày để nhận Mana",         mana: 2, resetPeriod: "daily", bonusUrl: null },
  { type: "daily", key: "daily_engage",  title: "Rate hoặc Comment 1 chapter",    description: "Tương tác với nội dung trong ngày",          mana: 3, resetPeriod: "daily", bonusUrl: null },

  // Weekly (reset mỗi tuần)
  { type: "weekly", key: "weekly_chapter", title: "Đăng 1 chapter mới (≥10 ảnh)", description: "Upload chapter có ít nhất 10 trang trong tuần này", mana: 15, resetPeriod: "weekly", bonusUrl: null },

  // Milestone (1 lần)
  { type: "milestone", key: "first_manga",    title: "Đăng manga đầu tiên",     description: "Tạo và đăng bộ manga đầu tiên của bạn",     mana: 20, resetPeriod: null, bonusUrl: null },
  { type: "milestone", key: "first_ai_image", title: "Tạo ảnh AI đầu tiên",     description: "Generate ảnh manga bằng AI",                mana: 10, resetPeriod: null, bonusUrl: null },

  // Bonus (Admin bật/tắt)
  { type: "bonus", key: "follow_tiktok",   title: "Theo dõi TikTok MAINGA",                description: "Follow trang TikTok chính thức của MAINGA",                   mana: 30, resetPeriod: null, bonusUrl: "https://tiktok.com/@mainga.app", isActive: false },
  { type: "bonus", key: "sub_youtube",     title: "Sub kênh YouTube MAINGA",               description: "Subscribe kênh YouTube chính thức của MAINGA",                 mana: 30, resetPeriod: null, bonusUrl: "https://youtube.com/@mainga", isActive: false },
  { type: "bonus", key: "engage_tiktok",   title: "Thích + Bình luận video TikTok",        description: "Like và comment video mới nhất trên TikTok MAINGA",            mana: 20, resetPeriod: null, bonusUrl: "https://tiktok.com/@mainga.app", isActive: false },
  { type: "bonus", key: "engage_youtube",  title: "Thích + Bình luận video YouTube",       description: "Like và comment video mới nhất trên YouTube MAINGA",           mana: 20, resetPeriod: null, bonusUrl: "https://youtube.com/@mainga", isActive: false },
];

async function seed() {
  console.log("Seeding quests...");
  for (const q of QUESTS) {
    await prisma.quest.upsert({
      where: { key: q.key },
      update: {
        title: q.title,
        description: q.description,
        mana: q.mana,
        resetPeriod: q.resetPeriod,
        bonusUrl: q.bonusUrl ?? null,
      },
      create: {
        type: q.type,
        key: q.key,
        title: q.title,
        description: q.description,
        mana: q.mana,
        resetPeriod: q.resetPeriod,
        bonusUrl: q.bonusUrl ?? null,
        isActive: (q as any).isActive ?? true,
      },
    });
    console.log(`  ✓ ${q.key}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
