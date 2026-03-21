-- Add pricingTier field to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "pricingTier" TEXT NOT NULL DEFAULT 'standard';

-- Backfill: users who registered before March 25, 2026 00:00 UTC+7 (= March 24 17:00 UTC) get founder pricing
UPDATE "User" SET "pricingTier" = 'founder' WHERE "createdAt" < '2026-03-24 17:00:00 UTC';
