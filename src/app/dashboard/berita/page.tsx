import React from "react";
import { fetchDataBerita } from "@/app/api/databerita/get/getDataBerita";
import { Metadata } from "next";
import TableBerita from "@/components/Berita/table-berita";

export const metadata: Metadata = {
  title: "Admin Panel INH | Berita",
};

export default async function page() {
  const dataBerita = await fetchDataBerita();
  return (
    <div>
      <TableBerita dataBerita={dataBerita} />
    </div>
  );
}

export const dynamic = "force-dynamic";
