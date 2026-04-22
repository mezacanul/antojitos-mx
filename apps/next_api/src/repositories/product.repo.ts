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

export const getCategoryById = async (id: string) => {
  return await prisma.productCategory.findUnique({
    where: { id: id },
  });
};

export const createProductCategory = async (
  categoryData: any
) => {
  return await prisma.productCategory.create({
    data: categoryData,
  });
};

export const updateProductCategory = async (
  id: string,
  categoryData: any
) => {
  return await prisma.productCategory.update({
    where: { id: id },
    data: categoryData,
  });
};

export const deleteProductCategory = async (id: string) => {
  return await prisma.productCategory.delete({
    where: { id: id },
  });
};

export const createProduct = async (
  productData: any,
  tx = prisma
) => {
  return await tx.product.create({
    data: productData,
  });
};
