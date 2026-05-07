import { ProductRepository } from "@/repositories/guest/product.repo";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ restaurantID: string }> }
) {
  const { restaurantID } = await params;

  try {
    const products =
      await ProductRepository.getAllProductsByRestaurantId(
        restaurantID
      );
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get products" },
      { status: 500 }
    );
  }
}
