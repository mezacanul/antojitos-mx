import { prisma } from "@antojitos-mx/db";
import { BaseUnitType } from "@antojitos-mx/shared";

export const getBusinessCategories = async () => {
  return await prisma.businessCategory.findMany();
};

export const getBaseUnits = async () => {
  const values = await prisma.$queryRaw`
  SELECT enumlabel 
  FROM pg_enum 
  JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
  WHERE pg_type.typname = 'BaseUnit' -- Replace with your enum name in PG
  ORDER BY enumsortorder;
`;
  return values;
};
