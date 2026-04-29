/*
  Warnings:

  - The values [MON,TUE,WED,THU,FRI,SAT,SUN] on the enum `DayOfWeek` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DayOfWeek_new" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');
ALTER TABLE "BusinessHours" ALTER COLUMN "dayOfWeek" TYPE "DayOfWeek_new" USING ("dayOfWeek"::text::"DayOfWeek_new");
ALTER TYPE "DayOfWeek" RENAME TO "DayOfWeek_old";
ALTER TYPE "DayOfWeek_new" RENAME TO "DayOfWeek";
DROP TYPE "public"."DayOfWeek_old";
COMMIT;

-- AlterTable
ALTER TABLE "BusinessHours" ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "openTime" DROP NOT NULL,
ALTER COLUMN "openTime" DROP DEFAULT,
ALTER COLUMN "closeTime" DROP NOT NULL,
ALTER COLUMN "closeTime" DROP DEFAULT;
