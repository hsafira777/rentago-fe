"use client";

import { useState } from "react";
import {
  CreatePropertyInput,
  createProperty,
} from "@/services/propertyServices";
import { RoomForm } from "./RoomForm";
import useAuthStore from "@/store/useAuthStore";

export function PropertyForm() {
  const { user } = useAuthStore();
  const tenantId = user?.id;

  const [property, setProperty] = useState<CreatePropertyInput>({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    categoryName: "",
    pictures: [],
    rooms: [],
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (field: keyof CreatePropertyInput, value: any) => {
    setProperty((prev) => ({ ...prev, [field]: value }));
  };

  // 🖼️ Handle file upload + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProperty((prev) => ({ ...prev, pictures: files }));
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setUploadProgress(0);

    try {
      if (!tenantId)
        throw new Error("Tenant ID tidak ditemukan. Silakan login ulang.");

      const payload = { ...property, tenantId };
      await createProperty(payload);

      setMessage({ type: "success", text: "Properti berhasil dibuat ✅" });
      setProperty({
        name: "",
        description: "",
        address: "",
        city: "",
        province: "",
        categoryName: "",
        pictures: [],
        rooms: [],
      });
      setPreviewUrls([]);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menyimpan properti.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Buat Properti Baru 🏡
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Properti */}
          <FormField
            label="Nama Properti"
            value={property.name}
            onChange={(val) => handleChange("name", val)}
            required
          />

          {/* Deskripsi */}
          <FormField
            label="Deskripsi"
            type="textarea"
            value={property.description}
            onChange={(val) => handleChange("description", val)}
            required
          />

          {/* Alamat, Kota, Provinsi, Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Alamat"
              value={property.address}
              onChange={(val) => handleChange("address", val)}
              required
            />
            <FormField
              label="Kota"
              value={property.city}
              onChange={(val) => handleChange("city", val)}
              required
            />
            <FormField
              label="Provinsi"
              value={property.province}
              onChange={(val) => handleChange("province", val)}
              required
            />
            <FormField
              label="Kategori"
              placeholder="Nama kategori baru atau kosongkan jika pakai ID"
              value={property.categoryName || ""}
              onChange={(val) => handleChange("categoryName", val)}
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Foto Properti
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full border rounded-lg p-2"
            />

            {previewUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {previewUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Preview ${i}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Rooms */}
          <RoomForm
            rooms={property.rooms || []}
            onChange={(rooms) => handleChange("rooms", rooms)}
          />

          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Alert Message */}
          {message && (
            <p
              className={`text-center border p-3 rounded-lg ${
                message.type === "success"
                  ? "text-green-600 bg-green-50 border-green-200"
                  : "text-red-600 bg-red-50 border-red-200"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Tombol Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Menyimpan..." : "Buat Properti"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input/Textarea Component */
function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: "text" | "textarea";
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  );
}
