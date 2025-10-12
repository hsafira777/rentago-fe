import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserAuth } from "../interface/userauth";

type AuthState = {
  user: UserAuth | null;
  token: string | null;
  userId: string | null;
};

type AuthActions = {
  onSuccess: (user: UserAuth) => void;
  clearAuth: () => void;
};

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      userId: null,

      onSuccess: (user) => {
        set({
          user,
          token: user.token,
          userId: user.id ?? null,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          userId: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        userId: state.userId,
      }),
    }
  )
);

export default useAuthStore;
