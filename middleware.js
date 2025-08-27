import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("access_token"); // adjust to your auth cookie/key

  // protect all /account routes
  if (!token && req.nextUrl.pathname.startsWith("/account")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  return NextResponse.next();
}

// Match routes to protect
export const config = {
  matcher: ["/account/:path*"],
};
