import { useCallback, useEffect, useState } from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import type { Availability } from "../interface/calendar";

export default function useAvailability(
  roomId: string | null,
  currentMonth: Date
) {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    if (!roomId) return;

    const start = format(startOfMonth(currentMonth), "yyyy-MM-dd");
    const end = format(endOfMonth(currentMonth), "yyyy-MM-dd");

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `http://localhost:8080/api/availability/${roomId}?startDate=${start}&endDate=${end}`
      );

      if (!res.ok) throw new Error("Failed to fetch availability");

      const data = await res.json();
      setAvailability(data.availabilities || []);
    } catch (err: any) {
      console.error("❌ Error fetching availability:", err);
      setError(err.message || "Unknown error");
      setAvailability([]);
    } finally {
      setLoading(false);
    }
  }, [roomId, currentMonth]);

  useEffect(() => {
    void fetchAvailability();
  }, [fetchAvailability]);

  return { availability, loading, error, refetch: fetchAvailability };
}
