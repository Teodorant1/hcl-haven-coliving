"use client";
import React from "react";
import { type DashBoardPageProps } from "project-types";

const DashboardConfirmedModal = (props: DashBoardPageProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Booking Confirmation
          </h2>
        </div>
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-md">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Booking Details</h3>
            <p className="text-gray-600">Hotel Name: Haven-Coliving</p>
            <p className="text-gray-600">
              Room Type{": "}{" "}
              {props.CBEDS_response?.unassigned[0]!.roomTypeName}
            </p>
            <p className="text-gray-600">
              Check-in: {props.CBEDS_response?.startDate.toString()}
            </p>
            <p className="text-gray-600">
              Check-out:{props.CBEDS_response?.endDate.toString()}
            </p>
            <p className="text-gray-600">
              Total Price: {" $"}
              {props.CBEDS_response?.grandTotal}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Guest Information</h3>
            <p className="text-gray-600">
              Name{": "} {props.CBEDS_response?.guestFirstName}{" "}
              {props.CBEDS_response?.guestLastName}{" "}
            </p>
            <p className="text-gray-600">
              Email{": "} {props.CBEDS_response?.guestEmail}
            </p>
            {/* <p className="text-gray-600">
              Phone: +1 234 567 890 {props.CBEDS_response?.guestEmail}
            </p> */}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Confirmation</h3>
            <p className="text-gray-600">
              Your booking has been confirmed. A confirmation email has been
              sent to your email address.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <a href="#">Back to Homepage</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConfirmedModal;
