"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Verificar se o usuário está autenticado (por exemplo, checando um token no localStorage)
		const token = localStorage.getItem("authToken");
		setIsAuthenticated(!!token);
	}, []);

	const login = async (email: string, password: string) => {
		// Implementar lógica de login aqui
		// Por exemplo, fazer uma chamada API e salvar o token
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulando uma chamada API
		localStorage.setItem("authToken", "fake-token");
		setIsAuthenticated(true);
	};

	const logout = () => {
		// Implementar lógica de logout aqui
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
