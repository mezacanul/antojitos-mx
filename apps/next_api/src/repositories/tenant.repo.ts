import { prisma } from "@antojitos-mx/db";

export const createTenant = (data: any, tx = prisma) => {
  return tx.tenant.create({ data });
};
