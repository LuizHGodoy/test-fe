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
          <h2 className="mt-6 text-3xl font-bold text-foreground">Criar uma nova conta</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="name" className="sr-only">
                Nome completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="rounded-t-md"
                placeholder="Nome completo"
              />
            </div>
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
                placeholder="Endereço de e-mail"
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
                autoComplete="new-password"
                required
                placeholder="Senha"
              />
            </div>
            <div>
              <Label htmlFor="password-confirm" className="sr-only">
                Confirmar senha
              </Label>
              <Input
                id="password-confirm"
                name="password-confirm"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-b-md"
                placeholder="Confirmar senha"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/auth/sign-in" className="font-medium text-primary hover:text-primary/80">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}