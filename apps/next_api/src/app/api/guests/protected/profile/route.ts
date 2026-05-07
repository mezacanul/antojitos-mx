import { NextResponse } from "next/server";
import { GuestRepository } from "@/repositories/guest/profile";
import { handleZodError } from "@/lib/response";

export async function GET(req: Request) {
  const userID = req.headers.get("proxy-user-id");
  try {
    const user = await GuestRepository.getUser(userID!);
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleZodError(error);
  }
}

export async function PUT(req: Request) {
  const userID = req.headers.get("proxy-user-id");
  const payload = await req.json();
  try {
    const updatedUser = await GuestRepository.updateUser(
      userID!,
      payload
    );
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: unknown) {
    return handleZodError(error);
  }
}
