// src/types/order.ts
export interface Property {
  id: string;
  name: string;
  city: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface Payment {
  id: string;
  paymentMethod: "TRANSFER" | "GATEWAY";
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  proofUrl?: string | null;
}

export interface Order {
  id: string;
  startDate: string;
  endDate: string;
  status:
    | "MENUNGGU_PEMBAYARAN"
    | "MENUNGGU_KONFIRMASI"
    | "DIKONFIRMASI"
    | "DIBATALKAN";
  totalPrice: number;
  property: Property;
  room: Room;
  payment: Payment;
}
