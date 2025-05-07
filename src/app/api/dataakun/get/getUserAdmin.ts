import { DataUserAdmin } from "@/models/DataAdmin";

export const fetchDataUserAdmin = async (): Promise<DataUserAdmin[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data.users);
  return data.users;
};
