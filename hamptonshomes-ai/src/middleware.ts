import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const domainRedirects: Record<string, string> = {
  "easthampton.ai": "/east-hampton",
  "www.easthampton.ai": "/east-hampton",
  "sagharbor.ai": "/sag-harbor",
  "www.sagharbor.ai": "/sag-harbor",
  "bridgehampton.ai": "/bridgehampton",
  "www.bridgehampton.ai": "/bridgehampton",
  "sagaponack.ai": "/sagaponack",
  "www.sagaponack.ai": "/sagaponack",
};

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const redirect = domainRedirects[host];

  if (redirect && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(redirect, "https://hamptonshomes.ai"),
      301
    );
  }

  // For non-root paths on satellite domains, redirect to same path on main domain
  if (redirect) {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname, "https://hamptonshomes.ai"),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|images|favicon|robots|sitemap).*)",
};
