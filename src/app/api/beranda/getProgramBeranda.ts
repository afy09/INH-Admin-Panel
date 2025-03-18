import { BerandaProgram } from "@/models/DataBeranda";

export const fetchBerandaProgram = async (): Promise<BerandaProgram> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/distribusi-program`;

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
