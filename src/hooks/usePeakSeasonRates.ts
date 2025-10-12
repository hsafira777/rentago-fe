import { useCallback, useEffect, useState } from "react";
import type { PeakSeasonRate } from "../interface/calendar";

export default function usePeakSeasonRates(roomId: string | null) {
  const [rates, setRates] = useState<PeakSeasonRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    if (!roomId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8080/api/peak-season-rates?roomId=YOUR_ROOM_ID`
      );
      if (!res.ok) throw new Error("Failed to fetch peak rates");
      const data = await res.json();
      // api returns { success: true, data: [...] }
      setRates(data.data || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setRates([]);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    void fetchRates();
  }, [fetchRates]);

  return { rates, loading, error, refetch: fetchRates };
}

