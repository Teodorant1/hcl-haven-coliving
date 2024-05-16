/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { Stripe_PeriodBookkeeping } from "utilitiesBackend";

export async function GET(req: NextRequest) {
  console.log("starting cron1");
  await Stripe_PeriodBookkeeping();

  return NextResponse.json({ received: true, status: 200 });
}
