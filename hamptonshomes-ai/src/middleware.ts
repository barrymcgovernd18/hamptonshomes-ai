import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = "hamptonshomes.ai";
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
  const host = request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";

  if (host === `www.${canonicalHost}`) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const redirect = domainRedirects[host];

  if (redirect && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(redirect, `https://${canonicalHost}`),
      301
    );
  }

  // For non-root paths on satellite domains, redirect to same path on main domain
  if (redirect) {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname, `https://${canonicalHost}`),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|images|favicon|robots).*)",
};
