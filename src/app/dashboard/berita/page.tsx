import React from "react";
import { fetchDataBerita } from "@/app/api/databerita/get/getDataBerita";
import { fetchAllDataBerita } from "@/app/api/databerita/get/getAllDataBerita";
import { Metadata } from "next";
import TableBerita from "@/components/Berita/table-berita";
export const metadata: Metadata = {
  title: "Admin Panel INH | Berita",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string; perPage: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataBerita = await fetchDataBerita({ page, limit });
  const dataAllBerita = await fetchAllDataBerita();
  return (
    <div>
      <TableBerita dataBerita={dataBerita.data} currentPage={dataBerita.current_page} lastPage={dataBerita.last_page} total_news={dataBerita.total_news} dataAllBerita={dataAllBerita} />
    </div>
  );
}

export const dynamic = "force-dynamic";
