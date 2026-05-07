import { NextResponse } from "next/server";
import { DevService } from "@/services/dev.service";
import { handleZodError } from "@/lib/response";
import { authService } from "@/services/auth.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  let result: any;
  try {
    switch (action) {
      case "normalizeEmails":
        result = await DevService.normalizeEmails();
        return NextResponse.json(result, { status: 200 });
        break;
    }
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function POST(req: Request) {
  const jsonData = await req.json();
  const { userId, role } = jsonData;
  try {
    // const { searchParams } = new URL(req.url);
    // const productId = searchParams.get("productId");
    // const prices = await getPricesByProductId(productId);
    // return NextResponse.json(prices);

    const { data, error } =
      await authService.updateSBUserRole(userId, role);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}
