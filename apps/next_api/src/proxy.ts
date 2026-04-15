// middleware.ts
import {
  NextResponse,
  type NextRequest,
} from "next/server";
import { authService } from "@/services/auth.service";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for unprotected API endpoints
  const isUnprotectedApi =
    pathname.startsWith("/api/onboarding") ||
    pathname.startsWith("/api/signup") ||
    pathname.startsWith("/api/login");

  if (isUnprotectedApi) {
    return NextResponse.next();
  }

  // 2. Double-check the session is active with Supabase
  // This validates the JWT against the Supabase Auth server
  const { user, error } = await authService.getSession();
  console.log(user, error);

  // 3. API-only: Return 401 Unauthorized if no valid session
  if (error || !user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message:
          "A valid active session is required to access this resource.",
      },
      { status: 401 }
    );
  }

  // 4. If everything is valid, proceed
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Ensure this only runs on API routes
};
