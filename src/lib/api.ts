// src/lib/api.ts
import { Order } from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Ambil daftar order user
export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal ambil data orders");
  return res.json();
}

// Buat order baru
export async function createOrder(data: {
  roomId: string;
  startDate: string;
  endDate: string;
  paymentMethod: "TRANSFER" | "GATEWAY";
}): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal membuat order");
  return res.json();
}

// Cancel order
export async function cancelOrder(orderId: string): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Gagal cancel order");
  return res.json();
}

// Upload bukti pembayaran
export async function uploadPaymentProof(
  orderId: string,
  file: File
): Promise<Order> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/orders/${orderId}/payment-proof`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Gagal upload bukti pembayaran");
  return res.json();
}
