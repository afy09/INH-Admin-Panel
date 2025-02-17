import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse | undefined {
  const token = getCookie("token", { req: request });

  const protectedPaths = ["/dashboard"];

  if (request.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
