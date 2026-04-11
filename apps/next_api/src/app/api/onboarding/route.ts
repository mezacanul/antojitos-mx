import { NextResponse } from "next/server";
import { registerOnboarding } from "../../../services/onboarding.service";
import { OnboardingDTO } from "@antojitos-mx/shared";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const validatedData = OnboardingDTO.parse(json);
    const result = await registerOnboarding(validatedData);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: JSON.parse(error.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
