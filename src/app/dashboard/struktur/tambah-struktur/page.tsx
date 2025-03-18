import React from "react";
import { Metadata } from "next";
import TambahStruktur from "@/components/Struktur/tambah-struktur";

export const metadata: Metadata = {
  title: "Admin Panel INH | Struktur Organisasi - Tambah",
};

export default function page() {
  return (
    <div>
      <TambahStruktur />
    </div>
  );
}
