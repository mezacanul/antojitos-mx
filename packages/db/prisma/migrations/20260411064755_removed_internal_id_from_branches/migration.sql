/*
  Warnings:

  - You are about to drop the column `internal_id` on the `Branch` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Branch_internal_id_key";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "internal_id";
