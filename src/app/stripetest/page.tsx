"use client";
import React from "react";
import { api } from "@/trpc/react";
const StripeTest = () => {
  const Test_stripe_test = api.booking.StripeTest.useMutation({});

  const SummonStripe = api.booking.RentRoom.useMutation({
    onSuccess: (value) => {
      console.log(value);

      window.location.href = value!;
    },
  });

  async function handleDoStripe() {
    SummonStripe.mutate({ roomNumber: "5", duration: 5 });
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
      <button
        className="m-5 bg-black p-5 text-white"
        onClick={async () => {
          await handle_Test_stripe_test();
        }}
      >
        DO THE TEST{" "}
      </button>
    </div>
  );
};

export default StripeTest;
