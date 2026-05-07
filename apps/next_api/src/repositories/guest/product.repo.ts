import { prisma } from "@antojitos-mx/db";

export const getAllProductsByRestaurantId = async (
  restaurantId: string
) => {
  return await prisma.productCategory.findMany({
    where: { businessId: restaurantId },
    select: {
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          productVariants: {
            select: {
              name: true,
            },
          },
          prices: {
            select: {
              price: true,
              quantity: true,
              sizeLabel: true,
            },
          },
        },
      },
    },
  });
};

export const ProductRepository = {
  getAllProductsByRestaurantId,
};
