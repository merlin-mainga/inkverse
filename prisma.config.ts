import path from "path";
import { defineConfig } from "prisma/config";

// Use DIRECT_URL for migrations to bypass connection pooler
// Pooler has max clients limit that causes migration failures
const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: databaseUrl,
  },
});