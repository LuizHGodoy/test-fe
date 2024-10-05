"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import CustomerForm from "./customer-form";
import { Dashboard } from "./dashboard";
import ServiceCart from "./service-cart";

export default function App() {
	const [view, setView] = useState("dashboard");

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex justify-between h-16 items-center">
							<div className="flex-shrink-0 flex items-center">
								<span
									className="text-2xl font-bold text-gray-900 cursor-pointer"
									onClick={() => setView("dashboard")}
									onKeyUp={() => setView("dashboard")}
								>
									PAX Vendas
								</span>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center">
								<Button
									variant={view === "dashboard" ? "default" : "ghost"}
									onClick={() => setView("dashboard")}
								>
									Dashboard
								</Button>
								<Button
									variant={view === "customers" ? "default" : "ghost"}
									onClick={() => setView("customers")}
								>
									Customers
								</Button>
								<Button
									variant={view === "services" ? "default" : "ghost"}
									onClick={() => setView("services")}
								>
									Services
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{view === "dashboard" && <Dashboard />}
				{view === "customers" && <CustomerForm />}
				{view === "services" && <ServiceCart />}
			</main>
			<Toaster />
		</div>
	);
}
