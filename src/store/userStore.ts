import { zustandLocalStorage } from "@/lib/localStorage";
import axiosInstance from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  user_uuid: string;
}

interface UserState {
  user: User | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      fetchUser: async () => {
        try {
          const response = await axiosInstance.get("/user");
          set({ user: response.data });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: zustandLocalStorage,
    },
  ),
);
