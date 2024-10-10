import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export const getAllVendas = async () => {
  try {
    const response = await axiosInstance.get("/plans?page=1&limit=10");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getVendaById = async (uuid: number) => {
  try {
    const response = await axiosInstance.get(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createVenda = async (data: any) => {
  try {
    const response = await axiosInstance.post("/plans", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateVenda = async (uuid: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/plans/${uuid}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteVenda = async (uuid: number) => {
  try {
    const response = await axiosInstance.delete(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
