import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/?error=invalid", req.url));

  const user = await prisma.user.findFirst({
    where: { emailVerifyToken: token },
  });

  if (!user) return NextResponse.redirect(new URL("/?error=invalid", req.url));

  await prisma.$executeRaw`UPDATE "User" SET "emailVerified" = NOW(), "emailVerifyToken" = NULL WHERE id = ${user.id}`;

  return NextResponse.redirect(new URL("/?verified=true", req.url));
}