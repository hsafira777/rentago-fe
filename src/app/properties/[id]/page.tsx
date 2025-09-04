"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOrder } from "@/lib/api";

type Room = {
  id: string;
  name: string;
  basePrice: number;
};

type Property = {
  id: string;
  name: string;
  address: string;
  rooms: Room[];
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);

    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyId}`
      );
      if (!res.ok) throw new Error("Gagal memuat data property");
      const data = await res.json();
      setProperty(data);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleCreateOrder = async () => {
    if (!token) {
      alert("Silakan login terlebih dahulu");
      return;
    }
    if (!roomId || !startDate || !endDate) {
      alert("Lengkapi semua data");
      return;
    }
    try {
      await createOrder(token, { roomId, startDate, endDate });
      alert("Pesanan berhasil dibuat");
      router.push("/orders");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property tidak ditemukan</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">{property.name}</h1>
      <p className="mb-4">{property.address}</p>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Pilih Room</label>
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- pilih room --</option>
          {property.rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} - Rp {room.basePrice}/malam
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Tanggal Mulai</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tanggal Selesai</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <button
        onClick={handleCreateOrder}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Buat Pesanan
      </button>
    </div>
  );
}
