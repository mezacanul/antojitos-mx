import { handleZodError } from "@/lib/response";
import RestaurantRepository from "@/repositories/guest/restaurant.repo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const restaurantId = url.searchParams.get("restaurantId");
  const categoryId = url.searchParams.get("categoryId");
  let restaurants: any;

  try {
    if (!restaurantId && !categoryId) {
      restaurants =
        await RestaurantRepository.getAllRestaurants();
      return NextResponse.json(restaurants, {
        status: 200,
      });
    }
    if (restaurantId) {
      const restaurant =
        await RestaurantRepository.getRestaurantById(
          restaurantId
        );
      return NextResponse.json(restaurant, {
        status: 200,
      });
    }
    if (categoryId) {
      restaurants =
        await RestaurantRepository.getRestaurantsByCategoryId(
          categoryId
        );
      return NextResponse.json(restaurants, {
        status: 200,
      });
    }
  } catch (error: any) {
    return handleZodError(error);
  }
}
