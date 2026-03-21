import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Thiếu email hoặc mật khẩu" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "Email đã được sử dụng" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 12);

  // Users registering before March 25 2026 23:59 ICT (UTC+7) get founder pricing
  const FOUNDER_DEADLINE = new Date("2026-03-25T16:59:00Z"); // 23:59 ICT = 16:59 UTC
  const pricingTier = new Date() < FOUNDER_DEADLINE ? "founder" : "standard";

  const user = await prisma.user.create({
    data: {
      name: name || email.split("@")[0],
      email,
      password: hashed,
      role: "user",
      pricingTier,
    },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}