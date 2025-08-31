"use client";

import { useEffect, useState } from "react";
import { getOrders, cancelOrder } from "@/lib/dummyApi";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleCancel = (id: string) => {
    const updated = cancelOrder(id);
    if (updated) setOrders(getOrders());
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
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
              <p className="text-sm">
                Total: Rp {o.totalPrice.toLocaleString()}
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
    </div>
  );
}
