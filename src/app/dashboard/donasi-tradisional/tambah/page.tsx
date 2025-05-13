import React from "react";
import { Metadata } from "next";
import TambahDonatur from "@/components/DonasiTradisonal/tambah-donasi-tradisional";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Donatur",
};

export default async function page() {
  return (
    <>
      <div>
        <TambahDonatur />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
