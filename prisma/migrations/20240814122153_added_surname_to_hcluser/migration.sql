-- AlterTable
ALTER TABLE "HCL_user" ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT 'first name',
ADD COLUMN     "surname" TEXT NOT NULL DEFAULT 'surname';
