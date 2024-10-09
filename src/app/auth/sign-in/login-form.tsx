"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onForgotPasswordClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPasswordClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Label htmlFor="email-address" className="sr-only">
            Endereço de e-mail
          </Label>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-t-md mb-4"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Senha
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-b-md"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <Label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-muted-foreground"
          >
            Lembrar-me
          </Label>
        </div>

        <div className="text-sm">
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="font-medium text-primary hover:text-primary/80"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
    </form>
  );
};
