import { prisma } from "@antojitos-mx/db";

// -------------------
// Products
// -------------------
export const getProductsByBusinessId = async (
  businessId: string
) => {
  return await prisma.productCategory.findMany({
    where: { businessId },
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          baseUnit: true,
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
            orderBy: {
              price: "asc",
            },
          },
     
        },
      },
    },
  });
};

// -------------------
// Product categories
// -------------------
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

export const getProductCategoryById = async (
  id: string,
  includeProducts: boolean = false
) => {
  const selectSchema = {
    products: {
      select: {
        id: true,
        name: true,
        prices: true,
        productVariants: true,
      },
    },
  };
  return await prisma.productCategory.findUnique({
    where: { id: id },
    select: includeProducts ? selectSchema : undefined,
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
