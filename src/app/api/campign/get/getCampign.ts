import { DataCampign } from "@/models/DataCampign";

export const fetchDataCampign = async (query: { page?: number; limit?: number }): Promise<DataCampign> => {
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/campaign?${params.toString()}`;
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
