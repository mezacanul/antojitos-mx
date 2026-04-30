import { prisma } from "@antojitos-mx/db";
import { UpdateBusinessInput } from "@antojitos-mx/shared";

export const getBusinessById = (
  businessId: string,
  tx = prisma
) => {
  return tx.business.findUnique({
    where: { id: businessId },
    include: {
      categories: true,
    },
  });
};

export const getBusinessByUserId = (
  userId: string,
  tx = prisma
) => {
  return tx.user
    .findUnique({
      where: { id: userId },
      select: {
        tenant: {
          select: {
            business: {
              include: {
                categories: true, // Include all fields from categories as well
              },
            },
          },
        },
      },
    })
    .then((user: any) => {
      const business = user?.tenant?.business;
      if (!business) return null;
      // Combine business details with its branches
      return business;
    });
  // .then((user: any) => user?.tenant?.business ?? null);
};

export const updateBusinessById = (
  businessId: string,
  data: UpdateBusinessInput,
  tx = prisma
) => {
  try {
    const { businessCategories, ...rest } = data;
    return tx.business.update({
      where: { id: businessId },
      data: {
        ...rest,
        categories: {
          set: businessCategories.map((categoryId) => ({
            id: categoryId,
          })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBusinessById = (
  businessId: string,
  tx = prisma
) => {
  return tx.business.delete({ where: { id: businessId } });
};
// export const createBusiness = (data: any, tx = prisma) => {
//   return tx.business.create({ data });
// };
