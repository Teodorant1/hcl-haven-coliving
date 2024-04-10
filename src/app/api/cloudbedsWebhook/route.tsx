/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { type CloudbedsAPIresponse } from "project-types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const CLOUDBEDS_WEBHOOK_RESPONSE: CloudbedsAPIresponse = body;
  console.log("CLOUDBEDS_WEBHOOK_RESPONSE");
  console.log(CLOUDBEDS_WEBHOOK_RESPONSE);

  switch (CLOUDBEDS_WEBHOOK_RESPONSE.event) {
    case "reservation/created":
      await db.cloudbeds_reservation.create({
        data: {
          name: " ",
          surname: " ",
          created_at: " ",
          reservation_id: " ",
          check_in: " ",
          check_out: " ",
          isCheckedIn: false,
          numberOfNights: 1,

          TotalPrice: 1000,
          status: true,
          source: " ",
          roomType: " ",
          URL: " ",
          number_of_guests: 1,
          roomNumber: " ",
          timestamp: 1.1,
        },
      });
      break;
    case "reservation/deleted":
      console.log("2");

      break;
  }

  return NextResponse.json({ received: true, status: 200 });
}
