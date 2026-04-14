import { NextResponse } from "next/server";
import { registerOnboarding } from "../../../services/onboarding.service";
import { OnboardingDTO } from "@antojitos-mx/shared";
import { handleZodError } from "@/lib/response";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const validatedData = OnboardingDTO.parse(json);
    const result = await registerOnboarding(validatedData);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
