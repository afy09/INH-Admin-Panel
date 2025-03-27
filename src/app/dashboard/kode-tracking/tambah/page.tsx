import React from "react";
import { Metadata } from "next";
import TambahKode from "@/components/KodeTracking/tambah-kode";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Kode Tracking",
};

export default function page() {
  return (
    <div>
      <TambahKode />
    </div>
  );
}
