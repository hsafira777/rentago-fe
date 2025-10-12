import { useCallback, useState } from "react";
import type { Dayjs } from "dayjs";

export default function useCalendarSelection() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const reset = useCallback(() => {
    setCheckIn(null);
    setCheckOut(null);
  }, []);

  const pickDate = useCallback(
    (day: Date) => {
      if (!checkIn || (checkIn && checkOut)) {
        setCheckIn(day);
        setCheckOut(null);
        return;
      }
      if (checkIn && !checkOut) {
        if (day < checkIn) setCheckIn(day);
        else setCheckOut(day);
      }
    },
    [checkIn, checkOut]
  );

  return { checkIn, checkOut, pickDate, reset, setCheckIn, setCheckOut };
}
