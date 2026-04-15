import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "es"];
const defaultLocale = "en";

const PUBLIC_FILE =
  /\.(ico|png|jpg|jpeg|svg|webp|gif|woff2?)$/i;

function getLocale(request: NextRequest): string {
  // 1. Check Cookie first (Manual user override)
  const cookieLocale =
    request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Fallback to Browser Headers (Accept-Language)
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach(
    (value, key) => (negotiatorHeaders[key] = value)
  );
  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  try {
    return match(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // next/image fetches /images/... from public; locale redirect would break that URL
  if (
    pathname.startsWith("/images/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) &&
      pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // Redirect to default locale or use 'accept-language' header logic here
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};
