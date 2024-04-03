"use client";
import React from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
const StripeTest = () => {
  const router = useRouter();

  const SummonStripe = api.booking.RentRoom.useMutation({
    onSuccess: (value) => {
      console.log(value.url);
      router.push(value.url);
    },
  });

  async function handleDoStripe() {
    SummonStripe.mutate({ roomNumber: "5", duration: 5 });
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
    </div>
  );
};

export default StripeTest;
