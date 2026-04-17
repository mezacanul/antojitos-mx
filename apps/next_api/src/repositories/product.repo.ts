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

export const getProductCategoriesByBusinessId = async (
  businessId: string
) => {
  return await prisma.productCategory.findMany({
    where: {
      businessId: businessId,
    },
  });
};

export const createProductCategory = async (
  categoryData: any
) => {
  return await prisma.productCategory.create({
    data: categoryData,
  });
};
