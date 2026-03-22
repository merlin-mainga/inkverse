import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { completeQuest } from "@/lib/questHelper";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!session || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { questKey } = await req.json().catch(() => ({}));
  if (!questKey) {
    return NextResponse.json({ error: "Thiếu questKey" }, { status: 400 });
  }

  const manaEarned = await completeQuest(userId, questKey);
  return NextResponse.json({ ok: true, manaEarned });
}
