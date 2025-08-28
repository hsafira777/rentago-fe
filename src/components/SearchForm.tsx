"use client";
import { useState } from "react";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);

  return (
    <section className="bg-white shadow-lg p-6 rounded-2xl -mt-12 relative z-10 max-w-4xl mx-auto">
      <form className="grid md:grid-cols-3 gap-4">
        {/* Kota */}
        <div>
          <label className="block mb-1 text-sm font-medium">Destinasi</label>
          <select
            className="w-full border rounded-lg p-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Pilih Kota</option>
            <option value="jakarta">Jakarta</option>
            <option value="bandung">Bandung</option>
            <option value="bali">Bali</option>
          </select>
        </div>

        {/* Tanggal */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Tanggal Berangkat
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Durasi */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Durasi (hari)
          </label>
          <input
            type="number"
            min={1}
            className="w-full border rounded-lg p-2"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
      </form>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
      >
        Cari Properti
      </button>
    </section>
  );
}
