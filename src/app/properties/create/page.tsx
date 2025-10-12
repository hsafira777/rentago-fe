"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: ganti sesuai endpoint API kamu
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create property");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error creating property");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h1 className="text-2xl font-bold">Create New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            rows={4}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price (Rp)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Property
          </button>
        </div>
      </form>
    </div>
  );
}
