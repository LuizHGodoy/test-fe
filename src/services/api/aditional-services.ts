import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export const getAllServices = async () => {
  try {
    const response = await axiosInstance.get("/plans?page=1&limit=10");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getServiceById = async (uuid: number) => {
  try {
    const response = await axiosInstance.get(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createService = async (data: any) => {
  try {
    const response = await axiosInstance.post("/plans", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateService = async (uuid: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/plans/${uuid}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteService = async (uuid: number) => {
  try {
    const response = await axiosInstance.delete(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
