/*
  Warnings:

  - You are about to drop the column `quantity` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the `SubscriptionPlans` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `NumberOfBoughtDays` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "quantity",
ADD COLUMN     "NumberOfBoughtDays" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SubscriptionPlans";
