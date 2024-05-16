import { NextResponse } from "next/server";
import { Stripe_PeriodBookkeeping } from "utilitiesBackend";

export default async function handler() {
  try {
    console.log("starting cron1");
    await Stripe_PeriodBookkeeping();

    return NextResponse.json({ received: true, status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      error: error,
    });
  }
}
