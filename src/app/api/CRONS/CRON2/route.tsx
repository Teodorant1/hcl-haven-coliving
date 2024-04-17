/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { handle_room_usage_metrics } from "utilitiesBackend";

export async function POST(req: NextRequest) {
  await handle_room_usage_metrics();

  return NextResponse.json({ received: true, status: 200 });
}
