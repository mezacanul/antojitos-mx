import { PrismaClient as BasePrismaClient } from "@prisma/client";

// This bypasses the constructor property check but keeps your model types
export const prisma = new (BasePrismaClient as any)({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
}) as BasePrismaClient;

export * from "@prisma/client";
