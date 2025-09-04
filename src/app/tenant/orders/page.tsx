"use client";

import { useEffect, useState } from "react";
import {
  getTenantOrders,
  confirmTenantPayment,
  cancelTenantOrder,
  Order,
} from "@/lib/api";

export default function TenantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      fetchOrders(t);
    }
  }, []);

  const fetchOrders = async (t: string) => {
    setLoading(true);
    try {
      const res = await getTenantOrders(t); // res: OrdersResponse
      setOrders(res.orders);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleConfirm = async (id: string, accept: boolean) => {
    if (!token) return;
    try {
      await confirmTenantPayment(token, id, accept);
      alert(accept ? "Pembayaran dikonfirmasi" : "Pembayaran ditolak");
      fetchOrders(token);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCancelOrder = async (id: string) => {
    if (!token) return;
    try {
      await cancelTenantOrder(token, id);
      alert("Pesanan dibatalkan");
      fetchOrders(token);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pesanan Tenant</h1>

      {orders.length === 0 && <p>Tidak ada pesanan.</p>}

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="p-4 border rounded shadow">
            <p>
              <b>ID:</b> {order.id}
            </p>
            <p>
              <b>Status:</b> {order.status}
            </p>
            <p>
              <b>Total Harga:</b> Rp {order.totalPrice}
            </p>
            <p>
              <b>Tanggal:</b> {order.startDate.slice(0, 10)} →{" "}
              {order.endDate.slice(0, 10)}
            </p>
            <p>
              <b>User:</b> {order.user?.name} ({order.user?.email})
            </p>

            {order.payment?.proofUrl && (
              <p>
                <b>Bukti Bayar:</b>{" "}
                <a
                  href={order.payment.proofUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Lihat
                </a>
              </p>
            )}

            <div className="mt-2 flex gap-2">
              {order.status === "MENUNGGU_KONFIRMASI" && (
                <>
                  <button
                    onClick={() => handleConfirm(order.id, true)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Konfirmasi
                  </button>
                  <button
                    onClick={() => handleConfirm(order.id, false)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Tolak
                  </button>
                </>
              )}

              {order.status === "MENUNGGU_PEMBAYARAN" && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Batalkan
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
