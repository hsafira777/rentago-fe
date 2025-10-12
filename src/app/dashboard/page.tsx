"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Calendar, DollarSign, Bed } from "lucide-react";

import HeaderBar from "@/components/HeaderBar";
import StatCard from "@/components/StatCard";
import RevenueAnalytics from "@/components/RevenueAnalytics";
import PropertySection from "@/components/PropertySection";
import useAuthStore from "@/store/useAuthStore";

import { fetchTenantDashboard } from "@/lib/api/dashboard";

interface TenantDashboardData {
  totalProperties: number;
  totalRooms: number;
  totalOrders: number;
  totalRevenue: number;
  properties: any[];
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [stats, setStats] = useState<TenantDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Proteksi route
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "TENANT") {
      router.push("/forbidden");
    }
  }, [user, router]);

  // 📡 Fetch dashboard data
  useEffect(() => {
    if (user?.role === "TENANT") {
      const loadData = async () => {
        try {
          const data = await fetchTenantDashboard();
          setStats(data);
        } catch (err: any) {
          console.error("[Dashboard Fetch Error]:", err);
          setError(err.message || "Gagal memuat dashboard");
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [user]);

  // 🌀 Loading state
  if (!user || user.role !== "TENANT") return null;

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Memuat dashboard...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">❌ {error}</p>
      </div>
    );
  }

  // 📉 Jika data kosong
  if (!stats) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Tidak ada data dashboard.</p>
      </div>
    );
  }

  // ✅ Data sudah tersedia
  return (
    <div className="p-6 space-y-8">
      {/* 🔝 Top Bar */}
      <HeaderBar />

      {/* 📊 Stat Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={stats?.totalProperties?.toString() ?? "0"}
          icon={<Home size={20} />}
        />
        <StatCard
          title="Total Rooms"
          value={stats?.totalRooms?.toString() ?? "0"}
          icon={<Bed size={20} />}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders?.toString() ?? "0"}
          icon={<Calendar size={20} />}
        />
        <StatCard
          title="Total Revenue"
          value={`Rp ${stats?.totalRevenue?.toLocaleString("id-ID") ?? "0"}`}
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* 📈 Revenue Analytics */}
      <RevenueAnalytics data={stats} />

      {/* 🏠 Property Section */}
      <PropertySection properties={stats.properties ?? []} />
    </div>
  );
}
