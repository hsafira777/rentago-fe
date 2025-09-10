"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type Property from "@/interface/property";

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("http://localhost:8080/api/properties");
        const data = await res.json();
        setProperties(data.properties || data.data?.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading properties...</p>;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Properti Tersedia</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            {/* gambar (ambil dari property.pictures[0]) */}
            <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {p.pictures && p.pictures.length > 0 ? (
                <img
                  src={p.pictures[0].url}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>

            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">
              {p.city}, {p.province}
            </p>
            {p.price ? (
              <p className="text-blue-600 font-bold">
                Rp {p.price.toLocaleString()} / malam
              </p>
            ) : (
              <p className="text-gray-500">Harga belum tersedia</p>
            )}
            <button
              onClick={() => router.push(`/properties/${p.id}`)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
