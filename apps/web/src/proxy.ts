import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// const locales = ["en", "es"];
// const defaultLocale = "en";

const PUBLIC_FILE =
  /\.(ico|png|jpg|jpeg|svg|webp|gif|woff2?)$/i;

// function getLocale(request: NextRequest): string {
//   // 1. Check Cookie first (Manual user override)
//   const cookieLocale =
//     request.cookies.get("NEXT_LOCALE")?.value;
//   if (cookieLocale && locales.includes(cookieLocale)) {
//     return cookieLocale;
//   }
// }

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL("/explorar", request.url)
    );
  }
  if (
    pathname.startsWith("/inicio") ||
    pathname.startsWith("/registro") ||
    pathname.startsWith("/explorar") ||
    pathname.startsWith("/comercio") ||
    pathname.startsWith("/producto") ||
    pathname.startsWith("/empresas/inicio") ||
    pathname.startsWith("/empresas/registro") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // User intent
  const isInEmpresasPanel = pathname.startsWith(
    "/empresas/panel"
  );
  const isInSocialPanel =
    pathname.startsWith("/mi-espacio");

  // User intent validation
  if (isInEmpresasPanel || isInSocialPanel) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    // Validar si el usuario está autenticado
    if (error || !data.user) {
      if (isInEmpresasPanel) {
        return NextResponse.redirect(
          new URL("/empresas/inicio", request.url)
        );
      }
      if (isInSocialPanel) {
        return NextResponse.redirect(
          new URL("/mi-espacio", request.url)
        );
      }
    }

    // Validar si el usuario es un administrador
    console.log("Proxy validation successful");
    // console.log("Data:", data);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};
