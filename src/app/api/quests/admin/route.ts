import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { questKey, isActive, bonusUrl } = await req.json().catch(() => ({}));
  if (!questKey) {
    return NextResponse.json({ error: "Thiếu questKey" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (typeof isActive === "boolean") data.isActive = isActive;
  if (typeof bonusUrl === "string") data.bonusUrl = bonusUrl;

  const quest = await prisma.quest.update({
    where: { key: questKey },
    data,
  });

  return NextResponse.json({ ok: true, quest });
}
