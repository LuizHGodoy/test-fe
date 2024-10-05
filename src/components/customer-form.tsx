"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function CustomerForm() {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		cpfCnpj: "",
		phone: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		cpfCnpj: "",
		phone: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validateEmail = (email: string) => {
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return re.test(email);
	};

	const validateCpfCnpj = (cpfCnpj: string) => {
		const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
		const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
		return cpfRegex.test(cpfCnpj) || cnpjRegex.test(cpfCnpj);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let isValid = true;
		const newErrors = { ...errors };

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
			isValid = false;
		}

		if (!validateEmail(formData.email)) {
			newErrors.email = "Invalid email address";
			isValid = false;
		}

		if (!validateCpfCnpj(formData.cpfCnpj)) {
			newErrors.cpfCnpj = "Invalid CPF/CNPJ format";
			isValid = false;
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone is required";
			isValid = false;
		}

		setErrors(newErrors);

		if (isValid) {
			console.log("Form submitted:", formData);
			toast({
				title: "Customer Added",
				description: "The customer has been successfully added to the system.",
			});
			setFormData({ name: "", email: "", cpfCnpj: "", phone: "" });
		}
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-2xl font-bold mb-6">Add Customer</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter customer name"
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name}</p>
					)}
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Enter customer email"
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email}</p>
					)}
				</div>
				<div>
					<Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
					<Input
						id="cpfCnpj"
						name="cpfCnpj"
						value={formData.cpfCnpj}
						onChange={handleChange}
						placeholder="000.000.000-00 or 00.000.000/0000-00"
					/>
					{errors.cpfCnpj && (
						<p className="text-red-500 text-sm mt-1">{errors.cpfCnpj}</p>
					)}
				</div>
				<div>
					<Label htmlFor="phone">Phone</Label>
					<Input
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="Enter customer phone"
					/>
					{errors.phone && (
						<p className="text-red-500 text-sm mt-1">{errors.phone}</p>
					)}
				</div>
				<Button type="submit">Add Customer</Button>
			</form>
		</div>
	);
}
