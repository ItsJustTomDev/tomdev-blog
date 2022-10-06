import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import query from "lib/db";
import bcrypt from "bcrypt";
import { UserType } from "types/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {

        if (credentials) {
          const user = await query({
            query: "SELECT * FROM users WHERE email = ?",
            values: [credentials.email]
          }) as UserType[]; // TODO make user type!!!!!

          if (user.length > 0) {
            const passwordMatch = await bcrypt.compare(credentials.password, user[0].password);

            if (passwordMatch) {
              return user[0];
            }

            throw new Error("invalid credentials");
          }
        }

        throw new Error("User not found");
      }
    }),
  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken;
        token.idToken = account.idToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)