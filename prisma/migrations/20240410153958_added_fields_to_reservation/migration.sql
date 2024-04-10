/*
  Warnings:

  - A unique constraint covering the columns `[guest_email]` on the table `cloudbeds_guest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reservation_id]` on the table `cloudbeds_reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfNights` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `cloudbeds_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cloudbeds_reservation" ADD COLUMN     "TotalPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "numberOfNights" INTEGER NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cloudbeds_guest_guest_email_key" ON "cloudbeds_guest"("guest_email");

-- CreateIndex
CREATE UNIQUE INDEX "cloudbeds_reservation_reservation_id_key" ON "cloudbeds_reservation"("reservation_id");
