"use client";

import { useState } from "react";
import { createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createOrder({
        roomId: "room_123",
        startDate: "2025-10-01",
        endDate: "2025-10-05",
        paymentMethod: "TRANSFER",
      });
      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">New Order</h1>
      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Order"}
      </button>
    </div>
  );
}
