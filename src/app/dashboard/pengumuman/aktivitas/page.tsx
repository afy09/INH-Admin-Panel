import React from "react";
import { fetchDataAktivitas } from "@/app/api/dataPengumuman/aktivitas/getAktivitas";
import { Metadata } from "next";
import PagePengumuman from "@/components/Pengumuman/index";
import TableAktivitas from "@/components/Pengumuman/aktifitas";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Aktivitas Terbaru",
};

export default async function page() {
  const dataAktivitas = await fetchDataAktivitas();
  return (
    <div className="border rounded-lg">
      <PagePengumuman />
      <TableAktivitas dataAktivitas={dataAktivitas} />
    </div>
  );
}

export const dynamic = "force-dynamic";
