export async function fetchTenantDashboard() {
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const token = user?.token;

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login ulang.");
  }

  const res = await fetch("http://localhost:8080/api/dashboard/tenant", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  console.log("Response object:", res); // ⬅️ lihat status, headers, dll

  if (!res.ok) {
    let errorMessage = "Gagal mengambil data dashboard tenant";
    try {
      const errorJson = await res.json();
      console.log("Error JSON:", errorJson); // ⬅️ lihat isi error dari backend
      errorMessage = errorJson.error || errorMessage;
    } catch (err) {
      console.log("Gagal parse JSON error:", err);
    }
    throw new Error(errorMessage);
  }

  const json = await res.json();
  console.log("Response JSON:", json); // ⬅️ ini hasil final dari backend

  return json.data;
}
