/*
  Warnings:

  - The values [pza] on the enum `BaseUnit` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `amount` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,sizeLabel,quantity]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,name]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BaseUnit_new" AS ENUM ('piece', 'gr', 'kg', 'ml', 'lt', 'lb', 'oz', 'floz', 'size');
ALTER TABLE "public"."Product" ALTER COLUMN "baseUnit" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "baseUnit" TYPE "BaseUnit_new" USING ("baseUnit"::text::"BaseUnit_new");
ALTER TYPE "BaseUnit" RENAME TO "BaseUnit_old";
ALTER TYPE "BaseUnit_new" RENAME TO "BaseUnit";
DROP TYPE "public"."BaseUnit_old";
ALTER TABLE "Product" ALTER COLUMN "baseUnit" SET DEFAULT 'piece';
COMMIT;

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_branchId_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "amount",
ADD COLUMN     "quantity" DECIMAL(10,2) DEFAULT 1,
ADD COLUMN     "sizeLabel" TEXT,
ALTER COLUMN "price" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "branchId",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "baseUnit" SET DEFAULT 'piece';

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Country" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneCode" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "State_countryCode_idx" ON "State"("countryCode");

-- CreateIndex
CREATE INDEX "City_stateId_idx" ON "City"("stateId");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_stateId_key" ON "City"("name", "stateId");

-- CreateIndex
CREATE INDEX "Price_productId_idx" ON "Price"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_productId_sizeLabel_quantity_key" ON "Price"("productId", "sizeLabel", "quantity");

-- CreateIndex
CREATE INDEX "Product_businessId_idx" ON "Product"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_name_key" ON "ProductVariant"("productId", "name");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
