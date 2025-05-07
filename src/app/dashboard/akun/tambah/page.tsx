import React from "react";
import { Metadata } from "next";
import TambahAkun from "@/components/Akun/tambah";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Akun",
};

export default function page() {
  return (
    <div>
      <TambahAkun />
    </div>
  );
}
