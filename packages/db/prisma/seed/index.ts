import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { clearDatabase } from "./clear";
import { seedOnboarding } from "./onboarding";
import { seedProducts } from "./products";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// DONT TOUCH THESE TABLES:
// BusinessCategory
// City
// State
// Country

async function main() {
  // const cleared = await clearDatabase(prisma);
  // if (cleared) {
  //   console.log("Database cleared successfully");
  // }
  // const onboardings = await seedOnboarding(prisma, 10);
  // console.log(onboardings);
  const products = await seedProducts(prisma);
  console.log(products);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
