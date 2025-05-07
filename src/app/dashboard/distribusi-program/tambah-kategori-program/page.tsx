import React from "react";
import { Metadata } from "next";
import { fetchDataKategori } from "@/app/api/datakategori/get/getKategori";
import TableKategori from "@/components/Berita/kategori/table-kategori";
import TambahKategoriDistribusi from "@/components/DistribusiProgram/kategori/table-kategori-distribusi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Dsitribusi Program - Tambah Kategori",
};

export default async function page() {
  const dataKategori = await fetchDataKategori();
  return (
    <>
      <div>
        <TambahKategoriDistribusi />
      </div>

      <div className="mt-10">
        <TableKategori dataKategori={dataKategori} />
      </div>
    </>
  );
}
