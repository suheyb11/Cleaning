import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME, isValidAdminCookie } from "@/lib/admin-auth";

// Public even though they live under /admin(/api): the login page itself,
// the route that checks the password, and the one that clears the cookie.
const PUBLIC_PATHS = ["/admin/login", "/api/admin/login", "/api/admin/logout"];

/**
 * Protects every /admin page and /api/admin/* route (the API routes also
 * re-check the cookie themselves — see lib/admin-auth.ts — since middleware
 * is a convenience layer, not the only line of defense).
 */
export async function middleware(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authed = await isValidAdminCookie(cookie);

  if (!authed) {
    // An API call gets a plain 401 (no HTML redirect); a page load gets
    // sent to the login screen.
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
