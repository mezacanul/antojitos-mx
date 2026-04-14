// apps/next_api/src/services/branch.service.ts
import { prisma } from "@antojitos-mx/db";

export async function createBranch(
  userId: string,
  name: string,
  address?: string
) {
  // 1. Fetch user with their role and the nested businessId from the Tenant
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      role: true,
      tenant: {
        select: {
          businessId: true,
        },
      },
    },
  });

  // 2. Authorization & Data Validation
  if (!user) throw new Error("User not found.");

  if (user.role !== "TENANT_OWNER") {
    throw new Error(
      "Unauthorized: Only a Tenant Owner can create branches."
    );
  }

  const businessId = user.tenant?.businessId;

  if (!businessId) {
    throw new Error(
      "User's tenant is not associated with a business."
    );
  }

  return await prisma.branch.create({
    data: {
      name,
      address,
      businessId: businessId, // The branch is linked to the top-level Business
    },
  });
}
