import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE =
  /\.(ico|png|jpg|jpeg|svg|webp|gif|woff2?)$/i;

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Validate user session
  if (!error && data.user) {
    // If theres a user signed in
    // AND user is trying to access the login page
    // redirect to the empresas panel
    if (pathname.startsWith("/empresas/inicio")) {
      return NextResponse.redirect(
        new URL("/empresas/panel", request.url)
      );
    }

    // Validar si el usuario es un administrador
    console.log("Proxy validation successful!");
    console.log("User signed in:", data.user.email);
    // console.log("Data:", data);
    return NextResponse.next();
  }
  // Validate no user signed in
  else {
    // Register user intent
    const isInEmpresasPanel = pathname.startsWith(
      "/empresas/panel"
    );
    if (isInEmpresasPanel) {
      return NextResponse.redirect(
        new URL("/empresas/inicio", request.url)
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
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};
