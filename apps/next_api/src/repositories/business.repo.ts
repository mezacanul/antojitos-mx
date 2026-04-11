import { prisma } from "@antojitos-mx/db";

export const createBusiness = (data: any, tx = prisma) => {
  return tx.business.create({ data });
};
