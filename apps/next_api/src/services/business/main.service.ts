import { prisma } from "@antojitos-mx/db";

async function getChecklist(businessId: string) {
  const checklist = [
    {
      title: "userHasVerifiedEmail",
      isCompleted: false,
    },
    {
      title: "hasBusinessPicture",
      isCompleted:
        (
          await prisma.business.findUnique({
            where: {
              id: businessId,
            },
            select: {
              imageUrl: true,
            },
          })
        )?.imageUrl !== null,
    },
    {
      title: "hasAtLeast1BranchVerified",
      isCompleted:
        (await prisma.branch.findFirst({
          where: {
            businessId,
            // verified: true,
          },
        })) !== null,
      // TODO: Add 'verified' column to branch table
    },
    {
      title: "hasAtLeast3Products",
      isCompleted:
        (await prisma.product.count({
          where: {
            businessId,
          },
        })) >= 3,
    },
  ];
  return checklist;
}

export const BusinessService = {
  getChecklist,
};
