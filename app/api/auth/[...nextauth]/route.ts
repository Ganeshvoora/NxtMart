
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
    }
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    accessToken?: string;
  }
}



const prisma = new PrismaClient();


// Define the auth config and handlers
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Find the user from the database by username
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        });

        // If user doesn't exist, return null
        if (!user) {
          return null;
        }

        // Compare the password
        const isValidPassword = await bcrypt.compare(credentials.password!, user.password);
        if (!isValidPassword) {
          return null;
        }

        // If valid user, return the user object
        return {
          id: user.id,
          username: user.username,
          email: user.email
        };
      }
    })
  ],
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      // Only runs when user signs in
      if (user) {
        token.id = user.id;
        // token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        // if (token.username) session.user.username = token.username;
        if (token.accessToken) session.accessToken = token.accessToken;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };