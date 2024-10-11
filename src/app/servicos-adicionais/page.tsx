"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Service } from "@/components/columns";
import {
  CreateServiceForm,
  IServiceFormularioData,
} from "@/components/create-service-form";
import { ServicesTable } from "@/components/servicos-table";
import { toast } from "@/components/ui/use-toast";
import {
  CreateServicePayload,
  createService,
  getAllServices,
} from "@/services/api/aditional-services";

const defaultServiceData: IServiceFormularioData = {
  nome: "",
  descricao: "",
  preco: 0,
};

export default function ServicesForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [serviceData, setServiceData] =
    useState<IServiceFormularioData>(defaultServiceData);
  const [data, setData] = useState<Service[]>([]);

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
    const payload: CreateServicePayload = {
      nome: serviceData.nome,
      descricao: serviceData.descricao,
      preco: serviceData.preco,
    };

    await createService(payload).then((data) => {
      console.log(data);
      toast({ title: "Serviço cadastrado com sucesso" });
    });

    setIsCreating(false);
  };

  const fetchServices = async () => {
    const data = await getAllServices();

    setData(data);
  };

  useEffect(() => {
    fetchServices();
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
          <CreateServiceForm
            serviceData={serviceData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setServiceData={setServiceData}
            onCancel={() => {
              setIsCreating(false);
              setServiceData(defaultServiceData);
            }}
          />
        )}
      </div>
      {!isCreating && (
        <ServicesTable data={data} fetchServices={fetchServices} />
      )}
    </div>
  );
}
