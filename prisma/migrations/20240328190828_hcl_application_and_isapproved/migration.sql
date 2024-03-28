-- AlterTable
ALTER TABLE "HCL_user" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "HCL_Application" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "DateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "DriverLicenseNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "AirlineEmployeeID" TEXT NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Airline_ID_Image" TEXT NOT NULL,
    "Emergency_Contact_PhoneNumber" TEXT NOT NULL,
    "Emergency_Contact_Relationship" TEXT NOT NULL,
    "RefferedBy" TEXT NOT NULL,

    CONSTRAINT "HCL_Application_pkey" PRIMARY KEY ("id")
);
