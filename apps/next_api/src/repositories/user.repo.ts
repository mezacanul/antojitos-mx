import { prisma } from "@antojitos-mx/db";

export const createUser = (data: any, tx = prisma) => {
  return tx.user.create({ data });
};

export const getUserById = (id: string, tx = prisma) => {
  return tx.user.findUnique({ where: { id } });
};

export const getAccountStatusByType = (
  userId: string,
  type: string,
  tx = prisma
) => {
  return tx.accountStatus.findUnique({
    where: {
      userId_type: {
        userId,
        type: type as "EMAIL" | "PHONE",
      },
    },
  });
};
