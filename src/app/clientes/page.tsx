"use client";

import {
  CreateClientForm,
  IClienteFormularioData,
} from "@/components/create-client-form";
import { Button } from "@/components/ui/button";
import { CreateClientePayload, createClient } from "@/services/api/clients";
import { useState } from "react";

import {
  removeMascaraCep,
  removeMascaraDocumento,
  removeMascaraTelefone,
} from "@/common/utils/masks";
import { toast } from "@/hooks/use-toast";

const defaultClienteData: IClienteFormularioData = {
  nome: "",
  email: "",
  cpfCnpj: "",
  telefone: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
};

export default function CustomerForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [clienteData, setClienteData] =
    useState<IClienteFormularioData>(defaultClienteData);

  const handleChange = (name: string, value: string) => {
    setClienteData(() => ({ ...clienteData, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload: CreateClientePayload = {
      nome: clienteData.nome,
      documento: removeMascaraDocumento(clienteData.cpfCnpj),
      endereco: {
        logradouro: clienteData.logradouro as string,
        numero: clienteData.numero as string,
        complemento: clienteData.complemento,
        bairro: clienteData.bairro,
        cidade: clienteData.cidade,
        estado: clienteData.estado,
        cep: removeMascaraCep(clienteData.cep),
      },
      telefone: removeMascaraTelefone(clienteData.telefone),
      email: clienteData.email,
      dataNascimento: new Date(
        clienteData.dataNascimento as string,
      ).toISOString(),
    };

    const newClient = await createClient(payload);

    toast({ title: "Cliente criado com sucesso" });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Adicionar Cliente</h2>
        <Button type="submit" size="sm" onClick={() => setIsCreating(true)}>
          Adicionar Cliente
        </Button>
      </div>
      <div className="border-b border-gray-200 w-full">
        {isCreating && (
          <CreateClientForm
            clienteData={clienteData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setClienteData={setClienteData}
            onCancel={() => {
              setIsCreating(false);
              setClienteData(defaultClienteData);
            }}
          />
        )}
      </div>
    </div>
  );
}
