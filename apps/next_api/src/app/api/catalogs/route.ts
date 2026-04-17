import { NextResponse } from "next/server";
import { getBusinessCategories } from "@/repositories/catalog";

export async function GET(req: Request) {
  const businessCategories = await getBusinessCategories();
  return NextResponse.json(businessCategories, {
    status: 200,
  });
}
