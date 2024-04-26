"use client";
import { type CalendarDateRangePickerProps } from "project-types";
import { CalendarDateRangePicker } from "@/app/_components/date-range-picker";
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";

function DashboardModal({
  date,
  setDate,
  setStage,
}: CalendarDateRangePickerProps) {
  const session = useSession();
  const unassigned_rooms =
    api.booking.Get_AvailableRooms_From_Cloudbeds.useQuery();

  const book_a_room = api.booking.Book_a_room.useMutation({
    onSuccess: () => {
      // setapplicationSent(true);
      setStage("3");
    },
  });

  async function handle_book_a_room(type: string) {
    book_a_room.mutate({
      type: type,
      gender: session.data!.user.genderSex,
      propertyID: 309910,
      startDate: date!.from!,
      endDate: date!.to!,
    });
  }

  return (
    <div className="z-20 mx-auto max-h-screen max-w-full  p-4 sm:py-8 md:py-10 lg:px-6">
      <section className="grid gap-6">
        <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          Your plan ends May 12. You have 3 days left
        </h1>
        <div className="grid gap-4 md:grid-cols-4 md:gap-6">
          <div className="md:col-span-2">
            <div className=" gap-4">
              <div className="m-2">Check In & Check Out</div>
              <div>
                <CalendarDateRangePicker
                  date={date}
                  setDate={setDate}
                  setStage={setStage}
                />
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
              Search for available beds
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
                Twin Sized Bed -{" "}
                {session.data?.user.genderSex === "Male" && (
                  <>{unassigned_rooms.data?.male_Rooms_twin_size.length} </>
                )}{" "}
                {session.data?.user.genderSex === "Female" && (
                  <>{unassigned_rooms.data?.female_Rooms_twin_size.length} </>
                )}{" "}
                Available
              </h3>
            </div>
            <div className="p-6">
              <p>$100 per night</p>
              <p>Amenities: Free Wi-Fi, TV, Mini Fridge</p>
            </div>
            {unassigned_rooms.data &&
              session.data?.user.genderSex === "Female" &&
              unassigned_rooms.data.female_Rooms_twin_size.length > 0 && (
                <div className="flex items-center p-6">
                  <button
                    onClick={() => {
                      setStage("3");
                    }}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Now
                  </button>
                </div>
              )}{" "}
            {unassigned_rooms.data &&
              session.data?.user.genderSex === "Male" &&
              unassigned_rooms.data.male_Rooms_twin_size.length > 0 && (
                <div className="flex items-center p-6">
                  <button
                    onClick={() => {
                      setStage("3");
                    }}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Now
                  </button>
                </div>
              )}
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Full Sized Bed-{" "}
                {session.data?.user.genderSex === "Male" && (
                  <>{unassigned_rooms.data?.male_Rooms_fullsize.length} </>
                )}{" "}
                {session.data?.user.genderSex === "Female" && (
                  <>{unassigned_rooms.data?.female_Rooms_fullsize.length} </>
                )}{" "}
                Available
              </h3>
            </div>
            <div className="p-6">
              <p>$150 per night</p>
              <p>Amenities: Free Wi-Fi, TV, Mini Fridge, Coffee Maker</p>
            </div>
            {unassigned_rooms.data &&
              session.data?.user.genderSex === "Female" &&
              unassigned_rooms.data.female_Rooms_fullsize.length > 0 && (
                <div className="flex items-center p-6">
                  <button
                    onClick={() => {
                      setStage("3");
                    }}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Now
                  </button>
                </div>
              )}{" "}
            {unassigned_rooms.data &&
              session.data?.user.genderSex === "Male" &&
              unassigned_rooms.data.male_Rooms_fullsize.length > 0 && (
                <div className="flex items-center p-6">
                  <button
                    onClick={() => {
                      setStage("3");
                    }}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Now
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default DashboardModal;
