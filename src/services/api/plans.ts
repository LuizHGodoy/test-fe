import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export const getAllPlans = async () => {
  try {
    const response = await axiosInstance.get("/plans?page=1&limit=10");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getPlanById = async (uuid: number) => {
  try {
    const response = await axiosInstance.get(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPlan = async (data: any) => {
  try {
    const response = await axiosInstance.post("/plans", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updatePlan = async (uuid: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/plans/${uuid}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deletePlan = async (uuid: number) => {
  try {
    const response = await axiosInstance.delete(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
