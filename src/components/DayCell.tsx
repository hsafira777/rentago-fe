import React from "react";
import { format } from "date-fns";
import { formatDateKey } from "../utils/dateHelpers";
import type { Availability } from "../interface/calendar";

function formatShortPrice(value: number): string {
  if (value >= 1_000_000) {
    // format ke juta, 1 digit desimal kalau perlu
    const juta = value / 1_000_000;
    return `${juta % 1 === 0 ? juta : juta.toFixed(1)}JT`;
  } else if (value >= 1_000) {
    // format ke ribuan (K)
    const ribu = value / 1_000;
    return `${ribu % 1 === 0 ? ribu : ribu.toFixed(0)}K`;
  }
  return value.toString();
}

export default function DayCell({
  day,
  info,
  isSelected,
  inRange,
  hovered,
  onHover,
  onClick,
}: {
  day: Date;
  info: Availability | null;
  isSelected: boolean;
  inRange: boolean;
  hovered: string | null;
  onHover: (k: string | null) => void;
  onClick: (d: Date) => void;
}) {
  const dateKey = formatDateKey(day);

  return (
    <div
      onClick={() => onClick(day)}
      onMouseEnter={() => onHover(dateKey)}
      onMouseLeave={() => onHover(null)}
      className={`relative flex flex-col items-center justify-center p-2 rounded-lg text-sm transition cursor-pointer ${
        info ? "" : "bg-gray-100 text-gray-400"
      } ${inRange ? "bg-blue-100 text-blue-800" : ""} ${
        isSelected ? "bg-blue-600 text-white font-bold" : ""
      }`}
    >
      <div className="font-medium">{format(day, "d")}</div>

      {info && (
        <div className="text-[10px] mt-1">
          Rp {formatShortPrice(info.price)}
        </div>
      )}

      {hovered === dateKey && (
        <div className="absolute z-10 -top-14 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
          {info
            ? `Tersisa ${
                info.availableQuantity
              } — Rp ${info.price.toLocaleString("id-ID")}`
            : "Data tidak tersedia"}
          <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
