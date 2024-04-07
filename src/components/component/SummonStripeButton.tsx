"use client";
import React from "react";
import { api } from "@/trpc/react";
interface StripeButtonProps {
  packageName: string;
}

const SummonStripeSubscriptionButton: React.FC<StripeButtonProps> = ({
  packageName,
}) => {
  const buy_subscription = api.booking.BuySubscription.useMutation({
    onSuccess: (value) => {
      console.log(value);
      window.location.href = value!;
    },
  });

  async function handle_buy() {
    buy_subscription.mutate({
      packageName: packageName,
      method: "buy_subscription",
    });
  }

  return (
    <button className="m-3 bg-black p-3 text-white" onClick={handle_buy}>
      PURCHASE {packageName}
    </button>
  );
};

export default SummonStripeSubscriptionButton;
