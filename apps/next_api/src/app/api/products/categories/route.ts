import {
  getProductCategoriesByBusinessId,
  createProductCategory,
} from "@/repositories/product.repo";
import {
  ProductCategoryCreateInputSchema,
  ProductCategoryUncheckedCreateInputSchema,
} from "@antojitos-mx/shared";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get(
    "businessId"
  ) as string;

  try {
    const categories =
      await getProductCategoriesByBusinessId(businessId);
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  const jsonData = await req.json();
  console.log("jsonData", jsonData);

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
  // return NextResponse.json(category, { status: 201 });
}
