import React from "react";
import { fetchDataPengumuman } from "@/app/api/dataPengumuman/pengumuman/getDataPengumuman";
import { Metadata } from "next";
import PagePengumuman from "@/components/Pengumuman/index";
import TablePengumuman from "@/components/Pengumuman/pengumuman";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Pengumuman",
};

export default async function page() {
  const dataPengumuman = await fetchDataPengumuman();
  return (
    <div className="border rounded-lg">
      <PagePengumuman />
      <TablePengumuman dataPengumuman={dataPengumuman} />
    </div>
  );
}

export const dynamic = "force-dynamic";
