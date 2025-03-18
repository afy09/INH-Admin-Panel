import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse | undefined {
  const token = getCookie("token", { req: request });

  const protectedPaths = ["/dashboard"];
  const userAgent = request.headers.get("user-agent") || "";
  // Deteksi hanya smartphone (bukan tablet)
  const isSmartphone = /iPhone|Android.+Mobile|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isSmartphone && !request.nextUrl.pathname.startsWith("/not-phone")) {
    return NextResponse.redirect(new URL("/not-phone", request.url));
  }

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

export const confignotphone = {
  matcher: ["/((?!not-phone).*)"],
};
