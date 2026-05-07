import { NextResponse } from "next/server";
import { handleZodError } from "@/lib/response";
import { ProfileService } from "@/services/guests/profile.service";
import { DevService } from "@/services/dev.service";

export async function POST(req: Request) {
  const userID = req.headers.get("proxy-user-id");
  const formData = await req.formData();
  // return DevService.testRoute([
  //   ["formData:", formData],
  //   ["userID:", userID],
  // ]);

  try {
    const user = await ProfileService.upsertUserPicture(
      userID!,
      formData.get("picture") as File
    );
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleZodError(error);
  }
}

export async function DELETE(req: Request) {
  const userID = req.headers.get("proxy-user-id");
  try {
    const user = await ProfileService.deleteUserPicture(
      userID!
    );
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleZodError(error);
  }
}
