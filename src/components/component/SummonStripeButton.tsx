"use client";
import React from "react";

interface StripeButtonProps {
  priceID: string;
  color: string;
}

const StripeButton: React.FC<StripeButtonProps> = ({ priceID, color }) => {
  const handleClick = () => {
    console.log("onClick();");
  };

  return (
    <button className="m-3 bg-black p-3 text-white" onClick={handleClick}>
      {priceID}
    </button>
  );
};

export default StripeButton;
