import axiosInstance from "@/libs/axiosInstance";

export const fetchDataTransaksiUser = async (params?: { limit?: number; page?: number; search?: string; start_date?: string; end_date?: string; sort_credit?: "asc" | "desc" }) => {
  try {
    const response = await axiosInstance.get("/api/transactions", {
      params: {
        limit: params?.limit ?? 10,
        page: params?.page ?? 1,
        search: params?.search ?? "",
        start_date: params?.start_date ?? "",
        end_date: params?.end_date ?? "",
        sort_credit: params?.sort_credit ?? "",
      },
    });

    // ✅ Log hasil respon biar bisa dicek di console
    console.log("Data transaksi user:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error fetching data transaksi user:", error);

    if (error.response?.status === 401) {
      throw new Error("unauthorized");
    }

    throw new Error("fetch-transaksi-failed");
  }
};
