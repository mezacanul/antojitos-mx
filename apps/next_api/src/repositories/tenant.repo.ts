import { prisma } from "@antojitos-mx/db";

export const createTenant = (data: any, tx = prisma) => {
  return tx.tenant.create({ data });
};

export const getTenantByUserId = async (
  userId: string,
  tx = prisma
) => {
  const commonFields = {
    names: true,
    paternal_surname: true,
    maternal_surname: true,
    email: true,
    phone: true,
  };
  const userWithTenant = await tx.user.findUnique({
    where: { id: userId },
    select: {
      ...commonFields,
      role: true,
      tenant: {
        select: {
          ...commonFields,
          rfc: true,
        },
      },
    },
  });
  if (!userWithTenant) {
    throw new Error("User not found");
  }
  return userWithTenant;
};

export const updateTenantByUserId = async (
  userId: string,
  data: any,
  tx = prisma
) => {
  // First, fetch the tenantId from the user
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { tenantId: true },
  });

  if (!user?.tenantId) {
    throw new Error("User has no tenantId");
  }

  const transaction = await tx.$transaction(async (tx) => {
    const tenantUpdated = await tx.tenant.update({
      where: { id: user.tenantId! },
      data,
    });
    const userUpdated = await tx.user.update({
      where: { id: userId },
      data: { ...data, rfc: undefined },
    });
    return { tenantUpdated, userUpdated };
  });
  return transaction;
};

export const deleteTenantByUserId = async (
  userId: string,
  tx = prisma
) => {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { tenantId: true },
  });

  if (!user?.tenantId) {
    throw new Error("User has no tenantId");
  }

  return tx.tenant.delete({ where: { id: user.tenantId } });
};
