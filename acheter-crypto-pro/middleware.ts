import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminAuthRoute = pathname.startsWith("/admin/login") || pathname === "/admin/logout";

  if (pathname.startsWith("/admin") && !isPublicAdminAuthRoute) {
    const isAdmin = await verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

    if (!isAdmin) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-acheter-crypto-path", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
