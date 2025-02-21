import { DataCampign } from "@/models/DataCampign";
export const fetchDetailCampaign = async (id: number): Promise<DataCampign> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/campaign/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("API Response:", data.data);
  return data.data;
};
