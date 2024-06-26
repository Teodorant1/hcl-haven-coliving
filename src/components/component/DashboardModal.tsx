/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { type DashBoardPageProps } from "project-types";
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import {
  isAfterToday,
  Calculate_number_of_days_between_two_dates,
  calculateDaysInMonthRange_price,
} from "utilities";
import { CalendarDateRangePicker } from "@/_components/date-range-picker";
function DashboardModal(DashBoardPageProps: DashBoardPageProps) {
  const session = useSession();
  const [currentDate, setcurrentDate] = React.useState<Date>(new Date());

  const book_a_room = api.booking.Book_a_room.useMutation({
    onSuccess: (reservationResponse) => {
      console.log(reservationResponse);
      DashBoardPageProps.setStage("3");
      if (DashBoardPageProps?.setCBEDS_response) {
        DashBoardPageProps.setCBEDS_response(reservationResponse!);
      }
    },
  });

  const available_room_types =
    api.booking.Get_Room_Types_From_Cloudbeds.useQuery({
      propertyIDs: "309910",
      startDate: DashBoardPageProps.date?.from!,
      endDate: DashBoardPageProps.date?.to!,
      // gender: session.data!.user?.genderSex,
    });

  async function handle_book_a_room(roomTypeID: number) {
    book_a_room.mutate({
      propertyID: 309910,
      startDate: DashBoardPageProps.date?.from!,
      endDate: DashBoardPageProps.date?.to!,
      roomTypeID: roomTypeID,
    });
  }

  return (
    <div className="z-20 mx-auto max-h-screen max-w-full  p-4 sm:py-8 md:py-10 lg:px-6">
      <section className="grid gap-6">
        {/* {DashBoardPageProps.date?.from &&
          DashBoardPageProps.date?.to &&
          DashBoardPageProps.subscription?.NumberOfBoughtDays && (
            <button
              onClick={() => {
                calculateDaysInMonthRange_price(
                  DashBoardPageProps.date!.from!,
                  DashBoardPageProps.date!.to!,
                  DashBoardPageProps.subscription?.NumberOfBoughtDays!,
                );
              }}
              className="m-5 bg-black p-5 text-white"
            >
              {" "}
              handle calculate_Days_In_MonthRange{" "}
            </button>
          )} */}
        <h1 className=" text-4xl font-extrabold tracking-tight lg:text-3xl">
          Your plan ends{" "}
          {DashBoardPageProps.subscription!.currentPeriod_end.toDateString()}.
          You have{" "}
          {Calculate_number_of_days_between_two_dates(
            currentDate,
            DashBoardPageProps.subscription!.currentPeriod_end,
          )}{" "}
          days left ,{" "}
          {DashBoardPageProps.subscription?.price && (
            <>
              your subcsription gives you $
              {DashBoardPageProps.subscription?.price} per month
            </>
          )}
          {DashBoardPageProps.date?.from! && DashBoardPageProps.date?.to! && (
            <>
              , current selection will cost{" "}
              {/* {Calculate_price_for_dashboard_reservation(
                DashBoardPageProps.date?.from,
                DashBoardPageProps.date?.to,
                DashBoardPageProps.subscription?.NumberOfBoughtDays!,
              )}
              {"/////"}{" "} */}
              $
              {calculateDaysInMonthRange_price(
                DashBoardPageProps.date?.from,
                DashBoardPageProps.date?.to,
                DashBoardPageProps.subscription?.NumberOfBoughtDays!,
              )}
            </>
          )}
        </h1>
        <div className="  justify-start gap-4 md:grid-cols-4 md:gap-6">
          <div className=" left-5 flex flex-row content-evenly md:col-span-2">
            <div className=" m-5 gap-4">
              <div className="m-2 flex justify-center">
                Check In & Check Out
              </div>

              <CalendarDateRangePicker
                date={DashBoardPageProps.date}
                setDate={DashBoardPageProps.setDate}
                setStage={DashBoardPageProps.setStage}
              />
            </div>{" "}
            <div className="m-5 flex items-end">
              <button
                className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                //   type="submit"
                onClick={() => {
                  available_room_types.refetch;
                  // console.log(DashBoardPageProps.date);
                  // console.log(available_room_types.data);
                }}
              >
                Search for available beds
              </button>{" "}
              {/* <button
                className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                //   type="submit"
                onClick={() => {
                  console.log(date);
                  console.log(available_room_types.data);
                }}
              >
                print available beds
              </button> */}
            </div>
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
                Twin Sized Bed{" "}
                {/* {session.data?.user.genderSex === "Male" && (
                  <>
                    {" "}
                    {available_room_types.data?.has(
                      "Female Dormitory - Twin Size Bed",
                    ) ? (
                      <button className="m-5 bg-black p-5 text-white">
                        Female Dormitory - Twin Size Bed is available
                      </button>
                    ) : (
                      <button className="m-5 bg-red-600 p-5 text-white">
                        Female Dormitory - Twin Size Bed Doesnt is not available{" "}
                      </button>
                    )}{" "}
                  </>
                )}{" "}
                {session.data?.user.genderSex === "Female" && (
                  <>
                    {" "}
                    {available_room_types.data?.has(
                      "Female Dormitory - Twin Size Bed",
                    ) ? (
                      <button className="m-5 bg-black p-5 text-white">
                        Female Dormitory - Twin Size Bed is available
                      </button>
                    ) : (
                      <button className="m-5 bg-red-600 p-5 text-white">
                        Female Dormitory - Twin Size Bed Doesnt is not available{" "}
                      </button>
                    )}{" "}
                  </>
                )}{" "}
                Available */}
              </h3>
            </div>
            <div className="p-6">
              <p>$100 per night</p>
              <p>Amenities: Free Wi-Fi, TV, Mini Fridge</p>
            </div>
            {isAfterToday(currentDate, DashBoardPageProps.date?.from) &&
              available_room_types.data &&
              session.data?.user.genderSex === "Female" &&
              available_room_types.data.has(
                "Female Dormitory - Twin Size Bed",
              ) && (
                <div className="flex items-center p-6">
                  <button
                    onClick={async () => {
                      await handle_book_a_room(
                        available_room_types.data.get(
                          "Female Dormitory - Twin Size Bed",
                        )!.roomTypeID,
                      );
                    }}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Now
                  </button>
                </div>
              )}{" "}
            {isAfterToday(currentDate, DashBoardPageProps.date?.from) &&
              available_room_types.data &&
              session.data?.user.genderSex === "Male" &&
              available_room_types.data.has(
                "Male Dormitory - Twin Size Bed - 12 Bed",
              ) && (
                <div className="flex items-center p-6">
                  <button
                    onClick={async () => {
                      await handle_book_a_room(
                        available_room_types.data.get(
                          "Male Dormitory - Twin Size Bed - 12 Bed",
                        )!.roomTypeID,
                      );
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
                Full Sized Bed{" "}
              </h3>
            </div>
            <div className="p-6">
              <p>$150 per night</p>
              <p>Amenities: Free Wi-Fi, TV, Mini Fridge, Coffee Maker</p>
            </div>
            {isAfterToday(currentDate, DashBoardPageProps.date?.from) &&
              available_room_types.data &&
              session.data?.user.genderSex === "Female" &&
              available_room_types.data.has(
                "Female Dormitory - Full Size Bed",
              ) && (
                <div className="flex items-center p-6">
                  <button
                    onClick={async () => {
                      await handle_book_a_room(
                        available_room_types.data.get(
                          "Female Dormitory - Full Size Bed",
                        )!.roomTypeID,
                      );
                    }}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book Now
                  </button>
                </div>
              )}{" "}
            {isAfterToday(currentDate, DashBoardPageProps.date?.from) &&
              available_room_types.data &&
              session.data?.user.genderSex === "Male" &&
              available_room_types.data.has(
                "Male Dormitory - Full Size Bed",
              ) && (
                <div className="flex items-center p-6">
                  <button
                    onClick={async () => {
                      await handle_book_a_room(
                        available_room_types.data.get(
                          "Male Dormitory - Full Size Bed",
                        )!.roomTypeID,
                      );
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
