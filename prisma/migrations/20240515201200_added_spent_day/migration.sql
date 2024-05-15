-- CreateTable
CREATE TABLE "spent_day" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "day_of_consumption" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spent_day_pkey" PRIMARY KEY ("id")
);
