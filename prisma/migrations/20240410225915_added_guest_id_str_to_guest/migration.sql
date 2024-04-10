/*
  Warnings:

  - Added the required column `guest_id_str` to the `cloudbeds_guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_guest" ADD COLUMN     "guest_id_str" TEXT NOT NULL;
