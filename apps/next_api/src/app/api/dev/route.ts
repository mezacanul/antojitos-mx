import { NextResponse } from "next/server";
import { getPricesByProductId } from "@/services/dev.service";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const prices = await getPricesByProductId(productId);
    return NextResponse.json(prices);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}