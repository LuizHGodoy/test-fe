import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export interface CreateServicePayload {
  nome: string;
  descricao: string;
  preco: number;
}

export const getAllServices = async () => {
  try {
    const response = await axiosInstance.get(
      "/aditional-services?page=1&limit=5",
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getServiceById = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`/aditional-services/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createService = async (payload: CreateServicePayload) => {
  try {
    const response = await axiosInstance.post("/aditional-services", payload);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateService = async (
  payload: Partial<CreateServicePayload>,
  uuid: string,
) => {
  try {
    const response = await axiosInstance.patch(
      `/aditional-services/${uuid}`,
      payload,
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteService = async (uuid: string) => {
  try {
    const response = await axiosInstance.delete(`/aditional-services/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
