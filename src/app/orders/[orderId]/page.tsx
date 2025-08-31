"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validasi ekstensi
    const validExtensions = ["image/jpeg", "image/png"];
    if (!validExtensions.includes(selectedFile.type)) {
      setError("File harus berupa JPG atau PNG");
      setFile(null);
      setPreview(null);
      return;
    }

    // Validasi size (1MB = 1024*1024 byte)
    if (selectedFile.size > 1024 * 1024) {
      setError("Ukuran file maksimal 1MB");
      setFile(null);
      setPreview(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Pilih file terlebih dahulu");
      return;
    }

    // Dummy: simulasi upload
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading proof for order:", orderId);
    console.log("File:", file);

    // Nanti ganti fetch ke backend:
    // await fetch(`/api/orders/${orderId}/payment-proof`, {
    //   method: "POST",
    //   body: formData,
    // });

    alert("Bukti pembayaran berhasil diupload (dummy)!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Bukti Pembayaran</h1>
      <p className="mb-2 text-gray-700">Order ID: {orderId}</p>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="mb-4"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {preview && (
        <div className="mb-4">
          <p className="text-sm mb-1">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Upload
      </button>
    </div>
  );
}
