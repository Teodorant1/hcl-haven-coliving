"use client";
import { type CalendarDateRangePickerProps } from "project-types";
import { CalendarDateRangePicker } from "@/app/_components/date-range-picker";
import React from "react";

function DashboardModal({
  className,
  date,
  setDate,
}: CalendarDateRangePickerProps) {
  return (
    <div className="z-20 mx-auto max-h-screen max-w-full  p-4 sm:py-8 md:py-10 lg:px-6">
      <section className="grid gap-6">
        <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          Your plan ends May 12. You have 3 days left
        </h1>
        <div className="grid gap-4 md:grid-cols-4 md:gap-6">
          <div className="md:col-span-2">
            <div className=" gap-4">
              {/* <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="check-in"
                >
                  Check in
                </label>
                <button
                  className="inline-flex h-auto w-full flex-col items-start justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:R9mdafnnja:"
                  data-state="closed"
                >
                  <span className="text-[0.65rem] font-semibold uppercase">
                    Check in
                  </span>
                  <span className="font-normal">Select date</span>
                </button>
              </div>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="check-out"
                >
                  Check out
                </label>
                <button
                  className="inline-flex h-auto w-full flex-col items-start justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:Ramdafnnja:"
                  data-state="closed"
                >
                  <span className="text-[0.65rem] font-semibold uppercase">
                    Check out
                  </span>
                  <span className="font-normal">Select date</span>
                </button>
              </div> */}
              <div className="m-2">Check In & Check Out</div>
              <div>
                <CalendarDateRangePicker date={date} setDate={setDate} />
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <button
              className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              //   type="submit"
              onClick={() => {
                console.log(date);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="mt-10 grid gap-6">
        <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          Available Beds
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Twin Sized Bed
              </h3>
            </div>
            <div className="p-6">
              <p>$100 per night</p>
              <p>Amenities: Free Wi-Fi, TV, Mini Fridge</p>
            </div>
            <div className="flex items-center p-6">
              <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Book Now
              </button>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Full Sized Bed
              </h3>
            </div>
            <div className="p-6">
              <p>$150 per night</p>
              <p>Amenities: Free Wi-Fi, TV, Mini Fridge, Coffee Maker</p>
            </div>
            <div className="flex items-center p-6">
              <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default DashboardModal;
