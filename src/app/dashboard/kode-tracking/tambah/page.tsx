import React from "react";
import { Metadata } from "next";
import TambahKode from "@/components/KodeTracking/tambah-kode";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Kode Tracking",
};

export default async function page() {
  return (
    <>
      <div>
        <TambahKode />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
