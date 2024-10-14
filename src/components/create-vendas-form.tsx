import { validateAndSubmitForm } from "@/common/utils/validationZod";
import { useState } from "react";
import { z } from "zod";
import { Cliente, Plan, Service } from "./columns";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface IVendasFormularioData {
  uuid?: string;
  clientes: Cliente[];
  planos: Plan[];
  servicos: Service[];
  totalVenda: number;
  descontoAplicado: number;
  vendedorUuid: string;
  status: string;
}

const vendasSchema = z.object({
  clientes: z.array(z.string()),
  planos: z.array(z.string()),
  servicos: z.array(z.string()),
  totalVenda: z.number().min(1, "Total da venda deve ser maior ou igual a 1"),
  descontoAplicado: z
    .number()
    .min(0, "Desconto deve ser maior ou igual a 0")
    .max(30, "Desconto deve ser menor ou igual a 30"),
  status: z.string().min(1, "Status é obrigatório"),
});

interface ICreateVendasForm {
  handleSubmit: () => void;
  onCancel: () => void;
  handleChange: (name: string, value: string) => void;
  setVendasData: React.Dispatch<React.SetStateAction<IVendasFormularioData>>;
  vendasData: IVendasFormularioData;
}

export const CreateVendasForm = ({
  handleSubmit,
  handleChange,
  onCancel,
  setVendasData,
  vendasData,
}: ICreateVendasForm) => {
  const [blockInputs, setBlockInputs] = useState(true);
  const [erros, setErros] = useState<
    Partial<Record<keyof IVendasFormularioData, string>>
  >({});
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAndSubmitForm(vendasSchema, {
      ...vendasData,
      clientes: vendasData.clientes.map((cliente) => cliente.nome),
      planos: vendasData.planos.map((plano) => plano.nome),
      servicos: vendasData.servicos.map((servico) => servico.nome),
    });
    if (!validation.success) {
      setErros(
        validation.error as Partial<
          Record<keyof IVendasFormularioData, string>
        >,
      );

      return;
    }

    setErros({});
    handleSubmit();
  };

  const handleFilterChange = (name: string, value: string) => {
    setVendasData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={validateAndSubmit} className="my-5 space-y-4">
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex-1">
          <Label htmlFor="clientes">Clientes</Label>
          <Select
            onValueChange={(value) => handleFilterChange("clientes", value)}
          >
            <SelectTrigger id="clientes">
              <SelectValue
                placeholder={
                  selectedClient
                    ? vendasData.clientes[0].nome
                    : "Selecione o cliente"
                }
              />
            </SelectTrigger>
            <SelectContent id="clientes">
              {vendasData.clientes.map((cliente: any) => (
                <SelectItem key={cliente.uuid} value={cliente.uuid}>
                  {cliente.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="planos">Planos</Label>
          <Select
            onValueChange={(value) => handleFilterChange("planos", value)}
          >
            <SelectTrigger id="planos">
              <SelectValue
                placeholder={
                  selectedPlan ? vendasData.planos[0].nome : "Selecione o plano"
                }
              />
            </SelectTrigger>
            <SelectContent id="planos">
              {vendasData.planos.map((plano: any) => (
                <SelectItem key={plano.uuid} value={plano.uuid}>
                  {plano.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="servicos">Serviços</Label>
          <Select
            onValueChange={(value) => handleFilterChange("servicos", value)}
          >
            <SelectTrigger id="servicos">
              <SelectValue
                placeholder={
                  selectedService
                    ? vendasData.servicos[0].nome
                    : "Selecione o serviço"
                }
              />
            </SelectTrigger>
            <SelectContent id="servicos">
              {vendasData.servicos.map((servico: any) => (
                <SelectItem key={servico.uuid} value={servico.uuid}>
                  {servico.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="desconto">Desconto</Label>
          <Input
            id="desconto"
            name="desconto"
            type="preco"
            value={vendasData.descontoAplicado}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, descontoAplicado: undefined }));
            }}
            placeholder="Desconto aplicado em %"
            showerror={!!erros.descontoAplicado}
            errormessage={erros.descontoAplicado}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ">
        <Button type="submit" size="sm">
          {`${vendasData.uuid ? "Editando" : "Criar"} Venda`}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
