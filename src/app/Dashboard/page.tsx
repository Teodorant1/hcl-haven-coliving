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
import { MainNav } from "../_components/main-nav";
import { Overview } from "../_components/overview";
import { RecentSales } from "../_components/recent-sales";
import { Search } from "../_components/search";
import TeamSwitcher from "../_components/team-switcher";
import { UserNav } from "../_components/user-nav";
import { useState } from "react";
import { addDays } from "date-fns";
import DashboardModal from "@/components/component/DashboardModal";
import DashboardConfirmedModal from "@/components/component/DashboardConfirmedModal";
import { type Cloudbeds_post_reservation_RESPONSE } from "project-types";
import { useSession } from "next-auth/react";
import { CalendarDateRangePicker } from "../_components/date-range-picker";
import { type DateRange } from "react-day-picker";
import React from "react";
import { api } from "@/trpc/react";

export default function DashboardPage() {
  const { status, data: session } = useSession();
  const [stage, setstage] = useState<string | undefined>("1");
  // const [currentDate, setcurrentDate] = useState<Date | undefined>(new Date());
  // const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [CBEDS_response, setCBEDS_response] = useState<
    Cloudbeds_post_reservation_RESPONSE | undefined
  >();
  const [dateRange, setdateRange] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 0),
    to: addDays(new Date(), 7),
  });
  const myreservations = api.booking.getMyReservations.useQuery();

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
          {stage === "2" && (
            <DashboardModal
              date={dateRange}
              setDate={setdateRange}
              setStage={setstage}
              setCBEDS_response={setCBEDS_response}
              CBEDS_response={CBEDS_response}
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
              <div className="border-b">
                <div className="flex h-16 items-center px-4">
                  <TeamSwitcher />
                  <MainNav className="mx-6" />
                  <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <UserNav />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                  </h2>
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
                  </div>
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
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total Revenue
                          </CardTitle>
                          <svg
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
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$45,231.89</div>
                          <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Subscriptions
                          </CardTitle>
                          <svg
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
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+2350</div>
                          <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Sales
                          </CardTitle>
                          <svg
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
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+12,234</div>
                          <p className="text-xs text-muted-foreground">
                            +19% from last month
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Active Now
                          </CardTitle>
                          <svg
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
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+573</div>
                          <p className="text-xs text-muted-foreground">
                            +201 since last hour
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                          <CardTitle>Stay history</CardTitle>
                          {myreservations.data &&
                            myreservations.data.success === true &&
                            myreservations.data.data.length > 0 && (
                              <CardDescription>
                                Past and upcoming stays
                              </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                          <RecentSales
                            success={myreservations.data?.success!}
                            data={myreservations.data?.data!}
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
