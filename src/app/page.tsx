"use client";

import AppComponent from "@/components/app";

import { useState } from "react";
import Recovery from "./auth/recovery/page";
import SignIn from "./auth/sign-in/page";
import SignUp from "./auth/sign-up/page";
import { useAuth } from "./contexts/auth-context";

export default function Home() {
	const { isAuthenticated } = useAuth();
	const [authView, setAuthView] = useState<"signin" | "signup" | "recovery">(
		"signin",
	);

	if (!isAuthenticated) {
		return (
			<main>
				{authView === "signin" && (
					<SignIn
						onSignUpClick={() => setAuthView("signup")}
						onForgotPasswordClick={() => setAuthView("recovery")}
					/>
				)}
				{authView === "signup" && (
					<SignUp onSignInClick={() => setAuthView("signin")} />
				)}
				{authView === "recovery" && (
					<Recovery onBackToSignInClick={() => setAuthView("signin")} />
				)}
			</main>
		);
	}

	return (
		<main>
			<AppComponent />
		</main>
	);
}
