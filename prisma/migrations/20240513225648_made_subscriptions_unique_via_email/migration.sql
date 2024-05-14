/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscription_userEmail_key" ON "subscription"("userEmail");
