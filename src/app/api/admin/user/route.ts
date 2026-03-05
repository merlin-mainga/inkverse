import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true, name: true, email: true,
      role: true, createdAt: true,
      _count: { select: { mangas: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ users, total: users.length });
}