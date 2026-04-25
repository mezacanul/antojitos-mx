import { handleZodError } from "@/lib/response";
import {
  getProductCategoriesByBusinessId,
  createProductCategory,
} from "@/repositories/product.repo";
import {
  ProductCategoryUncheckedCreateInputSchema,
} from "@antojitos-mx/shared";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const businessId = req.headers.get("proxy-business-id");

  try {
    const categories =
      await getProductCategoriesByBusinessId(
        businessId as string
      );
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return handleZodError(error);
  }
}

export async function POST(req: Request) {
  const jsonData = await req.json();
  console.log("jsonData", jsonData);

  try {
    const validatedCategoryData =
      ProductCategoryUncheckedCreateInputSchema.parse(
        jsonData
      );

    const category = await createProductCategory(
      validatedCategoryData
    );
    return NextResponse.json(category, {
      status: 201,
    });
  } catch (error: any) {
    return handleZodError(error);
  }
}
