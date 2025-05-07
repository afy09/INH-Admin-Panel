import { DataTransaksiUnpaid } from "@/models/DataTransaksi";

export const fetchDataTransaksiUnpaid = async (query: { page?: number; limit?: number; startAt?: number }): Promise<DataTransaksiUnpaid> => {
  const params = new URLSearchParams();

  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());

  // Gunakan startAt atau default ke timestamp sekarang
  const startTimestamp = query.startAt ?? Date.now();
  params.append("startAt", startTimestamp.toString());

  const url = `${process.env.NEXT_PUBLIC_API_MAYAR}/transactions/unpaid?${params.toString()}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data);
  return data;
};
