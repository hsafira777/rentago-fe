"use client";

import { useEffect, useState } from "react";
import { getUserOrders, cancelUserOrder, uploadPaymentProof } from "@/lib/api";

type Order = {
  id: string;
  status: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  payment?: {
    proofUrl?: string;
    status: string;
  };
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // ambil token dari localStorage
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      fetchOrders(t);
    }
  }, []);

  const fetchOrders = async (t: string) => {
    setLoading(true);
    try {
      const res = await getUserOrders(t);
      setOrders(res.orders);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    if (!token) return;
    try {
      await cancelUserOrder(token, id);
      alert("Order dibatalkan");
      fetchOrders(token);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUploadProof = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!token || !e.target.files?.[0]) return;
    try {
      await uploadPaymentProof(token, id, e.target.files[0]);
      alert("Bukti bayar berhasil diupload");
      fetchOrders(token);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Pesanan Saya</h1>

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
              {order.status === "MENUNGGU_PEMBAYARAN" && (
                <>
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Batalkan
                  </button>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => handleUploadProof(order.id, e)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
