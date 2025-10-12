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

type RevenueData = {
  label: string;
  actual: number;
  projected: number;
};

type SummaryStats = {
  totalProperties: number;
  totalRooms: number;
  totalReservations: number;
};

export default function RevenueAnalytics() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [stats, setStats] = useState<SummaryStats>({
    totalProperties: 0,
    totalRooms: 0,
    totalReservations: 0,
  });

  const [mode, setMode] = useState<"yearly" | "monthly" | "daily">("yearly");

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

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user?.token;

      const res = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch ${type} stats`);
      const json = await res.json();

      const chartData = json.data.map((item: any) => ({
        label:
          type === "yearly"
            ? `Bulan ${item.month}`
            : type === "monthly"
            ? `Hari ${item.day}`
            : item.date || "N/A",
        actual: item.actual,
        projected: item.projected,
      }));

      setData(chartData);

      // Summary (kalau kamu mau tampilkan total-total di stat cards)
      if (json.summary) {
        setStats(json.summary);
      }
    } catch (err) {
      console.error("Failed to fetch revenue stats:", err);
    }
  };

  useEffect(() => {
    fetchRevenueStats(mode);
  }, [mode]);

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
          <button
            onClick={() => setMode("yearly")}
            className={`px-3 py-1 border rounded-lg text-sm font-medium ${
              mode === "yearly" ? "bg-blue-50 text-blue-600" : ""
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 border rounded-lg text-sm font-medium ${
              mode === "monthly" ? "bg-blue-50 text-blue-600" : ""
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setMode("daily")}
            className={`px-3 py-1 border rounded-lg text-sm font-medium ${
              mode === "daily" ? "bg-blue-50 text-blue-600" : ""
            }`}
          >
            Daily
          </button>
          <button className="px-3 py-1 border rounded-lg text-sm font-medium flex items-center gap-1">
            <TrendingUp size={14} /> Line Chart
          </button>
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
          <p className="text-sm text-gray-500">Total Reservations</p>
          <p className="text-xl font-bold text-green-600">
            {stats.totalReservations}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Variance</p>
          <p className="text-xl font-bold text-green-500">+0.0%</p>
          <span className="text-xs text-gray-400">Above target</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
