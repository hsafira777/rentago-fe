"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { uploadPaymentProof } from "@/lib/dummyApi";

export default function UploadProofPage() {
  const { orderId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validasi
    if (!["image/jpeg", "image/png"].includes(selected.type)) {
      setError("File harus JPG/PNG");
      return;
    }
    if (selected.size > 1024 * 1024) {
      setError("Ukuran max 1MB");
      return;
    }

    setFile(selected);
    setError(null);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = () => {
    if (!file) {
      setError("Pilih file dulu");
      return;
    }
    // Dummy proof URL
    const proofUrl = "/dummy/" + file.name;
    uploadPaymentProof(orderId as string, proofUrl);
    alert("Upload sukses (dummy). Order status → MENUNGGU_KONFIRMASI");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Bukti Pembayaran</h1>
      <p className="mb-2 text-gray-700">Order ID: {orderId}</p>

      <input type="file" onChange={handleFileChange} className="mb-4" />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {preview && (
        <img src={preview} alt="Preview" className="w-48 h-48 mb-4" />
      )}

      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Upload
      </button>
    </div>
  );
}
