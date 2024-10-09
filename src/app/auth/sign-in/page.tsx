"use client";

import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";
import { LoginForm } from "./login-form";

export default function SignIn({
  onSignUpClick,
  onForgotPasswordClick,
}: {
  onSignUpClick: () => void;
  onForgotPasswordClick: () => void;
}) {
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
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
          onForgotPasswordClick={onForgotPasswordClick}
        />
        <div className="text-center">
          <p className="mt-2 text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={onSignUpClick}
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
