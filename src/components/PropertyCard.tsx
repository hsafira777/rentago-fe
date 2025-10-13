"use client";

import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }: { property: any }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="block rounded-2xl overflow-hidden border border-gray-200 shadow hover:shadow-md transition bg-white group"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <Image
          src={property.pictures?.[0]?.url || "/placeholder.jpg"}
          alt={property.name}
          fill
          className="object-cover"
          unoptimized
        />
        {property.category?.name && (
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
            {property.category.name}
          </div>
        )}
        {property.minPrice !== null && (
          <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            Rp {property.minPrice.toLocaleString("id-ID")}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800">{property.name}</h2>
        <p className="text-sm text-gray-500">
          {property.city}, {property.province}
        </p>
      </div>
    </Link>
  );
}
