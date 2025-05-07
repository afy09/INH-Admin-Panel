import React from "react";
import { fetchDetailBerita } from "@/app/api/databerita/get/getDetailBerita";
import { fetchDataUserAdmin } from "@/app/api/dataakun/get/getUserAdmin";
import { fetchDataKategori } from "@/app/api/datakategori/get/getKategori";
import { Metadata } from "next";
import DetailBerita from "@/components/Berita/detail-berita";

export const metadata: Metadata = {
  title: "Admin Panel INH | Detail Berita",
};

export default async function page({ params }: { params: { id: number } }) {
  const detailBerita = await fetchDetailBerita(params.id);
  const dataKategori = await fetchDataKategori();
  const dataUserAdmin = await fetchDataUserAdmin();
  return (
    <div>
      <DetailBerita detailBerita={detailBerita} dataKategori={dataKategori} dataUserAdmin={dataUserAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";
