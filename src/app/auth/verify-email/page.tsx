"use client";

import { useEffect, useState } from "react";
import SetPasswordForm from "@/components/SetPasswordForm";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    if (!t) {
      setLoading(false);
      return;
    }

    setToken(t);

    const checkToken = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/auth/verify-email?token=${t}`
        );
        setTokenValid(res.ok);
      } catch {
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {!tokenValid || !token ? (
        <div className="p-6 bg-white rounded shadow max-w-md w-full text-center">
          <p className="text-red-500 font-medium">
            Token invalid atau sudah kadaluarsa.
          </p>
        </div>
      ) : (
        <div className="p-6 bg-white rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Set Password
          </h2>
          <SetPasswordForm token={token} />
        </div>
      )}
    </div>
  );
}
