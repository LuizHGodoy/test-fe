"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function Dashboard() {
	const [filters, setFilters] = useState({
		customer: "",
		plan: "",
		period: "",
		uf: "",
	});

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-2xl font-bold mb-6">Dashboard</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div>
					<Label htmlFor="customer">Customer</Label>
					<Input
						id="customer"
						value={filters.customer}
						onChange={(e) => handleFilterChange("customer", e.target.value)}
						placeholder="Filter by customer"
					/>
				</div>
				<div>
					<Label htmlFor="plan">Plan</Label>
					<Select onValueChange={(value) => handleFilterChange("plan", value)}>
						<SelectTrigger id="plan">
							<SelectValue placeholder="Select plan" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="basic">Basic</SelectItem>
							<SelectItem value="pro">Pro</SelectItem>
							<SelectItem value="enterprise">Enterprise</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="period">Period</Label>
					<Select
						onValueChange={(value) => handleFilterChange("period", value)}
					>
						<SelectTrigger id="period">
							<SelectValue placeholder="Select period" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="last7days">Last 7 days</SelectItem>
							<SelectItem value="last30days">Last 30 days</SelectItem>
							<SelectItem value="last3months">Last 3 months</SelectItem>
							<SelectItem value="lastyear">Last year</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="uf">UF</Label>
					<Input
						id="uf"
						value={filters.uf}
						onChange={(e) => handleFilterChange("uf", e.target.value)}
						placeholder="Filter by UF"
					/>
				</div>
			</div>
			<div className="bg-gray-100 p-4 rounded">
				<p className="text-gray-700">
					Dashboard content will be displayed here based on the selected
					filters.
				</p>
			</div>
		</div>
	);
}
