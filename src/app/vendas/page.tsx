"use client";

import { Venda } from "@/components/columns";
import {
  CreateVendasForm,
  IVendasFormularioData,
} from "@/components/create-vendas-form";
import { Button } from "@/components/ui/button";
import { VendasTable } from "@/components/vendas-table";
import { getAllVendas } from "@/services/api/vendas";
import { useEffect, useState } from "react";

const defaultVendasData: IVendasFormularioData = {
  totalVenda: 0,
  descontoAplicado: 0,
  status: "",
  vendedorUuid: "",
  clientes: [],
  planos: [],
  servicos: [],
};

export default function VendasPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [serviceData, setServiceData] =
    useState<IVendasFormularioData>(defaultVendasData);
  const [data, setData] = useState<Venda[]>([]);

  const handleChange = (name: string, value: string | number) => {
    setServiceData(() => ({
      ...serviceData,
      [name]:
        typeof value === "string" && name === "preco"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    console.log(serviceData);

    setIsCreating(false);
  };

  const fetchVendas = async () => {
    const data = await getAllVendas();

    setData(data);
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Adicionar Serviço</h2>
        <Button type="submit" size="sm" onClick={() => setIsCreating(true)}>
          Adicionar Serviço
        </Button>
      </div>

      <div className="border-b border-gray-200 w-full">
        {isCreating && (
          <CreateVendasForm
            vendasData={serviceData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setVendasData={setServiceData}
            onCancel={() => {
              setIsCreating(false);
              setServiceData(defaultVendasData);
            }}
          />
        )}
      </div>
      {!isCreating && <VendasTable data={data} fetchVendas={fetchVendas} />}
    </div>
  );
}
