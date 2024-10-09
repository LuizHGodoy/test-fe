import axiosInstance from "@/lib/axiosConfig"; // Importando a instância do axios
import { zustandLocalStorage } from "@/lib/localStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await axiosInstance.post("/sign-in", {
            email,
            password,
          });
          const token = response.data.access_token;

          console.log("Token recuperado do localStorage:", token);

          set((state) => ({
            ...state,
            isAuthenticated: true,
          }));
          localStorage.setItem("authToken", token);
        } catch (error) {
          console.error("Erro ao fazer login:", error);
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const response = await axiosInstance.post("/sign-up", {
            name,
            email,
            password,
          });
          const token = response.data.access_token;

          set((state) => ({
            ...state,
            isAuthenticated: true,
          }));
          localStorage.setItem("authToken", token);
        } catch (error) {
          console.error("Erro ao registrar:", error);
        }
      },

      logout: () => {
        set((state) => ({
          ...state,
          isAuthenticated: false,
        }));
        localStorage.removeItem("authToken");
        localStorage.removeItem("userImage");
      },
    }),
    {
      name: "auth-storage",
      storage: zustandLocalStorage,
    },
  ),
);
