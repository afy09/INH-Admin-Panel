import React from "react";
import { fetchDataBerita } from "@/app/api/databerita/get/getDataBerita";
import { Metadata } from "next";
import TableBerita from "@/components/Berita/table-berita";
export const metadata: Metadata = {
  title: "Admin Panel INH | Berita",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataBerita = await fetchDataBerita({ page, limit });
  return (
    <div>
      <TableBerita dataBerita={dataBerita.data} currentPage={dataBerita.current_page} lastPage={dataBerita.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
