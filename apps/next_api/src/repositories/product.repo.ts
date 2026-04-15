import { prisma } from "@antojitos-mx/db";

export const getProductsByBusinessId = async (
  businessId: string
) => {
  return await prisma.product.findMany({
    where: {
      businessId: businessId,
    },
  });
};
