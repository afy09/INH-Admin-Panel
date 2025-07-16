import React from "react";
import { fetchDataAktivitas } from "@/app/api/dataPengumuman/aktivitas/getAktivitas";
import { Metadata } from "next";
import PagePengumuman from "@/components/Pengumuman/index";
import TableAktivitas from "@/components/Pengumuman/aktifitas";

export const metadata: Metadata = {
  title: "Admin Panel INH | Kerja Sama - Aktivitas Terbaru",
};

export default async function page({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const dataAktivitas = await fetchDataAktivitas({ page, limit });
  return (
    <div className="border rounded-lg">
      <PagePengumuman />
      <TableAktivitas dataAktivitas={dataAktivitas.data} currentPage={dataAktivitas.current_page} lastPage={dataAktivitas.last_page} />
    </div>
  );
}

export const dynamic = "force-dynamic";
