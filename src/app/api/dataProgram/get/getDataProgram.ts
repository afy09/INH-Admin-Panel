import { DataDistribusiProgram } from "@/models/DataProgram";

export const fetchDataProgram = async (query: { page?: number; limit?: number }): Promise<DataDistribusiProgram> => {
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/distribusi-program?${params.toString()}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data);
  return data;
};
