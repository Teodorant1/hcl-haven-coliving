-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL,
    "emailID" TEXT NOT NULL,
    "dateBought" TIMESTAMP(3) NOT NULL,
    "CurrentCycleStart" TIMESTAMP(3) NOT NULL,
    "CurrentCycleEnd" TIMESTAMP(3) NOT NULL,
    "numberOfDaysBought" INTEGER NOT NULL,
    "DaysUsed" INTEGER NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);
