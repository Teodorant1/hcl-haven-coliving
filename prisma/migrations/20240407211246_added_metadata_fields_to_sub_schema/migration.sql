/*
  Warnings:

  - Added the required column `description` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageName` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceID` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "packageName" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "priceID" TEXT NOT NULL;
