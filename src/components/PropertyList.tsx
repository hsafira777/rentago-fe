"use client";

const properties = [
  {
    id: 1,
    name: "Villa Indah",
    location: "Bali",
    price: "Rp 1.200.000 / malam",
  },
  {
    id: 2,
    name: "Apartment City View",
    location: "Jakarta",
    price: "Rp 850.000 / malam",
  },
  {
    id: 3,
    name: "Guest House Nyaman",
    location: "Bandung",
    price: "Rp 500.000 / malam",
  },
];

export default function PropertyList() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Properti Tersedia</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Gambar</span>
            </div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.location}</p>
            <p className="text-blue-600 font-bold">{p.price}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
