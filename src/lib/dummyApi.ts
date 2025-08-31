import { Order } from "@/types/order";

let orders: Order[] = [
  {
    id: "order_001",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    status: "MENUNGGU_PEMBAYARAN",
    totalPrice: 2000000,
    property: { id: "prop_123", name: "Hotel Bali Indah", city: "Denpasar" },
    room: { id: "room_123", name: "Deluxe Room" },
    payment: { id: "pay_001", paymentMethod: "TRANSFER", status: "PENDING" },
  },
];

export function getOrders(): Order[] {
  return orders;
}

export function createOrder(order: Order) {
  orders.push(order);
  return order;
}

export function cancelOrder(orderId: string) {
  orders = orders.map((o) =>
    o.id === orderId ? { ...o, status: "DIBATALKAN" } : o
  );
  return orders.find((o) => o.id === orderId);
}

export function uploadPaymentProof(orderId: string, proofUrl: string) {
  orders = orders.map((o) =>
    o.id === orderId
      ? {
          ...o,
          payment: { ...o.payment, proofUrl, status: "PENDING" },
          status: "MENUNGGU_KONFIRMASI",
        }
      : o
  );
  return orders.find((o) => o.id === orderId);
}
