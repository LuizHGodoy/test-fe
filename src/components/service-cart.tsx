"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const availableServices = [
	{ id: 1, name: "Basic Plan", price: 50 },
	{ id: 2, name: "Pro Plan", price: 100 },
	{ id: 3, name: "Enterprise Plan", price: 200 },
	{ id: 4, name: "Support Service", price: 25 },
	{ id: 5, name: "Consultation", price: 75 },
];

export default function ServiceCart() {
	const { toast } = useToast();
	const [cart, setCart] = useState<
		Array<{ id: number; name: string; price: number; quantity: number }>
	>([]);
	const [selectedService, setSelectedService] = useState("");

	const addToCart = () => {
		const service = availableServices.find(
			(s) => s.id === Number.parseInt(selectedService),
		);
		if (service) {
			const existingItem = cart.find((item) => item.id === service.id);
			if (existingItem) {
				setCart(
					cart.map((item) =>
						item.id === service.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				);
			} else {
				setCart([...cart, { ...service, quantity: 1 }]);
			}
			toast({
				title: "Service Added",
				description: `${service.name} has been added to your cart.`,
			});
		}
	};

	const removeFromCart = (id: number) => {
		setCart(cart.filter((item) => item.id !== id));
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-2xl font-bold mb-6">Service Cart</h2>
			<div className="mb-4">
				<Label htmlFor="service">Select Service</Label>
				<Select onValueChange={setSelectedService}>
					<SelectTrigger id="service">
						<SelectValue placeholder="Choose a service" />
					</SelectTrigger>
					<SelectContent>
						{availableServices.map((service) => (
							<SelectItem key={service.id} value={service.id.toString()}>
								{service.name} - ${service.price}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Button onClick={addToCart} className="mb-6">
				Add to Cart
			</Button>

			{cart.length > 0 ? (
				<div>
					<h3 className="text-xl font-semibold mb-4">Cart Items</h3>
					<ul className="space-y-2">
						{cart.map((item) => (
							<li key={item.id} className="flex justify-between items-center">
								<span>
									{item.name} x {item.quantity}
								</span>
								<span>${item.price * item.quantity}</span>
								<Button
									variant="destructive"
									onClick={() => removeFromCart(item.id)}
								>
									Remove
								</Button>
							</li>
						))}
					</ul>
					<div className="mt-4 text-xl font-bold">Total: ${total}</div>
				</div>
			) : (
				<p>Your cart is empty.</p>
			)}
		</div>
	);
}
