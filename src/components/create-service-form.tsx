import { removeMascaraCep } from "@/common/utils/masks";
import { validateAndSubmitForm } from "@/common/utils/validationZod";
import { isValidCEP } from "@/common/utils/validators";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface IServiceFormularioData {
  uuid?: string;
  nome: string;
  descricao: string;
  preco: number;
}

const serviceSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatório"),
  preco: z.number().min(1, "Preço é obrigatório"),
});

interface ICreateServiceForm {
  handleSubmit: () => void;
  onCancel: () => void;
  handleChange: (name: string, value: string) => void;
  setServiceData: React.Dispatch<React.SetStateAction<IServiceFormularioData>>;
  serviceData: IServiceFormularioData;
}

export const CreateServiceForm = ({
  handleSubmit,
  handleChange,
  onCancel,
  setServiceData,
  serviceData,
}: ICreateServiceForm) => {
  const [blockInputs, setBlockInputs] = useState(true);
  const [erros, setErros] = useState<
    Partial<Record<keyof IServiceFormularioData, string>>
  >({});

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAndSubmitForm(serviceSchema, serviceData);
    if (!validation.success) {
      setErros(
        validation.error as Partial<
          Record<keyof IServiceFormularioData, string>
        >,
      );

      return;
    }

    setErros({});
    handleSubmit();
  };

  const handleBlurCEP = async (cep: string) => {
    const cepSemMascara = removeMascaraCep(cep);

    if (!cep) return;
    if (isValidCEP(cepSemMascara)) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepSemMascara}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setServiceData({
            ...serviceData,
            nome: data.nome,
          });
          setBlockInputs(false);
        } else {
          setErros((prev) => ({ ...prev, cep: "CEP não encontrado" }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setErros((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }));
      }
    } else {
      setErros((prev) => ({ ...prev, cep: "CEP inválido" }));
    }
  };

  return (
    <form onSubmit={validateAndSubmit} className="my-5 space-y-4">
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex-1">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            name="nome"
            value={serviceData.nome}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, nome: undefined }));
            }}
            placeholder="Digite o nome do serviço"
            showerror={!!erros.nome}
            errormessage={erros.nome}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            id="descricao"
            name="descricao"
            type="descricao"
            value={serviceData.descricao}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="Digite a descrição do serviço"
            showerror={!!erros.descricao}
            errormessage={erros.descricao}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="preco">Preço</Label>
          <Input
            id="preco"
            name="preco"
            type="preco"
            value={serviceData.preco}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, preco: undefined }));
            }}
            placeholder="Digite a descrição do serviço"
            showerror={!!erros.preco}
            errormessage={erros.preco}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ">
        <Button type="submit" size="sm">
          {`${serviceData.uuid ? "Editando" : "Adicionar"} Serviço`}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
