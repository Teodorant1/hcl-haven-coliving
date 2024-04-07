/*
  Warnings:

  - You are about to drop the `webhookOutput` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "daysUsed" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "webhookOutput";

-- CreateTable
CREATE TABLE "SubscriptionPlans" (
    "id" SERIAL NOT NULL,
    "priceID" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionPlans_pkey" PRIMARY KEY ("id")
);
