import { handleZodError } from "@/lib/response";
import { BranchRepository } from "@/repositories/branch.repo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const branchId = url.searchParams.get("branchId");
  const businessId = req.headers.get("proxy-business-id");

  if (!businessId || !branchId) {
    return NextResponse.json(
      { error: "Business ID and Branch ID are required" },
      { status: 400 }
    );
  }

  try {
    const businessHours =
      await BranchRepository.getAllBusinessHours(
        branchId as string,
        businessId as string
      );
    return NextResponse.json(businessHours, {
      status: 200,
    });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const url = new URL(req.url);
  const branchId = url.searchParams.get("branchId");
  const businessId = req.headers.get("proxy-business-id");

  try {
    const createdBusinessHour =
      await BranchRepository.createBusinessHours({
        branchId: branchId as string,
        businessId: businessId as string,
        data: body,
      });
    return NextResponse.json(createdBusinessHour, {
      status: 200,
    });
  } catch (error: any) {
    return handleZodError(error);
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const businessHours = await req.json();
//   const businessId = req.headers.get("proxy-business-id");

//   if (!id || !businessId) {
//     return NextResponse.json(
//       { error: "Branch ID and Business ID are required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const updatedBranch =
//       await BranchRepository.updateBusinessHours(
//         id,
//         businessId,
//         businessHours
//       );
//     return NextResponse.json(updatedBranch, {
//       status: 200,
//     });
//   } catch (error: any) {
//     return handleZodError(error);
//   }
// }
