"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cancelUserOrder, uploadPaymentProof, Order } from "@/lib/api";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
    if (t) fetchOrder(t);
  }, []);

  const fetchOrder = async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${t}` },
        }
      );
      if (!res.ok) throw new Error("Gagal memuat order");
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleCancel = async () => {
    if (!token || !order) return;
    try {
      await cancelUserOrder(token, order.id);
      alert("Order dibatalkan");
      router.push("/orders");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUploadProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !order || !e.target.files?.[0]) return;
    try {
      await uploadPaymentProof(token, order.id, e.target.files[0]);
      alert("Bukti bayar berhasil diupload");
      fetchOrder(token);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order tidak ditemukan</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Detail Pesanan</h1>

      <div className="p-4 border rounded shadow space-y-2">
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

        <div className="mt-4 flex gap-2">
          {order.status === "MENUNGGU_PEMBAYARAN" && (
            <>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Batalkan
              </button>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleUploadProof}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
