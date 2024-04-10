/*
  Warnings:

  - Made the column `propertyID` on table `cloudbeds_guest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyID_str` on table `cloudbeds_guest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomID` on table `cloudbeds_guest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cloudbeds_guest" ALTER COLUMN "propertyID" SET NOT NULL,
ALTER COLUMN "propertyID_str" SET NOT NULL,
ALTER COLUMN "roomID" SET NOT NULL;
