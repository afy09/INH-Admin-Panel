import React from "react";
import { Metadata } from "next";
import TambahPamplet from "@/components/pamplet/tambah-pamplet";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Banner Utama",
};

export default function page() {
  return (
    <div>
      <TambahPamplet />
    </div>
  );
}
