import { NextResponse } from "next/server";
import { productService } from "@/services/product.service";
import { getProductsByBusinessId } from "@/repositories/product.repo";
import {
  CreateProductDTO,
  ProductCreateInputSchema,
} from "@antojitos-mx/shared";
import { handleZodError } from "@/lib/response";

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
  // console.log("req", req);
  const businessId = req.headers.get(
    "proxy-business-id"
  ) as string;
  const formData = await req.clone().formData();
  const rawData = Object.fromEntries(formData.entries());
  // console.log("rawData", rawData);

  try {
    const validatedData = CreateProductDTO.parse(rawData);
    // console.log("validatedData", validatedData);
    const createdProduct =
      await productService.createProduct(
        validatedData,
        businessId
      );
    console.log("createdProduct", createdProduct);
    return NextResponse.json(
      { createdProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error from POST /api/products", error);
    return handleZodError(error);
  }
}
