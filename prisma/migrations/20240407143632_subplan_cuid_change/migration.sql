/*
  Warnings:

  - The primary key for the `SubscriptionPlans` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SubscriptionPlans" DROP CONSTRAINT "SubscriptionPlans_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubscriptionPlans_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubscriptionPlans_id_seq";
