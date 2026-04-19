import {
  getProductCategoriesByBusinessId,
  createProductCategory,
  getCategoryById,
} from "@/repositories/product.repo";
import {
  ProductCategoryCreateInputSchema,
  ProductCategoryUncheckedCreateInputSchema,
} from "@antojitos-mx/shared";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const businessId = searchParams.get(
    "businessId"
  ) as string;
  console.log("id", id);
  console.log("businessId", businessId);

  try {
    if (id) {
      const category = await getCategoryById(id);
      return NextResponse.json(category, { status: 200 });
    }
    if (businessId) {
      const categories =
        await getProductCategoriesByBusinessId(businessId);
      return NextResponse.json(categories, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, data: id, businessId },
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
