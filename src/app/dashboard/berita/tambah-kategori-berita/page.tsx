import React from "react";
import { Metadata } from "next";
import { fetchDataKategori } from "@/app/api/datakategori/get/getKategori";
import TableKategori from "@/components/Berita/kategori/table-kategori";
import TambahKategoriBerita from "@/components/Berita/kategori/tambah-kategori-berita";

export const metadata: Metadata = {
  title: "Admin Panel INH | Berita - Tambah Kategori",
};

export default async function page() {
  const dataKategori = await fetchDataKategori();
  return (
    <>
      <div>
        <TambahKategoriBerita />
      </div>

      <div className="mt-10">
        <TableKategori dataKategori={dataKategori} />
      </div>
    </>
  );
}
