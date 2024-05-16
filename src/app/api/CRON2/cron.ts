/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { handle_room_usage_metrics } from "utilitiesBackend";

export default async function handler() {
  try {
    console.log("starting cron2");

    await handle_room_usage_metrics();

    return NextResponse.json({ received: true, status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      error: error,
    });
  }
}
