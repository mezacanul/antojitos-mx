import { handleZodError } from "@/lib/response";
import { NextResponse } from "next/server";
import {
  getTenantByUserId,
  updateTenantByUserId,
  deleteTenantByUserId,
} from "@/repositories/tenant.repo";
import { UpdateTenantDTO } from "@antojitos-mx/shared";

export async function GET(req: Request) {
  const userId = req.headers.get("proxy-user-id");
  try {
    const tenant = await getTenantByUserId(
      userId as string
    );
    return NextResponse.json(tenant, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function PUT(req: Request) {
  const userId = req.headers.get("proxy-user-id");
  const tenantData = await req.json();
  try {
    const validatedTenantData =
      UpdateTenantDTO.parse(tenantData);
    const tenant = await updateTenantByUserId(
      userId as string,
      validatedTenantData
    );
    return NextResponse.json(tenant, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function DELETE(req: Request) {
  const userId = req.headers.get("proxy-user-id");
  try {
    const tenant = await deleteTenantByUserId(
      userId as string
    );
    return NextResponse.json(tenant, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
