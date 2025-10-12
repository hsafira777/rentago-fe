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
import BookingCalendar from "@/components/BookingCalendar";

/* ------------------ Available Rooms ------------------ */
function AvailableRooms({ rooms }: { rooms: Room[] }) {
  if (!rooms || rooms.length === 0) {
    return <p className="text-gray-500">Belum ada kamar tersedia.</p>;
  }

  return (
    <ul className="space-y-4">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition bg-white"
        >
          <div className="flex items-start justify-between">
            {/* LEFT: Room info */}
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {room.name}
              </h3>

              {room.description && (
                <p className="text-gray-600 text-sm leading-relaxed mt-1">
                  {room.description}
                </p>
              )}

              <p className="text-sm text-gray-700 mt-2">
                Harga dasar:{" "}
                <span className="font-medium">
                  Rp {room.basePrice.toLocaleString("id-ID")}
                </span>
              </p>
            </div>

            {/* RIGHT: Capacity */}
            <div className="flex flex-col items-end gap-2 min-w-[120px]">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600">
                Kapasitas {room.capacity} orang
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
                {room.capacity} slot
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}


/* ------------------ Main Page ------------------ */
export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed fetch property");
        const data = await res.json();
        const prop = data.property || data.data?.property || data.data || data;
        setProperty(prop);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProperty();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!property)
    return <p className="text-center mt-20 text-red-500">Property not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT content */}
      <div className="lg:col-span-2 space-y-10">
        {/* Hero image with title & location */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
          >
            {property.pictures?.map((pic, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={pic.url}
                  alt={`${property.name} image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay for name + location */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-6 py-4 rounded-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {property.name}
            </h1>
            <p className="text-white/90 mt-1">
              {property.city}, {property.province}
            </p>
          </div>
        </div>

        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
        </section>

        {/* Available rooms */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Kamar yang Tersedia</h2>
          <AvailableRooms rooms={property.rooms || []} />
        </section>
      </div>

      {/* RIGHT sidebar = Booking */}
      <aside className="lg:col-span-1">
        <BookingCalendar rooms={property.rooms || []} />
      </aside>
    </div>
  );
}
