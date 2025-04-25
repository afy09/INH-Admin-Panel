import React from "react";
import { Metadata } from "next";
import TambahDivisi from "@/components/Struktur/tambah-divisi";
import TableDivisi from "@/components/Struktur/divisi/table-divisi";
import { fetchDataDivisi } from "@/app/api/dataStruktur/dataDivisi/get/getDivisi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Struktur Organisasi - Tambah Divisi",
};

export default async function page() {
  const dataDivisi = await fetchDataDivisi();
  return (
    <>
      <div>
        <TambahDivisi />
      </div>

      <div className="mt-10">
        <TableDivisi dataDivisi={dataDivisi} />
      </div>
    </>
  );
}
