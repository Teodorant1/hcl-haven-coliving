/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import { Resend } from "resend";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import axios from "axios";
import { type CB_get_user_response } from "project-types";

export async function getImprovSession(email: string): Promise<{
  email: string | undefined;
  isAdmin: boolean | undefined;
  isApproved: boolean | undefined;
}> {
  const adhocSession = await db.hCL_user.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
      isAdmin: true,
      isApproved: true,
    },
  });

  if (adhocSession) {
    const adhocSessionRedux = {
      email: adhocSession?.email,
      isAdmin: adhocSession?.isAdmin,
      isApproved: adhocSession?.isApproved,
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

  //for each sub
  for (let i = 0; i < subscriptions.length; i++) {
    console.log(subscriptions[i]);
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

export async function handle_room_usage_metrics() {
  const reservations = await db.cloudbeds_reservation.findMany({
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
      console.log("these happened on different days");
      // add 1 day of usage
    }
  }

  console.log("!@$");
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

export async function GetGuestDetails(
  guestId: number,
  // reservationId: string,
  propertyId: number,
) {
  const url = "https://api.cloudbeds.com/api/v1.1/getGuest";
  const params = {
    propertyID: guestId,
    guestID: propertyId,
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
    console.log("RESULT IS AS FOLLOWS");
    console.log(result);
    return result; // Add this line to ensure the function returns a value
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optional: rethrow the error to handle it further up the call stack
  }
}
