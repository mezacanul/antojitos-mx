// apps/next_api/src/app/api/branches/route.ts
import { NextResponse } from "next/server";
import { BranchRepository } from "@/repositories/branch.repo";
import { handleZodError } from "@/lib/response";
import { BranchCreateInputSchema } from "@antojitos-mx/shared/generated/zod";
import { CreateBranchDTO } from "@antojitos-mx/shared";

export async function GET(req: Request) {
  const businessId = req.headers.get("proxy-business-id");

  if (!businessId) {
    return NextResponse.json(
      { error: "Business ID is required" },
      { status: 400 }
    );
  }

  try {
    const branches =
      await BranchRepository.getBranchesByBusinessId(
        businessId
      );
    return NextResponse.json(branches, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function POST(req: Request) {
  try {
    const businessId = req.headers.get("proxy-business-id");
    const role = req.headers.get("proxy-user-role");

    const body = await req.json();
    const validatedBody = CreateBranchDTO.parse(body);
    const branch = await BranchRepository.createBranch(
      role as string,
      businessId as string,
      validatedBody
    );

    return NextResponse.json(branch, { status: 201 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
