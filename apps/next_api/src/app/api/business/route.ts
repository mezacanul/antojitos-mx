// apps/next_api/src/app/api/branches/route.ts
import { NextResponse } from "next/server";
import { getBusinessByUserId } from "@/repositories/business.repo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  // return NextResponse.json(
  //   { message: "Hello from Antojitos.mx!" },
  //   { status: 200 }
  // );

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const business = await getBusinessByUserId(userId);
    return NextResponse.json(business, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
