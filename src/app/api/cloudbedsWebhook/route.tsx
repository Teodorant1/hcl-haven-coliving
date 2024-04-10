/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { type CloudbedsAPIresponse } from "project-types";
import { convert_date_string_to_DATE } from "utilities";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const CLOUDBEDS_WEBHOOK_RESPONSE: CloudbedsAPIresponse = body;
  console.log("CLOUDBEDS_WEBHOOK_RESPONSE");
  console.log(CLOUDBEDS_WEBHOOK_RESPONSE);

  switch (CLOUDBEDS_WEBHOOK_RESPONSE.event) {
    case "reservation/created":
      const start_date = convert_date_string_to_DATE(
        CLOUDBEDS_WEBHOOK_RESPONSE.startDate!,
      );
      const end_date = convert_date_string_to_DATE(
        CLOUDBEDS_WEBHOOK_RESPONSE.endDate!,
      );

      await db.cloudbeds_reservation.create({
        data: {
          name: " ",
          surname: " ",

          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
          check_in: start_date,
          check_out: end_date,

          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
          //   isCheckedIn: false,
          numberOfNights: 0,
          TotalPrice: 0,
          status: "false",
          source: " ",
          roomType: " ",
          URL: " ",
          number_of_guests: 1,
          roomNumber: " ",
          timestamp: 1.1,
        },
      });
      break;
    case "reservation/status_changed":
      await db.cloudbeds_reservation.update({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
        data: {
          status: "confirmed",
        },
      });

      break;

    case "reservation/dates_changed":
      const start_date1 = convert_date_string_to_DATE(
        CLOUDBEDS_WEBHOOK_RESPONSE.startDate!,
      );
      const end_date1 = convert_date_string_to_DATE(
        CLOUDBEDS_WEBHOOK_RESPONSE.endDate!,
      );

      await db.cloudbeds_reservation.update({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
        data: {
          check_in: start_date1,
          check_out: end_date1,
        },
      });

      break;

    case "reservation/accommodation_status_changed":
      await db.cloudbeds_reservation.update({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
        data: {
          status: "occupied",
          roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomId,
        },
      });
      break;
    case "reservation/accommodation_type_changed":
      await db.cloudbeds_reservation.update({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
        data: {
          roomType: CLOUDBEDS_WEBHOOK_RESPONSE.roomTypeID!.toString(),
        },
      });
      break;
    case "reservation/accommodation_changed":
      await db.cloudbeds_reservation.update({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
        data: {
          roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomId!,
        },
      });
      break;
    case "reservation/deleted":
      await db.cloudbeds_reservation.delete({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
      });

      break;
    case "guest/created":
      await db.cloudbeds_guest.create({
        data: {
          created_at: new Date(),
          reservation_id: 98274398274,
          guest_first_name: "",
          guest_last_name: "",
          guest_phone: "",
          guest_email: "",
          guest_country_code: "",
          check_in: new Date(),
          check_out: new Date(),

          guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId!.toString(),
          guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str!.toString(),
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID!,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str!,
          roomID: "123",
        },
      });
      break;
    case "guest/assigned":
      await db.cloudbeds_guest.updateMany({
        where: {
          guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
          guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
        },
        data: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
          roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomID,
        },
      });
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
    case "guest/created":
      break;
  }

  return NextResponse.json({ received: true, status: 200 });
}
