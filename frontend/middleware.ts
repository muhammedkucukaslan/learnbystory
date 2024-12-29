// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = ["/sign-in", "/sign-up"].includes(
    request.nextUrl.pathname
  );

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Korumalı route'lar ve auth route'ları
export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
