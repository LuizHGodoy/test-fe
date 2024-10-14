"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllPlans } from "@/services/api/plans";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Fev", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Abr", value: 4500 },
  { name: "Mai", value: 6000 },
  { name: "Jun", value: 5500 },
];

const clientDistribution = [
  { name: "Plano A", value: 400 },
  { name: "Plano B", value: 300 },
  { name: "Plano C", value: 200 },
  { name: "Plano D", value: 100 },
];

export default function Dashboard() {
  const [planos, setPlanos] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [filtros, setFiltros] = useState({
    cliente: "",
    plano: "",
    periodo: "",
    uf: "",
  });

  const handleFilterChange = (chave: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [chave]: valor }));
  };

  useEffect(() => {
    getAllPlans().then((response) => {
      setPlanos(response);
    });
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            id="cliente"
            value={filtros.cliente}
            onChange={(e) => handleFilterChange("cliente", e.target.value)}
            placeholder="Filtrar por cliente"
          />
        </div>
        <div>
          <Label htmlFor="plano">Plano</Label>
          <Select onValueChange={(value) => handleFilterChange("plano", value)}>
            <SelectTrigger id="plano">
              <SelectValue
                placeholder={
                  selectedPlan ? selectedPlan.nome : "Selecione o plano"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {planos.map((plano: any) => (
                <SelectItem key={plano.uuid} value={plano.uuid}>
                  {plano.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="periodo">Período</Label>
          <Select
            onValueChange={(value) => handleFilterChange("periodo", value)}
          >
            <SelectTrigger id="periodo">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="last3months">Últimos 3 meses</SelectItem>
              <SelectItem value="lastyear">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="uf">UF</Label>
          <Input
            id="uf"
            value={filtros.uf}
            onChange={(e) => handleFilterChange("uf", e.target.value)}
            placeholder="Filtrar por UF"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.9%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Plano Mais Vendido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Plano Premium</div>
            <p className="text-xs text-muted-foreground">
              32% das vendas totais
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Vendas",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000"
                    name="Vendas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Clientes por Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Clientes",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill="var(--color-value)"
                    name="Clientes"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
