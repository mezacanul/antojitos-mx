import { NextResponse } from "next/server";
import { OnboardingService } from "@/services/onboarding.service";
import { handleZodError } from "@/lib/response";

export async function POST(request: Request) {
  try {
    const jsonData = await request.json();
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

    const result = await OnboardingService.createBusiness(
      payload
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
