"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type Property from "@/interface/property";
import type Room from "@/interface/room";
import { Users } from "lucide-react";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);
        if (!res.ok) throw new Error("Gagal fetch property");
        const data = await res.json();
        const prop = data.property || data.data?.property || data.data || data;

        setProperty(prop);
        setRooms(prop?.rooms || []);
      } catch (err) {
        console.error("Failed to fetch property:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProperty();
  }, [id]);

  if (loading)
    return <p className="text-gray-500">Loading property details...</p>;
  if (!property) return <p className="text-red-500">Property not found</p>;

  return (
    <section className="max-w-6xl mx-auto mt-12 px-4">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {property.name}
        </h2>
        <p className="text-lg text-gray-500 mt-2">
          {property.city}, {property.province}
        </p>
        <div className="mt-4 mx-auto max-w-2xl">
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>

      {/* Swiper slider */}
      <div className="mb-14 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[500px] rounded-2xl shadow-xl overflow-hidden"
        >
          {property.pictures?.map((pic, i) => (
            <SwiperSlide key={i} className="relative">
              <img
                src={pic.url}
                alt={`${property.name} - ${i + 1}`}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Room list */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-gray-900 border-l-4 border-blue-500 pl-3">
          Kamar Tersedia
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {room.name}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {room.description || "Tidak ada deskripsi"}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-blue-600">
                  Rp {room.basePrice.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / malam
                  </span>
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  <Users className="w-4 h-4 inline-block mr-1" />{" "}
                  {room.capacity} orang
                </span>
              </div>
              <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition">
                Pesan Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
