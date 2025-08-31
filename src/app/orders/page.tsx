"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  property: {
    id: string;
    name: string;
    city: string;
  };
  room: {
    id: string;
    name: string;
  };
  payment: {
    id: string;
    paymentMethod: string;
    status: string;
    proofUrl?: string | null;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  // Dummy data
  useEffect(() => {
    const dummy: Order[] = [
      {
        id: "order_001",
        startDate: "2025-09-10",
        endDate: "2025-09-12",
        status: "MENUNGGU_KONFIRMASI",
        totalPrice: 2000000,
        property: {
          id: "prop_123",
          name: "Hotel Bali Indah",
          city: "Denpasar",
        },
        room: {
          id: "room_123",
          name: "Deluxe Room",
        },
        payment: {
          id: "pay_001",
          paymentMethod: "TRANSFER",
          status: "PENDING",
        },
      },
      {
        id: "order_002",
        startDate: "2025-08-01",
        endDate: "2025-08-03",
        status: "DIKONFIRMASI",
        totalPrice: 3000000,
        property: {
          id: "prop_456",
          name: "Villa Ubud",
          city: "Gianyar",
        },
        room: {
          id: "room_456",
          name: "Private Villa",
        },
        payment: {
          id: "pay_002",
          paymentMethod: "GATEWAY",
          status: "CONFIRMED",
        },
      },
    ];
    setOrders(dummy);
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.id.includes(search) ||
      o.startDate.includes(search) ||
      o.endDate.includes(search)
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      <input
        type="text"
        placeholder="Search by Order ID or Date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <ul className="space-y-4">
        {filtered.map((o) => (
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
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
