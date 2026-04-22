/*
  Warnings:

  - You are about to alter the column `price` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[businessId,name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Price" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "quantity" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_businessId_name_key" ON "Product"("businessId", "name");
