import React from "react";
import { Metadata } from "next";
import TambahProgram from "@/components/DistribusiProgram/tambah-program";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Distribusi Program",
};

export default function page() {
  return (
    <div>
      <TambahProgram />
    </div>
  );
}
