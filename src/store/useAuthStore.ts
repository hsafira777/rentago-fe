import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserAuth } from "../interface/userauth";

type AuthState = {
  user: UserAuth | null;
  token: string | null;
};

type AuthActions = {
  onSuccess: (user: UserAuth) => void; // ✅ hanya 1 argumen
  clearAuth: () => void;
};

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<
  AuthStore,
  [["zustand/persist", Pick<AuthStore, "user" | "token">]]
>(
  persist(
    (set) => ({
      user: null,
      token: null,

      onSuccess: (user) => {
        set(() => ({
          user,
          token: user.token,
        }));

        // simpan token manual ke localStorage kalau perlu akses langsung
        if (user.token) {
          localStorage.setItem("token", user.token);
        }
      },

      clearAuth: () =>
        set(() => ({
          user: null,
          token: null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
