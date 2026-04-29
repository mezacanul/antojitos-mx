/*
  Warnings:

  - You are about to drop the column `city` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Branch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "city",
DROP COLUMN "imageUrl",
DROP COLUMN "state",
ADD COLUMN     "cityId" TEXT,
ADD COLUMN     "stateId" TEXT;
