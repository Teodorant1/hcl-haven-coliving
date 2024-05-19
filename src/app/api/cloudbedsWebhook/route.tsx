/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { type Cloudbeds_webhook_APIresponse } from "project-types";
import { convert_date_string_to_DATE } from "utilities";
import {
  get_singular_reservation,
  GetGuestDetails,
  Get_Validity_Of_reservation,
} from "utilitiesBackend";
import { sleep } from "utilitiesBackend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const CLOUDBEDS_WEBHOOK_RESPONSE: Cloudbeds_webhook_APIresponse = body;
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

      const ReservationValidity = await Get_Validity_Of_reservation(
        CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
      );

      if (ReservationValidity === false) {
        break;
      }

      await db.cloudbeds_reservation.create({
        data: {
          name: " ",
          surname: " ",

          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
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
      while (1 > 0) {
        await sleep(1000);

        const reservation_to_update = await db.cloudbeds_reservation.findUnique(
          {
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
            },
          },
        );

        if (reservation_to_update) {
          await db.cloudbeds_reservation.updateMany({
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationID!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
            },
            data: {
              status: CLOUDBEDS_WEBHOOK_RESPONSE.status,
            },
          });

          break;
        }
      }
      break;

    case "reservation/dates_changed":
      await sleep(1100);

      const start_date1 = convert_date_string_to_DATE(
        CLOUDBEDS_WEBHOOK_RESPONSE.startDate!,
      );
      const end_date1 = convert_date_string_to_DATE(
        CLOUDBEDS_WEBHOOK_RESPONSE.endDate!,
      );

      while (1 > 0) {
        await sleep(1000);

        const reservation_to_update = await db.cloudbeds_reservation.findUnique(
          {
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
          },
        );

        if (reservation_to_update) {
          await db.cloudbeds_reservation.updateMany({
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
            data: {
              check_in: start_date1,
              check_out: end_date1,
            },
          });

          break;
        }
      }
      break;

    case "reservation/accommodation_status_changed":
      await sleep(1100);

      while (1 > 0) {
        await sleep(1000);

        const reservation_to_update = await db.cloudbeds_reservation.findUnique(
          {
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
          },
        );

        if (reservation_to_update) {
          await db.cloudbeds_reservation.updateMany({
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
            data: {
              status: CLOUDBEDS_WEBHOOK_RESPONSE.status,
              roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomId,
            },
          });

          break;
        }
      }
      break;

    case "reservation/accommodation_type_changed":
      await sleep(1100);

      while (1 > 0) {
        await sleep(1000);

        const reservation_to_update = await db.cloudbeds_reservation.findUnique(
          {
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
          },
        );

        if (reservation_to_update) {
          await db.cloudbeds_reservation.updateMany({
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
            data: {
              roomType: CLOUDBEDS_WEBHOOK_RESPONSE.roomTypeId!.toString(),
            },
          });

          break;
        }
      }
      break;

    case "reservation/accommodation_changed":
      await sleep(1100);

      while (1 > 0) {
        await sleep(1000);

        const reservation_to_update = await db.cloudbeds_reservation.findUnique(
          {
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
          },
        );

        if (reservation_to_update) {
          await db.cloudbeds_reservation.updateMany({
            where: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
            },
            data: {
              roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomId!,
            },
          });

          break;
        }
      }
      break;

    case "reservation/deleted":
      await db.cloudbeds_reservation.delete({
        where: {
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
        },
      });

      break;
    case "guest/created":
      await db.cloudbeds_guest.create({
        data: {
          created_at: new Date(),
          reservation_id: "98274398274",
          guest_first_name: "",
          guest_last_name: "",
          guest_phone: "",
          guest_email: "",
          guest_country_code: "",
          check_in: new Date(),
          check_out: new Date(),

          guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId!.toString(),
          guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str!.toString(),
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId!.toString(),
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str!,
          roomID: "93867596798594kfgkgsgdfkgfakfgafgafgfgkfgk",
        },
      });
      break;
    case "guest/assigned":
      await sleep(1100);

      //update user email when they're assigned through cloudbedsAPI
      const guestDetails = await GetGuestDetails(
        CLOUDBEDS_WEBHOOK_RESPONSE.propertyID!,
        CLOUDBEDS_WEBHOOK_RESPONSE.guestId!,
      );

      console.log("guest/assigned  guestDetails");
      console.log(guestDetails);

      const myReservation = await get_singular_reservation(
        CLOUDBEDS_WEBHOOK_RESPONSE.reservationId!,
      );

      while (1 > 0) {
        await sleep(1000);

        const guest_to_update = await db.cloudbeds_guest.findFirst({
          where: {
            guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
            guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
            propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId?.toString(),
            propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str!,
          },
        });

        if (guest_to_update) {
          await db.cloudbeds_guest.updateMany({
            where: {
              guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
              guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId?.toString(),
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str!,
            },
            data: {
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
              roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomID,
              guest_email: guestDetails.data.email,
            },
          });

          break;
        }
      }

      // const currentRes = await db.cloudbeds_reservation.findFirst({
      //   where: {},
      // });

      while (1 > 0) {
        await sleep(1000);

        const reservation_to_update = await db.cloudbeds_reservation.findUnique(
          {
            where: {
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str!,
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
            },
          },
        );

        if (reservation_to_update) {
          const reservations = await db.cloudbeds_reservation.findMany();
          console.log("reservations");
          console.log(reservations);

          await db.cloudbeds_reservation.updateMany({
            where: {
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str!,
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
            },
            data: {
              roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomID,
              guestID: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
              TotalPrice: myReservation.data.total,
              email: guestDetails.data.email,
            },
          });

          const reservations1 = await db.cloudbeds_reservation.findMany();
          console.log("reservations1");
          console.log(reservations1);

          const reservation = await db.cloudbeds_reservation.findUnique({
            where: { reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId },
          });

          await db.subscription.update({
            where: {
              userEmail: guestDetails.data.email,
            },
            data: {
              reservationID: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
              check_in: reservation?.check_in,
              check_out: reservation?.check_out,
            },
          });
          // await db.subscription.update({
          //   where: {
          //     userEmail: guestDetails.data.email,
          //     reservationID: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
          //   },
          //   data: { isCheckedIn: true },
          // });
          const reservations2 = await db.cloudbeds_reservation.findMany();
          console.log("reservations2");
          console.log(reservations2);

          break;
        }
      }

      break;
    case "guest/removed":
      await db.cloudbeds_guest.deleteMany({
        where: {
          guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
          guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
          propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId?.toString(),
          propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyID_str,
          reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
          roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomID,
        },
      });
      break;
    case "guest/details_changed":
      //I have no idea from the documentation what this is supposed to do
      //maybe do email notification OR trigger an API call to cloudbeds

      // await db.cloudbeds_guest.deleteMany({
      //   where: {
      //     guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
      //     guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
      //     propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId,
      //     propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
      //     reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
      //     roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomID,
      //   },
      // });
      break;
    case "guest/accommodation_changed":
      await sleep(1100);

      while (1 > 0) {
        await sleep(1000);

        const guest_to_update = await db.cloudbeds_guest.findFirst({
          where: {
            guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
            guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
            propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId?.toString(),
            propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str!,
          },
        });

        if (guest_to_update) {
          await db.cloudbeds_guest.updateMany({
            where: {
              guest_id: CLOUDBEDS_WEBHOOK_RESPONSE.guestId?.toString(),
              guest_id_str: CLOUDBEDS_WEBHOOK_RESPONSE.guestId_str?.toString(),
              reservation_id: CLOUDBEDS_WEBHOOK_RESPONSE.reservationId,
            },
            data: {
              propertyID: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId?.toString(),
              propertyID_str: CLOUDBEDS_WEBHOOK_RESPONSE.propertyId_str,
              roomID: CLOUDBEDS_WEBHOOK_RESPONSE.roomId,
            },
          });

          break;
        }
      }

    case "guest/appstate_changed":
      //not quite sure what do with this one either
      break;
    case "guest/rate_status_changed":
      //not quite sure what do with this one either
      break;
  }

  return NextResponse.json({ received: true, status: 200 });
}
