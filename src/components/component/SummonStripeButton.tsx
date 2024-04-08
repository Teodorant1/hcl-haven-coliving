"use client";
import React from "react";
import { api } from "@/trpc/react";
interface StripeButtonProps {
  NumberOfDays: number;
}

const SummonStripeSubscriptionButton: React.FC<StripeButtonProps> = ({
  NumberOfDays,
}) => {
  const buy_subscription = api.booking.BuySubscription.useMutation({
    onSuccess: (value) => {
      console.log(value);
      window.location.href = value!;
    },
  });

  async function handle_buy() {
    buy_subscription.mutate({
      // packageName: "packageName",
      method: "buy_subscription",
      number_of_days: NumberOfDays,
    });
  }

  return (
    <button className="m-3 bg-black p-3 text-white" onClick={handle_buy}>
      SUBSCRIBE
    </button>
  );
};

export default SummonStripeSubscriptionButton;
