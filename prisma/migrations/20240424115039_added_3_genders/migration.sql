-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- AlterTable
ALTER TABLE "HCL_user" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'Male';
