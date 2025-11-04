import axiosInstance from "@/libs/axiosInstance";

export async function syncDataTransaksiUser() {
  try {
    const response = await axiosInstance.get("/api/transactions/sync");
    console.log("✅ Sinkronisasi sukses:", response.data);
    return { success: true, message: "Sinkronisasi berhasil", data: response.data };
  } catch (error: any) {
    console.error("❌ Gagal sinkronisasi:", error.response?.data || error.message);
    return { success: false, message: "Gagal sinkronisasi" };
  }
}
