import React from "react";
import { Metadata } from "next";
import TambahBerita from "@/components/Berita/tambah-berita";
import { fetchDataKategori } from "@/app/api/datakategori/get/getKategori";
import { fetchDataUserAdmin } from "@/app/api/dataakun/get/getUserAdmin";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Berita",
};

export default async function page() {
  const dataKategori = await fetchDataKategori();
  const dataUserAdmin = await fetchDataUserAdmin();
  return (
    <div>
      <TambahBerita dataKategori={dataKategori} dataUserAdmin={dataUserAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";
