"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

type PropertyCategory = {
  id: string;
  name: string;
};

export default function CreatePropertyPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [categories, setCategories] = useState<PropertyCategory[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    categoryId: "",
    pictures: [] as string[],
  });
  const [newPictureUrl, setNewPictureUrl] = useState("");

  // Ambil daftar kategori dari API
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:8080/api/property-categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPicture = () => {
    if (newPictureUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        pictures: [...prev.pictures, newPictureUrl],
      }));
      setNewPictureUrl("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login first");

    try {
      const payload = {
        tenantId: user.id,
        ...formData,
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            className="w-full border rounded-lg px-3 py-2"
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
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
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
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* City & Province */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Province</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pictures */}
        <div>
          <label className="block text-sm font-medium mb-1">Pictures</label>
          <div className="flex space-x-2">
            <input
              type="url"
              placeholder="Enter picture URL"
              value={newPictureUrl}
              onChange={(e) => setNewPictureUrl(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              type="button"
              onClick={handleAddPicture}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
          {formData.pictures.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {formData.pictures.map((url, idx) => (
                <li key={idx}>{url}</li>
              ))}
            </ul>
          )}
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
