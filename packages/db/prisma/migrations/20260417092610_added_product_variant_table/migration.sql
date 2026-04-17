/*
  Warnings:

  - You are about to drop the column `quantity` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BaseUnit" AS ENUM ('pza', 'gr', 'kg', 'ml', 'lt', 'lb', 'floz', 'oz');

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_productId_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "quantity",
DROP COLUMN "type",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "baseUnit" "BaseUnit" NOT NULL DEFAULT 'pza',
ALTER COLUMN "description" SET NOT NULL;

-- DropEnum
DROP TYPE "PriceType";

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
