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

const servicosDisponiveis = [
  { id: 1, name: "Plano Básico", price: 50 },
  { id: 2, name: "Plano Pro", price: 100 },
  { id: 3, name: "Plano Empresarial", price: 200 },
  { id: 4, name: "Serviço de Suporte", price: 25 },
  { id: 5, name: "Consultoria", price: 75 },
];

export default function CarrinhoDeServicos() {
  const { toast } = useToast();
  const [carrinho, setCarrinho] = useState<
    Array<{ id: number; name: string; price: number; quantity: number }>
  >([]);
  const [servicoSelecionado, setServicoSelecionado] = useState("");

  const adicionarAoCarrinho = () => {
    const servico = servicosDisponiveis.find(
      (s) => s.id === Number.parseInt(servicoSelecionado),
    );
    if (servico) {
      const itemExistente = carrinho.find((item) => item.id === servico.id);
      if (itemExistente) {
        setCarrinho(
          carrinho.map((item) =>
            item.id === servico.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setCarrinho([...carrinho, { ...servico, quantity: 1 }]);
      }
      toast({
        title: "Serviço Adicionado",
        description: `${servico.name} foi adicionado ao seu carrinho.`,
      });
    }
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const total = carrinho.reduce(
    (soma, item) => soma + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Carrinho de Serviços</h2>
      <div className="mb-4">
        <Label htmlFor="servico">Selecione o Serviço</Label>
        <Select onValueChange={setServicoSelecionado}>
          <SelectTrigger id="servico">
            <SelectValue placeholder="Escolha um serviço" />
          </SelectTrigger>
          <SelectContent>
            {servicosDisponiveis.map((servico) => (
              <SelectItem key={servico.id} value={servico.id.toString()}>
                {servico.name} - R$ {servico.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={adicionarAoCarrinho} className="mb-6">
        Adicionar ao Carrinho
      </Button>

      {carrinho.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Itens no Carrinho</h3>
          <ul className="space-y-2">
            {carrinho.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>R$ {item.price * item.quantity}</span>
                <Button
                  variant="destructive"
                  onClick={() => removerDoCarrinho(item.id)}
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xl font-bold">Total: R$ {total}</div>
        </div>
      ) : (
        <p>Seu carrinho está vazio.</p>
      )}
    </div>
  );
}
