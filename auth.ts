import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/services/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [Google],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.profileId = user.profileId;
      }

      return token;
    },
  },
});
