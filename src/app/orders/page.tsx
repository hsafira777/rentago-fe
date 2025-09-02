"use client";

import { useEffect, useState } from "react";
import { fetchOrders, cancelOrder } from "@/lib/api";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id: string) => {
    await cancelOrder(id);
    const updated = await fetchOrders();
    setOrders(updated);
  };

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>Tidak ada order.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li
              key={o.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {o.property.name} ({o.room.name})
                </p>
                <p className="text-sm text-gray-600">
                  {o.startDate} → {o.endDate}
                </p>
                <p className="text-sm">
                  Status: <span className="font-medium">{o.status}</span>
                </p>
              </div>
              {o.status === "MENUNGGU_PEMBAYARAN" && (
                <button
                  onClick={() => handleCancel(o.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
