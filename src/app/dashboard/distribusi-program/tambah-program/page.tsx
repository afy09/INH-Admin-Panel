import React from "react";
import { Metadata } from "next";
import TambahProgram from "@/components/DistribusiProgram/tambah-program";
import { fetchDataKategori } from "@/app/api/datakategori/get/getKategori";
import { fetchDataUserAdmin } from "@/app/api/dataakun/get/getUserAdmin";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Distribusi Program",
};

export default async function page() {
  const dataKategori = await fetchDataKategori();
  const dataUserAdmin = await fetchDataUserAdmin();
  return (
    <div>
      <TambahProgram dataKategori={dataKategori} dataUserAdmin={dataUserAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";
