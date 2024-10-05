"use client";

import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import CustomerForm from "./customer-form";
import { Dashboard } from "./dashboard";
import ServiceCart from "./service-cart";

export default function App() {
	const [view, setView] = useState("dashboard");
	const [userImage, setUserImage] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchUserImage = async () => {
			const response = await fetch("https://randomuser.me/api/");
			const data = await response.json();
			const imageUrl = data.results[0].picture.large;
			setUserImage(imageUrl);
			localStorage.setItem("userImage", imageUrl);
		};

		if (!userImage) {
			const storedImage = localStorage.getItem("userImage");
			if (storedImage) {
				setUserImage(storedImage);
			} else {
				fetchUserImage();
			}
		}
	}, [userImage]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						<div className="flex-shrink-0 flex items-center">
							<div className="sm:hidden">
								<button
									type="button"
									className="p-2"
									onClick={() => setIsMenuOpen(!isMenuOpen)}
								>
									<HiMenu className="h-6 w-6" />
								</button>
							</div>
							<div className="hidden sm:flex">
								<span
									className="text-2xl font-bold text-gray-900 cursor-pointer"
									onClick={() => setView("dashboard")}
									onKeyUp={() => setView("dashboard")}
								>
									PAX Vendas
								</span>
							</div>
						</div>
						<div className="hidden sm:flex sm:ml-6 sm:space-x-8">
							<button
								type="button"
								className={`${
									view === "dashboard" ? "bg-gray-200" : "bg-transparent"
								} p-2 rounded`}
								onClick={() => setView("dashboard")}
							>
								Dashboard
							</button>
							<button
								type="button"
								className={`${
									view === "customers" ? "bg-gray-200" : "bg-transparent"
								} p-2 rounded`}
								onClick={() => setView("customers")}
							>
								Customers
							</button>
							<button
								type="button"
								className={`${
									view === "services" ? "bg-gray-200" : "bg-transparent"
								} p-2 rounded`}
								onClick={() => setView("services")}
							>
								Services
							</button>
						</div>
						<div className="ml-auto relative" ref={dropdownRef}>
							<button
								type="button"
								className="rounded-full p-2"
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							>
								<img
									src={userImage}
									alt="Perfil"
									className="h-8 w-8 rounded-full"
								/>
							</button>
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
									<button
										type="button"
										onClick={() => {
											setView("profile");
											setIsDropdownOpen(false);
										}}
										className="block w-full text-left px-4 py-2 hover:bg-gray-200"
									>
										Perfil
									</button>
									<button
										type="button"
										onClick={() => {
											setView("settings");
											setIsDropdownOpen(false);
										}}
										className="block w-full text-left px-4 py-2 hover:bg-gray-200"
									>
										Configurações
									</button>
									<button
										type="button"
										onClick={() => {
											useAuthStore.getState().logout();
											setIsDropdownOpen(false);
										}}
										className="block w-full text-left px-4 py-2 hover:bg-gray-200"
									>
										Sair
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>

			{isMenuOpen && (
				<div
					className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
					onClick={() => setIsMenuOpen(false)}
					onKeyUp={() => setIsMenuOpen(false)}
				>
					<div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-50">
						<div className="flex flex-col p-4">
							<div className="flex justify-center items-center bg-green-500 p-4">
								<img
									src="https://i.imgur.com/RaTqCbH.png"
									alt="Logo"
									className="h-12"
								/>
							</div>
							<button
								type="button"
								onClick={() => {
									setView("dashboard");
									setIsMenuOpen(false);
								}}
							>
								Dashboard
							</button>
							<button
								type="button"
								onClick={() => {
									setView("customers");
									setIsMenuOpen(false);
								}}
							>
								Customers
							</button>
							<button
								type="button"
								onClick={() => {
									setView("services");
									setIsMenuOpen(false);
								}}
							>
								Services
							</button>
						</div>
					</div>
				</div>
			)}

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{view === "dashboard" && <Dashboard />}
				{view === "customers" && <CustomerForm />}
				{view === "services" && <ServiceCart />}
			</main>
			<Toaster />
		</div>
	);
}
