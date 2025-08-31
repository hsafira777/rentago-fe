// src/app/orders/new/page.tsx
"use client";

import { useState } from "react";
import { createOrder } from "@/lib/dummyApi";
import { Order } from "@/types/order";
import { useRouter } from "next/navigation";

export default function NewOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setLoading(true);
    const newOrder: Order = {
      id: "order_" + Math.random().toString(36).slice(2, 8),
      startDate: "2025-10-01",
      endDate: "2025-10-05",
      status: "MENUNGGU_PEMBAYARAN",
      totalPrice: 1500000,
      property: { id: "prop_999", name: "Test Hotel", city: "Jakarta" },
      room: { id: "room_999", name: "Standard Room" },
      payment: { id: "pay_999", paymentMethod: "TRANSFER", status: "PENDING" },
    };
    createOrder(newOrder);
    router.push("/orders");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">New Order</h1>
      <p className="mb-4 text-gray-600">
        (Dummy) Klik tombol di bawah untuk membuat order baru
      </p>
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
