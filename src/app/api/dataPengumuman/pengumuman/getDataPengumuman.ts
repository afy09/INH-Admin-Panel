import { DataPengumuman } from "@/models/DataPengumuman";

export const fetchDataPengumuman = async (): Promise<DataPengumuman[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pengumuman`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data.data);
  return data.data;
};
