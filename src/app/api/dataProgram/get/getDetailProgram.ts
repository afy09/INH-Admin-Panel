import { DataDistribusiProgram } from "@/models/DataProgram";
export const fetchDetailProgram = async (id: number): Promise<DataDistribusiProgram> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/distribusi-program/${id}`;
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
