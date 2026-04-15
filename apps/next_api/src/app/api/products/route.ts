import { NextResponse } from "next/server";
import { productService } from "@/services/product.service";

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
