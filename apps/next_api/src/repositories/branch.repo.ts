import { prisma } from "@antojitos-mx/db";
import { CreateBranchDTOType } from "@antojitos-mx/shared";

export async function createBranch(
  userRole: string,
  businessId: string,
  data: CreateBranchDTOType
) {
  if (userRole !== "TENANT_OWNER") {
    throw new Error(
      "Unauthorized: Only a Tenant Owner can create branches."
    );
  }

  return await prisma.branch.create({
    data: {
      name: data.name,
      address: data.address,
      zip: data.zip,
      city: data.city,
      state: data.state,
      latitude: data.latitude,
      longitude: data.longitude,
      business: {
        connect: {
          id: businessId,
        },
      },
    },
  });
}

async function getBranchByIdAndBID(
  id: string,
  businessId: string
) {
  return await prisma.branch.findUnique({
    where: { id, businessId },
  });
}

export async function getBranchesByBusinessId(
  businessId: string
) {
  return await prisma.branch.findMany({
    where: {
      businessId: businessId,
    },
  });
}

async function updateBranchByIdAndBID(
  id: string,
  businessId: string,
  data: CreateBranchDTOType
) {
  return await prisma.branch.update({
    where: { id, businessId },
    data,
  });
}

async function deleteBranchByIdAndBID(
  id: string,
  businessId: string
) {
  return await prisma.branch.delete({
    where: { id, businessId },
  });
}

export const BranchRepository = {
  getBranchByIdAndBID,
  deleteBranchByIdAndBID,
  updateBranchByIdAndBID,
  createBranch,
  getBranchesByBusinessId,
};
