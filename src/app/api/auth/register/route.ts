import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password || !name)
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });

    if (password.length < 6)
      return NextResponse.json({ error: "Mật khẩu phải có ít nhất 6 ký tự" }, { status: 400 });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists)
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 12);

    // Lưu role trực tiếp khi tạo user — không dùng raw SQL nữa
    const validRole = role === "author" ? "author" : "user";
    await prisma.user.create({
      data: { name, email, password: hashed, role: validRole },
    });

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
  } catch (e: any) {
    console.error("Register error:", e);
    return NextResponse.json({ error: e.message || "Lỗi server" }, { status: 500 });
  }
}