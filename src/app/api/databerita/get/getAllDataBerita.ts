import { DataBerita } from "@/models/DataBerita";

export const fetchAllDataBerita = async (): Promise<DataBerita> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news?limit=200`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Gagal ambil semua berita: ${response.status}`);
  }

  const data = await response.json();
  return data?.data || []; // sesuaikan dengan struktur respons API
};
