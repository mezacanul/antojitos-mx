import { prisma } from "@antojitos-mx/db";

async function getPricesByProductId(productId) {
  try {
    return await prisma.price.findMany({
      where: {
        productId: productId,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getPricesByProductId };
