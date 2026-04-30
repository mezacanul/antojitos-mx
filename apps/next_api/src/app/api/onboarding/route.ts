import { NextResponse } from "next/server";
import { OnboardingService } from "@/services/onboarding.service";
import { handleZodError } from "@/lib/response";
import { allowAllOriginsCorsHeaders } from "@/lib/cors";

export async function POST(request: Request) {
  const jsonData = await request.json();
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    console.log("action", action);
    let result: any;
    const corsHeaders = allowAllOriginsCorsHeaders();

    switch (action) {
      case "signup":
        const {
          businessFormData,
          userFormData,
          branchFormData,
        } = jsonData;
        const payload = {
          business: businessFormData,
          user: userFormData,
          branch: {
            ...branchFormData,
            latitude: Number(branchFormData.latitude),
            longitude: Number(branchFormData.longitude),
          },
        };

        result = await OnboardingService.createBusiness(
          payload
        );

        return NextResponse.json(result, { status: 201 });
        break;
      case "testBusinessName":
        result = await OnboardingService.testBusinessName(
          jsonData
        );
        return NextResponse.json(result, {
          status: 200,
          headers: corsHeaders,
        });
        break;
      case "testEmail":
        result = await OnboardingService.testEmail(
          jsonData
        );
        return NextResponse.json(result, {
          status: 200,
          headers: corsHeaders,
        });
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
        break;
    }
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  console.log("resource", resource);
  let result: any;
  const corsHeaders = allowAllOriginsCorsHeaders();

  switch (resource) {
    case "verifyUserEmail":
      const code = searchParams.get("code");

      if (!code) {
        return NextResponse.json(
          { error: "code is required" },
          { status: 400 }
        );
      }

      try {
        console.log("code", code);
        result = await OnboardingService.verifyUserEmail(
          code as string
        );
        return NextResponse.json(result, {
          status: 200,
          headers: corsHeaders,
        });
      } catch (error) {
        return handleZodError(error);
      }
    default:
      return NextResponse.json(
        { error: "Invalid resource" },
        { status: 400 }
      );
  }
}
