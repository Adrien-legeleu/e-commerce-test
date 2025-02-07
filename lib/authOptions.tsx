import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "john@example.com",
    //     },
    //     password: { label: "Mot de passe", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error("Email et mot de passe requis");
    //     }
    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials.email },
    //     });
    //     if (!user || !user.password) {
    //       throw new Error("Utilisateur non trouvé");
    //     }
    //     const isValid = await compare(credentials.password, user.password);
    //     if (!isValid) {
    //       throw new Error("Mot de passe incorrect");
    //     }
    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as "USER" | "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        const currentUser = await prisma.user.findUnique({
          where: { id: token.id as string },
        });
        if (currentUser) {
          session.user.id = currentUser.id;
          session.user.role = currentUser.role;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
