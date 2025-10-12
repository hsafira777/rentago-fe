"use client";

import { useForm } from "react-hook-form";
import { Role, Mode } from "@/types/user";
import { UserAuth } from "@/interface/userauth";
import useAuthStore from "@/store/useAuthStore";

type FormValues = {
  email: string;
  name?: string;
  password?: string;
};

export default function AuthForm({
  role,
  mode,
  onSuccess,
  onError,
}: {
  role: Role;
  mode: Mode;
  onSuccess: (msg: string, userData: UserAuth) => void;
  onError: (msg: string) => void;
}) {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { onSuccess: setAuth } = useAuthStore();

  const onSubmit = async (data: FormValues) => {
    try {
      const url =
        mode === "login"
          ? "http://localhost:8080/api/auth/login"
          : "http://localhost:8080/api/auth/register";

      const body =
        mode === "login"
          ? { email: data.email, password: data.password }
          : { email: data.email, name: data.name, role };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Gagal melakukan autentikasi");

      
      const userData: UserAuth = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
      };

      
      setAuth(userData);

      
      onSuccess(
        result.message ||
          (mode === "login" ? "Login berhasil!" : "Register berhasil!"),
        userData
      );

      reset();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan tidak diketahui";
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
      {mode === "register" && (
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
          className="border rounded p-2"
        />
      )}
      {mode === "login" && (
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="border rounded p-2"
        />
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}