"use client";
import * as React from "react";
import { type Single_Day_Calendar_Props } from "project-types";
import { Calendar } from "@/components/ui/calendar";
import { isAfterToday } from "utilities";
export function Single_day_calendar({
  date,
  setDate,
  setStage,
  currentDate,
}: Single_Day_Calendar_Props) {
  return (
    <div>
      {" "}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-fit rounded-md border"
      />
      {/* Render comparison result */}
      <div className="flex justify-center">
        {isAfterToday(currentDate, date) ? "Valid date  " : "Invalid Date"}
      </div>
    </div>
  );
}
