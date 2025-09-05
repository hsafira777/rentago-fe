// Nurbani
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// ================= TYPES =================
export type Order = {
  id: string;
  status: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  user?: { name: string; email: string };
  payment?: { proofUrl?: string; status: string };
};

export type OrdersResponse = {
  orders: Order[];
  total: number;
};

// ================= HELPER =================
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}

// ================= AUTH =================
export const login = (data: { email: string; password: string }) =>
  request<{ token: string; user: any }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

// ================= USER ORDERS =================
export const createOrder = (
  token: string,
  data: { roomId: string; startDate: string; endDate: string }
) =>
  request<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserOrders = (
  token: string,
  query = ""
): Promise<OrdersResponse> =>
  request(`/orders${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelUserOrder = (token: string, orderId: string) =>
  request(`/orders/${orderId}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadPaymentProof = async (
  token: string,
  orderId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/orders/${orderId}/payment-proof`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Upload failed");
  }

  return res.json();
};

// ================= TENANT ORDERS =================
export const getTenantOrders = (
  token: string,
  query = ""
): Promise<OrdersResponse> =>
  request(`/orders/tenant/list${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const confirmTenantPayment = (
  token: string,
  orderId: string,
  accept: boolean
) =>
  request(`/orders/${orderId}/confirm`, {
    method: "PATCH",
    body: JSON.stringify({ accept }),
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelTenantOrder = (token: string, orderId: string) =>
  request(`/orders/${orderId}/cancel-tenant`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
