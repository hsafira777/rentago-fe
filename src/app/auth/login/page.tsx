"use client";

import { useState } from "react";
import CardBox from "@/components/ui/cardbox";
import Button from "@/components/ui/button";
import AuthForm from "@/components/AuthForm";
import { Role, Mode } from "@/types/user";

export default function AuthPage() {
  const [role, setRole] = useState<Role>("user");
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccessMessage("");
  };

  const handleChangeRole = (newRole: Role) => {
    setRole(newRole);
    resetMessages();
  };

  const handleChangeMode = (newMode: Mode) => {
    setMode(newMode);
    resetMessages();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <CardBox className="space-y-6">
        {/* Judul */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {mode === "login" ? "Login" : "Register"}{" "}
          {role === "user" ? "User" : "Tenant"}
        </h2>

        {/* Switch role */}
        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            variant="secondary"
            active={role === "user"}
            onClick={() => handleChangeRole("user")}
          >
            User
          </Button>
          <Button
            type="button"
            variant="secondary"
            active={role === "tenant"}
            onClick={() => handleChangeRole("tenant")}
          >
            Tenant
          </Button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {/* Success */}
        {successMessage && (
          <p className="text-green-600 text-center font-medium">
            {successMessage}
          </p>
        )}

        {/* Form di-extract ke komponen AuthForm */}
        <AuthForm
          role={role}
          mode={mode}
          onSuccess={(msg) => setSuccessMessage(msg)}
          onError={(msg) => setError(msg)}
        />

        {/* Toggle mode */}
        <p className="text-sm text-center">
          {mode === "login" ? (
            <>
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => handleChangeMode("register")}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => handleChangeMode("login")}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </CardBox>
    </div>
  );
}
