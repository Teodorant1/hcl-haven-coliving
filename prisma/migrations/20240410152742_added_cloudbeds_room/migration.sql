/*
  Warnings:

  - Added the required column `roomNumber` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_reservation" ADD COLUMN     "roomNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cloudbeds_room" (
    "id" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "number_of_guests" INTEGER NOT NULL,

    CONSTRAINT "cloudbeds_room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cloudbeds_room_roomNumber_key" ON "cloudbeds_room"("roomNumber");
