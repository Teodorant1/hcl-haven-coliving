/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import { Resend } from "resend";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import axios, { type AxiosRequestConfig } from "axios";
import {
  type CB_get_user_response,
  type CB_get_empty_rooms_response,
  type cb_room_subtype,
  type Cloudbeds_post_reservation_payload,
  type Cloudbeds_post_reservation_RESPONSE,
  type getAvailableRoomTypes_payload,
  type getAvailableRoomTypes_Result,
  type propertyRoom,
  type getReservations_result,
  type getSingle_reservation_result,
} from "project-types";
import { spent_day } from "@prisma/client";

export async function Get_Validity_Of_reservation(reservationID: string) {
  const reservation = await get_singular_reservation(reservationID);
  if (reservation.success === true) {
    return true;
  }
  return false;
}

//this function will be used to figure out how much someone has paid for their membership
// and how much time they have available and how much time
export async function GetStatusOfSubcsription(email: string) {
  const personalSubscription = await db.subscription.findUnique({
    where: {
      userEmail: email,
    },
  });

  return personalSubscription;
}

export async function get_singular_reservation(reservationID: string) {
  const url = "https://api.cloudbeds.com/api/v1.1/getReservation";

  const params = {
    propertyID: 309910,
    reservationID: reservationID,
  };

  const apiKey = process.env.NEXT_PRIVATE_CLOUDBEDS_CLIENT_API_KEY!;

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const result: getSingle_reservation_result = response.data;
    return result; // Add this line to ensure the function returns a value
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optional: rethrow the error to handle it further up the call stack
  }
}

export async function getReservations() {
  const url = "https://api.cloudbeds.com/api/v1.1/getReservations";

  const params = {
    propertyIDs: 309910,
    includeGuestsDetails: true,
    sortByRecent: true,
  };

  const apiKey = process.env.NEXT_PRIVATE_CLOUDBEDS_CLIENT_API_KEY!;

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const result: getReservations_result = response.data;
    return result; // Add this line to ensure the function returns a value
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optional: rethrow the error to handle it further up the call stack
  }
}

export async function getImprovSession(email: string): Promise<{
  email: string | undefined;
  isAdmin: boolean | undefined;
  isApproved: boolean | undefined;
  GenderSex: string | undefined;
  fullname: string | undefined;
}> {
  const adhocSession = await db.hCL_user.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
      isAdmin: true,
      isApproved: true,
      GenderSex: true,
      full_name: true,
    },
  });

  if (adhocSession) {
    const adhocSessionRedux = {
      email: adhocSession?.email,
      isAdmin: adhocSession?.isAdmin,
      isApproved: adhocSession?.isApproved,
      GenderSex: adhocSession?.GenderSex,
      fullname: adhocSession?.full_name,
    };

    return adhocSessionRedux;
  } else {
    await db.hCL_user.create({
      data: {
        email: email,
        username: email,
      },
    });
    const newlyMadeSession = await db.hCL_user.findFirst({
      where: {
        email: email,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const hashedpassword = await bcrypt.hash(newlyMadeSession?.password!, 10);

    await db.hCL_user.update({
      where: {
        email: newlyMadeSession?.email,
      },
      data: {
        password: hashedpassword,
      },
    });

    const newlyMadeSessionRedux = {
      email: newlyMadeSession?.email,
      isAdmin: newlyMadeSession?.isAdmin,
      isApproved: newlyMadeSession?.isApproved,
      GenderSex: "Male",
      fullname: newlyMadeSession?.full_name,
    };

    return newlyMadeSessionRedux;
  }
}

//update subscription table with current dates
// trigger this with Golang Cronjob EVERYDAY AT 9 AM LA TIME
// need to figure out how to only update that for subscriptions that start ON this day (30 days intervals)

export async function Stripe_PeriodBookkeeping() {
  const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
  //get all subscriptions
  const subscriptions = await db.subscription.findMany({
    // where: {
    //   subscriptionStatus: false,
    // },
  });
  const resend = new Resend(process.env.NEXT_PRIVATE_RESEND_API_KEY);
  await resend.emails.send({
    from: "Acme <onboarding@e.tailwindclub.org>",
    to: "dusanbojanic1@gmail.com",
    subject: "Commencing Stripe_PeriodBookkeeping CRON JOB ",
    html: "<p>Commencing Stripe_PeriodBookkeeping CRON JOB</p>",
  });

  //for each sub
  for (let i = 0; i < subscriptions.length; i++) {
    const subID = subscriptions[i]?.subscriptionID;
    const subscription_in_stripe_db = await stripe.subscriptions.retrieve(
      subID!,
    );

    const latestInvoiceID = subscription_in_stripe_db.latest_invoice;

    const invoice_in_stripe_db = await stripe.invoices.retrieve(
      latestInvoiceID as string,
    );

    const amountRemaining: number = invoice_in_stripe_db.amount_remaining;
    const amountPaid: number = invoice_in_stripe_db.amount_paid;
    const amountDue: number = invoice_in_stripe_db.amount_due;
    const isPaid: boolean = invoice_in_stripe_db.paid;

    const currentPeriod_startDate = new Date(
      subscription_in_stripe_db.current_period_start,
    );
    const currentPeriod_endDate = new Date(
      subscription_in_stripe_db.current_period_end,
    );

    if (amountRemaining === 0 && amountDue === amountPaid && isPaid === true) {
      await db.subscription.updateMany({
        where: { subscriptionID: subID },
        data: {
          subscriptionStatus: true,
          currentPeriod_end: currentPeriod_endDate,
          currentPeriod_start: currentPeriod_startDate,
        },
      });
    } else {
      await db.subscription.updateMany({
        where: { subscriptionID: subID },
        data: {
          subscriptionStatus: false,
          // currentPeriod_end: currentPeriod_endDate,
          // currentPeriod_start: currentPeriod_startDate,
        },
      });

      await resend.emails.send({
        from: "Acme <onboarding@e.tailwindclub.org>",
        to: process.env.NEXT_PRIVATE_ADMIN_EMAIL!,
        subject: "WARNING , something has gone wrong with a subscription",
        html:
          "<p>Something has gone wrong with the subscription with id: " +
          subscriptions[i]!.id +
          " and email: " +
          subscriptions[i]!.userEmail +
          " , you should investigate this matter</p>",
      });
    }

    // with STRIPE npm package check if last payment happened LESS THAN 30 days ago
    //maybe add some checks for weird daylight savings stuff
    //then check the status of the latest invoice
    //if invoice is valid, update the  subscription in db
    // const date = subscriptions[i]?.currentPeriod_start;

    await sleep(60); // Pause for 1000 milliseconds (1 seconds)
  }

  return "monthy python";
}

export async function analyze_usage(user_email: string, year: number) {
  const spent_days = await db.spent_day.findMany({
    where: { user_email: user_email },
  });
  const monthsNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const OverView_data: {
    name: string;
    total: number;
  }[] = [];

  const spent_days_yearly_collection: spent_day[] = [];

  const hashmap = new Map<number, string>();

  const hashObj = {
    paloi: "sdfkjn",
    hashmap1: hashmap,
  };

  for (let i = 0; i < spent_days.length; i++) {
    const year = spent_days[i]?.day_of_consumption.getFullYear();
    const dayName = spent_days[i]?.day_of_consumption.getDate();
    const month = spent_days[i]?.day_of_consumption.getMonth(); // 0 (January) to 11 (December)
  }
  return spent_days;
}

export async function handle_room_usage_metrics() {
  const resend = new Resend(process.env.NEXT_PRIVATE_RESEND_API_KEY);
  await resend.emails.send({
    from: "Acme <onboarding@e.tailwindclub.org>",
    to: "dusanbojanic1@gmail.com",
    subject: "Commencing handle_room_usage_metrics CRON JOB ",
    html: "<p>Commencing handle_room_usage_metrics CRON JOB</p>",
  });

  const reservations = await db.subscription.findMany({
    where: {
      isCheckedIn: true,
    },
  });

  const currentDate = new Date();

  for (let i = 0; i < reservations.length; i++) {
    if (
      isSameDay(currentDate, reservations[i]!.lastTimeUpdated) === false &&
      isSameMonth(currentDate, reservations[i]!.lastTimeUpdated) === false &&
      isSameYear(currentDate, reservations[i]!.lastTimeUpdated) === false
    ) {
      //  console.log("these happened on different days");
      // add 1 day of usage
      await db.subscription.update({
        where: { userEmail: reservations[i]?.userEmail },
        data: { daysUsed: reservations[i]!.daysUsed + 1 },
      });

      await db.spent_day.create({
        data: {
          user_email: reservations[i]!.userEmail,
        },
      });
    }
  }
}

export async function is31DaysAfter(
  var1: number,
  var2: number,
): Promise<boolean> {
  const millisecondsInDay = 86400000; // 24 * 60 * 60 * 1000
  const var1Date = new Date(var1 * 1000); // Convert epoch seconds to milliseconds
  const var2Date = new Date(var2 * 1000);

  const differenceInMilliseconds = var1Date.getTime() - var2Date.getTime();
  const differenceInDays = Math.abs(
    differenceInMilliseconds / millisecondsInDay,
  );

  return differenceInDays <= 31;
}
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function GetGuestDetails(propertyId: number, guestId: number) {
  const url = "https://api.cloudbeds.com/api/v1.1/getGuest";

  const params = {
    propertyID: propertyId,
    guestID: guestId,
  };

  const apiKey = process.env.NEXT_PRIVATE_CLOUDBEDS_CLIENT_API_KEY!;

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const result: CB_get_user_response = response.data;
    return result; // Add this line to ensure the function returns a value
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optional: rethrow the error to handle it further up the call stack
  }
}
export async function get_available_room_types(
  propertyIDs: string,
  startDate: Date,
  endDate: Date,
  // rooms: number,
  // adults: number,
  // children: number,
) {
  const url = "https://api.cloudbeds.com/api/v1.1/getAvailableRoomTypes";
  const apiKey = process.env.NEXT_PRIVATE_CLOUDBEDS_CLIENT_API_KEY!;

  const starDateString = formatDateToYYMMDD(startDate);
  const endDateString = formatDateToYYMMDD(endDate);

  const params: getAvailableRoomTypes_payload = {
    propertyIDs: propertyIDs,
    startDate: starDateString,
    endDate: endDateString,
    rooms: 1,
    adults: 1,
    children: 0,
  };

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(response.data);
    const result: getAvailableRoomTypes_Result = response.data;
    console.log(result.data[0]?.propertyRooms);

    const FilteredResult = await get_available_room_types_by_gender(result);

    return FilteredResult; // Add this line to ensure the function returns a value
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optional: rethrow the error to handle it further up the call stack
  }
}

export async function get_available_room_types_by_gender(
  result: getAvailableRoomTypes_Result,
) {
  const propertyRooms = result.data[0]?.propertyRooms;
  const RoomsMap = new Map<string, propertyRoom>();

  // Transform the array into a map
  propertyRooms!.forEach((propertyRoom) => {
    // console.log("propertyRoom is as follows");
    // console.log(propertyRoom);
    RoomsMap.set(propertyRoom.roomTypeName, propertyRoom);
  });

  return RoomsMap;
}

export async function get_unassigned_rooms(propertyIds: number[]) {
  const url = "https://api.cloudbeds.com/api/v1.1/getRoomsUnassigned";
  const params = {
    propertyIDs: propertyIds,
  };

  const apiKey = process.env.NEXT_PRIVATE_CLOUDBEDS_CLIENT_API_KEY!;

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const result: CB_get_empty_rooms_response = response.data;
    return result; // Add this line to ensure the function returns a value
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optional: rethrow the error to handle it further up the call stack
  }
}
export async function getGendered_rooms(
  CB_get_empty_rooms_response: CB_get_empty_rooms_response,
) {
  const male_Rooms_twin_size: cb_room_subtype[] = [];
  const female_Rooms_twin_size: cb_room_subtype[] = [];

  const male_Rooms_fullsize: cb_room_subtype[] = [];
  const female_Rooms_fullsize: cb_room_subtype[] = [];

  const male_Rooms: cb_room_subtype[] = [];
  const female_Rooms: cb_room_subtype[] = [];
  for (let i = 0; i < CB_get_empty_rooms_response.data[0]!.rooms.length; i++) {
    const room_type_name_broken_down =
      CB_get_empty_rooms_response.data[0]!.rooms[i]?.roomTypeName.split(" ");
    if (room_type_name_broken_down![0] === "Male") {
      if (room_type_name_broken_down![3] === "Full") {
        male_Rooms_fullsize.push(
          CB_get_empty_rooms_response.data[0]!.rooms[i]!,
        );
      }
      if (room_type_name_broken_down![3] === "Twin") {
        male_Rooms_twin_size.push(
          CB_get_empty_rooms_response.data[0]!.rooms[i]!,
        );
      }

      male_Rooms.push(CB_get_empty_rooms_response.data[0]!.rooms[i]!);
    }
    if (room_type_name_broken_down![0] === "Female") {
      if (room_type_name_broken_down![3] === "Full") {
        female_Rooms_fullsize.push(
          CB_get_empty_rooms_response.data[0]!.rooms[i]!,
        );
      }
      if (room_type_name_broken_down![3] === "Twin") {
        female_Rooms_twin_size.push(
          CB_get_empty_rooms_response.data[0]!.rooms[i]!,
        );
      }

      female_Rooms.push(CB_get_empty_rooms_response.data[0]!.rooms[i]!);
    }
  }
  const omni_return = {
    og_response: CB_get_empty_rooms_response,
    male_Rooms: male_Rooms,
    female_Rooms: female_Rooms,
    male_Rooms_twin_size: male_Rooms_twin_size,
    female_Rooms_twin_size: female_Rooms_fullsize,
    male_Rooms_fullsize: male_Rooms_fullsize,
    female_Rooms_fullsize: female_Rooms_fullsize,
  };
  return omni_return;
}

export async function book_a_room(
  propertyID: number,
  startDate: Date,
  endDate: Date,
  guestEmail: string,
  // roomID: number,
  roomTypeID: number,
  fullname: string,
) {
  const url = "https://api.cloudbeds.com/api/v1.1/postReservation";
  const startDate1 = formatDateToYYMMDD(startDate);
  const endDate1 = formatDateToYYMMDD(endDate);

  let guestFirstName = fullname;
  let guestLastName = " ";
  const fullname_fragments = fullname.split(" ");

  if (fullname_fragments.length > 1) {
    // Create a new array without the first element
    const remaining_name_symbols: string[] = fullname_fragments.slice(1);

    // Concatenate the remaining strings into one string
    const concatenated_name: string = remaining_name_symbols.join("");

    guestFirstName = fullname_fragments[0]!;
    guestLastName = concatenated_name;
  }

  const params: Cloudbeds_post_reservation_payload = {
    propertyID: propertyID,
    startDate: startDate1,
    endDate: endDate1,
    guestFirstName: guestFirstName,
    guestLastName: guestLastName,
    guestCountry: "US",
    guestZip: "21000",
    guestEmail: guestEmail,
    rooms: [
      {
        roomTypeID: roomTypeID,
        quantity: 1,
        //  roomID: roomID_number,
      },
    ],
    adults: [
      {
        //  roomID: roomID_number,
        roomTypeID: roomTypeID,
        quantity: 1,
      },
    ],
    children: [
      {
        //  roomID: roomID_number,
        roomTypeID: roomTypeID,
        quantity: 0,
      },
    ],
    paymentMethod: "cash",
  };
  console.log("params");
  console.log(params);

  const apiKey = process.env.NEXT_PRIVATE_CLOUDBEDS_CLIENT_API_KEY!;

  // try {
  //   const response = await axios.post(url, {
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //     params,
  //   });
  //   const result: Cloudbeds_post_reservation_RESPONSE = response.data;
  //   console.log(result);
  //   // return result; // Add this line to ensure the function returns a value
  // } catch (error) {
  //   console.error("Error:", error);
  //   throw error; // Optional: rethrow the error to handle it further up the call stack
  // }

  const data: FormData = new FormData();
  data.append("startDate", params.startDate);
  data.append("endDate", params.endDate);
  data.append("guestFirstName", params.guestFirstName);
  data.append("guestLastName", params.guestLastName);
  data.append("guestCountry", params.guestCountry);
  data.append("guestZip", params.guestZip);
  data.append("guestEmail", params.guestEmail);
  data.append("guestPhone", "654123987");
  data.append("paymentMethod", "cash");
  data.append("propertyID", propertyID.toString());
  data.append("rooms[0][roomTypeID]", params.rooms[0]!.roomTypeID.toString());
  // data.append("rooms[0][roomTypeID]", "598925");
  data.append("rooms[0][quantity]", "1");
  // data.append("rooms[0][roomID]", params.rooms[0]!.roomID!.toString());
  data.append("adults[0][quantity]", "1");
  //  data.append("adults[0][roomID]", params.adults[0]!.roomID!.toString());
  data.append("adults[0][roomTypeID]", params.adults[0]!.roomTypeID.toString());
  data.append("children[0][quantity]", "0");
  // data.append("children[0][roomID]", params.children[0]!.roomID!.toString());
  data.append(
    "children[0][roomTypeID]",
    params.children[0]!.roomTypeID.toString(),
  );

  const config: AxiosRequestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "x-api-key": apiKey,
      Cookie:
        "acessa_session=d4a791d913c603b7a51fa345a4199048f6f53755; acessa_session_enabled=1",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const result: Cloudbeds_post_reservation_RESPONSE = response.data;
    console.log(result);
    console.log(JSON.stringify(response.data));
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function formatDateToYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
