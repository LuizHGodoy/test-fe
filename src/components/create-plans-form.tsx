import { validateAndSubmitForm } from "@/common/utils/validationZod";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface IPlanFormularioData {
  uuid?: string;
  nome: string;
  descricao: string;
  precoBase: number;
}

const planSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  precoBase: z.number().min(0, "Preço base deve ser maior ou igual a 0"),
});

interface ICreatePlanForm {
  handleSubmit: () => void;
  onCancel: () => void;
  handleChange: (name: string, value: string) => void;
  setPlanData: React.Dispatch<React.SetStateAction<IPlanFormularioData>>;
  planData: IPlanFormularioData;
}

export const CreatePlanForm = ({
  handleSubmit,
  handleChange,
  onCancel,
  setPlanData,
  planData,
}: ICreatePlanForm) => {
  const [erros, setErros] = useState<
    Partial<Record<keyof IPlanFormularioData, string>>
  >({});

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAndSubmitForm(planSchema, planData);
    if (!validation.success) {
      setErros(
        validation.error as Partial<Record<keyof IPlanFormularioData, string>>,
      );
      return;
    }

    setErros({});
    handleSubmit();
  };

  return (
    <form onSubmit={validateAndSubmit} className="my-5 space-y-4">
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex-1">
          <Label htmlFor="nome">Nome do Plano</Label>
          <Input
            id="nome"
            name="nome"
            value={planData.nome}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, nome: undefined }));
            }}
            placeholder="Digite o nome do plano"
            showerror={!!erros.nome}
            errormessage={erros.nome}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            id="descricao"
            name="descricao"
            value={planData.descricao}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, descricao: undefined }));
            }}
            placeholder="Digite a descrição do plano"
            showerror={!!erros.descricao}
            errormessage={erros.descricao}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="precoBase">Preço Base</Label>
          <Input
            id="precoBase"
            name="precoBase"
            type="number"
            value={planData.precoBase}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, precoBase: undefined }));
            }}
            placeholder="Digite o preço base"
            showerror={!!erros.precoBase}
            errormessage={erros.precoBase}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          {`${planData.uuid ? "Editando" : "Adicionar"} Plano`}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
