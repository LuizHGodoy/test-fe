import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export interface CreateEnderecoPayload {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface EditingEnderecoPayload {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

export interface CreateClientePayload {
  nome: string;
  documento: string;
  endereco: CreateEnderecoPayload;
  telefone?: string;
  email: string;
  dataNascimento?: string;
}

export const createClient = async (payload: CreateClientePayload) => {
  try {
    const response = await axiosInstance.post(
      "/clientes/criar-cliente",
      payload,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateClient = async (
  payload: Partial<CreateClientePayload>,
  uuid: string,
) => {
  try {
    const response = await axiosInstance.patch(`/clientes/${uuid}`, payload);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllClients = async (page: number) => {
  try {
    const response = await axiosInstance.get(`/clientes?page=${page}&limit=5`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getClient = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`/clients/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
