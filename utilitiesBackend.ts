/* eslint-disable @typescript-eslint/prefer-for-of */
import { db } from "@/server/db";
import bcrypt from "bcrypt";

export async function getImprovSession(email: string): Promise<{
  email: string | undefined;
  isAdmin: boolean | undefined;
  isApproved: boolean | undefined;
}> {
  // console.log("getImprovSession for " + email);

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

export async function PeriodBookkeeping() {
  //get all subscriptions
  const subscriptions = await db.subscription.findMany();
  //for each sub
  for (let i = 0; i < subscriptions.length; i++) {
    console.log(subscriptions[i]);
    // with STRIPE npm package check if last payment happened LESS THAN 30 days ago
    //maybe add some checks for weird daylight savings stuff
    //then check the status of the latest invoice
    //if invoice is valid, update the  subscription in db
  }

  return "23984";
}

function is31DaysAfter(var1: number, var2: number): boolean {
  const millisecondsInDay = 86400000; // 24 * 60 * 60 * 1000
  const var1Date = new Date(var1 * 1000); // Convert epoch seconds to milliseconds
  const var2Date = new Date(var2 * 1000);

  const differenceInMilliseconds = var1Date.getTime() - var2Date.getTime();
  const differenceInDays = Math.abs(
    differenceInMilliseconds / millisecondsInDay,
  );

  return differenceInDays <= 31;
}

export async function PeriodBookkeeping1() {
  console.log(" ");
}
