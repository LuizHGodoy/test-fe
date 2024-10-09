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
import axiosInstance from "@/services";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [planos, setPlanos] = useState([]);
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
    const fetchPlanos = async () => {
      try {
        const response = await axiosInstance.get("/plans?page=1&limit=10");
        setPlanos(response.data);
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      }
    };

    fetchPlanos();
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
              <SelectValue placeholder="Selecione o plano" />
            </SelectTrigger>
            <SelectContent>
              {planos.map((plano: any) => (
                <SelectItem key={plano.uuid} value={plano.id}>
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
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-700">
          O conteúdo do dashboard será exibido aqui com base nos filtros
          selecionados.
        </p>
      </div>
    </div>
  );
}
