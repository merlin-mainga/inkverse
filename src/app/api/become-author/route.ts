import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { completeQuest } from "@/lib/questHelper";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { penName, bio } = body || {};

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "Không tìm thấy tài khoản" }, { status: 404 });
  }

  if (user.role === "author" || user.role === "admin") {
    return NextResponse.json({ success: true, role: user.role });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      role: "author",
      name: penName || user.name,
      bio: bio || user.bio,
    },
  });

  completeQuest(user.id, "become_author").catch(() => {});
  return NextResponse.json({ success: true, role: "author" });
}