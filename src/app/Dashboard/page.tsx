/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { MainNav } from "../_components/main-nav";
import { Overview } from "../../_components/overview";
import { StaysOverview } from "../../_components/StaysOverview";
// import { Search } from "../_components/search";
// import TeamSwitcher from "../_components/team-switcher";
// import { UserNav } from "../_components/user-nav";
import { useState } from "react";
import { addDays } from "date-fns";
import DashboardModal from "@/components/component/DashboardModal";
import DashboardConfirmedModal from "@/components/component/DashboardConfirmedModal";
import { type Cloudbeds_post_reservation_RESPONSE } from "project-types";
import { useSession } from "next-auth/react";
import { CalendarDateRangePicker } from "../../_components/date-range-picker";
import { type DateRange } from "react-day-picker";
import React from "react";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// import { Date_isBetween_other_dates } from "utilities";

export default function DashboardPage() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [stage, setstage] = useState<string | undefined>("1");
  // const [currentDate, setcurrentDate] = useState<Date | undefined>(new Date());
  // const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [CBEDS_response, setCBEDS_response] = useState<
    Cloudbeds_post_reservation_RESPONSE | undefined
  >();
  const [currentDate, setcurrentDate] = React.useState<Date>(new Date());
  const [dateRange, setdateRange] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 0),
    to: addDays(new Date(), 7),
  });
  const myreservations = api.booking.getMyReservations.useQuery();
  const subscription = api.booking.GetSubscription.useQuery();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session]);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     void myreservations.refetch();
  //     void subscription.refetch();
  //   }
  // }, []);
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     void myreservations.refetch();
  //     void subscription.refetch();
  //   }
  // }, [session]);

  // const Update_all_reservations =
  //   api.booking.Update_all_reservations.useMutation({
  //     onSuccess: () => {
  //       console.log("OP SUCCESS");
  //     },
  //   });

  // function createBunches_of_test_reservations() {
  //   Update_all_reservations.mutate({
  //     propertyID: 0,
  //   });
  // }
  return (
    <>
      {" "}
      {/* <button
        onClick={() => {
          console.log(subscription.data);
        }}
        className="m-5 bg-black p-5 text-white"
      >
        {" "}
        LOG MY SUBSCRIPTION{" "}
      </button>{" "} */}
      {/* <button
        onClick={() => {
          console.log(myreservations.data);
        }}
        className="m-5 bg-black p-5 text-white"
      >
        {" "}
        LOG MY RESERVATIONS{" "}
      </button> */}
      {/* <button
        onClick={() => {
          createBunches_of_test_reservations();
        }}
        className="m-5 bg-black p-5 text-white"
      >
        {" "}
        UPDATE RESERVATIONS{" "}
      </button> */}
      {/* <button
        onClick={() => {
          console.log(reservations.data);
        }}
        className="m-5 bg-black p-5 text-white"
      >
        {" "}
        PRINT RESERVATIONS{" "}
      </button>

      <button
        onClick={() => {
          console.log(reservations.data?.data[0]!.guestID);
          console.log(
            reservations.data?.data[0]?.guestList[
              reservations.data?.data[0].guestID
            ],
          );
        }}
        className="m-5 bg-black p-5 text-white"
      >
        {" "}
        PRINT 1st RESERVATION user and email{" "}
      </button> */}
      {session?.user.isApproved === true && (
        <>
          {" "}
          {stage === "4" && subscription.data && (
            <button
              onClick={() => {
                setstage("1");
              }}
              className="m-5 bg-black p-5 text-white"
            >
              {" "}
              Go back to main Dashboard{" "}
            </button>
          )}{" "}
          {stage === "4" && subscription.data && (
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Stay overview</CardTitle>
                <CardDescription>All past and upcoming stays</CardDescription>
              </CardHeader>
              <CardContent>
                <StaysOverview
                  success={myreservations.data?.success!}
                  data={myreservations.data?.data!}
                  number_of_rows={myreservations.data?.data!.length}
                />
              </CardContent>
            </Card>
          )}
          {stage === "2" && subscription.data && (
            <DashboardModal
              date={dateRange}
              setDate={setdateRange}
              setStage={setstage}
              setCBEDS_response={setCBEDS_response}
              CBEDS_response={CBEDS_response}
              subscription={subscription.data}
            />
          )}
          {/* <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div> */}
          {/* <button
            onClick={() => {
              isBefore_11_am_for_today(dateRange?.from!);
            }}
          >
            handle isAfterToday function
          </button> */}
          {stage === "3" && CBEDS_response && (
            <DashboardConfirmedModal
              date={dateRange}
              setDate={setdateRange}
              setStage={setstage}
              CBEDS_response={CBEDS_response}
              setCBEDS_response={setCBEDS_response}
            />
          )}
          {stage === "1" && (
            <div className="flex flex-col">
              {/* <div className="hidden flex-col md:flex"> */}
              {/* <div className="border-b">
                <div className="flex h-16 items-center px-4">
                  <TeamSwitcher />
                  <MainNav className="mx-6" />
                  <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <UserNav />
                  </div>
                </div>
              </div> */}
              <div className="flex-1 space-y-4 p-8 pt-6">
                {/* {
                  subscription.data.check_in   === null &&
                  subscription.data.check_out === null && (
                    <button className="m-5 bg-black p-5 text-white ">
                      {Date_isBetween_other_dates(
                        currentDate,
                        subscription.data.check_in!,
                        subscription.data.check_out!,
                      ) === null && <>is null</>}{" "}
                      false
                    </button>
                  )}{" "}
                {subscription.data?.check_in && subscription.data.check_out && (
                  // Date_isBetween_other_dates(
                  //   currentDate,
                  //   subscription.data!.check_in,
                  //   subscription.data!.check_out,
                  // ) &&
                  <button className="m-5 bg-black p-5 text-white ">true</button>
                )} */}

                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                  </h2>{" "}
                  {/* {
                    !subscription.data.check_in &&
                    !subscription.data.check_out && ( */}
                  <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker
                      date={dateRange}
                      setDate={setdateRange}
                      setStage={setstage}
                      // CBEDS_response={CBEDS_response}
                      // setCBEDS_response={setCBEDS_response}
                    />
                    {/* <Single_day_calendar
                      date={date}
                      setDate={setDate}
                      setStage={setstage}
                      currentDate={currentDate}
                    /> */}
                    <Button
                      onClick={() => {
                        setstage("2");
                      }}
                    >
                      Book Stay
                    </Button>{" "}
                    <Button
                      // href="/api/auth/signout"
                      // className="m-3 p-3 text-sm font-medium underline-offset-4 outline hover:underline"
                      className="bg-white text-black outline"
                    >
                      Log Out
                    </Button>
                  </div>
                  {/* )} */}
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports" disabled>
                      Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications" disabled>
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Nights included{" "}
                            </CardTitle>
                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg> */}
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {subscription.data?.NumberOfBoughtDays ? (
                                <>
                                  {subscription.data?.NumberOfBoughtDays} nights
                                </>
                              ) : (
                                <>N/A</>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              from{" "}
                              {subscription.data?.currentPeriod_start ? (
                                <>
                                  {subscription.data?.currentPeriod_start.toDateString()}{" "}
                                </>
                              ) : (
                                <>N/A</>
                              )}{" "}
                              to{" "}
                              {subscription.data?.currentPeriod_end ? (
                                <>
                                  {subscription.data?.currentPeriod_end.toDateString()}{" "}
                                </>
                              ) : (
                                <>N/A</>
                              )}{" "}
                            </p>
                          </CardContent>
                        </Card>
                      }{" "}
                      {
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Nights Used (This Period)
                            </CardTitle>
                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg> */}
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {subscription.data?.daysUsed ? (
                                <p className="text-xs text-muted-foreground">
                                  {(subscription.data.daysUsed /
                                    subscription.data.NumberOfBoughtDays) *
                                    100}
                                  {"% of plan "}
                                </p>
                              ) : (
                                <>N/A</>
                              )}{" "}
                            </div>
                          </CardContent>
                        </Card>
                      }
                      {
                        <Card
                          onClick={() => {
                            router.push("/Membership");
                          }}
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Plan Cost
                            </CardTitle>
                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                          </svg> */}
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {subscription.data?.price ? (
                                <div className="text-xs ">
                                  {"$" + subscription.data.price + "/month"}
                                </div>
                              ) : (
                                <>N/A</>
                              )}{" "}
                            </div>
                            <div className="text-xs ">
                              <div className="text-2xl font-bold">
                                {subscription.data?.price! < 1000 ? (
                                  <div className="text-xs ">
                                    {"$55 / night over " +
                                      subscription.data?.NumberOfBoughtDays +
                                      " nights "}{" "}
                                  </div>
                                ) : (
                                  <>N/A</>
                                )}{" "}
                              </div>{" "}
                            </div>
                          </CardContent>
                        </Card>
                      }
                      {subscription.data?.check_in &&
                        subscription.data.check_out && (
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Current Status{" "}
                              </CardTitle>
                              {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg> */}
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {" "}
                                {subscription.data.isCheckedIn === false && (
                                  <>Not Checked In</>
                                )}{" "}
                                {subscription.data.isCheckedIn === true && (
                                  <>Checked In</>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {subscription.data.isCheckedIn === false && (
                                  <>Schedule New Stay</>
                                )}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                    </div>
                    <div
                      onClick={() => {
                        setstage("4");
                      }}
                      className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                    >
                      <Card className="col-span-4">
                        <CardHeader>
                          <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                          <Overview />
                        </CardContent>
                      </Card>
                      <Card className="col-span-3">
                        <CardHeader>
                          <CardTitle>Stay overview</CardTitle>
                          <CardDescription>
                            Past and upcoming stays
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <StaysOverview
                            success={myreservations.data?.success!}
                            data={myreservations.data?.data!}
                            number_of_rows={10}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
