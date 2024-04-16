/*
  Warnings:

  - Added the required column `gender` to the `cloudbeds_room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_room" ADD COLUMN     "gender" TEXT NOT NULL;
