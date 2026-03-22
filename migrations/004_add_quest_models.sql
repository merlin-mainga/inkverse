-- Quest system tables

CREATE TABLE IF NOT EXISTS "Quest" (
  "id"          TEXT        NOT NULL DEFAULT gen_random_uuid()::TEXT,
  "type"        TEXT        NOT NULL,
  "key"         TEXT        NOT NULL,
  "title"       TEXT        NOT NULL,
  "description" TEXT        NOT NULL,
  "mana"        INTEGER     NOT NULL,
  "isActive"    BOOLEAN     NOT NULL DEFAULT true,
  "resetPeriod" TEXT,
  "bonusUrl"    TEXT,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Quest_key_key" ON "Quest"("key");

CREATE TABLE IF NOT EXISTS "UserQuest" (
  "id"          TEXT         NOT NULL DEFAULT gen_random_uuid()::TEXT,
  "userId"      TEXT         NOT NULL,
  "questId"     TEXT         NOT NULL,
  "completedAt" TIMESTAMP(3),
  "startedAt"   TIMESTAMP(3),
  "periodKey"   TEXT         NOT NULL DEFAULT '',
  CONSTRAINT "UserQuest_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "UserQuest_userId_questId_periodKey_key" UNIQUE ("userId", "questId", "periodKey"),
  CONSTRAINT "UserQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "UserQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Seed quest data
INSERT INTO "Quest" ("type","key","title","description","mana","resetPeriod","bonusUrl","isActive") VALUES
  ('onboarding','first_read',      'Đọc manga đầu tiên',              'Đọc ít nhất 1 chapter bất kỳ',                             5,  null, null, true),
  ('onboarding','first_follow',    'Follow tác giả đầu tiên',         'Follow 1 bộ manga bất kỳ',                                 5,  null, null, true),
  ('onboarding','become_author',   'Đăng ký làm tác giả',             'Kích hoạt tài khoản tác giả MAINGA',                       20, null, null, true),
  ('onboarding','first_character', 'Tạo nhân vật Mainga Lab',         'Tạo character profile đầu tiên trong Mainga Lab',          50, null, null, true),
  ('daily',     'daily_login',     'Đăng nhập hôm nay',               'Mở dashboard mỗi ngày để nhận Mana',                       2,  'daily',  null, true),
  ('daily',     'daily_engage',    'Rate hoặc Comment 1 chapter',     'Tương tác với nội dung trong ngày',                        3,  'daily',  null, true),
  ('weekly',    'weekly_chapter',  'Đăng 1 chapter mới (≥10 ảnh)',    'Upload chapter có ít nhất 10 trang trong tuần này',        15, 'weekly', null, true),
  ('milestone', 'first_manga',     'Đăng manga đầu tiên',             'Tạo và đăng bộ manga đầu tiên của bạn',                   20, null, null, true),
  ('milestone', 'first_ai_image',  'Tạo ảnh AI đầu tiên',             'Generate ảnh manga bằng AI',                              10, null, null, true),
  ('bonus',     'follow_tiktok',   'Theo dõi TikTok MAINGA',          'Follow trang TikTok chính thức của MAINGA',                30, null, 'https://tiktok.com/@mainga.app', false),
  ('bonus',     'sub_youtube',     'Sub kênh YouTube MAINGA',         'Subscribe kênh YouTube chính thức của MAINGA',             30, null, 'https://youtube.com/@mainga',    false),
  ('bonus',     'engage_tiktok',   'Thích + Bình luận video TikTok',  'Like và comment video mới nhất trên TikTok MAINGA',        20, null, 'https://tiktok.com/@mainga.app', false),
  ('bonus',     'engage_youtube',  'Thích + Bình luận video YouTube', 'Like và comment video mới nhất trên YouTube MAINGA',       20, null, 'https://youtube.com/@mainga',    false)
ON CONFLICT ("key") DO NOTHING;
