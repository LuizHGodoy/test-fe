"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

export type Cliente = {
  uuid: string;
  nome: string;
  documento: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  telefone?: string;
  email: string;
  dataNascimento?: string;
};

export type Service = {
  uuid: string;
  nome: string;
  descricao: string;
  preco: number;
};

export type Plan = {
  uuid: string;
  nome: string;
  descricao: string;
  precoBase: number;
};

export type Venda = {
  uuid: string;
  totalVenda: number;
  descontoAplicado: number;
  status: string;
  vendedorUuid: string;
  clientes: Cliente[];
  planos: Plan[];
  servicos: Service[];
};

export const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "documento",
    header: "Documento",
  },
];
