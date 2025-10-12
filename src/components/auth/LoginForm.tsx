"use client";

import { useForm } from "react-hook-form";
import useAuthStore from "@/store/useAuthStore";
import { UserAuth } from "@/interface/userauth";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginForm({
  onSuccess,
  onError,
}: {
  onSuccess: (msg: string, user: UserAuth) => void;
  onError: (msg: string) => void;
}) {
  const { register, handleSubmit, reset } = useForm<LoginValues>();
  const { onSuccess: setAuth } = useAuthStore();

  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      const userData: UserAuth = {
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
      };

      setAuth(userData);
      onSuccess("Login berhasil!", userData);
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
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
}
