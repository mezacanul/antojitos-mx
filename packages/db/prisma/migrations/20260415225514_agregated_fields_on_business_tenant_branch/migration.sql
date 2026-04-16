/*
  Warnings:

  - You are about to drop the column `slug` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[website]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('pza', 'gr', 'kg', 'ml', 'lt', 'lb', 'floz', 'oz');

-- DropIndex
DROP INDEX "Business_slug_key";

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "slug",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'MX',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productCategoryId" TEXT;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "BusinessCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "BusinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "type" "PriceType" NOT NULL DEFAULT 'pza',
    "amount" DECIMAL(10,2) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" TEXT NOT NULL,
    "rate" DECIMAL(10,4) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currencyId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "branchId" TEXT,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusinessToBusinessCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BusinessToBusinessCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_name_key" ON "BusinessCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_businessId_key" ON "ProductCategory"("name", "businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRate_currencyId_businessId_branchId_key" ON "ExchangeRate"("currencyId", "businessId", "branchId");

-- CreateIndex
CREATE INDEX "_BusinessToBusinessCategory_B_index" ON "_BusinessToBusinessCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_website_key" ON "Business"("website");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToBusinessCategory" ADD CONSTRAINT "_BusinessToBusinessCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToBusinessCategory" ADD CONSTRAINT "_BusinessToBusinessCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "BusinessCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
