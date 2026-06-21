import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("ham_admin")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    // Basic token validation
    try {
      const decoded = Buffer.from(token, "base64url").toString("utf-8");
      const secret = process.env.ADMIN_SESSION_SECRET ?? "dev-admin-secret";
      if (!decoded.endsWith(`:${secret}`)) {
        throw new Error("Invalid token");
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

export default proxy;
