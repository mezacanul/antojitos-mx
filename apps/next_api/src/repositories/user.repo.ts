import { prisma } from "@antojitos-mx/db";

export const createUser = (data: any, tx = prisma) => {
  return tx.user.create({ data });
};
