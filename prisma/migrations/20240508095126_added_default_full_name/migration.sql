/*
  Warnings:

  - Made the column `full_name` on table `HCL_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HCL_user" ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "full_name" SET DEFAULT 'full name';
