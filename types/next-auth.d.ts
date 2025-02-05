// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Le nom de l'utilisateur */
      name?: string | null;
      /** L'email de l'utilisateur */
      email?: string | null;
      /** L'image de l'utilisateur */
      image?: string | null;
      /** Le rôle de l'utilisateur */
      role?: "USER" | "ADMIN";
    };
  }

  interface User {
    /** Le rôle de l'utilisateur */
    role?: "USER" | "ADMIN";
  }
}
