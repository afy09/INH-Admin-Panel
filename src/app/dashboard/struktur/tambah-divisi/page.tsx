import React from "react";
import { Metadata } from "next";
import TambahDivisi from "@/components/Struktur/tambah-divisi";

export const metadata: Metadata = {
  title: "Admin Panel INH | Struktur Organisasi - Tambah Divisi",
};

export default function page() {
  return (
    <div>
      <TambahDivisi />
    </div>
  );
}
