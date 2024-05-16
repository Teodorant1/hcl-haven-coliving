/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { handle_room_usage_metrics } from "utilitiesBackend";

export async function GET(req: NextRequest) {
  console.log("starting cron2");

  await handle_room_usage_metrics();

  return NextResponse.json({ received: true, status: 200 });
}
