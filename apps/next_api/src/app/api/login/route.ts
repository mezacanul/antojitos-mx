import { authService } from "@/services/auth.service";
import { NextResponse } from "next/server";
import type { LoginInput } from "@antojitos-mx/shared";
import { LoginDTO } from "@antojitos-mx/shared";
import { handleZodError } from "@/lib/response";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = LoginDTO.parse(json);
    const { email, password } = validatedData;
    const session = await authService.signIn(
      email,
      password
    );

    // return NextResponse.json(session, { status: 200 });
    return NextResponse.json({ session }, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
