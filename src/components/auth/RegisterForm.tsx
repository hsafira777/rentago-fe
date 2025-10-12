"use client";

import { useForm } from "react-hook-form";

type RegisterValues = {
  email: string;
  name: string;
  role: "USER" | "TENANT";
};

export default function RegisterForm({
  role,
  onSuccess,
  onError,
}: {
  role: "USER" | "TENANT";
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const { register, handleSubmit, reset } = useForm<RegisterValues>();

  const onSubmit = async (data: RegisterValues) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      onSuccess("Silakan cek email kamu untuk verifikasi!");
      reset();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi error";
      onError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        className="border rounded p-2"
      />
      <input
        type="text"
        placeholder="Name"
        {...register("name", { required: true })}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
