/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `HCL_Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HCL_Application_email_key" ON "HCL_Application"("email");
