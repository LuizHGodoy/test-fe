'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">Recuperar senha</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Digite seu e-mail para receber um link de recuperação de senha.
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
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
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Enviar link de recuperação
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-muted-foreground">
            Lembrou sua senha?{' '}
            <Link href="/auth/sign-in" className="font-medium text-primary hover:text-primary/80">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}