import { handleZodError } from "@/lib/response";
import { getAccountStatusByType } from "@/repositories/user.repo";
import { BusinessService } from "@/services/business/main.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const businessId = req.headers.get("proxy-business-id");
  const userId = req.headers.get("proxy-user-id");
  const url = new URL(req.url);
  const resource = url.searchParams.get("resource");

  try {
    switch (resource) {
      case "checklist":
        return NextResponse.json(
          await BusinessService.getChecklist(
            businessId as string
          ),
          { status: 200 }
        );
      case "accountStatusByEmail":
        return NextResponse.json(
          await getAccountStatusByType(
            userId as string,
            "EMAIL"
          ),
          { status: 200 }
        );
      default:
        return NextResponse.json(
          { error: "Resource not found" },
          { status: 404 }
        );
    }
  } catch (error: any) {
    return handleZodError(error);
  }
}
