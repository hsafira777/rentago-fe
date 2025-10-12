import React, { useMemo } from "react";
import RoomSelector from "./RoomSelector";
import MonthNavigation from "./MonthNavigation";
import SelectedDatesSummary from "./SelectedDatesSummary";
import CalendarGrid from "./CalendarGrid";
import useAvailability from "../hooks/useAvailability";
import usePeakSeasonRates from "../hooks/usePeakSeasonRates";
import useCalendarSelection from "../hooks/useCalendarSelection";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
} from "date-fns";
import { applyPeakRate } from "../utils/pricingHelpers";
import { formatDateKey } from "../utils/dateHelpers";
import type { Availability as Av, PeakSeasonRate } from "../interface/calendar";
import type Room from "../interface/room";

interface BookingCalendarProps {
  rooms: Room[];
}

export default function BookingCalendar({ rooms }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(
    rooms[0]?.id ?? null
  );

  const selectedRoom = useMemo<Room | null>(
    () => rooms.find((r) => r.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId]
  );

  const { availability } = useAvailability(selectedRoomId, currentMonth);
  const { rates } = usePeakSeasonRates(selectedRoomId);
  const { checkIn, checkOut, pickDate, reset } = useCalendarSelection();

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
      }),
    [currentMonth]
  );

  const getRateForDate = (d: Date): PeakSeasonRate | undefined => {
    return rates.find((r) => {
      const s = new Date(r.startDate);
      const e = new Date(r.endDate);
      const t = new Date(formatDateKey(d));
      return t >= s && t <= e;
    });
  };

  const getInfoForDay = (d: Date): Av | null => {
    const key = formatDateKey(d);
    const base = availability.find((a) => a.date.slice(0, 10) === key) ?? null;
    if (!base || !selectedRoom) return base;
    const rate = getRateForDate(d);
    const price = rate
      ? applyPeakRate(selectedRoom.basePrice, rate)
      : base.price ?? selectedRoom.basePrice;
    return { ...base, price };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-4">Select Your Dates</h3>

      <RoomSelector
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        onChange={(id) => {
          setSelectedRoomId(id);
          reset();
        }}
      />

      <SelectedDatesSummary checkIn={checkIn} checkOut={checkOut} />

      <MonthNavigation
        month={currentMonth}
        onPrev={() => setCurrentMonth(addMonths(currentMonth, -1))}
        onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />

      <CalendarGrid
        days={days}
        getInfoForDay={getInfoForDay}
        checkIn={checkIn}
        checkOut={checkOut}
        hovered={null}
        setHovered={() => {}}
        onPick={pickDate}
      />

      <div className="flex justify-between mt-4 gap-2">
        <button
          onClick={reset}
          className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (checkIn && !checkOut) {
              // nanti bisa isi logic auto set checkOut = checkIn
            }
          }}
          className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        >
          Switch to check-out
        </button>
      </div>

      <button
        disabled={!checkIn || !checkOut || !selectedRoom}
        className={`mt-6 w-full py-3 rounded-xl font-medium shadow-md transition ${
          !checkIn || !checkOut || !selectedRoom
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Book Now
      </button>
    </div>
  );
}
