import axiosInstance from "@/libs/axiosInstance";
import { DataCampign } from "@/models/DataCampign";

export const fetchDataCampign = async (): Promise<DataCampign[]> => {
  const response = await axiosInstance.get(`/api/campign`);
  console.log("API Response:", response.data.data);
  return response.data.data;
};
