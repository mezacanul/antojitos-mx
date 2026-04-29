import { prisma } from "@antojitos-mx/db";

export const getCitiesByStateId = async (parentId: string) => {
  return prisma.city.findMany({
    where: {
      stateId: parentId,
    },
  });
};

export const getStatesByCountryCode = async (parentId: string) => {
  return prisma.state.findMany({
    where: {
      country: {
        code: parentId,
      },
    },
  });
};
