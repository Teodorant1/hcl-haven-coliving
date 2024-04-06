"use client";
import React from "react";
import { api } from "@/trpc/react";
const StripeTest = () => {
  const Test_stripe_test = api.booking.StripeTest.useMutation({});

  const SummonStripe = api.booking.BuySubscription.useMutation({
    onSuccess: (value) => {
      console.log(value);

      window.location.href = value!;
    },
  });

  async function handleDoStripe() {
    SummonStripe.mutate({
      quantity: 10,
      packageName: "10 bucks per day sub",
      priceID: "price_1P2BUrJsSW6jGUhs29zRsnYW",
      description: "handledoStripe description",
    });
  }

  async function handle_Test_stripe_test() {
    Test_stripe_test.mutate({});
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
