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
    return (
      <p className="text-gray-500 text-center mt-6">Loading properties...</p>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Available Properties
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {p.pictures && p.pictures.length > 0 ? (
                <img
                  src={p.pictures[0].url}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                  No Image
                </div>
              )}
              {p.price && (
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Rp {p.price.toLocaleString()} / night
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {p.city}, {p.province}
              </p>

              <div className="mt-auto">
                <button
                  onClick={() => router.push(`/properties/${p.id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
