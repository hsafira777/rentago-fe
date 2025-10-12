import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserAuth } from "../interface/userauth";

type AuthState = {
  user: UserAuth | null;
  token: string | null;
};

type AuthActions = {
  onSuccess: (user: UserAuth, token: string) => void;
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

      onSuccess: (user, token) =>
        set(() => ({
          user,
          token,
        })),

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
