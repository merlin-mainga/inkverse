import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return { id: user.id, name: user.name, email: user.email, role: (user as any).role } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Lần đầu login qua Credentials
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      // Lần đầu login qua Google — tạo user nếu chưa có
      if (account?.provider === "google") {
        let dbUser = await prisma.user.findUnique({ where: { email: token.email! } });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: token.email!,
              name: token.name || "Google User",
              image: token.picture as string || null,
              role: "user",
            },
          });
        }
        token.id = dbUser.id;
      }

      // LUÔN đọc role mới nhất từ DB mỗi lần refresh token
      // Fix bug: user đăng ký thành tác giả nhưng token cũ vẫn giữ role "user"
      if (token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
        if (dbUser) {
          token.role = (dbUser as any).role || "user";
          token.id = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};