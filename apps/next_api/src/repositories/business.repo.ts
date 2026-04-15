import { prisma } from "@antojitos-mx/db";

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
            business: true,
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

export const createBusiness = (data: any, tx = prisma) => {
  return tx.business.create({ data });
};
