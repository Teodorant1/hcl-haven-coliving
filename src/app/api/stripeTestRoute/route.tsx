import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();
  console.log();
  //   const parcel1: parcel = body;
  //   console.log("phonelogin");
  //   console.log(parcel1);

  //   const foundUser = await prisma.user.findUnique({
  //     where: {
  //       email: parcel1.email,
  //     },
  //   });

  return NextResponse.json({ email: "newuser.email" });
}
