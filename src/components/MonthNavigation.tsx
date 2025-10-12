import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function MonthNavigation({
  month,
  onPrev,
  onNext,
}: {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex justify-between items-center mb-2">
      <button
        onClick={onPrev}
        className="px-2 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ←
      </button>
      <span className="font-medium text-gray-800">
        {format(month, "MMMM yyyy", { locale: id })}
      </span>
      <button
        onClick={onNext}
        className="px-2 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        →
      </button>
    </div>
  );
}
