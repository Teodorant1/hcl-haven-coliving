-- AlterTable
ALTER TABLE "cloudbeds_reservation" ADD COLUMN     "lastTimeUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
