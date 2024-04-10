/*
  Warnings:

  - Added the required column `isCheckedIn` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_reservation" ADD COLUMN     "isCheckedIn" BOOLEAN NOT NULL;
