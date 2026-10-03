import { NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n/config";

function getPreferredLocale(request) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  for (const lang of preferred) {
    const base = lang.split("-")[0];
    if (locales.includes(base)) {
      return base;
    }
  }

  return defaultLocale;
}

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Never rewrite API routes or Next internals.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
