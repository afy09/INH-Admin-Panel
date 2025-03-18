import React from "react";
import { fetchDataStruktur } from "@/app/api/dataStruktur/get/getStruktur";
import { Metadata } from "next";
import Struktur from "@/components/Struktur/struktur";

export const metadata: Metadata = {
  title: "Admin Panel INH | Struktur Organisasi",
};

export default async function page() {
  const dataStruktur = await fetchDataStruktur();
  return (
    <div className="border rounded-lg">
      <Struktur dataStruktur={dataStruktur} />
    </div>
  );
}

export const dynamic = "force-dynamic";
