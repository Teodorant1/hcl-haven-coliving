-- AlterTable
ALTER TABLE "cloudbeds_reservation" ALTER COLUMN "roomType" DROP NOT NULL,
ALTER COLUMN "URL" DROP NOT NULL,
ALTER COLUMN "number_of_guests" DROP NOT NULL,
ALTER COLUMN "roomNumber" DROP NOT NULL;
