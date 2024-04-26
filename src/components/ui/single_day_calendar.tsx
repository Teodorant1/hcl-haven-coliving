"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { isAfterToday } from "utilities";
export function Single_day_calendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentDate, setcurrentDate] = React.useState<Date | undefined>(
    new Date(),
  );

  return (
    <div>
      {" "}
      {/* Render currentDate and date */}
      <div>
        Today{"'"}s Date: {currentDate?.toLocaleDateString()}
      </div>
      <div>Selected Date: {date?.toLocaleDateString()}</div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      {/* Render comparison result */}
      <div>
        {isAfterToday(currentDate, date)
          ? "Valid date"
          : "PLEASE PICK A DATE IN THE FUTURE SO YOU CAN CONTINUE"}
      </div>
    </div>
  );
}
