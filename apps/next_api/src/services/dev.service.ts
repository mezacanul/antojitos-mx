import { prisma } from "@antojitos-mx/db";
import { NextResponse } from "next/server";

async function getPricesByProductId(productId: string) {
  try {
    return await prisma.price.findMany({
      where: {
        productId: productId,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function normalizeEmails() {
  try {
    const emails = await prisma.user.findMany({});
    const transactions = await prisma.$transaction(
      async (tx) => {
        const updatedEmails = [];
        for (const email of emails) {
          const normalizedEmail = email.email.toLowerCase();
          const updatedEmail = await tx.user.update({
            where: { id: email.id },
            data: { email: normalizedEmail },
            select: {
              id: true,
              email: true,
            },
          });
          updatedEmails.push(updatedEmail);
        }
        return updatedEmails;
      }
    );
    return transactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function testRoute(
  logs: any[] = [],
  message: string = "Hello, world!",
  status: number = 200
) {
  logs.forEach((log: any) => {
    console.log(log[0], log[1]);
  });
  return NextResponse.json(
    { message: message },
    { status: status }
  );
}

export const DevService = {
  normalizeEmails,
  getPricesByProductId,
  testRoute,
};
