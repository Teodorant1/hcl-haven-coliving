"use client";
import React from "react";
import { api } from "@/trpc/react";
const StripeTest = () => {
  const buyExtraDay = api.booking.BuyExtraDay.useMutation({});

  const buysub = api.booking.BuySubscription.useMutation({
    onSuccess: (value) => {
      console.log(value);

      window.location.href = value!;
    },
  });

  async function handleDoStripe() {
    buysub.mutate({
      quantity: 10,
      packageName: "10 bucks per day sub",
      priceID: "price_1P2BUrJsSW6jGUhs29zRsnYW",
      description: "handledoStripe description",
    });
  }

  async function handle_buyExtraDay() {
    buyExtraDay.mutate({});
  }

  return (
    <div>
      CHECKOUT{" "}
      <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await handleDoStripe();
        }}
      >
        CLICK ME TO SUMMON CHECKOUT{" "}
      </button>
      {/* <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await handle_Test_stripe_test();
        }}
      >
        DO THE TEST{" "}
      </button> */}
    </div>
  );
};

export default StripeTest;
