"use client";

import { useEffect, useState } from "react";
import CardBox from "@/components/ui/cardbox";
import Button from "@/components/ui/button";
import VerifyEmailSkeleton from "./skeleton";
import AuthLayout from "@/components/layouts/auth-layout";

function SetPasswordForm() {
  return (
    <form className="space-y-4">
      <input
        type="password"
        placeholder="Password baru"
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Konfirmasi password"
        className="w-full border rounded px-3 py-2"
      />
      <Button type="submit" variant="primary" className="w-full">
        Simpan Password
      </Button>
    </form>
  );
}

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get("token");
        if (!token) throw new Error("Token not found");

        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (res.ok) {
          setTokenValid(true);
        }
      } catch {
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) return <VerifyEmailSkeleton />;

  return (
    <AuthLayout>
      {!tokenValid ? (
        <CardBox>
          <p className="text-red-500 text-center font-medium">
            Token invalid atau sudah kadaluarsa.
          </p>
        </CardBox>
      ) : (
        <CardBox className="space-y-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Set Password
          </h2>
          <SetPasswordForm />
        </CardBox>
      )}
    </AuthLayout>
  );
}
