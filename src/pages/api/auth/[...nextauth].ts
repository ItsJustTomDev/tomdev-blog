import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import query from "lib/db";
import bcrypt from "bcrypt";
import { User } from "types/user";
import { loginValidationScheme } from "pages/auth/login";

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
                const validatedResult = await loginValidationScheme.validate({ email: credentials?.email, password: credentials?.password });

                if (!validatedResult)
                    throw new Error("Invalid data");

                const user = await query({
                    query: "SELECT * FROM users WHERE email = ?",
                    values: [validatedResult.email]
                }) as User[];

                if (!credentials)
                    throw new Error("User not found");

                if (user.length <= 0)
                    throw new Error("User not found");

                const passwordMatch = await bcrypt.compare(validatedResult.password, user[0].password);

                if (!passwordMatch)
                    throw new Error("Invalid password");

                return user[0];
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