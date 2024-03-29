/*
  Warnings:

  - Added the required column `isApproved1` to the `HCL_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HCL_user" ADD COLUMN     "isApproved1" BOOLEAN NOT NULL;
