import {
  aplicarMascaraCep,
  aplicarMascaraDocumento,
  aplicarMascaraTelefone,
  removeMascaraCep,
} from "@/common/utils/masks";
import { validateAndSubmitForm } from "@/common/utils/validationZod";
import { isValidCEP } from "@/common/utils/validators";
import { format } from "date-fns";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface IClienteFormularioData {
  uuid?: string;
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  dataNascimento?: string;
}

const clienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Endereço de email inválido"),
  cpfCnpj: z.string().min(1, "Formato de CPF/CNPJ inválido"),
  dataNascimento: z.string().optional(),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
});

interface ICreateClientForm {
  handleSubmit: () => void;
  onCancel: () => void;
  handleChange: (name: string, value: string) => void;
  setClienteData: React.Dispatch<React.SetStateAction<IClienteFormularioData>>;
  clienteData: IClienteFormularioData;
}

export const CreateClientForm = ({
  handleSubmit,
  handleChange,
  onCancel,
  setClienteData,
  clienteData,
}: ICreateClientForm) => {
  const [blockInputs, setBlockInputs] = useState(true);
  const [erros, setErros] = useState<
    Partial<Record<keyof IClienteFormularioData, string>>
  >({});

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAndSubmitForm(clienteSchema, clienteData);

    if (!validation.success) {
      setErros(validation.error as IClienteFormularioData);

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
          setClienteData({
            ...clienteData,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
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
            value={clienteData.nome}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, nome: undefined }));
            }}
            placeholder="Digite o nome do cliente"
            showerror={!!erros.nome}
            errormessage={erros.nome}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={clienteData.email}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="Digite o email do cliente"
            showerror={!!erros.nome}
            errormessage={erros.email}
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex-1">
          <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
          <Input
            id="cpfCnpj"
            name="cpfCnpj"
            value={aplicarMascaraDocumento(clienteData.cpfCnpj)}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, aplicarMascaraDocumento(value));
              setErros((prev) => ({ ...prev, cpfCnpj: undefined }));
            }}
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            max={16}
            showerror={!!erros.nome}
            errormessage={erros.cpfCnpj}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            value={
              clienteData.dataNascimento
                ? format(clienteData.dataNascimento, "dd/MM/yyyy")
                : ""
            }
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, dataNascimento: undefined }));
            }}
            placeholder="Digite a data de nascimento"
            showerror={!!erros.dataNascimento}
            errormessage={erros.dataNascimento}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            value={aplicarMascaraTelefone(clienteData.telefone)}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, aplicarMascaraTelefone(value));
              setErros((prev) => ({ ...prev, telefone: undefined }));
            }}
            placeholder="Digite o telefone do cliente"
            showerror={!!erros.nome}
            errormessage={erros.telefone}
          />
        </div>
      </div>

      <h6 className="font-bold">Endereço</h6>

      <div className="flex items-center flex-wrap  gap-4">
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            name="cep"
            value={aplicarMascaraCep(clienteData.cep)}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, aplicarMascaraCep(value));
              setErros((prev) => ({ ...prev, cep: undefined }));
            }}
            onBlur={({ target }) => handleBlurCEP(target.value)}
            placeholder="Digite o CEP"
            showerror={!!erros.nome}
            errormessage={erros.cep}
          />
        </div>
        <div className="flex-1 min-w-[300px]">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input
            id="logradouro"
            name="logradouro"
            disabled={blockInputs}
            value={clienteData.logradouro}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, logradouro: undefined }));
            }}
            placeholder="Digite o logradouro"
            showerror={!!erros.nome}
            errormessage={erros.logradouro}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            name="bairro"
            value={clienteData.bairro}
            disabled={blockInputs}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, bairro: undefined }));
            }}
            placeholder="Digite o bairro"
            showerror={!!erros.nome}
            errormessage={erros.bairro}
          />
        </div>

        <div>
          <Label htmlFor="numero">Número</Label>
          <Input
            id="numero"
            name="numero"
            value={clienteData.numero}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, numero: undefined }));
            }}
            placeholder="Digite o número"
            showerror={!!erros.nome}
            errormessage={erros.numero}
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <div>
          <Label htmlFor="complemento (opcional) ">Complemento</Label>
          <Input
            id="complemento"
            name="complemento"
            value={clienteData.complemento}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, complemento: undefined }));
            }}
            placeholder="Digite o complemento (opcional)"
            showerror={!!erros.nome}
            errormessage={erros.complemento}
          />
        </div>

        <div className="flex-1 min-w-[300px]">
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            name="cidade"
            value={clienteData.cidade}
            disabled={blockInputs}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, cidade: undefined }));
            }}
            placeholder="Digite a cidade"
            showerror={!!erros.nome}
            errormessage={erros.cidade}
          />
        </div>

        <div className="flex-1 min-w-[300px]">
          <Label htmlFor="estado">Estado</Label>
          <Input
            id="estado"
            name="estado"
            value={clienteData.estado}
            disabled={blockInputs}
            onChange={({ target }) => {
              const { name, value } = target;
              handleChange(name, value);
              setErros((prev) => ({ ...prev, estado: undefined }));
            }}
            placeholder="Digite o estado"
            showerror={!!erros.nome}
            errormessage={erros.estado}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <Button type="submit" size="sm">
          {`${clienteData.uuid ? "Editando" : "Adicionar"} Cliente`}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
