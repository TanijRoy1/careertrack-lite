import type { AxiosInstance } from "axios";
import type { CreateApplicationPayload } from "../types/application.types";

const createApplication = async (
  axiosSecure: AxiosInstance,
  payload: CreateApplicationPayload,
) => {
  const response = await axiosSecure.post("/applications", payload);

  return response.data;
};

const getApplications = async (axiosSecure: AxiosInstance) => {
  const response = await axiosSecure.get("/applications");

  return response.data;
};

const getApplicationById = async (axiosSecure: AxiosInstance, id: string) => {
  const response = await axiosSecure.get(`/applications/${id}`);

  return response.data;
};

const updateApplication = async (
  axiosSecure: AxiosInstance,
  id: string,
  payload: Partial<CreateApplicationPayload>,
) => {
  const response = await axiosSecure.patch(`/applications/${id}`, payload);

  return response.data;
};

const deleteApplication = async (axiosSecure: AxiosInstance, id: string) => {
  const response = await axiosSecure.delete(`/applications/${id}`);

  return response.data;
};

export const ApplicationService = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
