import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password || !name)
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists)
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 12);
    
    // Tạo user trước không có role
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    // Nếu là author thì update role sau
    if (role === "author") {
      await prisma.$executeRaw`UPDATE "User" SET role = 'author' WHERE id = ${user.id}`;
    }

    return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 });
  } catch (e: any) {
    console.error("Register error:", e);
    return NextResponse.json({ error: e.message || "Lỗi server" }, { status: 500 });
  }
}