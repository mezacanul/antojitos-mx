// middleware.ts
import {
  NextResponse,
  type NextRequest,
} from "next/server";
import { authService } from "@/services/auth.service";
import { getUserById } from "./repositories/user.repo";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for unprotected API endpoints
  const isUnprotectedApi =
    pathname.startsWith("/api/onboarding") ||
    pathname.startsWith("/api/signup") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/catalogs");

  if (isUnprotectedApi) {
    return NextResponse.next();
  }

  // 2. Double-check the session is active with Supabase
  // This validates the JWT against the Supabase Auth server
  const { user, error } = await authService.getSession();
  // console.log(user, error);

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

  // 4. Fetch user data from the database
  const userData = await getUserById(user.id);
  const userRole = userData?.role;
  // console.log("userData", userData);
  
  // 5. Create request headers object
  const requestHeaders = new Headers(request.headers);

  // 6. Set user id and role headers by default
  requestHeaders.set("proxy-user-id", user.id);
  requestHeaders.set("proxy-user-role", userRole as string);

  // 7. Set business id header by role
  if (userRole == "GUEST") {
    // Do nothing
  } else if (
    userRole == "TENANT_OWNER" ||
    userRole == "BRANCH_MANAGER"
  ) {
    let businessId = null;
    switch (userRole) {
      case "TENANT_OWNER":
        businessId = await authService.getTenantBID(
          userData?.tenantId as string
        );
        break;
      case "BRANCH_MANAGER":
        businessId = await authService.getBManagerBID(
          userData?.branchId as string
        );
        break;
      default:
        break;
    }
    requestHeaders.set(
      "proxy-business-id",
      businessId as string
    );
  } else {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid user role",
      },
      { status: 401 }
    );
  }
  // console.log("requestHeaders", requestHeaders);

  // 4. If everything is valid, proceed
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: "/api/:path*", // Ensure this only runs on API routes
};
