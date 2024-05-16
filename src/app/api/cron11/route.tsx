import { NextResponse } from "next/server";
import { Stripe_PeriodBookkeeping } from "utilitiesBackend";

export async function GET() {
  console.log("starting cron1");
  console.log("starting cron1");
  await Stripe_PeriodBookkeeping();

  return NextResponse.json({ received: true, status: 200 });
}
