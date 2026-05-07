import { prisma } from "@antojitos-mx/db";

export const getUser = async (userID: string) => {
  return await prisma.user.findUnique({
    where: { id: userID },
  });
};

export const updateUser = async (
  userID: string,
  user: any
) => {
  return await prisma.user.update({
    where: { id: userID },
    data: user,
  });
};

export const GuestRepository = {
  getUser,
  updateUser,
};
