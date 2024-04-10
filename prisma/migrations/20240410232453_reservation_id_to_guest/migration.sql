/*
  Warnings:

  - Added the required column `reservation_id` to the `cloudbeds_guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_guest" ADD COLUMN     "reservation_id" INTEGER NOT NULL;
