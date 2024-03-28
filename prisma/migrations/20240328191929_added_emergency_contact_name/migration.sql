/*
  Warnings:

  - Added the required column `Emergency_Contact_Name` to the `HCL_Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HCL_Application" ADD COLUMN     "Emergency_Contact_Name" TEXT NOT NULL;
