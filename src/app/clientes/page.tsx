"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function CustomerForm() {
  const { toast } = useToast();
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    email: "",
    cpfCnpj: "",
    telefone: "",
  });

  const [erros, setErros] = useState({
    nome: "",
    email: "",
    cpfCnpj: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosFormulario((prev) => ({ ...prev, [name]: value }));
    setErros((prev) => ({ ...prev, [name]: "" }));
  };

  const validarEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validarCpfCnpj = (cpfCnpj: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cpfRegex.test(cpfCnpj) || cnpjRegex.test(cpfCnpj);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const novosErros = { ...erros };

    if (!dadosFormulario.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
      isValid = false;
    }

    if (!validarEmail(dadosFormulario.email)) {
      novosErros.email = "Endereço de email inválido";
      isValid = false;
    }

    if (!validarCpfCnpj(dadosFormulario.cpfCnpj)) {
      novosErros.cpfCnpj = "Formato de CPF/CNPJ inválido";
      isValid = false;
    }

    if (!dadosFormulario.telefone.trim()) {
      novosErros.telefone = "Telefone é obrigatório";
      isValid = false;
    }

    setErros(novosErros);

    if (isValid) {
      console.log("Formulário enviado:", dadosFormulario);
      toast({
        title: "Cliente Adicionado",
        description: "O cliente foi adicionado com sucesso ao sistema.",
      });
      setDadosFormulario({ nome: "", email: "", cpfCnpj: "", telefone: "" });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Adicionar Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            name="nome"
            value={dadosFormulario.nome}
            onChange={handleChange}
            placeholder="Digite o nome do cliente"
          />
          {erros.nome && (
            <p className="text-red-500 text-sm mt-1">{erros.nome}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={dadosFormulario.email}
            onChange={handleChange}
            placeholder="Digite o email do cliente"
          />
          {erros.email && (
            <p className="text-red-500 text-sm mt-1">{erros.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
          <Input
            id="cpfCnpj"
            name="cpfCnpj"
            value={dadosFormulario.cpfCnpj}
            onChange={handleChange}
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
          />
          {erros.cpfCnpj && (
            <p className="text-red-500 text-sm mt-1">{erros.cpfCnpj}</p>
          )}
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            value={dadosFormulario.telefone}
            onChange={handleChange}
            placeholder="Digite o telefone do cliente"
          />
          {erros.telefone && (
            <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>
          )}
        </div>
        <Button type="submit">Adicionar Cliente</Button>
      </form>
    </div>
  );
}
