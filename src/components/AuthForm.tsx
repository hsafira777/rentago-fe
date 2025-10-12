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
      let res: Response;

      if (mode === "login") {
        res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
      } else {
        res = await fetch("http://localhost:8080/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            role,
          }),
        });
      }

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
console.log(result);

      // ✅ mapping backend response ke UserAuth
      const userData: UserAuth = {
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
      };

      // simpan ke zustand
      setAuth(userData);

      // trigger callback parent
      onSuccess(
        result.message ||
          (mode === "login" ? "Login berhasil!" : "Register berhasil!"),
        userData
      );

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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
