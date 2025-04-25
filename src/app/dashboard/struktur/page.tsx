import React from "react";
import { fetchDataStruktur } from "@/app/api/dataStruktur/get/getStruktur";
import { fetchDataDivisi } from "@/app/api/dataStruktur/dataDivisi/get/getDivisi";
import { Metadata } from "next";
import Struktur from "@/components/Struktur/struktur";

export const metadata: Metadata = {
  title: "Admin Panel INH | Struktur Organisasi",
};

export default async function page() {
  const dataStruktur = await fetchDataStruktur();
  const dataDivisi = await fetchDataDivisi();
  return (
    <div className="border rounded-lg">
      <Struktur dataStruktur={dataStruktur} dataDivisi={dataDivisi} />
    </div>
  );
}

export const dynamic = "force-dynamic";
