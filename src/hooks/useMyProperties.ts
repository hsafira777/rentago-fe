import useAuthStore from "@/store/useAuthStore";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getMyProperties() {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${baseUrl}/api/properties/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Gagal mengambil properti");
  return res.json();
}

export async function createAvailability(
  roomId: string,
  date: string,
  availability: number
) {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${baseUrl}/api/availability/${roomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date, availability }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal menambahkan availability");
  }

  return res.json();
}