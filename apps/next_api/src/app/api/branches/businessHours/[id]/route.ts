import { BranchRepository } from "@/repositories/branch.repo";
import { handleZodError } from "@/lib/response";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(req.url);
  const branchId = url.searchParams.get("branchId");
  const businessId = req.headers.get("proxy-business-id");
  const body = await req.json();

  if (!businessId || !branchId || !id) {
    return NextResponse.json(
      {
        error:
          "Business ID, Branch ID and Business Hour ID are required",
      },
      { status: 400 }
    );
  }

  try {
    const businessHour =
      await BranchRepository.updateBusinessHour(
        branchId,
        businessId,
        id,
        body
      );
    return NextResponse.json(businessHour, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(req.url);
  const branchId = url.searchParams.get("branchId");
  const businessId = req.headers.get("proxy-business-id");

  if (!businessId || !branchId || !id) {
    return NextResponse.json(
      {
        error:
          "Business ID, Branch ID and Business Hour ID are required",
      },
      { status: 400 }
    );
  }

  try {
    const businessHour =
      await BranchRepository.deleteBusinessHour(
        branchId,
        businessId,
        id
      );
    return NextResponse.json(businessHour, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
