import { prisma } from "@antojitos-mx/db";

export const getBusinessCategories = async () => {
  return await prisma.businessCategory.findMany();
};
