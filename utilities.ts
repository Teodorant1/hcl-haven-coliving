/* eslint-disable @typescript-eslint/prefer-optional-chain */
import moment from "moment-timezone";
import { type subscription } from "@prisma/client";

export function Calculate_price_for_dashboard_reservation(
  date1: Date,
  date2: Date,
  daysBought: number,
) {
  const estimated_length_of_stay = Calculate_number_of_days_between_two_dates(
    date1,
    date2,
  );

  if (estimated_length_of_stay < 30 && daysBought > estimated_length_of_stay) {
    return estimated_length_of_stay * 40;
  }
  if (estimated_length_of_stay < 30 && daysBought < estimated_length_of_stay) {
    const overflow_days = estimated_length_of_stay - daysBought;

    const totalprice = daysBought * 40 + overflow_days * 55;

    return totalprice;
  }
  if (estimated_length_of_stay < 30 && daysBought === 30) {
    return 1095;
  }
  if (estimated_length_of_stay > 30 && daysBought === 30) {
    return 1200;
  }

  return 0;
}
export function Calculate_number_of_days_between_two_dates(
  startDate: Date,
  endDate: Date,
) {
  const differenceInMilliseconds: number =
    endDate.getTime() - startDate.getTime();

  const differenceInDays: number =
    differenceInMilliseconds / (1000 * 60 * 60 * 24); // milliseconds to days

  return Math.round(differenceInDays);
}
// therefore we can use this to tell the page whether to render the check in,
// check out button and book a stay button
// we should also check the value of isCheckedIn
export async function Date_isBetween_other_dates(
  Date_toCheck: Date,
  firstDate: Date,
  secondDate: Date,
) {
  if (firstDate === null && secondDate === null) {
    return null;
  }

  if (Date_toCheck > firstDate && Date_toCheck < secondDate) {
    return true;
  }

  return false;
}

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

export function getPrettierDate(myDate: Date) {
  // Get the day and month
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
  const month: number = myDate.getMonth(); // 0 (January) to 11 (December)

  const dayName: number = myDate.getDate();
  const monthName: string = monthsNames[month]!;

  const newDate = {
    dayName: dayName,
    monthName: monthName,
  };
  return newDate;
}
