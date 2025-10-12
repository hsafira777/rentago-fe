import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function SelectedDatesSummary({
  checkIn,
  checkOut,
}: {
  checkIn: Date | null;
  checkOut: Date | null;
}) {
  if (!checkIn || !checkOut)
    return (
      <div className="text-center text-sm mb-4">
        <span className="text-gray-400">Select check-in date</span>
      </div>
    );

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="text-center text-sm mb-4">
      <div className="font-medium">
        {format(checkIn, "P", { locale: id })} –{" "}
        {format(checkOut, "P", { locale: id })}
      </div>
      <div className="text-gray-500">{nights} night(s)</div>
    </div>
  );
}
