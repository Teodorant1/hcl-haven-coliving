"use client";
import React from "react";
import { api } from "@/trpc/react";
const StripeTest = () => {
  // const buyExtraDay = api.booking.BuyExtraDay.useMutation({
  //   onSuccess: (value) => {
  //     console.log(value);
  //     window.location.href = value!;
  //   },
  // });

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

  // async function handle_buyExtraDay() {
  //   buyExtraDay.mutate({
  //     packageName: "600 BUCKS - 15 DAYS",
  //     method: ""
  //   });
  // }

  return (
    <div>
      CHECKOUT{" "}
      <button
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
      </button>
      <button
        onClick={async () => {
          console.log(unassigned_rooms.data!);
        }}
        className="m-5 bg-black p-5 text-white"
      >
        print out free rooms
      </button>
    </div>
  );
};

export default StripeTest;
