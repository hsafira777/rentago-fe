import React from "react";
import DayCell from "./DayCell";
import type { Availability } from "../interface/calendar";

export default function CalendarGrid({
  days,
  getInfoForDay,
  checkIn,
  checkOut,
  hovered,
  setHovered,
  onPick,
}: {
  days: Date[];
  getInfoForDay: (d: Date) => Availability | null;
  checkIn: Date | null;
  checkOut: Date | null;
  hovered: string | null;
  setHovered: (k: string | null) => void;
  onPick: (d: Date) => void;
}) {
  return (
    <div className="grid grid-cols-7 text-center text-sm gap-1">
      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
        <div key={d} className="font-semibold text-gray-600 py-2">
          {d}
        </div>
      ))}
      {days.map((day) => {
        const info = getInfoForDay(day);
        const isSelected =
          (checkIn && day.toDateString() === checkIn.toDateString()) ||
          (checkOut && day.toDateString() === checkOut.toDateString());
        const inRange = checkIn && checkOut && day > checkIn && day < checkOut;
        return (
          <DayCell
            key={day.toISOString()}
            day={day}
            info={info}
            isSelected={!!isSelected}
            inRange={!!inRange}
            hovered={hovered}
            onHover={setHovered}
            onClick={onPick}
          />
        );
      })}
    </div>
  );
}
