"use client";

import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";
import { redirect, useRouter } from "next/navigation";
import { LoginForm } from "./login-form";

export default function SignIn() {
  const router = useRouter();

  const { login, isAuthenticated } = useAuthStore((state) => {
    return {
      login: state.login,
      isAuthenticated: state.isAuthenticated,
    };
  });
  const handleLogin = (email: string, password: string) => {
    login(email, password).then(() => redirect("/"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Entrar na sua conta
          </h2>
        </div>
        <LoginForm
          onSubmit={handleLogin}
          onForgotPasswordClick={() => router.push("/auth/recovery")}
        />
        <div className="text-center">
          <p className="mt-2 text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/sign-up")}
              className="font-medium text-primary hover:text-primary/80"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
