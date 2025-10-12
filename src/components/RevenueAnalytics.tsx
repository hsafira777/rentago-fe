"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";

type RevenueData = {
  label: string;
  actual: number;
  projected: number;
};

interface RevenueAnalyticsProps {
  data: {
    totalProperties: number;
    totalRooms: number;
    totalOrders: number;
    totalRevenue: number;
    properties: any[];
  };
}

export default function RevenueAnalytics({
  data: stats,
}: RevenueAnalyticsProps) {
  const [chartData, setChartData] = useState<RevenueData[]>([]);
  const [mode, setMode] = useState<"yearly" | "monthly" | "daily">("yearly");

  // ⬇️ Ambil token langsung dari Zustand store
  const token = useAuthStore((state) => state.token);

  const fetchRevenueStats = async (type: "yearly" | "monthly" | "daily") => {
    try {
      let url = `http://localhost:8080/api/revenue/${type}`;
      if (type === "monthly") {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        url += `?year=${year}&month=${month}`;
      } else if (type === "daily") {
        const now = new Date();
        url += `?year=${now.getFullYear()}&month=${
          now.getMonth() + 1
        }&day=${now.getDate()}`;
      }

      const res = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch ${type} stats`);
      const json = await res.json();

      const formattedData = json.data.map((item: any) => ({
        label:
          type === "yearly"
            ? `Bulan ${item.month}`
            : type === "monthly"
            ? `Hari ${item.day}`
            : item.date || "N/A",
        actual: item.actual,
        projected: item.projected,
      }));

      setChartData(formattedData);
    } catch (err) {
      console.error("Failed to fetch revenue stats:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRevenueStats(mode);
    }
  }, [mode, token]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Revenue Analytics Dashboard</h2>
          <p className="text-sm text-gray-500">
            Track your actual vs projected revenue performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["yearly", "monthly", "daily"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setMode(t)}
              className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                mode === t ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
          <button
            onClick={() => fetchRevenueStats(mode)}
            className="px-3 py-1 border rounded-lg text-sm font-medium flex items-center gap-1"
          >
            <RefreshCcw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Properties</p>
          <p className="text-xl font-bold text-blue-600">
            {stats.totalProperties}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Rooms</p>
          <p className="text-xl font-bold">{stats.totalRooms}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-green-600">
            {stats.totalOrders}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-orange-600">
            Rp {stats?.totalRevenue?.toLocaleString("id-ID") ?? 0}
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="#22c55e" />
          <Line type="monotone" dataKey="projected" stroke="#f97316" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
