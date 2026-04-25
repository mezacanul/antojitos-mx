import { NextResponse } from "next/server";
import { BranchRepository } from "@/repositories/branch.repo";
import { handleZodError } from "@/lib/response";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Get id from the URL: branch/[id]
  const { id } = await params;
  // console.log("params", params);
  const businessId = req.headers.get("proxy-business-id");

  if (!id || !businessId) {
    return NextResponse.json(
      { error: "Branch ID and Business ID are required" },
      { status: 400 }
    );
  }

  try {
    const branch =
      await BranchRepository.getBranchByIdAndBID(
        id,
        businessId
      );
    return NextResponse.json(branch, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const businessId = req.headers.get("proxy-business-id");

  if (!id || !businessId) {
    return NextResponse.json(
      { error: "Branch ID and Business ID are required" },
      { status: 400 }
    );
  }

  try {
    const branch =
      await BranchRepository.updateBranchByIdAndBID(
        id,
        businessId,
        body
      );
    return NextResponse.json(branch, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = req.headers.get("proxy-business-id");

  if (!id || !businessId) {
    return NextResponse.json(
      { error: "Branch ID and Business ID are required" },
      { status: 400 }
    );
  }

  try {
    const branch =
      await BranchRepository.deleteBranchByIdAndBID(
        id,
        businessId
      );
    return NextResponse.json(branch, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
