"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { addDays } from "date-fns";
// import { addDays } from "date-fns";

const StripeTest = () => {
  const [currentDate, setcurrentDate] = useState<Date | undefined>(new Date());
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 7));

  // const buyExtraDay = api.booking.BuyExtraDay.useMutation({
  //   onSuccess: (value) => {
  //     console.log(value);
  //     window.location.href = value!;
  //   },
  // });
  const session = useSession();
  const buysub = api.booking.BuySubscription.useMutation({
    onSuccess: (value) => {
      console.log(value);
      window.location.href = value!;
    },
  });

  const dotheTest = api.booking.StripeAPI_TEST_Function.useMutation({});

  async function handleDoTest() {
    dotheTest.mutate();
  }

  async function handle_buy_subscription() {
    buysub.mutate({
      method: "buy_subscription",
      number_of_days: 10,
    });
  }

  const doCBtest1 = api.booking.cloudbedsTest1.useMutation({});

  async function handle_doCBtest1() {
    doCBtest1.mutate();
  }
  const unassigned_rooms =
    api.booking.Get_AvailableRooms_From_Cloudbeds.useQuery();

  const available_room_types =
    api.booking.Get_Room_Types_From_Cloudbeds.useQuery({
      propertyIDs: "309910",
      startDate: currentDate!,
      endDate: date!,
      // gender: session.data!.user?.genderSex,
    });

  // async function handle_buyExtraDay() {
  //   buyExtraDay.mutate({
  //     packageName: "600 BUCKS - 15 DAYS",
  //     method: ""
  //   });
  // }

  return (
    <div>
      CHECKOUT{" "}
      {/* <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await handle_buy_subscription();
        }}
      >
        CLICK ME TO SUMMON CHECKOUT{" "}
      </button>
      <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await handleDoTest();
        }}
      >
        DO THE TEST{" "}
      </button>{" "}
      <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await handle_doCBtest1();
        }}
      >
        handle_doCBtest1{" "}
      </button> */}
      {/* <button
        onClick={async () => {
          console.log(unassigned_rooms.data!);
        }}
        className="m-5 bg-black p-5 text-white"
      >
        print out free rooms
      </button>{" "} */}
      <button
        onClick={async () => {
          console.log(available_room_types.data);
        }}
        className="m-5 bg-black p-5 text-white"
      >
        print out AVAILABLE ROOMS
      </button>
      {available_room_types.data?.has("Female Dormitory - Twin Size Bed") ? (
        <button className="m-5 bg-black p-5 text-white">
          Female Dormitory - Twin Size Bed is available
        </button>
      ) : (
        <button className="m-5 bg-red-600 p-5 text-white">
          Female Dormitory - Twin Size Bed Doesnt is not available{" "}
        </button>
      )}
      {available_room_types.data?.has(
        "Female Dormitory - Twin Size Bed - 12 Bed",
      ) ? (
        <button className="m-5 bg-black p-5 text-white">
          Female Dormitory - Twin Size Bed - 12 Bed is available
        </button>
      ) : (
        <button className="m-5 bg-red-600 p-5 text-white">
          Female Dormitory - Twin Size Bed - 12 Bed Doesnt is not available{" "}
        </button>
      )}
    </div>
  );
};

export default StripeTest;
