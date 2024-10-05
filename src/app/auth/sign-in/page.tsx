"use client";

import { useAuth } from "@/app/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SignIn({
	onSignUpClick,
	onForgotPasswordClick,
}: { onSignUpClick: () => void; onForgotPasswordClick: () => void }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-bold text-foreground">
						Entrar na sua conta
					</h2>
				</div>
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
		</div>
	);
}
