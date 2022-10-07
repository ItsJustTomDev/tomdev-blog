import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/auth/login") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (req.nextUrl.pathname.startsWith("/auth/register") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (token) {
          return true;
        }

        if (!token && req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/register")) {
          return true;
        }

        return false;
      }
    }
  }
)

export const config = { matcher: ["/profile", "/new", "/auth/login", "/auth/register"] }