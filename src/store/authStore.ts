import { zustandLocalStorage } from "@/lib/localStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,

			login: async (email: string, password: string) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				set((state) => ({
					...state,
					isAuthenticated: true,
				}));
				zustandLocalStorage.setItem("authToken", "fake-token");
			},

			logout: () => {
				set((state) => ({
					...state,
					isAuthenticated: false,
				}));
				zustandLocalStorage.removeItem("authToken");
			},
		}),
		{
			name: "auth-storage",
			storage: zustandLocalStorage,
		},
	),
);
