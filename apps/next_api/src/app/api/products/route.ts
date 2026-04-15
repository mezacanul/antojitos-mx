import { NextResponse } from "next/server";
import { productService } from "@/services/product.service";
import { getProductsByBusinessId } from "@/repositories/product.repo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");

  if (!businessId) {
    return NextResponse.json(
      { error: "Business ID is required" },
      { status: 400 }
    );
  }
  try {
    const products = await getProductsByBusinessId(
      businessId
    );
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // You get the businessId from the user session validated in your middleware

    const product = await productService.createProduct(
      formData
    );
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
