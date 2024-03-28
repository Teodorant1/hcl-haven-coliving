/*
  Warnings:

  - Changed the type of `DateOfBirth` on the `HCL_Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HCL_Application" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "DateOfBirth",
ADD COLUMN     "DateOfBirth" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HCL_user" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
