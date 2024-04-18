-- CreateTable
CREATE TABLE "cbguest_overview_object" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "guest_id" TEXT NOT NULL,
    "guest_id_str" TEXT NOT NULL,

    CONSTRAINT "cbguest_overview_object_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cbguest_overview_object_guest_id_key" ON "cbguest_overview_object"("guest_id");

-- CreateIndex
CREATE UNIQUE INDEX "cbguest_overview_object_guest_id_str_key" ON "cbguest_overview_object"("guest_id_str");
