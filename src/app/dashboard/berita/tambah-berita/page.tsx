import React from "react";
import { Metadata } from "next";
import TambahBerita from "@/components/Berita/tambah-berita";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Berita",
};

export default function page() {
  return (
    <div>
      <TambahBerita />
    </div>
  );
}
