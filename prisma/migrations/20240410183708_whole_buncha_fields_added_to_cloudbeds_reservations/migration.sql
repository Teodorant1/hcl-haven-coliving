/*
  Warnings:

  - You are about to drop the column `isCheckedIn` on the `cloudbeds_reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cloudbeds_reservation" DROP COLUMN "isCheckedIn",
ADD COLUMN     "guestID" TEXT,
ADD COLUMN     "propertyID" INTEGER,
ADD COLUMN     "propertyID_str" INTEGER,
ADD COLUMN     "queueTaskID" INTEGER,
ADD COLUMN     "queueTaskId_str" INTEGER,
ADD COLUMN     "roomBlockID" TEXT,
ADD COLUMN     "roomBlockReason" TEXT,
ADD COLUMN     "roomBlockType" TEXT,
ADD COLUMN     "roomID" TEXT,
ALTER COLUMN "source" SET DEFAULT 'cloudbeds';
