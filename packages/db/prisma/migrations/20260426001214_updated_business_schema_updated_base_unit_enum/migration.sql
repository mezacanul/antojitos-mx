/*
  Warnings:

  - You are about to drop the column `city` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Made the column `address` on table `Branch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "BaseUnit" ADD VALUE 'label';

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "zip" SET NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "state",
ADD COLUMN     "countryCode" TEXT NOT NULL DEFAULT 'MX';

-- CreateIndex
CREATE UNIQUE INDEX "Business_name_key" ON "Business"("name");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
