"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardBox from "@/components/ui/cardbox";
import Button from "@/components/ui/button";
import { Role, Mode } from "@/types/user";
import { UserAuth } from "@/interface/userauth";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import useAuthStore from "@/store/useAuthStore";

export default function AuthPage() {
  const [role, setRole] = useState<Role>("USER");
  const [mode, setMode] = useState<Mode>("login");
  const [message, setMessage] = useState<{ error?: string; success?: string }>(
    {}
  );

  const router = useRouter();
  const { onSuccess } = useAuthStore();

  const resetMessages = () => setMessage({});

  const handleSwitch = (type: "role" | "mode", value: Role | Mode) => {
    resetMessages();
    type === "role" ? setRole(value as Role) : setMode(value as Mode);
  };

  const titles: Record<Mode, string> = {
    login: "Login",
    register: "Register",
  };

  const toggleConfig =
    mode === "login"
      ? { text: "Belum punya akun?", action: "Register", to: "register" }
      : { text: "Sudah punya akun?", action: "Login", to: "login" };

  // 🔐 Redirect berdasarkan role setelah login sukses
  const roleRedirect: Record<Role, string> = {
    USER: "/profile",
    TENANT: "/dashboard",
  };

  const handleSuccess = (msg: string, userData: UserAuth, token?: string) => {
    setMessage({ success: msg });

    // simpan token kalau ada
    if (token) {
      localStorage.setItem("token", token);
    }

    // simpan user ke Zustand
    onSuccess(userData);

    if (mode === "login") {
      const redirectPath = roleRedirect[userData.role] || "/";
      router.push(redirectPath);
    }
  };

  const handleError = (msg: string) => {
    setMessage({ error: msg });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <CardBox className="space-y-6">
        {/* Judul */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {titles[mode]} {role === "USER" ? "User" : "Tenant"}
        </h2>

        {/* Switch role */}
        <div className="flex justify-center space-x-4">
          {(["USER", "TENANT"] as Role[]).map((r) => (
            <Button
              key={r}
              type="button"
              variant="secondary"
              active={role === r}
              onClick={() => handleSwitch("role", r)}
            >
              {r === "USER" ? "User" : "Tenant"}
            </Button>
          ))}
        </div>

        {/* Messages */}
        {message.error && (
          <p className="text-red-500 text-center font-medium">
            {message.error}
          </p>
        )}
        {message.success && (
          <p className="text-green-600 text-center font-medium">
            {message.success}
          </p>
        )}

        {/* Form login / register */}
        {mode === "login" ? (
          <LoginForm
            role={role}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        ) : (
          <RegisterForm
            role={role}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}

        {/* Toggle mode */}
        <div className="space-y-2 text-center">
          <p className="text-sm">
            {toggleConfig.text}{" "}
            <button
              type="button"
              onClick={() => handleSwitch("mode", toggleConfig.to as Mode)}
              className="text-blue-600 hover:underline"
            >
              {toggleConfig.action}
            </button>
          </p>

          {mode === "login" && (
            <p className="text-sm">
              <button
                type="button"
                onClick={() => router.push("/auth/reset-password")}
                className="text-blue-600 hover:underline"
              >
                Lupa password?
              </button>
            </p>
          )}
        </div>
      </CardBox>
    </div>
  );
}
