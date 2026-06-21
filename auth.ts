import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { sql } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
  const email = credentials.email as string;
  const password = credentials.password as string;

  console.log("LOGIN EMAIL:", email);
  console.log("LOGIN PASSWORD:", password);

  const users = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  console.log("USERS:", users);

  const user = users[0];

  console.log("USER:", user);

  if (!user) {
    console.log("USER NOT FOUND");
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password_hash
  );

  console.log("PASSWORD VALID:", validPassword);

  if (!validPassword) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});