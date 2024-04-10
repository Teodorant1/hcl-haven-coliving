/*
  Warnings:

  - Changed the type of `reservation_id` on the `cloudbeds_reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cloudbeds_reservation" DROP COLUMN "reservation_id",
ADD COLUMN     "reservation_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cloudbeds_reservation_reservation_id_key" ON "cloudbeds_reservation"("reservation_id");
