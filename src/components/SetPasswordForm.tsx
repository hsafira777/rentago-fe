"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

export default function SetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Password tidak sama");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan password");
      }

      setSuccess("Password berhasil disimpan, silakan login");
      setPassword("");
      setConfirm("");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
          setSuccess("");
        }}
        placeholder="Password baru"
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="password"
        value={confirm}
        onChange={(e) => {
          setConfirm(e.target.value);
          setError("");
          setSuccess("");
        }}
        placeholder="Konfirmasi password"
        className="w-full border rounded px-3 py-2"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Password"}
      </Button>
    </form>
  );
}
