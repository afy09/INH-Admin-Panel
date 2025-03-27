import axiosInstance from "@/libs/axiosInstance";
import { DataAdmin } from "@/models/DataAdmin";

export const fetchAdmin = async (): Promise<DataAdmin> => {
  try {
    const response = await axiosInstance.get("/api/profile");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching sidebar data:", error);

    if (error.response?.status === 401) {
      throw new Error("unauthorized");
    }

    throw new Error("fetch-admin-failed");
  }
};
