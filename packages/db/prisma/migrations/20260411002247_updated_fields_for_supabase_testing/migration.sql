/*
  Warnings:

  - You are about to drop the column `name` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[internal_id]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rfc]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rfc]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `internal_id` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maternal_surname` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paternal_surname` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maternal_surname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paternal_surname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "internal_id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "rfc" TEXT;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "name",
ADD COLUMN     "maternal_surname" TEXT NOT NULL,
ADD COLUMN     "names" TEXT NOT NULL,
ADD COLUMN     "paternal_surname" TEXT NOT NULL,
ADD COLUMN     "rfc" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "maternal_surname" TEXT NOT NULL,
ADD COLUMN     "names" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "paternal_surname" TEXT NOT NULL,
ALTER COLUMN "tenantId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_internal_id_key" ON "Branch"("internal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Business_rfc_key" ON "Business"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_rfc_key" ON "Tenant"("rfc");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
