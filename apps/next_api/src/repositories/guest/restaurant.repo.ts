import { prisma } from "@antojitos-mx/db";

async function getAllRestaurants() {
  return await prisma.business.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getRestaurantById(id: string) {
  return await prisma.business.findUnique({
    where: { id },
  });
}

async function getRestaurantsByCategoryId(
  categoryId: string
) {
  return await prisma.business.findMany({
    where: { categories: { some: { id: categoryId } } },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
}

const RestaurantRepository = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByCategoryId,
};

export default RestaurantRepository;
