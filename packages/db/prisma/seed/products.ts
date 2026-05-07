import { fakerES_MX as faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

export async function seedProducts(prisma: any) {
  const filePath = path.join(
    __dirname,
    "output/products_seed.json"
  );
  const allBusiness = await prisma.business.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const limits = {
    productCategories: 3,
    products: 5,
    productVariants: 3,
    productPrices: 2,
  };
  const defaults = {
    baseUnit: "label",
    productVariants: ["Fresco", "Capeado", "Cocido"],
    productPrices: [
      {
        price: 99.99,
        sizeLabel: "Individual",
      },
      {
        price: 149.99,
        sizeLabel: "Familiar",
      },
    ],
  };

  const transaction = await prisma.$transaction(
    async (tx: any) => {
      let createdPCs: any[] = [];
      let createdPrds: any[] = [];
      let createdPrdVariants: any[] = [];
      let createdPrdPrices: any[] = [];

      // Iterate over all businesses
      for (const business of allBusiness) {
        const businessId = business.id;
        const PCs = [];

        // Iterate over the limits of product categories
        // to create 3 new product categories for each business
        for (let i = 0; i < limits.productCategories; i++) {
          const newPrdCat = {
            name: `${faker.food.ethnicCategory()} ${faker.lorem.word()}`,
            description: faker.lorem.sentence(),
            businessId: businessId,
          };
          PCs.push(newPrdCat);
        }
        // createdPCs.push(PCs);
        // const countPCs =
        await tx.productCategory.createMany({
          data: PCs,
        });
        createdPCs = await tx.productCategory.findMany({
          where: {
            businessId: businessId,
          },
        });

        for (const newPC of createdPCs) {
          const productCategoryId = newPC.id;
          const Prds = [];

          // Iterate over the limits of products
          // to create 5 new products for each product category
          for (let i = 0; i < limits.products; i++) {
            const newPrd = {
              name: `${faker.food.dish()} ${faker.lorem.word()}`,
              description: faker.lorem.sentence(),
              baseUnit: defaults.baseUnit,
              productCategoryId: productCategoryId,
              businessId: businessId,
            };
            Prds.push(newPrd);
          }
          // createdPrds.push(Prds);
          await tx.product.createMany({
            data: Prds,
          });
          createdPrds = await tx.product.findMany({
            where: {
              productCategoryId: productCategoryId,
              businessId: businessId,
            },
          });

          for (const newPrd of createdPrds) {
            const productId = newPrd.id;
            const PrdVariants = [];
            const PrdPrices = [];

            // Iterate over the limits of product variants
            // to create 3 new product variants for each product
            for (
              let i = 0;
              i < limits.productVariants;
              i++
            ) {
              const newPrdVariant = {
                productId: productId,
                name: defaults.productVariants[i],
              };
              PrdVariants.push(newPrdVariant as any);
            }

            // Iterate over the limits of product prices
            // to create 2 new product prices for each product
            for (let i = 0; i < limits.productPrices; i++) {
              const newPrdPrice = {
                price: defaults.productPrices[i].price,
                sizeLabel:
                  defaults.productPrices[i].sizeLabel,
                productId: productId,
              };
              PrdPrices.push(newPrdPrice as any);
            }

            // createdPrdVariants =
            await tx.productVariant.createMany({
              data: PrdVariants,
            });

            // createdPrdPrices =
            await tx.price.createMany({
              data: PrdPrices,
            });
            createdPrdVariants =
              await tx.productVariant.findMany({
                where: {
                  productId: productId,
                },
              });
            createdPrdPrices = await tx.price.findMany({
              where: {
                productId: productId,
              },
            });
            // createdPrdVariants.push(PrdVariants);
            // createdPrdPrices.push(PrdPrices);
          }
        }
      }
      const output = {
        createdPCs,
        createdPrds,
        createdPrdVariants,
        createdPrdPrices,
      };
      // fs.writeFileSync(
      //   filePath,
      //   JSON.stringify(output, null, 2)
      // );
      return output;
    },
    {
      maxWait: 5000, // Time to wait to get a connection (15s)
      timeout: 100000, // Time allowed for the entire transaction (30s)
    }
  );
  return transaction;
}
