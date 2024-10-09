"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Falha ao enviar o email de recuperação", error);
      alert(
        "Falha ao enviar o email de recuperação. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Recuperar senha
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSubmitted
              ? "Verifique seu email para instruções de recuperação de senha."
              : "Digite seu e-mail para receber um link de recuperação de senha."}
          </p>
        </div>
        {!isSubmitted ? (
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
                  className="rounded-md"
                  placeholder="Endereço de e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Enviar link de recuperação
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <Button
              onClick={() => router.push("/auth/sign-in")}
              className="w-full"
            >
              Voltar para o login
            </Button>
          </div>
        )}
        <div className="text-center">
          <p className="mt-2 text-sm text-muted-foreground">
            Lembrou sua senha?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/sign-in")}
              className="font-medium text-primary hover:text-primary/80"
            >
              Voltar para o login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
