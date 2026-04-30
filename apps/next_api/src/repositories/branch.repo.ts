import { prisma } from "@antojitos-mx/db";
import { CreateBranchDTOType } from "@antojitos-mx/shared";
// import { BranchUpdateInputSchema } from "@antojitos-mx/shared/generated/zod";

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
      cityId: data.cityId,
      stateId: data.stateId,
      latitude: data.latitude,
      longitude: data.longitude,
      businessId: businessId,
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

async function createBusinessHours({
  branchId,
  businessId,
  data,
}: {
  branchId: string;
  businessId: string;
  data: any;
}) {
  return await prisma.businessHours.create({
    data: {
      ...data,
      branch: {
        connect: {
          id: branchId,
          businessId: businessId,
        },
      },
    },
  });
}

async function getAllBusinessHours(
  branchId: string,
  businessId: string
) {
  return await prisma.businessHours.findMany({
    where: {
      branch: { id: branchId, businessId: businessId },
    },
  });
}

async function updateBusinessHour(
  branchId: string,
  businessId: string,
  businessHourId: string,
  data: any
) {
  return await prisma.businessHours.update({
    where: {
      id: businessHourId,
      branch: {
        id: branchId,
        businessId: businessId,
      },
    },
    data,
  });
}

async function deleteBusinessHour(
  branchId: string,
  businessId: string,
  businessHourId: string
) {
  return await prisma.businessHours.delete({
    where: {
      id: businessHourId,
      branch: { id: branchId, businessId: businessId },
    },
  });
}

export const BranchRepository = {
  getBranchByIdAndBID,
  deleteBranchByIdAndBID,
  updateBranchByIdAndBID,
  createBranch,
  getBranchesByBusinessId,
  updateBusinessHour,
  createBusinessHours,
  getAllBusinessHours,
  deleteBusinessHour,
};
