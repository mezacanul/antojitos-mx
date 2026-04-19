import { NextResponse } from "next/server";
import {
  getBusinessCategories,
  getBaseUnits,
} from "@/repositories/catalog";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resourceType = searchParams.get("resourceType");
  // console.log("businessId", businessId);
  switch (resourceType) {
    case "businessCategory":
      const businessCategories =
        await getBusinessCategories();
      return NextResponse.json(businessCategories, {
        status: 200,
      });
      break;
    case "baseUnit":
      const baseUnits = await getBaseUnits();
      return NextResponse.json(baseUnits, {
        status: 200,
      });
      break;
    default:
      return NextResponse.json(
        { error: "Invalid resource type" },
        { status: 400 }
      );
      break;
  }
}
