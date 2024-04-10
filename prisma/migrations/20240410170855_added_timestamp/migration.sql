/*
  Warnings:

  - Added the required column `timestamp` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_reservation" ADD COLUMN     "timestamp" DECIMAL(65,30) NOT NULL;
