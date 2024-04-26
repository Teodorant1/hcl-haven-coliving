import React from "react";

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
  date1: Date | undefined,
  date2: Date | undefined,
): boolean => {
  if (!date1 || !date2) return false;
  return date1.getTime() < date2.getTime();
};
