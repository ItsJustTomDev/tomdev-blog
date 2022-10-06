import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials) {
        const user = { id: 1, name: "J Smith", email: "kekw@gmail.com" };

        return user;
      }
    }),
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken;
        token.idToken = account.idToken;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)