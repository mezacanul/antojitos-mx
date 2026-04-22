/*
  Warnings:

  - You are about to drop the column `sku` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProductVariant_sku_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "sku",
DROP COLUMN "stock";
