import React from "react";
import { Metadata } from "next";
import TambahStruktur from "@/components/Struktur/tambah-struktur";
import { fetchDataDivisi } from "@/app/api/dataStruktur/dataDivisi/get/getDivisi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Struktur Organisasi - Tambah",
};

export default async function page() {
  const dataDivisi = await fetchDataDivisi();
  return (
    <div>
      <TambahStruktur dataDivisi={dataDivisi} />
    </div>
  );
}
