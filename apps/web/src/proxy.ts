import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE =
  /\.(ico|png|jpg|jpeg|svg|webp|gif|woff2?)$/i;

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log("data:", data);

  const { pathname } = request.nextUrl;

  // Validate user session
  if (!error && data.user) {
    const role = data.user?.app_metadata?.role;
    const isTenant = role === "TENANT_OWNER";
    const isGuest = role === "GUEST";
    const isAdmin = role === "SYSTEM_ADMIN";

    console.log("Proxy validation successful!");
    console.log("User signed in:", data.user.email);

    if (
      isTenant &&
      pathname.startsWith("/empresas/inicio")
    ) {
      return NextResponse.redirect(
        new URL("/empresas/panel", request.url)
      );
    }
    if (
      isGuest &&
      (pathname.startsWith("/inicio") ||
        pathname.startsWith("/registro"))
    ) {
      return NextResponse.redirect(
        new URL("/panel", request.url)
      );
    }
    if (isAdmin && pathname.startsWith("/admin")) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }
    // Validar si el usuario es un administrador
    //   console.log("Data:", data);
    // return NextResponse.next();
  }
  // Validate no user signed in
  else {
    // Register user intent
    const isInInvitadoInicio = pathname.startsWith(
      "/invitado/inicio"
    );
    if (isInInvitadoInicio) {
      return NextResponse.redirect(
        new URL("/inicio", request.url)
      );
    }
    const isInEmpresasPanel = pathname.startsWith(
      "/empresas/panel"
    );
    if (isInEmpresasPanel) {
      return NextResponse.redirect(
        new URL("/empresas/inicio", request.url)
      );
    }

    if (
      pathname.startsWith("/") ||
      pathname.startsWith("/inicio") ||
      pathname.startsWith("/registro") ||
      pathname.startsWith("/explorar") ||
      // pathname.startsWith("/comercio") ||
      // pathname.startsWith("/producto") ||
      pathname.startsWith("/empresas/inicio") ||
      pathname.startsWith("/empresas/registro") ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};
