import { NextResponse } from "next/server";
import { handleZodError } from "@/lib/response";
import { signupGuest } from "@/services/guests/signup.service";
import { OnboardingService } from "@/services/onboarding.service";
import { allowAllOriginsCorsHeaders } from "@/lib/cors";
import { CreateUserDTO } from "@antojitos-mx/shared";

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const resource = url.searchParams.get("resource");

//   try {
//     switch (resource) {
//       case "verifyUserEmail":
//         const code = url.searchParams.get("code");
//         if (!code) {
//           return NextResponse.json(
//             { error: "Code is required" },
//             { status: 400 }
//           );
//         } else {
//           const user =
//             await OnboardingService.verifyUserEmail(code);
//           return NextResponse.json(user, { status: 200 });
//         }
//         break;
//       default:
//         break;
//     }
//   } catch (error: any) {
//     return handleZodError(error);
//   }
// }

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const payload = await req.json();
  let result: any;
  const corsHeaders = allowAllOriginsCorsHeaders();
  try {
    switch (action) {
      case "testEmail":
        result = await OnboardingService.testEmail(payload);
        return NextResponse.json(result, {
          status: 200,
          headers: corsHeaders,
        });
        break;
      case "createGuest":
        const ValidatedUser = CreateUserDTO.parse(payload);
        result = await signupGuest({
          ...ValidatedUser,
          role: "GUEST",
        });
        return NextResponse.json(result, {
          status: 200,
          headers: corsHeaders,
        });
        break;
    }
  } catch (error: any) {
    return handleZodError(error, {}, corsHeaders);
  }
}
