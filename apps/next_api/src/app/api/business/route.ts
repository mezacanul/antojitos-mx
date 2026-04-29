// apps/next_api/src/app/api/branches/route.ts
import { NextResponse } from "next/server";
import {
  getBusinessById,
  updateBusinessById,
  deleteBusinessById,
} from "@/repositories/business.repo";
import { UpdateBusinessDTO } from "@antojitos-mx/shared";
import { handleZodError } from "@/lib/response";

export async function GET(req: Request) {
  const businessId = req.headers.get("proxy-business-id");
  try {
    const business = await getBusinessById(
      businessId as string
    );
    return NextResponse.json(business, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
  const businessId = req.headers.get("proxy-business-id");
  try {
    const businessData = await req.json();
    const validatedBusinessData =
      UpdateBusinessDTO.parse(businessData);
    const business = await updateBusinessById(
      businessId as string,
      validatedBusinessData
    );
    return NextResponse.json(business, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function DELETE(req: Request) {
  const businessId = req.headers.get("proxy-business-id");
  try {
    const business = await deleteBusinessById(
      businessId as string
    );
    return NextResponse.json(business, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
