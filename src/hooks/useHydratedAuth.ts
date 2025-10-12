"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export function useHydratedAuth(redirectPath: string = "/auth/login") {
  const router = useRouter();
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Cek apakah store sudah hydrate
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        setHydrated(true);
      });
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.push(redirectPath);
    }
  }, [hydrated, user, router, redirectPath]);

  return { hydrated, user };
}
