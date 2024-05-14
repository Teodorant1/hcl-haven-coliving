/* eslint-disable @typescript-eslint/prefer-optional-chain */
import moment from "moment-timezone";
import { type subscription } from "@prisma/client";

export function Confirm_if_IsCheckedIn(subscription: subscription) {
  return subscription && subscription.isCheckedIn;
}

export function convert_date_string_to_DATE(dateString: string) {
  const dateParts = dateString.split("-"); // Split the string into an array of parts
  // Extract year, month, and day from the array
  const year = parseInt(dateParts[0]!, 10);
  const month = parseInt(dateParts[1]!, 10) - 1; // Months are zero-based (0 - 11)
  const day = parseInt(dateParts[2]!, 10);
  // Create a new Date object using the extracted components
  const ActualDate = new Date(year, month, day);
  return ActualDate;
}

export const isAfterToday = (
  date1: Date | undefined, // this will always be today
  date2: Date | undefined, // this will always be a day today or after today
): boolean => {
  if (!date1 || !date2) return false;
  return date1.getTime() < date2.getTime();
};

export function isBefore_11_am_for_today(currentDate: Date) {
  const currentTime = moment().tz("America/Los_Angeles");
  const isBefore11AM = currentTime.hours() < 11;
  const currentDay = currentTime.date(); // Get the day of the month
  const currentMonth = currentTime.month() + 1; // Get the month (adding 1 because months are zero-indexed)
  const currentDay_from_date_object = currentDate.getDate(); // Get the day of the month
  const currentMonth_from_date_object = currentDate.getMonth() + 1; // Get the month (adding 1 because months are zero-indexed)

  //if it is a different day we don't care about if it's before 11 am, so automatically return
  if (
    currentDay !== currentDay_from_date_object &&
    currentMonth !== currentMonth_from_date_object
  ) {
    return true;
  }

  console.log("currentDay_from_date_object:", currentDay_from_date_object);
  console.log("currentMonth_from_date_object:", currentMonth_from_date_object);

  console.log("Current Day:", currentDay);
  console.log("Current Month:", currentMonth);
  console.log(isBefore11AM);
  return isBefore11AM;
}

export function Calculate_number_of_days_between_two_dates(
  startDate: Date,
  endDate: Date,
) {
  const differenceInMilliseconds: number =
    endDate.getTime() - startDate.getTime();

  const differenceInDays: number =
    differenceInMilliseconds / (1000 * 60 * 60 * 24); // milliseconds to days

  return differenceInDays;
}

export function getPrettierDate(myDate: Date) {
  // Get the day and month
  const month: number = myDate.getMonth(); // 0 (January) to 11 (December)
  const monthsNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName: number = myDate.getDate();
  const monthName: string = monthsNames[month]!;

  const newDate = {
    dayName: dayName,
    monthName: monthName,
  };
  return newDate;
}
